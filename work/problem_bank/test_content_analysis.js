const { chromium } = require('playwright');
const path = require('path');

(async () => {
  console.log('🔍 콘텐츠 구조 분석 테스트 시작');

  const browser = await chromium.launch({
    headless: false,
    slowMo: 500
  });

  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 }
  });

  const page = await context.newPage();

  try {
    const htmlPath = path.resolve(__dirname, '03_Design/CBS_문제은행_플랫폼_소개_v4_복구완료.html');
    const htmlUrl = `file://${htmlPath}`;

    await page.goto(htmlUrl);
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);

    // 문항 관리 클릭
    await page.click('text=📚 문항 관리');
    await page.waitForTimeout(1000);

    // 콘텐츠 구조 상세 분석
    const contentAnalysis = await page.evaluate(() => {
      const problemContent = document.querySelector('.problem-pool-content');

      if (!problemContent) {
        return { error: 'problem-pool-content not found' };
      }

      // 강제 표시
      problemContent.style.display = 'block';
      problemContent.style.visibility = 'visible';
      problemContent.style.opacity = '1';
      problemContent.style.height = 'auto';
      problemContent.style.minHeight = '500px';

      return {
        element: {
          innerHTML: problemContent.innerHTML.substring(0, 1000) + (problemContent.innerHTML.length > 1000 ? '...' : ''),
          childElementCount: problemContent.children.length,
          offsetHeight: problemContent.offsetHeight,
          offsetWidth: problemContent.offsetWidth,
          clientHeight: problemContent.clientHeight,
          clientWidth: problemContent.clientWidth,
          scrollHeight: problemContent.scrollHeight,
          style: {
            display: problemContent.style.display,
            visibility: problemContent.style.visibility,
            opacity: problemContent.style.opacity,
            height: problemContent.style.height,
            minHeight: problemContent.style.minHeight,
            background: problemContent.style.background,
            backgroundColor: problemContent.style.backgroundColor
          },
          computedStyle: {
            display: window.getComputedStyle(problemContent).display,
            visibility: window.getComputedStyle(problemContent).visibility,
            opacity: window.getComputedStyle(problemContent).opacity,
            height: window.getComputedStyle(problemContent).height,
            minHeight: window.getComputedStyle(problemContent).minHeight,
            background: window.getComputedStyle(problemContent).background,
            backgroundColor: window.getComputedStyle(problemContent).backgroundColor
          }
        },
        childElements: Array.from(problemContent.children).map(child => ({
          tagName: child.tagName,
          className: child.className,
          innerHTML: child.innerHTML.substring(0, 200) + (child.innerHTML.length > 200 ? '...' : ''),
          style: {
            display: child.style.display,
            visibility: child.style.visibility,
            opacity: child.style.opacity
          },
          computedStyle: {
            display: window.getComputedStyle(child).display,
            visibility: window.getComputedStyle(child).visibility,
            opacity: window.getComputedStyle(child).opacity
          }
        }))
      };
    });

    console.log('📊 콘텐츠 분석 결과:', JSON.stringify(contentAnalysis, null, 2));

    // 스크린샷
    await page.screenshot({
      path: 'screenshots/debug_content_analysis.png',
      fullPage: true
    });

    // 추가로 모든 하위 요소들도 강제로 보이게 만들기
    await page.evaluate(() => {
      const problemContent = document.querySelector('.problem-pool-content');
      if (problemContent) {
        // 모든 하위 요소들 강제 표시
        const allElements = problemContent.querySelectorAll('*');
        allElements.forEach(el => {
          el.style.display = 'block';
          el.style.visibility = 'visible';
          el.style.opacity = '1';
        });

        // 테이블 관련 요소들은 적절한 display 설정
        const tables = problemContent.querySelectorAll('table');
        tables.forEach(table => {
          table.style.display = 'table';
        });

        const tableRows = problemContent.querySelectorAll('tr');
        tableRows.forEach(row => {
          row.style.display = 'table-row';
        });

        const tableCells = problemContent.querySelectorAll('td, th');
        tableCells.forEach(cell => {
          cell.style.display = 'table-cell';
        });

        console.log('모든 하위 요소들 강제 표시 완료');
      }
    });

    await page.waitForTimeout(1000);

    await page.screenshot({
      path: 'screenshots/debug_forced_all_elements.png',
      fullPage: true
    });

    console.log('\n✅ 콘텐츠 분석 완료!');

  } catch (error) {
    console.error('❌ 테스트 실행 중 오류:', error);
  } finally {
    await browser.close();
  }
})();