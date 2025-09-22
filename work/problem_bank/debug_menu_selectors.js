const { chromium } = require('playwright');
const path = require('path');

async function debugMenuSelectors() {
    console.log('=== 메뉴 셀렉터 디버깅 ===\n');

    const browser = await chromium.launch({
        headless: false,
        slowMo: 1000
    });

    const context = await browser.newContext({
        viewport: { width: 1920, height: 1080 }
    });

    const page = await context.newPage();

    // 콘솔 로그 수집
    page.on('console', msg => {
        console.log(`콘솔: [${msg.type()}] ${msg.text()}`);
    });

    try {
        // 페이지 로드
        const filePath = `file://${path.resolve('/Users/yujeonghui/work/problem_bank/03_Design/CBS_문제은행_플랫폼_소개_v4_복구완료.html')}`;
        await page.goto(filePath);
        await page.waitForLoadState('networkidle');
        await page.waitForTimeout(2000);

        // 모든 메뉴 항목 찾기
        const menuItems = await page.evaluate(() => {
            const items = [];

            // 다양한 셀렉터로 메뉴 찾기
            const selectors = [
                'a[onclick]',
                '.sidebar a',
                '.menu-item',
                '[onclick*="switchContent"]',
                'li a',
                'ul a'
            ];

            selectors.forEach(selector => {
                const elements = document.querySelectorAll(selector);
                elements.forEach((el, index) => {
                    items.push({
                        selector: `${selector}[${index}]`,
                        text: el.textContent?.trim(),
                        onclick: el.getAttribute('onclick'),
                        href: el.getAttribute('href'),
                        className: el.className
                    });
                });
            });

            return items;
        });

        console.log('발견된 메뉴 항목들:');
        menuItems.forEach((item, index) => {
            console.log(`${index + 1}. 텍스트: "${item.text}"`);
            console.log(`   onclick: ${item.onclick}`);
            console.log(`   className: ${item.className}`);
            console.log(`   셀렉터: ${item.selector}\n`);
        });

        // 문항 관리 관련 요소 찾기
        const problemMenus = menuItems.filter(item =>
            item.text?.includes('문항') ||
            item.onclick?.includes('문항') ||
            item.text?.includes('📚')
        );

        console.log('문항 관리 관련 메뉴:');
        problemMenus.forEach((item, index) => {
            console.log(`${index + 1}. "${item.text}" - onclick: ${item.onclick}`);
        });

        // PDF 관련 요소 찾기
        const pdfMenus = menuItems.filter(item =>
            item.text?.includes('PDF') ||
            item.onclick?.includes('PDF') ||
            item.text?.includes('📁')
        );

        console.log('\nPDF 관리 관련 메뉴:');
        pdfMenus.forEach((item, index) => {
            console.log(`${index + 1}. "${item.text}" - onclick: ${item.onclick}`);
        });

        // 스크린샷으로 현재 상태 확인
        await page.screenshot({
            path: '/Users/yujeonghui/work/problem_bank/screenshots/debug_menu_structure.png',
            fullPage: true
        });

        console.log('\n✅ 메뉴 구조 디버깅 완료');

    } catch (error) {
        console.error('디버깅 중 오류:', error);
    } finally {
        await page.waitForTimeout(3000);
        await browser.close();
    }
}

debugMenuSelectors().catch(console.error);