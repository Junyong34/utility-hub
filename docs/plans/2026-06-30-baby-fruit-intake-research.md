# Baby Fruit Intake Research Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create a source-backed research markdown document for a future Korean blog post about safe fruit intake for babies aged 6~24 months.

**Architecture:** This is a documentation-only workflow. The plan creates one research file under `docs/research/parenting/`, using official health and emergency-care sources as the source of truth, then checks the document against the design spec.

**Tech Stack:** Markdown, web research, official/public health sources, repository documentation conventions.

---

## File Structure

- Create: `docs/research/parenting/2026-06-30-baby-fruit-intake-6-24m.md`
  - Holds the research summary, monthly guidance, choking-risk fruit list, emergency-response summary, practical tips, SEO ideas, and source links.
- Read: `docs/specs/2026-06-30-baby-fruit-intake-research-design.md`
  - Defines the approved scope and completion criteria.

## Task 1: Collect Official And Professional Sources

**Files:**

- Read: `docs/specs/2026-06-30-baby-fruit-intake-research-design.md`

- [ ] **Step 1: Re-read the approved design spec**

Run:

```bash
sed -n '1,220p' docs/specs/2026-06-30-baby-fruit-intake-research-design.md
```

Expected: The spec includes monthly fruit guidance, choking-risk fruit list, emergency response, practical tips, SEO, and source requirements.

- [ ] **Step 2: Research baby fruit intake and food safety sources**

Collect current official or professional sources for:

- Complementary foods around 6 months
- Fruit as part of a balanced diet
- Avoiding fruit juice for babies under 12 months
- Added sugar and sweet foods caution
- Allergenic food introduction principles
- Choking hazards and safe food shapes

Expected: At least 5 trustworthy source links from government, pediatric, or nonprofit health organizations.

- [ ] **Step 3: Research choking emergency response sources**

Collect official emergency-care sources for:

- Choking signs
- When to call emergency services
- Infant choking response under 1 year
- Child choking response over 1 year
- CPR or first-aid training disclaimer

Expected: At least 2 trustworthy emergency-care source links.

## Task 2: Write The Research Markdown

**Files:**

- Create: `docs/research/parenting/2026-06-30-baby-fruit-intake-6-24m.md`

- [ ] **Step 1: Create the parenting research directory if needed**

Run:

```bash
mkdir -p docs/research/parenting
```

Expected: `docs/research/parenting/` exists.

- [ ] **Step 2: Draft the research document**

Create `docs/research/parenting/2026-06-30-baby-fruit-intake-6-24m.md` with these sections:

```markdown
# 아기 6~24개월 과일 섭취 리서치 자료

## 사용 목적

## 핵심 요약

## 공식·전문 출처에서 확인한 기준

## 월령별 과일 섭취 포인트

## 과일별 제공 형태와 실전 팁

## 목에 걸리기 쉬운 과일과 위험한 형태

## 목에 걸렸을 때 응급대처 요약

## 주스·말린 과일·당류 주의사항

## 블로그에 꼭 넣을 안전 문구

## SEO 검색 의도와 키워드

## 제목 후보

## FAQ 후보

## 내부 링크 아이디어

## 출처
```

Expected: The document is written in Korean and every medical or emergency-care claim is tied to a source or marked as conservative editorial guidance.

- [ ] **Step 3: Include the choking-risk fruit list**

The choking-risk section must include at least these examples and safe-shape guidance:

- Whole grapes
- Whole cherries
- Hard raw apple chunks
- Hard pear chunks
- Large melon chunks
- Round berries served whole when size and texture make choking plausible
- Dried fruit pieces that are sticky, chewy, or hard to break down
- Frozen fruit pieces

Expected: The section distinguishes “fruit type” from “dangerous serving shape,” so the advice does not imply the fruit itself is always forbidden.

- [ ] **Step 4: Include the emergency response section**

The emergency response section must:

- Tell readers to call 119 when breathing is difficult, the baby cannot cry/cough/sound, lips or face turn bluish, or the child becomes limp/unresponsive.
- Separate under-1-year infant response from over-1-year child response.
- Say the summary does not replace first-aid training.
- Link to official emergency-care sources.

Expected: The text is careful, source-backed, and avoids pretending to be hands-on medical training.

## Task 3: Review And Commit The Research Document

**Files:**

- Read: `docs/specs/2026-06-30-baby-fruit-intake-research-design.md`
- Modify: `docs/research/parenting/2026-06-30-baby-fruit-intake-6-24m.md`

- [ ] **Step 1: Search for placeholders and weak claims**

Run:

```bash
rg -n "미정|나중에|아마|대략" docs/research/parenting/2026-06-30-baby-fruit-intake-6-24m.md
```

Expected: No unresolved placeholders. Any uncertainty that remains is intentionally worded and source-related.

- [ ] **Step 2: Check required sections**

Run:

```bash
rg -n "^## " docs/research/parenting/2026-06-30-baby-fruit-intake-6-24m.md
```

Expected: The output includes monthly guidance, choking-risk fruit list, emergency response, SEO, FAQ, and sources.

- [ ] **Step 3: Review changed files**

Run:

```bash
git diff -- docs/research/parenting/2026-06-30-baby-fruit-intake-6-24m.md
```

Expected: The diff only adds the intended research document content.

- [ ] **Step 4: Commit**

Run:

```bash
git add docs/research/parenting/2026-06-30-baby-fruit-intake-6-24m.md
git commit -m "docs: add baby fruit intake research"
```

Expected: A commit is created with only the research document staged.
