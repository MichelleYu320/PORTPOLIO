const { chromium } = require('playwright');
const path = require('path');

async function debugCSSVisibility() {
    console.log('=== CSS 가시성 디버깅 시작 ===\n');

    const browser = await chromium.launch({
        headless: false,
        slowMo: 1000
    });

    const context = await browser.newContext({
        viewport: { width: 1920, height: 1080 }
    });

    const page = await context.newPage();

    try {
        // 페이지 로드
        const filePath = `file://${path.resolve('/Users/yujeonghui/work/problem_bank/03_Design/CBS_문제은행_플랫폼_소개_v4_복구완료.html')}`;
        await page.goto(filePath);
        await page.waitForLoadState('networkidle');
        await page.waitForTimeout(2000);

        // 1. 초기 상태에서 모든 콘텐츠 요소 확인
        console.log('1. 초기 상태 - 모든 콘텐츠 요소 상태 확인');
        const initialState = await page.evaluate(() => {
            const elements = {
                dashboard: document.querySelector('#dashboard-content'),
                problemPool: document.querySelector('.problem-pool-content'),
                materialPool: document.querySelector('.material-pool-content'),
                problemSearch: document.querySelector('.problem-search-content'),
                materialSearch: document.querySelector('.material-search-content')
            };

            const results = {};
            Object.keys(elements).forEach(key => {
                const el = elements[key];
                if (el) {
                    const computed = window.getComputedStyle(el);
                    results[key] = {
                        exists: true,
                        display: computed.display,
                        visibility: computed.visibility,
                        opacity: computed.opacity,
                        height: computed.height,
                        width: computed.width,
                        position: computed.position,
                        zIndex: computed.zIndex,
                        overflow: computed.overflow,
                        transform: computed.transform,
                        offsetHeight: el.offsetHeight,
                        offsetWidth: el.offsetWidth,
                        clientHeight: el.clientHeight,
                        clientWidth: el.clientWidth,
                        scrollHeight: el.scrollHeight,
                        scrollWidth: el.scrollWidth,
                        className: el.className,
                        id: el.id,
                        hasChildren: el.children.length > 0,
                        childrenCount: el.children.length
                    };
                } else {
                    results[key] = { exists: false };
                }
            });
            return results;
        });

        console.log('초기 상태 요소들:', JSON.stringify(initialState, null, 2));

        // 2. 문항 관리 클릭 후 상태 확인
        console.log('\n2. 문항 관리 클릭 후 상태 확인');
        const problemMenu = await page.locator('text=📚 문항 관리').first();
        await problemMenu.click();
        await page.waitForTimeout(2000);

        const afterProblemClick = await page.evaluate(() => {
            const problemPool = document.querySelector('.problem-pool-content');
            if (problemPool) {
                const computed = window.getComputedStyle(problemPool);
                const rect = problemPool.getBoundingClientRect();
                return {
                    exists: true,
                    computed: {
                        display: computed.display,
                        visibility: computed.visibility,
                        opacity: computed.opacity,
                        height: computed.height,
                        width: computed.width,
                        backgroundColor: computed.backgroundColor,
                        border: computed.border,
                        padding: computed.padding,
                        margin: computed.margin,
                        position: computed.position,
                        top: computed.top,
                        left: computed.left,
                        right: computed.right,
                        bottom: computed.bottom,
                        zIndex: computed.zIndex
                    },
                    rect: {
                        x: rect.x,
                        y: rect.y,
                        width: rect.width,
                        height: rect.height,
                        top: rect.top,
                        right: rect.right,
                        bottom: rect.bottom,
                        left: rect.left
                    },
                    dimensions: {
                        offsetHeight: problemPool.offsetHeight,
                        offsetWidth: problemPool.offsetWidth,
                        clientHeight: problemPool.clientHeight,
                        clientWidth: problemPool.clientWidth,
                        scrollHeight: problemPool.scrollHeight,
                        scrollWidth: problemPool.scrollWidth
                    },
                    content: {
                        innerHTML: problemPool.innerHTML.substring(0, 1000) + '...',
                        textContent: problemPool.textContent?.substring(0, 500) + '...',
                        childrenCount: problemPool.children.length
                    }
                };
            }
            return { exists: false };
        });

        console.log('문항 관리 클릭 후 .problem-pool-content 상태:');
        console.log(JSON.stringify(afterProblemClick, null, 2));

        // 스크린샷으로 실제 화면 확인
        await page.screenshot({
            path: '/Users/yujeonghui/work/problem_bank/screenshots/debug_problem_detailed.png',
            fullPage: true
        });

        // 3. PDF 자료 관리 클릭 후 상태 확인
        console.log('\n3. PDF 자료 관리 클릭 후 상태 확인');
        const pdfMenu = await page.locator('text=📁 PDF 자료 관리').first();
        await pdfMenu.click();
        await page.waitForTimeout(2000);

        const afterPDFClick = await page.evaluate(() => {
            const materialPool = document.querySelector('.material-pool-content');
            if (materialPool) {
                const computed = window.getComputedStyle(materialPool);
                const rect = materialPool.getBoundingClientRect();
                return {
                    exists: true,
                    computed: {
                        display: computed.display,
                        visibility: computed.visibility,
                        opacity: computed.opacity,
                        height: computed.height,
                        width: computed.width,
                        backgroundColor: computed.backgroundColor,
                        border: computed.border,
                        padding: computed.padding,
                        margin: computed.margin,
                        position: computed.position,
                        top: computed.top,
                        left: computed.left,
                        right: computed.right,
                        bottom: computed.bottom,
                        zIndex: computed.zIndex
                    },
                    rect: {
                        x: rect.x,
                        y: rect.y,
                        width: rect.width,
                        height: rect.height,
                        top: rect.top,
                        right: rect.right,
                        bottom: rect.bottom,
                        left: rect.left
                    },
                    dimensions: {
                        offsetHeight: materialPool.offsetHeight,
                        offsetWidth: materialPool.offsetWidth,
                        clientHeight: materialPool.clientHeight,
                        clientWidth: materialPool.clientWidth,
                        scrollHeight: materialPool.scrollHeight,
                        scrollWidth: materialPool.scrollWidth
                    },
                    content: {
                        innerHTML: materialPool.innerHTML.substring(0, 1000) + '...',
                        textContent: materialPool.textContent?.substring(0, 500) + '...',
                        childrenCount: materialPool.children.length
                    }
                };
            }
            return { exists: false };
        });

        console.log('PDF 자료 관리 클릭 후 .material-pool-content 상태:');
        console.log(JSON.stringify(afterPDFClick, null, 2));

        // 스크린샷으로 실제 화면 확인
        await page.screenshot({
            path: '/Users/yujeonghui/work/problem_bank/screenshots/debug_material_detailed.png',
            fullPage: true
        });

        // 4. Playwright의 isVisible() 함수가 왜 false를 반환하는지 확인
        console.log('\n4. Playwright isVisible() 결과 분석');

        // 문항 관리로 다시 이동
        await problemMenu.click();
        await page.waitForTimeout(1000);

        const visibilityAnalysis = await page.evaluate(() => {
            const problemPool = document.querySelector('.problem-pool-content');
            if (!problemPool) return { exists: false };

            // Playwright isVisible() 로직 모방
            const rect = problemPool.getBoundingClientRect();
            const computed = window.getComputedStyle(problemPool);

            return {
                rect_has_size: rect.width > 0 && rect.height > 0,
                display_not_none: computed.display !== 'none',
                visibility_visible: computed.visibility === 'visible' || computed.visibility === '',
                opacity_visible: parseFloat(computed.opacity) > 0,
                in_viewport: rect.top < window.innerHeight && rect.bottom > 0 && rect.left < window.innerWidth && rect.right > 0,
                rect_details: rect,
                computed_styles: {
                    display: computed.display,
                    visibility: computed.visibility,
                    opacity: computed.opacity
                },
                playwright_should_see: (
                    rect.width > 0 &&
                    rect.height > 0 &&
                    computed.display !== 'none' &&
                    computed.visibility !== 'hidden' &&
                    parseFloat(computed.opacity) > 0
                )
            };
        });

        console.log('가시성 분석 결과:', JSON.stringify(visibilityAnalysis, null, 2));

    } catch (error) {
        console.error('디버깅 중 오류:', error);
    } finally {
        await page.waitForTimeout(5000);
        await browser.close();
    }
}

debugCSSVisibility().catch(console.error);