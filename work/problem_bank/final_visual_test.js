// 실제 시각적 확인 테스트
const { chromium } = require('playwright');

async function finalVisualTest() {
    const browser = await chromium.launch({
        headless: false,
        slowMo: 1000 // 천천히 실행
    });
    const page = await browser.newPage();

    await page.setViewportSize({ width: 1400, height: 900 });
    await page.goto('file:///Users/yujeonghui/work/problem_bank/03_Design/CBS_문제은행_플랫폼_소개_v4_복구완료.html');
    await page.waitForTimeout(3000);

    console.log('=== 초기 상태 ===');
    await page.screenshot({ path: '/Users/yujeonghui/work/problem_bank/screenshots/final_01_initial.png', fullPage: true });

    console.log('=== 문항 관리 클릭 ===');
    await page.click('a[data-section="problem-management"]');
    await page.waitForTimeout(2000);

    // 전체 페이지 스크린샷
    await page.screenshot({ path: '/Users/yujeonghui/work/problem_bank/screenshots/final_02_problem_clicked.png', fullPage: true });

    // 콘텐츠 영역까지 스크롤
    await page.evaluate(() => {
        window.scrollTo(0, document.body.scrollHeight);
    });
    await page.waitForTimeout(1000);
    await page.screenshot({ path: '/Users/yujeonghui/work/problem_bank/screenshots/final_03_scrolled_down.png' });

    // 콘텐츠 영역이 실제로 보이는지 확인
    const contentVisible = await page.evaluate(() => {
        const problemSearch = document.querySelector('.problem-search');
        const problemPool = document.querySelector('.problem-pool-content');

        if (!problemSearch || !problemPool) {
            return { error: '요소를 찾을 수 없음' };
        }

        const searchRect = problemSearch.getBoundingClientRect();
        const poolRect = problemPool.getBoundingClientRect();

        return {
            problemSearchVisible: searchRect.width > 0 && searchRect.height > 0,
            problemPoolVisible: poolRect.width > 0 && poolRect.height > 0,
            searchRect: {
                width: searchRect.width,
                height: searchRect.height,
                top: searchRect.top,
                left: searchRect.left
            },
            poolRect: {
                width: poolRect.width,
                height: poolRect.height,
                top: poolRect.top,
                left: poolRect.left
            },
            searchClasses: problemSearch.className,
            poolClasses: problemPool.className,
            searchComputedDisplay: window.getComputedStyle(problemSearch).display,
            poolComputedDisplay: window.getComputedStyle(problemPool).display
        };
    });

    console.log('실제 렌더링 상태:', contentVisible);

    console.log('=== PDF 자료 관리 클릭 ===');
    await page.click('a[data-section="pdf-management"]');
    await page.waitForTimeout(2000);
    await page.screenshot({ path: '/Users/yujeonghui/work/problem_bank/screenshots/final_04_pdf_clicked.png', fullPage: true });

    const pdfContentVisible = await page.evaluate(() => {
        const materialSearch = document.querySelector('.material-search');
        const materialPool = document.querySelector('.material-pool-content');

        if (!materialSearch || !materialPool) {
            return { error: 'PDF 요소를 찾을 수 없음' };
        }

        const searchRect = materialSearch.getBoundingClientRect();
        const poolRect = materialPool.getBoundingClientRect();

        return {
            materialSearchVisible: searchRect.width > 0 && searchRect.height > 0,
            materialPoolVisible: poolRect.width > 0 && poolRect.height > 0,
            searchRect: {
                width: searchRect.width,
                height: searchRect.height,
                top: searchRect.top
            },
            poolRect: {
                width: poolRect.width,
                height: poolRect.height,
                top: poolRect.top
            }
        };
    });

    console.log('PDF 렌더링 상태:', pdfContentVisible);

    console.log('\n브라우저를 10초간 열어둡니다. 직접 확인해보세요!');
    await page.waitForTimeout(10000);

    await browser.close();
}

finalVisualTest().catch(console.error);