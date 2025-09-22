const { chromium } = require('playwright');
const path = require('path');

async function compareFiles() {
    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();

    // Test simple file first
    console.log('\n=== Testing Simple Test File ===');
    const simplePage = await context.newPage();
    await simplePage.goto(`file://${path.resolve('/Users/yujeonghui/work/problem_bank/simple_test.html')}`);

    // Take initial screenshot
    await simplePage.screenshot({ path: 'screenshots/simple_initial.png', fullPage: true });

    // Test menu navigation
    await simplePage.click('text=문항 관리');
    await simplePage.waitForTimeout(1000);
    await simplePage.screenshot({ path: 'screenshots/simple_problem.png', fullPage: true });

    await simplePage.click('text=PDF 관리');
    await simplePage.waitForTimeout(1000);
    await simplePage.screenshot({ path: 'screenshots/simple_pdf.png', fullPage: true });

    // Check visibility
    const problemVisible = await simplePage.evaluate(() => {
        const element = document.getElementById('problem');
        return element && getComputedStyle(element).display !== 'none';
    });

    const pdfVisible = await simplePage.evaluate(() => {
        const element = document.getElementById('pdf');
        return element && getComputedStyle(element).display !== 'none';
    });

    console.log('Simple file - Problem section visible:', problemVisible);
    console.log('Simple file - PDF section visible:', pdfVisible);

    // Test main v5 file
    console.log('\n=== Testing V5 File ===');
    const v5Page = await context.newPage();
    await v5Page.goto(`file://${path.resolve('/Users/yujeonghui/work/problem_bank/03_Design/CBS_문제은행_플랫폼_소개_v5.html')}`);

    // Take initial screenshot
    await v5Page.screenshot({ path: 'screenshots/v5_initial.png', fullPage: true });

    // Test menu navigation
    await v5Page.click('[data-section="problem-management"]');
    await v5Page.waitForTimeout(2000);
    await v5Page.screenshot({ path: 'screenshots/v5_problem.png', fullPage: true });

    await v5Page.click('[data-section="pdf-management"]');
    await v5Page.waitForTimeout(2000);
    await v5Page.screenshot({ path: 'screenshots/v5_pdf.png', fullPage: true });

    // Check visibility in v5
    const v5ProblemVisible = await v5Page.evaluate(() => {
        const element = document.getElementById('problem-management');
        if (!element) return false;
        const styles = getComputedStyle(element);
        return styles.display !== 'none' && styles.visibility !== 'hidden';
    });

    const v5PdfVisible = await v5Page.evaluate(() => {
        const element = document.getElementById('pdf-management');
        if (!element) return false;
        const styles = getComputedStyle(element);
        return styles.display !== 'none' && styles.visibility !== 'hidden';
    });

    console.log('V5 file - Problem section visible:', v5ProblemVisible);
    console.log('V5 file - PDF section visible:', v5PdfVisible);

    // Get actual content from v5 sections
    const v5ProblemContent = await v5Page.evaluate(() => {
        const element = document.getElementById('problem-management');
        return element ? element.textContent.substring(0, 200) : 'Not found';
    });

    const v5PdfContent = await v5Page.evaluate(() => {
        const element = document.getElementById('pdf-management');
        return element ? element.textContent.substring(0, 200) : 'Not found';
    });

    console.log('V5 Problem content preview:', v5ProblemContent);
    console.log('V5 PDF content preview:', v5PdfContent);

    await browser.close();
}

compareFiles().catch(console.error);