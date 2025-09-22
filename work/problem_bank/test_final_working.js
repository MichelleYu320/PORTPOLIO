// 새로 만든 FINAL_WORKING.html 파일 테스트
const { chromium } = require('playwright');

async function testFinalWorking() {
    const browser = await chromium.launch({
        headless: false,
        slowMo: 300
    });
    const page = await browser.newPage();
    await page.setViewportSize({ width: 1400, height: 900 });

    await page.goto('file:///Users/yujeonghui/work/problem_bank/03_Design/CBS_문제은행_플랫폼_소개_FINAL_WORKING.html');
    await page.waitForTimeout(2000);

    console.log('=== 새로 만든 파일 테스트 ===');

    // 초기 상태 스크린샷
    await page.screenshot({ path: '/Users/yujeonghui/work/problem_bank/screenshots/final_working_01_initial.png', fullPage: true });

    // 문항 관리 클릭
    console.log('1. 문항 관리 메뉴 클릭');
    await page.click('a[data-section="problem-management"]');
    await page.waitForTimeout(1500);

    const problemResult = await page.evaluate(() => {
        const problemSection = document.getElementById('problem-management');
        const searchSection = document.querySelector('#problem-management .smart-search-section');
        const poolSection = document.querySelector('#problem-management .problem-pool-content');

        return {
            sectionExists: !!problemSection,
            sectionActive: problemSection ? problemSection.classList.contains('active') : false,
            searchVisible: searchSection ? searchSection.offsetWidth > 0 : false,
            poolVisible: poolSection ? poolSection.offsetWidth > 0 : false,
            sectionRect: problemSection ? problemSection.getBoundingClientRect() : null
        };
    });

    console.log('문항 관리 결과:', problemResult);
    await page.screenshot({ path: '/Users/yujeonghui/work/problem_bank/screenshots/final_working_02_problem.png', fullPage: true });

    // PDF 관리 클릭
    console.log('2. PDF 관리 메뉴 클릭');
    await page.click('a[data-section="pdf-management"]');
    await page.waitForTimeout(1500);

    const pdfResult = await page.evaluate(() => {
        const pdfSection = document.getElementById('pdf-management');
        const searchSection = document.querySelector('#pdf-management .smart-search-section');
        const poolSection = document.querySelector('#pdf-management .material-pool-content');

        return {
            sectionExists: !!pdfSection,
            sectionActive: pdfSection ? pdfSection.classList.contains('active') : false,
            searchVisible: searchSection ? searchSection.offsetWidth > 0 : false,
            poolVisible: poolSection ? poolSection.offsetWidth > 0 : false,
            sectionRect: pdfSection ? pdfSection.getBoundingClientRect() : null
        };
    });

    console.log('PDF 관리 결과:', pdfResult);
    await page.screenshot({ path: '/Users/yujeonghui/work/problem_bank/screenshots/final_working_03_pdf.png', fullPage: true });

    // 다시 대시보드로 돌아가기
    console.log('3. 대시보드로 돌아가기');
    await page.click('a[data-section="dashboard"]');
    await page.waitForTimeout(1500);

    const dashboardResult = await page.evaluate(() => {
        const dashboardSection = document.getElementById('dashboard');
        return {
            sectionExists: !!dashboardSection,
            sectionActive: dashboardSection ? dashboardSection.classList.contains('active') : false
        };
    });

    console.log('대시보드 결과:', dashboardResult);
    await page.screenshot({ path: '/Users/yujeonghui/work/problem_bank/screenshots/final_working_04_dashboard.png', fullPage: true });

    // 최종 검증
    console.log('\n=== 최종 검증 결과 ===');
    if (problemResult.sectionActive && problemResult.searchVisible && problemResult.poolVisible) {
        console.log('✅ 문항 관리: 성공!');
    } else {
        console.log('❌ 문항 관리: 실패');
    }

    if (pdfResult.sectionActive && pdfResult.searchVisible && pdfResult.poolVisible) {
        console.log('✅ PDF 관리: 성공!');
    } else {
        console.log('❌ PDF 관리: 실패');
    }

    if (dashboardResult.sectionActive) {
        console.log('✅ 대시보드 전환: 성공!');
    } else {
        console.log('❌ 대시보드 전환: 실패');
    }

    // 전체 성공 여부
    const allSuccess = problemResult.sectionActive && problemResult.searchVisible &&
                      pdfResult.sectionActive && pdfResult.searchVisible &&
                      dashboardResult.sectionActive;

    console.log('\n' + '='.repeat(50));
    if (allSuccess) {
        console.log('🎉 완전 성공! 모든 메뉴가 정상적으로 작동합니다!');
        console.log('이제 이 파일을 사용하시면 됩니다.');
    } else {
        console.log('❌ 아직 문제가 있습니다...');
    }
    console.log('='.repeat(50));

    console.log('\n브라우저를 30초간 열어둡니다. 직접 확인해보세요!');
    await page.waitForTimeout(30000);

    await browser.close();
}

testFinalWorking().catch(console.error);