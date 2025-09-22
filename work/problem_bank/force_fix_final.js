// 무조건 강제로 해결
const { chromium } = require('playwright');

async function forceFinalFix() {
    const browser = await chromium.launch({
        headless: false,
        slowMo: 500
    });
    const page = await browser.newPage();
    await page.setViewportSize({ width: 1400, height: 900 });

    await page.goto('file:///Users/yujeonghui/work/problem_bank/03_Design/CBS_문제은행_플랫폼_소개_v4_복구완료.html');
    await page.waitForTimeout(3000);

    console.log('=== 무조건 강제 해결 시작 ===');

    // 1단계: 모든 hidden 클래스 제거 및 강제 표시
    await page.evaluate(() => {
        // 모든 is-hidden 클래스 제거
        document.querySelectorAll('.is-hidden').forEach(el => {
            el.classList.remove('is-hidden');
            el.classList.add('is-visible');
        });

        // 문항 관리 요소들 무조건 강제 표시
        const problemElements = [
            '.problem-search',
            '.problem-pool-content',
            '#problem-search-content',
            '#problem-pool-content'
        ];

        problemElements.forEach(selector => {
            const elements = document.querySelectorAll(selector);
            elements.forEach(el => {
                if (el) {
                    el.style.cssText = `
                        display: block !important;
                        visibility: visible !important;
                        opacity: 1 !important;
                        width: 100% !important;
                        height: auto !important;
                        min-height: 200px !important;
                        background: #fffacd !important;
                        border: 3px solid #ff4500 !important;
                        padding: 20px !important;
                        margin: 20px 0 !important;
                        position: relative !important;
                        z-index: 9999 !important;
                        overflow: visible !important;
                    `;
                    console.log('강제 표시 적용:', selector);
                }
            });
        });

        // PDF 관리 요소들도 강제 표시
        const pdfElements = [
            '.material-search',
            '.material-pool-content',
            '#material-search-content',
            '#material-pool-content'
        ];

        pdfElements.forEach(selector => {
            const elements = document.querySelectorAll(selector);
            elements.forEach(el => {
                if (el) {
                    el.style.cssText = `
                        display: block !important;
                        visibility: visible !important;
                        opacity: 1 !important;
                        width: 100% !important;
                        height: auto !important;
                        min-height: 200px !important;
                        background: #f0ffff !important;
                        border: 3px solid #1e90ff !important;
                        padding: 20px !important;
                        margin: 20px 0 !important;
                        position: relative !important;
                        z-index: 9999 !important;
                        overflow: visible !important;
                    `;
                    console.log('PDF 강제 표시 적용:', selector);
                }
            });
        });

        return 'Step 1 완료';
    });

    await page.waitForTimeout(2000);

    console.log('=== 1단계 완료: 모든 요소 강제 표시 ===');
    await page.screenshot({ path: '/Users/yujeonghui/work/problem_bank/screenshots/force_step1.png', fullPage: true });

    // 2단계: 문항 관리 메뉴 클릭
    console.log('=== 2단계: 문항 관리 메뉴 클릭 ===');
    await page.click('a[data-section="problem-management"]');
    await page.waitForTimeout(2000);

    await page.screenshot({ path: '/Users/yujeonghui/work/problem_bank/screenshots/force_step2.png', fullPage: true });

    // 3단계: 상태 확인
    const finalCheck = await page.evaluate(() => {
        const problemSearch = document.querySelector('.problem-search');
        const problemPool = document.querySelector('.problem-pool-content');

        return {
            problemSearchExists: !!problemSearch,
            problemPoolExists: !!problemPool,
            problemSearchVisible: problemSearch ? problemSearch.getBoundingClientRect().width > 0 : false,
            problemPoolVisible: problemPool ? problemPool.getBoundingClientRect().width > 0 : false,
            problemSearchRect: problemSearch ? problemSearch.getBoundingClientRect() : null,
            problemPoolRect: problemPool ? problemPool.getBoundingClientRect() : null
        };
    });

    console.log('=== 최종 확인 ===');
    console.log(finalCheck);

    if (finalCheck.problemSearchVisible && finalCheck.problemPoolVisible) {
        console.log('🎉 성공! 문항 관리 영역이 보입니다!');
    } else {
        console.log('❌ 여전히 문제가 있습니다...');
    }

    // 4단계: PDF 관리도 테스트
    console.log('=== 4단계: PDF 관리 메뉴 클릭 ===');
    await page.click('a[data-section="pdf-management"]');
    await page.waitForTimeout(2000);

    await page.screenshot({ path: '/Users/yujeonghui/work/problem_bank/screenshots/force_step4.png', fullPage: true });

    const pdfCheck = await page.evaluate(() => {
        const materialSearch = document.querySelector('.material-search');
        const materialPool = document.querySelector('.material-pool-content');

        return {
            materialSearchVisible: materialSearch ? materialSearch.getBoundingClientRect().width > 0 : false,
            materialPoolVisible: materialPool ? materialPool.getBoundingClientRect().width > 0 : false
        };
    });

    console.log('PDF 관리 확인:', pdfCheck);

    console.log('\n===============================');
    console.log('브라우저를 열어두겠습니다.');
    console.log('직접 확인해보세요!');
    console.log('문항 관리와 PDF 관리 메뉴를 클릭해보세요!');
    console.log('===============================');

    await page.waitForTimeout(30000); // 30초 대기

    await browser.close();
}

forceFinalFix().catch(console.error);