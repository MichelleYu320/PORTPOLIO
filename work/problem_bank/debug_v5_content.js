const { chromium } = require('playwright');
const path = require('path');

async function debugV5Content() {
    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto(`file://${path.resolve('/Users/yujeonghui/work/problem_bank/03_Design/CBS_문제은행_플랫폼_소개_v5.html')}`);

    // Check PDF management section details
    await page.click('[data-section="pdf-management"]');
    await page.waitForTimeout(2000);

    // Debug the PDF section structure
    const pdfStructure = await page.evaluate(() => {
        const element = document.getElementById('pdf-management');
        if (!element) return 'PDF section not found';

        const computedStyle = getComputedStyle(element);
        const children = Array.from(element.children).map(child => ({
            tagName: child.tagName,
            classList: Array.from(child.classList),
            display: getComputedStyle(child).display,
            visibility: getComputedStyle(child).visibility,
            height: getComputedStyle(child).height,
            textContent: child.textContent.substring(0, 100)
        }));

        return {
            display: computedStyle.display,
            visibility: computedStyle.visibility,
            height: computedStyle.height,
            width: computedStyle.width,
            innerHTML: element.innerHTML.substring(0, 500),
            children: children
        };
    });

    console.log('PDF Management Section Structure:', JSON.stringify(pdfStructure, null, 2));

    // Check problem management section
    await page.click('[data-section="problem-management"]');
    await page.waitForTimeout(2000);

    const problemStructure = await page.evaluate(() => {
        const element = document.getElementById('problem-management');
        if (!element) return 'Problem section not found';

        const computedStyle = getComputedStyle(element);
        const children = Array.from(element.children).map(child => ({
            tagName: child.tagName,
            classList: Array.from(child.classList),
            display: getComputedStyle(child).display,
            visibility: getComputedStyle(child).visibility,
            height: getComputedStyle(child).height,
            textContent: child.textContent.substring(0, 100)
        }));

        return {
            display: computedStyle.display,
            visibility: computedStyle.visibility,
            height: computedStyle.height,
            width: computedStyle.width,
            innerHTML: element.innerHTML.substring(0, 500),
            children: children
        };
    });

    console.log('Problem Management Section Structure:', JSON.stringify(problemStructure, null, 2));

    await browser.close();
}

debugV5Content().catch(console.error);