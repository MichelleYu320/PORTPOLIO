// 정확한 HTML 구조 확인
const { chromium } = require('playwright');

async function detailedStructureCheck() {
    const browser = await chromium.launch({ headless: false });
    const page = await browser.newPage();

    await page.goto('file:///Users/yujeonghui/work/problem_bank/03_Design/CBS_문제은행_플랫폼_소개_v4_복구완료.html');
    await page.waitForTimeout(2000);

    const structureInfo = await page.evaluate(() => {
        const problemSearch = document.querySelector('.problem-search');
        const textbookCreation = document.querySelector('.textbook-creation-content');

        if (!problemSearch) return { error: 'problem-search 없음' };

        // 문항 관리 영역의 실제 HTML 위치 확인
        const problemSearchHTML = problemSearch.outerHTML.substring(0, 200) + '...';

        // 교재 제작 영역과의 관계 확인
        const isInsideTextbook = textbookCreation && textbookCreation.contains(problemSearch);

        // 부모 체인 다시 확인
        const parentChain = [];
        let current = problemSearch;
        while (current.parentElement && parentChain.length < 10) {
            current = current.parentElement;
            parentChain.push({
                tagName: current.tagName,
                className: current.className,
                id: current.id
            });
        }

        // main-content 직속 자식들 확인
        const mainContent = document.querySelector('.main-content');
        const mainChildren = mainContent ? Array.from(mainContent.children).map(child => ({
            tagName: child.tagName,
            className: child.className,
            id: child.id
        })) : [];

        return {
            problemSearchHTML,
            isInsideTextbook,
            parentChain,
            mainChildren,
            textbookExists: !!textbookCreation,
            textbookClassName: textbookCreation ? textbookCreation.className : null
        };
    });

    console.log('구조 정보:', JSON.stringify(structureInfo, null, 2));

    await page.waitForTimeout(5000);
    await browser.close();
}

detailedStructureCheck().catch(console.error);