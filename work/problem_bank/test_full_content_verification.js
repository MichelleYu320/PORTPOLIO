const { chromium } = require('playwright');
const fs = require('fs');

async function fullContentVerification() {
    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext({
        viewport: { width: 1920, height: 1080 }
    });
    const page = await context.newPage();

    try {
        const htmlFilePath = '/Users/yujeonghui/work/problem_bank/03_Design/CBS_문제은행_플랫폼_소개_v4_복구완료.html';
        const fileUrl = `file://${htmlFilePath}`;

        await page.goto(fileUrl);
        await page.waitForLoadState('networkidle');

        console.log('=== 전체 콘텐츠 검증 ===\n');

        // 1. 문항 관리 테스트
        console.log('1. 문항 관리 콘텐츠 전체 화면 확인');
        await page.evaluate(() => {
            window.switchContent('📚 문항 관리');
        });
        await page.waitForTimeout(1500);

        // 전체 페이지 스크린샷 (스크롤 포함)
        await page.screenshot({
            path: '/Users/yujeonghui/work/problem_bank/screenshots/problem_full_page.png',
            fullPage: true
        });

        // 콘텐츠 영역으로 스크롤
        await page.evaluate(() => {
            const content = document.querySelector('.problem-pool-content');
            if (content) {
                content.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
        await page.waitForTimeout(1000);

        await page.screenshot({
            path: '/Users/yujeonghui/work/problem_bank/screenshots/problem_content_focused.png'
        });

        // 콘텐츠 구조 상세 분석
        const problemContentAnalysis = await page.evaluate(() => {
            const content = document.querySelector('.problem-pool-content');
            if (!content) return { exists: false };

            const rect = content.getBoundingClientRect();
            const styles = window.getComputedStyle(content);

            return {
                exists: true,
                boundingRect: {
                    top: rect.top,
                    left: rect.left,
                    width: rect.width,
                    height: rect.height
                },
                styles: {
                    display: styles.display,
                    visibility: styles.visibility,
                    opacity: styles.opacity,
                    position: styles.position,
                    zIndex: styles.zIndex
                },
                innerHTML: content.innerHTML.substring(0, 500) + '...',
                children: Array.from(content.children).map(child => ({
                    tagName: child.tagName,
                    className: child.className,
                    id: child.id,
                    textContent: child.textContent.substring(0, 100)
                }))
            };
        });

        console.log('문항 관리 콘텐츠 상세 분석:', JSON.stringify(problemContentAnalysis, null, 2));

        // 2. PDF 자료 관리 테스트
        console.log('\n2. PDF 자료 관리 콘텐츠 전체 화면 확인');
        await page.evaluate(() => {
            window.switchContent('📁 PDF 자료 관리');
        });
        await page.waitForTimeout(1500);

        // 전체 페이지 스크린샷 (스크롤 포함)
        await page.screenshot({
            path: '/Users/yujeonghui/work/problem_bank/screenshots/pdf_full_page.png',
            fullPage: true
        });

        // 콘텐츠 영역으로 스크롤
        await page.evaluate(() => {
            const content = document.querySelector('.material-pool-content');
            if (content) {
                content.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
        await page.waitForTimeout(1000);

        await page.screenshot({
            path: '/Users/yujeonghui/work/problem_bank/screenshots/pdf_content_focused.png'
        });

        // PDF 콘텐츠 구조 상세 분석
        const pdfContentAnalysis = await page.evaluate(() => {
            const content = document.querySelector('.material-pool-content');
            if (!content) return { exists: false };

            const rect = content.getBoundingClientRect();
            const styles = window.getComputedStyle(content);

            return {
                exists: true,
                boundingRect: {
                    top: rect.top,
                    left: rect.left,
                    width: rect.width,
                    height: rect.height
                },
                styles: {
                    display: styles.display,
                    visibility: styles.visibility,
                    opacity: styles.opacity,
                    position: styles.position,
                    zIndex: styles.zIndex
                },
                innerHTML: content.innerHTML.substring(0, 500) + '...',
                children: Array.from(content.children).map(child => ({
                    tagName: child.tagName,
                    className: child.className,
                    id: child.id,
                    textContent: child.textContent.substring(0, 100)
                }))
            };
        });

        console.log('PDF 관리 콘텐츠 상세 분석:', JSON.stringify(pdfContentAnalysis, null, 2));

        // 3. 대시보드로 돌아가기
        console.log('\n3. 대시보드로 돌아가기');
        await page.evaluate(() => {
            window.switchContent('📊 통합 대시보드');
        });
        await page.waitForTimeout(1000);

        await page.screenshot({
            path: '/Users/yujeonghui/work/problem_bank/screenshots/dashboard_return.png'
        });

        console.log('\n✅ 전체 콘텐츠 검증 완료');

    } catch (error) {
        console.error('❌ 검증 중 오류 발생:', error);
    } finally {
        await browser.close();
    }
}

fullContentVerification();