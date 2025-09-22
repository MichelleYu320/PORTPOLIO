const { chromium } = require('playwright');
const fs = require('fs');

async function detailedAnalysis() {
    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    const page = await context.newPage();

    try {
        const htmlFilePath = '/Users/yujeonghui/work/problem_bank/03_Design/CBS_문제은행_플랫폼_소개_v4_복구완료.html';
        const fileUrl = `file://${htmlFilePath}`;

        await page.goto(fileUrl);
        await page.waitForLoadState('networkidle');

        console.log('=== 상세 콘텐츠 분석 ===\n');

        // 1. 문항 관리 메뉴 클릭 후 상세 분석
        console.log('1. 문항 관리 메뉴 활성화...');
        await page.evaluate(() => {
            window.switchContent('📚 문항 관리');
        });
        await page.waitForTimeout(1000);

        // 문항 관리 관련 모든 요소 상태 확인
        const problemElements = await page.evaluate(() => {
            const results = [];

            // 문항 관리 콘텐츠 영역
            const problemContent = document.querySelector('.problem-pool-content');
            if (problemContent) {
                const styles = window.getComputedStyle(problemContent);
                results.push({
                    selector: '.problem-pool-content',
                    exists: true,
                    display: styles.display,
                    visibility: styles.visibility,
                    opacity: styles.opacity,
                    height: styles.height,
                    overflow: styles.overflow,
                    innerHTML: problemContent.innerHTML.length > 0 ? '콘텐츠 있음' : '콘텐츠 없음'
                });
            } else {
                results.push({
                    selector: '.problem-pool-content',
                    exists: false
                });
            }

            // 기타 문항 관리 관련 요소들
            const searchSection = document.querySelector('.problem-search-section');
            const tableSection = document.querySelector('.problem-table-section');

            if (searchSection) {
                const styles = window.getComputedStyle(searchSection);
                results.push({
                    selector: '.problem-search-section',
                    exists: true,
                    display: styles.display,
                    visibility: styles.visibility
                });
            }

            if (tableSection) {
                const styles = window.getComputedStyle(tableSection);
                results.push({
                    selector: '.problem-table-section',
                    exists: true,
                    display: styles.display,
                    visibility: styles.visibility
                });
            }

            return results;
        });

        console.log('문항 관리 요소 상태:');
        problemElements.forEach(element => {
            console.log(`  ${element.selector}:`, element);
        });

        await page.screenshot({ path: '/Users/yujeonghui/work/problem_bank/screenshots/detailed_problem_analysis.png' });

        // 2. PDF 자료 관리 메뉴 클릭 후 상세 분석
        console.log('\n2. PDF 자료 관리 메뉴 활성화...');
        await page.evaluate(() => {
            window.switchContent('📁 PDF 자료 관리');
        });
        await page.waitForTimeout(1000);

        // PDF 관리 관련 모든 요소 상태 확인
        const pdfElements = await page.evaluate(() => {
            const results = [];

            // PDF 관리 콘텐츠 영역
            const materialContent = document.querySelector('.material-pool-content');
            if (materialContent) {
                const styles = window.getComputedStyle(materialContent);
                results.push({
                    selector: '.material-pool-content',
                    exists: true,
                    display: styles.display,
                    visibility: styles.visibility,
                    opacity: styles.opacity,
                    height: styles.height,
                    overflow: styles.overflow,
                    innerHTML: materialContent.innerHTML.length > 0 ? '콘텐츠 있음' : '콘텐츠 없음'
                });
            } else {
                results.push({
                    selector: '.material-pool-content',
                    exists: false
                });
            }

            return results;
        });

        console.log('PDF 관리 요소 상태:');
        pdfElements.forEach(element => {
            console.log(`  ${element.selector}:`, element);
        });

        await page.screenshot({ path: '/Users/yujeonghui/work/problem_bank/screenshots/detailed_pdf_analysis.png' });

        // 3. 전체 페이지 구조 분석
        console.log('\n3. 전체 페이지 구조 분석...');
        const pageStructure = await page.evaluate(() => {
            return {
                allContentSections: Array.from(document.querySelectorAll('[class*="content"]')).map(el => ({
                    className: el.className,
                    id: el.id,
                    display: window.getComputedStyle(el).display,
                    visibility: window.getComputedStyle(el).visibility
                })),
                sidebarMenus: Array.from(document.querySelectorAll('.sidebar-menu a')).map(el => ({
                    text: el.textContent.trim(),
                    href: el.getAttribute('href'),
                    onclick: el.getAttribute('onclick')
                }))
            };
        });

        console.log('전체 콘텐츠 섹션들:');
        pageStructure.allContentSections.forEach(section => {
            console.log(`  ${section.className}: display=${section.display}, visibility=${section.visibility}`);
        });

        console.log('\n사이드바 메뉴들:');
        pageStructure.sidebarMenus.forEach(menu => {
            console.log(`  "${menu.text}": href=${menu.href}, onclick=${menu.onclick}`);
        });

        console.log('\n✅ 상세 분석 완료');

    } catch (error) {
        console.error('❌ 분석 중 오류 발생:', error);
    } finally {
        await browser.close();
    }
}

// 스크린샷 디렉토리 확인
const screenshotDir = '/Users/yujeonghui/work/problem_bank/screenshots';
if (!fs.existsSync(screenshotDir)) {
    fs.mkdirSync(screenshotDir, { recursive: true });
}

detailedAnalysis();