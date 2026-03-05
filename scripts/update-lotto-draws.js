#!/usr/bin/env node

/**
 * Lotto Draw Data Update Script
 *
 * 동행복권 API에서 로또 당첨 데이터를 가져와 lotto_draws.json을 업데이트합니다.
 *
 * 사용법:
 *   node scripts/update-lotto-draws.js              # 자동으로 최신 회차부터 현재까지
 *   node scripts/update-lotto-draws.js 1059 1213    # 특정 범위 지정
 */

// SSL 인증서 검증 비활성화 (동행복권 서버의 self-signed 인증서 문제 해결)
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const LOTTO_DATA_PATH = path.join(__dirname, '../lib/lotto/lotto_draws.json');
const API_BASE_URL =
  'https://www.dhlottery.co.kr/lt645/selectPstLt645InfoNew.do';
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1초
const CONCURRENT_REQUESTS = 5; // 동시 요청 수 제한

/**
 * 딜레이 함수
 */
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * API 호출 (재시도 로직 포함)
 */
async function fetchLottoData(round, retries = 0) {
  const url = `${API_BASE_URL}?srchDir=center&srchLtEpsd=${round}&_=${Date.now()}`;

  try {
    console.log(`  🔗 [Round ${round}] Fetching: ${url}`);

    const response = await fetch(url, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
        Referer: 'https://www.dhlottery.co.kr/',
        Accept: 'application/json, text/javascript, */*; q=0.01',
        'Accept-Language': 'ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7',
      },
    });

    // console.log(`  📡 [Round ${round}] Response status: ${response.status} ${response.statusText}`);
    // console.log(`  📋 [Round ${round}] Response headers:`, Object.fromEntries(response.headers.entries()));

    if (!response.ok) {
      throw new Error(
        `HTTP error! status: ${response.status} ${response.statusText}`
      );
    }

    const textData = await response.text();
    // console.log(`  📄 [Round ${round}] Response body (first 500 chars):`, textData.substring(0, 500));

    const data = JSON.parse(textData);

    // 데이터 검증
    if (!data.data || !data.data.list || data.data.list.length === 0) {
      console.log(
        `  ❌ [Round ${round}] Invalid data structure:`,
        JSON.stringify(data, null, 2).substring(0, 500)
      );
      throw new Error(`No data found for round ${round}`);
    }

    // 요청한 회차(ltEpsd)와 일치하는 항목 찾기
    const targetData = data.data.list.find(item => item.ltEpsd === round);

    if (!targetData) {
      console.log(
        `  ❌ [Round ${round}] Round not found in response. Available rounds:`,
        data.data.list.map(item => item.ltEpsd).join(', ')
      );
      throw new Error(`Round ${round} not found in API response`);
    }

    console.log(`  ✅ [Round ${round}] Data received successfully`);
    return targetData;
  } catch (error) {
    console.error(`  ❌ [Round ${round}] Error details:`, {
      name: error.name,
      message: error.message,
      cause: error.cause,
      stack: error.stack?.split('\n').slice(0, 3).join('\n'),
    });

    if (retries < MAX_RETRIES) {
      const delayMs = RETRY_DELAY * (retries + 1);
      console.log(
        `  ⚠️  [Round ${round}] Retry ${retries + 1}/${MAX_RETRIES} after ${delayMs}ms...`
      );
      await delay(delayMs);
      return fetchLottoData(round, retries + 1);
    }
    throw error;
  }
}

/**
 * API 데이터를 JSON 형식으로 변환
 */
function transformData(apiData) {
  const drawDate = apiData.ltRflYmd;
  const drawYear = drawDate.substring(0, 4);

  return {
    round: apiData.ltEpsd,
    numbers: [
      apiData.tm1WnNo,
      apiData.tm2WnNo,
      apiData.tm3WnNo,
      apiData.tm4WnNo,
      apiData.tm5WnNo,
      apiData.tm6WnNo,
    ],
    bonus: apiData.bnsWnNo,
    drawYear: drawYear,
    source: '동행복권',
  };
}

/**
 * 데이터 검증
 */
function validateData(data) {
  if (!data.round || data.round < 1) {
    return false;
  }
  if (!Array.isArray(data.numbers) || data.numbers.length !== 6) {
    return false;
  }
  if (!data.numbers.every(n => n >= 1 && n <= 45)) {
    return false;
  }
  if (!data.bonus || data.bonus < 1 || data.bonus > 45) {
    return false;
  }
  return true;
}

/**
 * 배열을 청크로 나누기
 */
function chunk(array, size) {
  const chunks = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
}

/**
 * 현재 데이터에서 최신 회차 가져오기
 */
async function getLatestRound() {
  try {
    const content = await fs.readFile(LOTTO_DATA_PATH, 'utf-8');
    const draws = JSON.parse(content);

    if (draws.length === 0) {
      return 0;
    }

    return Math.max(...draws.map(d => d.round));
  } catch (error) {
    console.error('Error reading current data:', error.message);
    throw error;
  }
}

