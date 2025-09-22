const { chromium } = require('playwright');
const path = require('path');

async function testFinalFix() {
    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto(`file://${path.resolve('/Users/yujeonghui/work/problem_bank/03_Design/CBS_문제은행_플랫폼_소개_v5.html')}`);

    console.log('Testing final fix...\n');

    // Test Problem Management only
    console.log('=== Testing Problem Management ===');
    await page.click('[data-section="problem-management"]');
    await page.waitForTimeout(3000);

    const problemCheck = await page.evaluate(() => {
        const element = document.getElementById('problem-management');
        if (!element) return { found: false };

        const styles = getComputedStyle(element);
        const children = Array.from(element.children);
        const visibleChildren = children.filter(child => {
            const childStyle = getComputedStyle(child);
            return childStyle.display !== 'none' && childStyle.visibility !== 'hidden';
        });

        // Check for specific content elements
        const hasSearchSection = element.querySelector('.smart-search-section') !== null;
        const hasTable = element.querySelector('table') !== null;
        const hasFilters = element.querySelector('select') !== null;

        return {
            found: true,
            display: styles.display,
            visibility: styles.visibility,
            classes: Array.from(element.classList),
            totalChildren: children.length,
            visibleChildren: visibleChildren.length,
            hasSearchSection,
            hasTable,
            hasFilters,
            textPreview: element.textContent.substring(0, 300).trim()
        };
    });

    console.log('Problem Management Check:', JSON.stringify(problemCheck, null, 2));

    await page.screenshot({ path: 'screenshots/final_problem_only.png', fullPage: true });

    // Create a new page for PDF management test
    const page2 = await context.newPage();
    await page2.goto(`file://${path.resolve('/Users/yujeonghui/work/problem_bank/03_Design/CBS_문제은행_플랫폼_소개_v5.html')}`);

    console.log('\n=== Testing PDF Management ===');
    await page2.click('[data-section="pdf-management"]');
    await page2.waitForTimeout(3000);

    const pdfCheck = await page2.evaluate(() => {
        const element = document.getElementById('pdf-management');
        if (!element) return { found: false };

        const styles = getComputedStyle(element);
        const children = Array.from(element.children);
        const visibleChildren = children.filter(child => {
            const childStyle = getComputedStyle(child);
            return childStyle.display !== 'none' && childStyle.visibility !== 'hidden';
        });

        // Check for specific content elements
        const hasSearchSection = element.querySelector('.smart-search-section') !== null;
        const hasTable = element.querySelector('table') !== null;
        const hasFilters = element.querySelector('select') !== null;

        return {
            found: true,
            display: styles.display,
            visibility: styles.visibility,
            classes: Array.from(element.classList),
            totalChildren: children.length,
            visibleChildren: visibleChildren.length,
            hasSearchSection,
            hasTable,
            hasFilters,
            textPreview: element.textContent.substring(0, 300).trim()
        };
    });

    console.log('PDF Management Check:', JSON.stringify(pdfCheck, null, 2));

    await page2.screenshot({ path: 'screenshots/final_pdf_only.png', fullPage: true });

    await browser.close();
}

testFinalFix().catch(console.error);