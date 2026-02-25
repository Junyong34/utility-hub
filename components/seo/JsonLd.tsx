/**
 * JSON-LD 구조화 데이터 렌더링 컴포넌트
 */

interface JsonLdProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
}

/**
 * JSON-LD 스크립트 태그를 렌더링하는 컴포넌트
 * Next.js의 Script 컴포넌트 대신 직접 script 태그 사용
 */
export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/**
 * 여러 JSON-LD 데이터를 한 번에 렌더링
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function JsonLdMultiple({ data }: { data: any[] }) {
  return (
    <>
      {data.map((item, index) => (
        <JsonLd key={`${item['@type']}-${index}`} data={item} />
      ))}
    </>
  );
}
