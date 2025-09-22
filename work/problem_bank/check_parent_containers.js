// 부모 컨테이너 확인
const { chromium } = require('playwright');

async function checkParentContainers() {
    const browser = await chromium.launch({ headless: false });
    const page = await browser.newPage();

    await page.goto('file:///Users/yujeonghui/work/problem_bank/03_Design/CBS_문제은행_플랫폼_소개_v4_복구완료.html');
    await page.waitForTimeout(2000);

    // 문항 관리 클릭
    await page.click('a[data-section="problem-management"]');
    await page.waitForTimeout(1000);

    const parentAnalysis = await page.evaluate(() => {
        const problemSearch = document.querySelector('.problem-search');

        if (!problemSearch) return { error: '요소 없음' };

        const parents = [];
        let current = problemSearch;

        while (current.parentElement) {
            current = current.parentElement;
            const style = window.getComputedStyle(current);
            parents.push({
                tagName: current.tagName,
                className: current.className,
                id: current.id,
                display: style.display,
                visibility: style.visibility,
                overflow: style.overflow,
                width: style.width,
                height: style.height,
                rect: current.getBoundingClientRect()
            });
        }

        return {
            element: {
                className: problemSearch.className,
                display: window.getComputedStyle(problemSearch).display,
                visibility: window.getComputedStyle(problemSearch).visibility,
                rect: problemSearch.getBoundingClientRect()
            },
            parents: parents
        };
    });

    console.log('부모 컨테이너 분석:', JSON.stringify(parentAnalysis, null, 2));

    await page.waitForTimeout(5000);
    await browser.close();
}

checkParentContainers().catch(console.error);