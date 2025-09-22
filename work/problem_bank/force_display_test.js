const { chromium } = require('playwright');
const path = require('path');

async function forceDisplayTest() {
    console.log('=== 강제 표시 테스트 시작 ===\n');

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

        // 1. 문항 관리 클릭
        console.log('1. 문항 관리 클릭');
        const problemMenu = await page.locator('text=📚 문항 관리').first();
        await problemMenu.click();
        await page.waitForTimeout(2000);

        // 2. CSS 강제 적용으로 문제 해결 시도
        console.log('2. CSS 강제 적용으로 문제 해결 시도');
        const fixResult = await page.evaluate(() => {
            const problemPool = document.querySelector('.problem-pool-content');
            if (problemPool) {
                // 강제로 크기와 위치 설정
                problemPool.style.display = 'block';
                problemPool.style.visibility = 'visible';
                problemPool.style.opacity = '1';
                problemPool.style.width = '100%';
                problemPool.style.minHeight = '500px';
                problemPool.style.height = 'auto';
                problemPool.style.position = 'relative';
                problemPool.style.backgroundColor = '#ffffff';
                problemPool.style.border = '1px solid #e2e8f0';
                problemPool.style.padding = '20px';
                problemPool.style.marginBottom = '20px';
                problemPool.style.zIndex = '1';

                // 부모 요소들도 확인하고 수정
                let parent = problemPool.parentElement;
                while (parent && parent !== document.body) {
                    if (parent.style.display === 'none') {
                        parent.style.display = 'block';
                    }
                    if (parent.style.visibility === 'hidden') {
                        parent.style.visibility = 'visible';
                    }
                    parent = parent.parentElement;
                }

                // 결과 확인
                const rect = problemPool.getBoundingClientRect();
                return {
                    fixed: true,
                    newRect: rect,
                    offsetHeight: problemPool.offsetHeight,
                    offsetWidth: problemPool.offsetWidth,
                    parentChain: []
                };
            }
            return { fixed: false };
        });

        console.log('CSS 강제 적용 결과:', fixResult);

        // 3. 수정 후 가시성 확인
        const problemContent = await page.locator('.problem-pool-content');
        const isProblemVisible = await problemContent.isVisible();
        console.log(`문항 관리 콘텐츠 가시성 (수정 후): ${isProblemVisible}`);

        // 스크린샷
        await page.screenshot({
            path: '/Users/yujeonghui/work/problem_bank/screenshots/force_display_problem.png',
            fullPage: true
        });

        // 4. PDF 관리도 동일하게 처리
        console.log('\n3. PDF 관리 클릭 및 수정');
        const pdfMenu = await page.locator('text=📁 PDF 자료 관리').first();
        await pdfMenu.click();
        await page.waitForTimeout(2000);

        const pdfFixResult = await page.evaluate(() => {
            const materialPool = document.querySelector('.material-pool-content');
            if (materialPool) {
                // 강제로 크기와 위치 설정
                materialPool.style.display = 'block';
                materialPool.style.visibility = 'visible';
                materialPool.style.opacity = '1';
                materialPool.style.width = '100%';
                materialPool.style.minHeight = '500px';
                materialPool.style.height = 'auto';
                materialPool.style.position = 'relative';
                materialPool.style.backgroundColor = '#ffffff';
                materialPool.style.border = '1px solid #e2e8f0';
                materialPool.style.padding = '20px';
                materialPool.style.marginBottom = '20px';
                materialPool.style.zIndex = '1';

                // 부모 요소들도 확인하고 수정
                let parent = materialPool.parentElement;
                while (parent && parent !== document.body) {
                    if (parent.style.display === 'none') {
                        parent.style.display = 'block';
                    }
                    if (parent.style.visibility === 'hidden') {
                        parent.style.visibility = 'visible';
                    }
                    parent = parent.parentElement;
                }

                const rect = materialPool.getBoundingClientRect();
                return {
                    fixed: true,
                    newRect: rect,
                    offsetHeight: materialPool.offsetHeight,
                    offsetWidth: materialPool.offsetWidth
                };
            }
            return { fixed: false };
        });

        console.log('PDF CSS 강제 적용 결과:', pdfFixResult);

        const materialContent = await page.locator('.material-pool-content');
        const isMaterialVisible = await materialContent.isVisible();
        console.log(`PDF 자료 관리 콘텐츠 가시성 (수정 후): ${isMaterialVisible}`);

        // 스크린샷
        await page.screenshot({
            path: '/Users/yujeonghui/work/problem_bank/screenshots/force_display_pdf.png',
            fullPage: true
        });

        // 5. 대시보드로 돌아가서 확인
        console.log('\n4. 대시보드로 돌아가기');
        const dashboardMenu = await page.locator('text=📊 통합 대시보드').first();
        await dashboardMenu.click();
        await page.waitForTimeout(2000);

        await page.screenshot({
            path: '/Users/yujeonghui/work/problem_bank/screenshots/force_display_dashboard.png',
            fullPage: true
        });

        // 6. 최종 재테스트
        console.log('\n5. 최종 재테스트');

        // 문항 관리 다시 클릭
        await problemMenu.click();
        await page.waitForTimeout(2000);
        const finalProblemVisible = await problemContent.isVisible();
        console.log(`최종 문항 관리 가시성: ${finalProblemVisible}`);

        // PDF 관리 다시 클릭
        await pdfMenu.click();
        await page.waitForTimeout(2000);
        const finalMaterialVisible = await materialContent.isVisible();
        console.log(`최종 PDF 관리 가시성: ${finalMaterialVisible}`);

        // 최종 스크린샷
        await page.screenshot({
            path: '/Users/yujeonghui/work/problem_bank/screenshots/force_display_final.png',
            fullPage: true
        });

        console.log('\n=== 강제 표시 테스트 완료 ===');
        console.log(`문항 관리 수정 결과: ${fixResult.fixed}`);
        console.log(`PDF 관리 수정 결과: ${pdfFixResult.fixed}`);
        console.log(`최종 문항 관리 가시성: ${finalProblemVisible}`);
        console.log(`최종 PDF 관리 가시성: ${finalMaterialVisible}`);

    } catch (error) {
        console.error('테스트 중 오류:', error);
    } finally {
        await page.waitForTimeout(5000);
        await browser.close();
    }
}

forceDisplayTest().catch(console.error);