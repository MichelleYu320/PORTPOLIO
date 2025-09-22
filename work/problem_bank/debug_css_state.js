// CSS 상태 디버깅
const { chromium } = require('playwright');

async function debugCssState() {
    const browser = await chromium.launch({ headless: false });
    const page = await browser.newPage();

    // HTML 파일 열기
    await page.goto('file:///Users/yujeonghui/work/problem_bank/03_Design/CBS_문제은행_플랫폼_소개_v4_복구완료.html');
    await page.waitForTimeout(2000);

    console.log('=== 문항 관리 클릭 전 상태 ===');
    await checkElementState(page);

    // 문항 관리 메뉴 클릭
    console.log('\n=== 문항 관리 메뉴 클릭 ===');
    await page.click('a[data-section="problem-management"]');
    await page.waitForTimeout(1000);

    console.log('\n=== 문항 관리 클릭 후 상태 ===');
    await checkElementState(page);

    await page.waitForTimeout(5000);
    await browser.close();
}

async function checkElementState(page) {
    // 문항 검색 영역 상태
    const problemSearch = await page.evaluate(() => {
        const element = document.querySelector('.problem-search');
        if (!element) return { exists: false };

        const computedStyle = window.getComputedStyle(element);
        return {
            exists: true,
            classes: element.className,
            display: computedStyle.display,
            visibility: computedStyle.visibility,
            hasHiddenClass: element.classList.contains('is-hidden'),
            hasVisibleClass: element.classList.contains('is-visible')
        };
    });

    // 문항 테이블 영역 상태
    const problemPool = await page.evaluate(() => {
        const element = document.querySelector('.problem-pool-content');
        if (!element) return { exists: false };

        const computedStyle = window.getComputedStyle(element);
        return {
            exists: true,
            classes: element.className,
            display: computedStyle.display,
            visibility: computedStyle.visibility,
            hasHiddenClass: element.classList.contains('is-hidden'),
            hasVisibleClass: element.classList.contains('is-visible')
        };
    });

    console.log('문항 검색 영역:', problemSearch);
    console.log('문항 테이블 영역:', problemPool);
}

debugCssState().catch(console.error);