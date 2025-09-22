// 메뉴 클릭 테스트 스크립트
const { chromium } = require('playwright');

async function testMenuClicks() {
    const browser = await chromium.launch({ headless: false });
    const page = await browser.newPage();

    // HTML 파일 열기
    await page.goto('file:///Users/yujeonghui/work/problem_bank/03_Design/CBS_문제은행_플랫폼_소개_v4_복구완료.html');

    // 페이지 로드 대기
    await page.waitForTimeout(2000);

    console.log('=== 초기 상태 확인 ===');

    // 초기 대시보드 상태 확인
    const dashboardVisible = await page.isVisible('.dashboard-content');
    console.log('대시보드 표시:', dashboardVisible);

    // 문항 관리 콘텐츠 초기 상태
    const problemSearchVisible = await page.isVisible('.problem-search');
    const problemPoolVisible = await page.isVisible('.problem-pool-content');
    console.log('문항 검색 영역 표시:', problemSearchVisible);
    console.log('문항 테이블 영역 표시:', problemPoolVisible);

    // 스크린샷 찍기
    await page.screenshot({ path: '/Users/yujeonghui/work/problem_bank/screenshots/test_01_initial.png' });

    console.log('\n=== 문항 관리 메뉴 클릭 ===');

    // 문항 관리 메뉴 클릭
    const problemMenu = await page.locator('a[data-section="problem-management"]');
    await problemMenu.click();

    // 클릭 후 대기
    await page.waitForTimeout(1000);

    // 콘솔 로그 확인
    const logs = [];
    page.on('console', msg => {
        logs.push(msg.text());
        console.log('콘솔:', msg.text());
    });

    // 클릭 후 상태 확인
    const problemSearchAfter = await page.isVisible('.problem-search');
    const problemPoolAfter = await page.isVisible('.problem-pool-content');
    const dashboardAfter = await page.isVisible('.dashboard-content');

    console.log('문항 검색 영역 표시:', problemSearchAfter);
    console.log('문항 테이블 영역 표시:', problemPoolAfter);
    console.log('대시보드 숨김:', !dashboardAfter);

    // 스크린샷 찍기
    await page.screenshot({ path: '/Users/yujeonghui/work/problem_bank/screenshots/test_02_problem_clicked.png' });

    console.log('\n=== PDF 자료 관리 메뉴 클릭 ===');

    // PDF 자료 관리 메뉴 클릭
    const pdfMenu = await page.locator('a[data-section="pdf-management"]');
    await pdfMenu.click();

    await page.waitForTimeout(1000);

    // 클릭 후 상태 확인
    const materialSearchAfter = await page.isVisible('.material-search');
    const materialPoolAfter = await page.isVisible('.material-pool-content');

    console.log('PDF 검색 영역 표시:', materialSearchAfter);
    console.log('PDF 테이블 영역 표시:', materialPoolAfter);

    // 스크린샷 찍기
    await page.screenshot({ path: '/Users/yujeonghui/work/problem_bank/screenshots/test_03_pdf_clicked.png' });

    console.log('\n=== 온라인 시험지 관리 메뉴 클릭 ===');

    // 온라인 시험지 관리 메뉴 클릭
    const examMenu = await page.locator('a[data-section="exam-management"]');
    await examMenu.click();

    await page.waitForTimeout(1000);

    // 클릭 후 상태 확인
    const assessmentAfter = await page.isVisible('.assessment-content');
    console.log('시험지 관리 영역 표시:', assessmentAfter);

    // 스크린샷 찍기
    await page.screenshot({ path: '/Users/yujeonghui/work/problem_bank/screenshots/test_04_exam_clicked.png' });

    console.log('\n=== 교재 제작 관리 메뉴 클릭 ===');

    // 교재 제작 관리 메뉴 클릭
    const textbookMenu = await page.locator('a[data-section="textbook-management"]');
    await textbookMenu.click();

    await page.waitForTimeout(1000);

    // 클릭 후 상태 확인
    const textbookAfter = await page.isVisible('.textbook-creation-content');
    console.log('교재 제작 영역 표시:', textbookAfter);

    // 스크린샷 찍기
    await page.screenshot({ path: '/Users/yujeonghui/work/problem_bank/screenshots/test_05_textbook_clicked.png' });

    // 브라우저 유지 (문제 확인을 위해)
    console.log('\n브라우저를 열어둡니다. 수동으로 확인해주세요.');
    await page.waitForTimeout(10000);

    await browser.close();
}

testMenuClicks().catch(console.error);