/**
 * 최신 회차 자동 감지 (API로 확인)
 */
async function detectLatestRound() {
  console.log('🔍 Detecting latest round...');

  // 현재 날짜 기준으로 추정 (매주 토요일 추첨)
  const now = new Date();
  const startDate = new Date('2002-12-07'); // 1회차 추첨일
  const weeksPassed = Math.floor((now - startDate) / (7 * 24 * 60 * 60 * 1000));
  const estimatedRound = weeksPassed + 1;

  // 추정 회차부터 거꾸로 확인
  for (let round = estimatedRound; round > estimatedRound - 10; round--) {
    try {
      await fetchLottoData(round);
      console.log(`✓ Latest round detected: ${round}`);
      return round;
    } catch (error) {
      continue;
    }
  }

  throw new Error('Could not detect latest round');
}

/**
 * 메인 함수
 */
async function main() {
  console.log('🎰 Lotto Draw Data Update Script\n');

  try {
    // 현재 데이터의 최신 회차 확인
    const currentLatestRound = await getLatestRound();
    console.log(`📊 Current latest round in data: ${currentLatestRound}`);

    // 시작/끝 회차 결정
    let startRound, endRound;

    if (process.argv.length >= 4) {
      // CLI 인자로 범위 지정
      startRound = parseInt(process.argv[2], 10);
      endRound = parseInt(process.argv[3], 10);
      console.log(`📌 Using specified range: ${startRound} - ${endRound}`);
    } else {
      // 자동 감지
      startRound = currentLatestRound + 1;
      endRound = await detectLatestRound();
      console.log(`📌 Auto-detected range: ${startRound} - ${endRound}`);
    }

    if (startRound > endRound) {
      console.log('✓ No new data to update. Already up to date!');
      return;
    }

    const rounds = Array.from(
      { length: endRound - startRound + 1 },
      (_, i) => startRound + i
    );

    console.log(`\n🚀 Fetching ${rounds.length} rounds...\n`);

    // 기존 데이터 로드
    const content = await fs.readFile(LOTTO_DATA_PATH, 'utf-8');
    const existingDraws = JSON.parse(content);
    const existingRounds = new Set(existingDraws.map(d => d.round));

    // 백업 생성
    const backupPath = LOTTO_DATA_PATH.replace(
      '.json',
      `.backup.${Date.now()}.json`
    );
    await fs.writeFile(backupPath, content, 'utf-8');
    console.log(`💾 Backup created: ${path.basename(backupPath)}\n`);

    // 청크 단위로 API 호출 (동시성 제한)
    const chunks = chunk(rounds, CONCURRENT_REQUESTS);
    const newDraws = [];
    let successCount = 0;
    let skipCount = 0;
    let errorCount = 0;

    for (const [chunkIndex, roundChunk] of chunks.entries()) {
      const promises = roundChunk.map(async round => {
        // 중복 체크
        if (existingRounds.has(round)) {
          console.log(`  ⏭️  Round ${round}: Already exists, skipping`);
          skipCount++;
          return null;
        }

        try {
          const apiData = await fetchLottoData(round);
          const transformed = transformData(apiData);

          if (!validateData(transformed)) {
            throw new Error('Data validation failed');
          }

          console.log(
            `  ✓ Round ${round}: ${transformed.numbers.join(', ')} + ${transformed.bonus}`
          );
          successCount++;
          return transformed;
        } catch (error) {
          console.log(`  ✗ Round ${round}: ${error.message}`);
          errorCount++;
          return null;
        }
      });

      const results = await Promise.all(promises);
      newDraws.push(...results.filter(Boolean));

      // 다음 청크 전에 딜레이 (서버 부담 최소화)
      if (chunkIndex < chunks.length - 1) {
        await delay(500);
      }
    }

    if (newDraws.length === 0) {
      console.log('\n⚠️  No new data to add.');
      return;
    }

    // 데이터 병합 및 정렬
    const allDraws = [...existingDraws, ...newDraws].sort(
      (a, b) => a.round - b.round
    );

    // 저장
    await fs.writeFile(
      LOTTO_DATA_PATH,
      JSON.stringify(allDraws, null, 2),
      'utf-8'
    );

    console.log('\n✅ Update completed!');
    console.log(`   - Success: ${successCount} rounds`);
    console.log(`   - Skipped: ${skipCount} rounds`);
    console.log(`   - Failed: ${errorCount} rounds`);
    console.log(`   - Total rounds in file: ${allDraws.length}`);
    console.log(`   - Latest round: ${allDraws[allDraws.length - 1].round}`);
  } catch (error) {
    console.error('\n❌ Error:', error.message);
    process.exit(1);
  }
}

main();
