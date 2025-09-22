const { chromium } = require('playwright');
const path = require('path');

async function testVisibilityFix() {
    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto(`file://${path.resolve('/Users/yujeonghui/work/problem_bank/03_Design/CBS_문제은행_플랫폼_소개_v5.html')}`);

    console.log('Testing visibility fix...');

    // Test Problem Management
    await page.click('[data-section="problem-management"]');
    await page.waitForTimeout(2000);

    await page.screenshot({ path: 'screenshots/fixed_problem_management.png', fullPage: true });

    const problemVisible = await page.evaluate(() => {
        const element = document.getElementById('problem-management');
        if (!element) return false;

        const styles = getComputedStyle(element);
        const hasContent = element.textContent.trim().length > 50;

        return {
            display: styles.display,
            visibility: styles.visibility,
            hasContent: hasContent,
            textLength: element.textContent.length,
            preview: element.textContent.substring(0, 200)
        };
    });

    console.log('Problem Management Section:', problemVisible);

    // Test PDF Management
    await page.click('[data-section="pdf-management"]');
    await page.waitForTimeout(2000);

    await page.screenshot({ path: 'screenshots/fixed_pdf_management.png', fullPage: true });

    const pdfVisible = await page.evaluate(() => {
        const element = document.getElementById('pdf-management');
        if (!element) return false;

        const styles = getComputedStyle(element);
        const hasContent = element.textContent.trim().length > 50;

        return {
            display: styles.display,
            visibility: styles.visibility,
            hasContent: hasContent,
            textLength: element.textContent.length,
            preview: element.textContent.substring(0, 200)
        };
    });

    console.log('PDF Management Section:', pdfVisible);

    await browser.close();
}

testVisibilityFix().catch(console.error);