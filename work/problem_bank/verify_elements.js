// 요소 존재 확인
const { chromium } = require('playwright');

async function verifyElements() {
    const browser = await chromium.launch({ headless: false });
    const page = await browser.newPage();

    await page.goto('file:///Users/yujeonghui/work/problem_bank/03_Design/CBS_문제은행_플랫폼_소개_v4_복구완료.html');
    await page.waitForTimeout(2000);

    console.log('=== DOM 요소 확인 ===');

    // 요소들의 존재 여부 확인
    const elements = await page.evaluate(() => {
        return {
            problemSearch: !!document.querySelector('.problem-search'),
            problemPool: !!document.querySelector('.problem-pool-content'),
            materialSearch: !!document.querySelector('.material-search'),
            materialPool: !!document.querySelector('.material-pool-content'),
            problemSearchById: !!document.getElementById('problem-search-content'),
            problemPoolById: !!document.getElementById('problem-pool-content'),
            materialSearchById: !!document.getElementById('material-search-content'),
            materialPoolById: !!document.getElementById('material-pool-content')
        };
    });

    console.log('요소 존재 확인:', elements);

    // 문항 관리 메뉴 클릭
    console.log('\n=== 문항 관리 메뉴 클릭 후 확인 ===');
    await page.click('a[data-section="problem-management"]');
    await page.waitForTimeout(1000);

    // 클릭 후 요소 확인
    const afterClick = await page.evaluate(() => {
        const problemSearch = document.querySelector('.problem-search');
        const problemPool = document.querySelector('.problem-pool-content');

        return {
            problemSearchExists: !!problemSearch,
            problemPoolExists: !!problemPool,
            problemSearchVisible: problemSearch ? window.getComputedStyle(problemSearch).display !== 'none' : false,
            problemPoolVisible: problemPool ? window.getComputedStyle(problemPool).display !== 'none' : false,
            problemSearchClasses: problemSearch ? problemSearch.className : 'null',
            problemPoolClasses: problemPool ? problemPool.className : 'null'
        };
    });

    console.log('클릭 후 상태:', afterClick);

    // 스크린샷 저장
    await page.screenshot({ path: '/Users/yujeonghui/work/problem_bank/screenshots/final_verification.png' });

    await page.waitForTimeout(3000);
    await browser.close();
}

verifyElements().catch(console.error);