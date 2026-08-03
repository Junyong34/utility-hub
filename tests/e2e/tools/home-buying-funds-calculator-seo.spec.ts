import { test, expect } from '@playwright/test';

const PAGE_PATH = '/tools/home-buying-funds-calculator';

test.describe('주택 구입 비용 계산기 SSR SEO', () => {
  test('renders_faq_and_howto_content_in_initial_html_when_fetched_without_js', async ({
    request,
  }) => {
    const response = await request.get(PAGE_PATH);
    expect(response.ok()).toBeTruthy();

    const html = await response.text();
    // JS 미실행 상태의 원본 HTML에 가시 콘텐츠가 있어야 한다
    expect(html).toContain('자주 묻는 질문');
    expect(html).toContain('아파트 매매 부대비용에는 무엇이 포함되나요?');
    expect(html).toContain('사용 방법');
    expect(html).toContain('시가표준액은 무엇인가요?');
  });

  test('shows_tax_basis_date_and_date_modified_in_initial_html', async ({
    request,
  }) => {
    const html = await (await request.get(PAGE_PATH)).text();
    expect(html).toContain('세법·요율 기준');
    expect(html).toContain('"dateModified"');
  });
});
