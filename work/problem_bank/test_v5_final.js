// v5 파일 최종 테스트
const { chromium } = require('playwright');

async function testV5Final() {
    const browser = await chromium.launch({
        headless: false,
        slowMo: 300
    });
    const page = await browser.newPage();
    await page.setViewportSize({ width: 1400, height: 900 });

    await page.goto('file:///Users/yujeonghui/work/problem_bank/03_Design/CBS_문제은행_플랫폼_소개_v5.html');
    await page.waitForTimeout(2000);

    console.log('=== v5 파일 최종 테스트 ===');

    // 초기 상태 스크린샷
    await page.screenshot({ path: '/Users/yujeonghui/work/problem_bank/screenshots/v5_01_initial.png', fullPage: true });

    // 1. 문항 관리 클릭 테스트
    console.log('1. 문항 관리 메뉴 클릭');
    await page.click('a[data-section="problem-management"]');
    await page.waitForTimeout(1500);

    const problemResult = await page.evaluate(() => {
        const problemSection = document.getElementById('problem-management');
        const smartSearch = document.querySelector('#problem-management .smart-search-section');

        return {
            sectionExists: !!problemSection,
            sectionVisible: problemSection ? getComputedStyle(problemSection).display !== 'none' : false,
            smartSearchVisible: smartSearch ? smartSearch.offsetWidth > 0 && smartSearch.offsetHeight > 0 : false,
            sectionDisplay: problemSection ? getComputedStyle(problemSection).display : null
        };
    });

    console.log('문항 관리 결과:', problemResult);
    await page.screenshot({ path: '/Users/yujeonghui/work/problem_bank/screenshots/v5_02_problem.png', fullPage: true });

    // 2. PDF 관리 클릭 테스트
    console.log('2. PDF 관리 메뉴 클릭');
    await page.click('a[data-section="pdf-management"]');
    await page.waitForTimeout(1500);

    const pdfResult = await page.evaluate(() => {
        const pdfSection = document.getElementById('pdf-management');
        const smartSearch = document.querySelector('#pdf-management .smart-search-section');

        return {
            sectionExists: !!pdfSection,
            sectionVisible: pdfSection ? getComputedStyle(pdfSection).display !== 'none' : false,
            smartSearchVisible: smartSearch ? smartSearch.offsetWidth > 0 && smartSearch.offsetHeight > 0 : false,
            sectionDisplay: pdfSection ? getComputedStyle(pdfSection).display : null
        };
    });

    console.log('PDF 관리 결과:', pdfResult);
    await page.screenshot({ path: '/Users/yujeonghui/work/problem_bank/screenshots/v5_03_pdf.png', fullPage: true });

    // 3. 대시보드로 돌아가기
    console.log('3. 대시보드로 돌아가기');
    await page.click('a[data-section="dashboard"]');
    await page.waitForTimeout(1500);

    const dashboardResult = await page.evaluate(() => {
        const dashboardSection = document.getElementById('dashboard');
        return {
            sectionExists: !!dashboardSection,
            sectionVisible: dashboardSection ? getComputedStyle(dashboardSection).display !== 'none' : false,
            sectionDisplay: dashboardSection ? getComputedStyle(dashboardSection).display : null
        };
    });

    console.log('대시보드 결과:', dashboardResult);
    await page.screenshot({ path: '/Users/yujeonghui/work/problem_bank/screenshots/v5_04_dashboard.png', fullPage: true });

    // 최종 검증
    console.log('\n=== 최종 검증 결과 ===');
    const problemSuccess = problemResult.sectionVisible && problemResult.smartSearchVisible;
    const pdfSuccess = pdfResult.sectionVisible && pdfResult.smartSearchVisible;
    const dashboardSuccess = dashboardResult.sectionVisible;

    if (problemSuccess) {
        console.log('✅ 문항 관리: 성공!');
    } else {
        console.log('❌ 문항 관리: 실패');
    }

    if (pdfSuccess) {
        console.log('✅ PDF 관리: 성공!');
    } else {
        console.log('❌ PDF 관리: 실패');
    }

    if (dashboardSuccess) {
        console.log('✅ 대시보드 전환: 성공!');
    } else {
        console.log('❌ 대시보드 전환: 실패');
    }

    const allSuccess = problemSuccess && pdfSuccess && dashboardSuccess;

    console.log('\n' + '='.repeat(50));
    if (allSuccess) {
        console.log('🎉 완전 성공! v5 파일이 정상적으로 작동합니다!');
        console.log('프로토타입 내용이 성공적으로 복사되었습니다.');
    } else {
        console.log('❌ 일부 문제가 있습니다...');
    }
    console.log('='.repeat(50));

    console.log('\n브라우저를 30초간 열어둡니다. 직접 확인해보세요!');
    await page.waitForTimeout(30000);

    await browser.close();
}

testV5Final().catch(console.error);