// 브라우저에서 직접 HTML 구조 수정
const { chromium } = require('playwright');

async function fixStructureDirectly() {
    const browser = await chromium.launch({ headless: false });
    const page = await browser.newPage();
    await page.setViewportSize({ width: 1400, height: 900 });

    await page.goto('file:///Users/yujeonghui/work/problem_bank/03_Design/CBS_문제은행_플랫폼_소개_v4_복구완료.html');
    await page.waitForTimeout(3000);

    console.log('=== HTML 구조 직접 수정 ===');

    // 구조 수정: 문항 관리와 PDF 관리 영역을 main-content의 직속 자식으로 이동
    const result = await page.evaluate(() => {
        const mainContent = document.querySelector('.main-content');
        const problemSearch = document.querySelector('.problem-search');
        const problemPool = document.querySelector('.problem-pool-content');
        const materialSearch = document.querySelector('.material-search');
        const materialPool = document.querySelector('.material-pool-content');

        if (!mainContent) return { error: 'main-content 없음' };

        let moved = 0;

        // 문항 관리 영역들을 main-content로 이동
        if (problemSearch) {
            mainContent.appendChild(problemSearch);
            moved++;
            console.log('문항 검색 영역 이동됨');
        }

        if (problemPool) {
            mainContent.appendChild(problemPool);
            moved++;
            console.log('문항 테이블 영역 이동됨');
        }

        // PDF 관리 영역들을 main-content로 이동
        if (materialSearch) {
            mainContent.appendChild(materialSearch);
            moved++;
            console.log('PDF 검색 영역 이동됨');
        }

        if (materialPool) {
            mainContent.appendChild(materialPool);
            moved++;
            console.log('PDF 테이블 영역 이동됨');
        }

        return { moved, success: true };
    });

    console.log('구조 수정 결과:', result);

    await page.waitForTimeout(2000);

    console.log('=== 문항 관리 메뉴 클릭 테스트 ===');
    await page.click('a[data-section="problem-management"]');
    await page.waitForTimeout(2000);

    // 표시 상태 확인
    const visibility = await page.evaluate(() => {
        const problemSearch = document.querySelector('.problem-search');
        const problemPool = document.querySelector('.problem-pool-content');

        return {
            problemSearchVisible: problemSearch ? problemSearch.getBoundingClientRect().width > 0 : false,
            problemPoolVisible: problemPool ? problemPool.getBoundingClientRect().width > 0 : false,
            problemSearchClasses: problemSearch ? problemSearch.className : null,
            problemPoolClasses: problemPool ? problemPool.className : null
        };
    });

    console.log('수정 후 표시 상태:', visibility);

    // 스크린샷
    await page.screenshot({ path: '/Users/yujeonghui/work/problem_bank/screenshots/structure_fixed.png', fullPage: true });

    console.log('\n=== PDF 관리 메뉴 클릭 테스트 ===');
    await page.click('a[data-section="pdf-management"]');
    await page.waitForTimeout(2000);

    const pdfVisibility = await page.evaluate(() => {
        const materialSearch = document.querySelector('.material-search');
        const materialPool = document.querySelector('.material-pool-content');

        return {
            materialSearchVisible: materialSearch ? materialSearch.getBoundingClientRect().width > 0 : false,
            materialPoolVisible: materialPool ? materialPool.getBoundingClientRect().width > 0 : false
        };
    });

    console.log('PDF 관리 표시 상태:', pdfVisibility);

    await page.screenshot({ path: '/Users/yujeonghui/work/problem_bank/screenshots/pdf_fixed.png', fullPage: true });

    console.log('\n브라우저를 열어둡니다. 결과를 확인해보세요!');
    await page.waitForTimeout(15000);

    await browser.close();
}

fixStructureDirectly().catch(console.error);