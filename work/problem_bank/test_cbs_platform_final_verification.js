const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

async function testCBSPlatform() {
    console.log('=== CBS 플랫폼 최종 검증 테스트 시작 ===\n');

    const browser = await chromium.launch({
        headless: false,
        slowMo: 1000,
        args: ['--start-maximized']
    });

    const context = await browser.newContext({
        viewport: { width: 1920, height: 1080 }
    });

    const page = await context.newPage();

    // 콘솔 로그 수집
    const consoleLogs = [];
    page.on('console', msg => {
        const logEntry = `[${msg.type()}] ${msg.text()}`;
        consoleLogs.push(logEntry);
        console.log('콘솔 로그:', logEntry);
    });

    try {
        // 1. 페이지 로드
        console.log('1. 페이지 로드 중...');
        const filePath = `file://${path.resolve('/Users/yujeonghui/work/problem_bank/03_Design/CBS_문제은행_플랫폼_소개_v4_복구완료.html')}`;
        await page.goto(filePath);
        await page.waitForLoadState('networkidle');

        // 초기 상태 스크린샷
        await page.screenshot({
            path: '/Users/yujeonghui/work/problem_bank/screenshots/final_verification_01_initial.png',
            fullPage: true
        });
        console.log('✅ 초기 상태 스크린샷 저장 완료\n');

        // 2. 개발자 도구 콘솔 확인을 위한 대기
        await page.waitForTimeout(2000);

        // 3. "📚 문항 관리" 메뉴 클릭 테스트
        console.log('2. "📚 문항 관리" 메뉴 클릭 테스트...');

        // 메뉴 요소 확인
        const problemManagementMenu = await page.locator('a[onclick*="문항 관리"]').first();
        await problemManagementMenu.waitFor({ state: 'visible', timeout: 5000 });

        console.log('문항 관리 메뉴를 클릭합니다...');
        await problemManagementMenu.click();
        await page.waitForTimeout(2000);

        // 문항 관리 콘텐츠 영역 확인
        const problemContent = await page.locator('.problem-pool-content');
        const isProblemContentVisible = await problemContent.isVisible();
        console.log(`문항 관리 콘텐츠 표시 상태: ${isProblemContentVisible}`);

        if (isProblemContentVisible) {
            // CSS 스타일 확인
            const problemContentStyles = await problemContent.evaluate(el => {
                const computed = window.getComputedStyle(el);
                return {
                    display: computed.display,
                    backgroundColor: computed.backgroundColor,
                    border: computed.border,
                    padding: computed.padding,
                    visibility: computed.visibility
                };
            });
            console.log('문항 관리 콘텐츠 CSS 스타일:', problemContentStyles);
        }

        // 문항 관리 상태 스크린샷
        await page.screenshot({
            path: '/Users/yujeonghui/work/problem_bank/screenshots/final_verification_02_problem_management.png',
            fullPage: true
        });
        console.log('✅ 문항 관리 상태 스크린샷 저장 완료\n');

        // 4. "📁 PDF 자료 관리" 메뉴 클릭 테스트
        console.log('3. "📁 PDF 자료 관리" 메뉴 클릭 테스트...');

        const pdfManagementMenu = await page.locator('a[onclick*="PDF 자료 관리"]').first();
        await pdfManagementMenu.waitFor({ state: 'visible', timeout: 5000 });

        console.log('PDF 자료 관리 메뉴를 클릭합니다...');
        await pdfManagementMenu.click();
        await page.waitForTimeout(2000);

        // PDF 자료 관리 콘텐츠 영역 확인
        const materialContent = await page.locator('.material-pool-content');
        const isMaterialContentVisible = await materialContent.isVisible();
        console.log(`PDF 자료 관리 콘텐츠 표시 상태: ${isMaterialContentVisible}`);

        if (isMaterialContentVisible) {
            // CSS 스타일 확인
            const materialContentStyles = await materialContent.evaluate(el => {
                const computed = window.getComputedStyle(el);
                return {
                    display: computed.display,
                    backgroundColor: computed.backgroundColor,
                    border: computed.border,
                    padding: computed.padding,
                    visibility: computed.visibility
                };
            });
            console.log('PDF 자료 관리 콘텐츠 CSS 스타일:', materialContentStyles);
        }

        // PDF 자료 관리 상태 스크린샷
        await page.screenshot({
            path: '/Users/yujeonghui/work/problem_bank/screenshots/final_verification_03_pdf_management.png',
            fullPage: true
        });
        console.log('✅ PDF 자료 관리 상태 스크린샷 저장 완료\n');

        // 5. 대시보드로 돌아가기 테스트
        console.log('4. 대시보드로 돌아가기 테스트...');
        const dashboardMenu = await page.locator('a[onclick*="대시보드"]').first();
        await dashboardMenu.click();
        await page.waitForTimeout(2000);

        // 대시보드 상태 스크린샷
        await page.screenshot({
            path: '/Users/yujeonghui/work/problem_bank/screenshots/final_verification_04_dashboard.png',
            fullPage: true
        });
        console.log('✅ 대시보드 상태 스크린샷 저장 완료\n');

        // 6. Elements 탭 정보 수집 (DOM 구조 확인)
        console.log('5. DOM 구조 확인...');

        // 문항 관리로 다시 이동하여 DOM 구조 확인
        await problemManagementMenu.click();
        await page.waitForTimeout(1000);

        const problemElementInfo = await page.evaluate(() => {
            const element = document.querySelector('.problem-pool-content');
            if (element) {
                return {
                    exists: true,
                    innerHTML: element.innerHTML.substring(0, 500) + '...',
                    className: element.className,
                    id: element.id,
                    parentElement: element.parentElement ? element.parentElement.tagName : null,
                    childElementCount: element.childElementCount
                };
            }
            return { exists: false };
        });

        console.log('문항 관리 요소 정보:', problemElementInfo);

        // PDF 자료 관리로 이동하여 DOM 구조 확인
        await pdfManagementMenu.click();
        await page.waitForTimeout(1000);

        const materialElementInfo = await page.evaluate(() => {
            const element = document.querySelector('.material-pool-content');
            if (element) {
                return {
                    exists: true,
                    innerHTML: element.innerHTML.substring(0, 500) + '...',
                    className: element.className,
                    id: element.id,
                    parentElement: element.parentElement ? element.parentElement.tagName : null,
                    childElementCount: element.childElementCount
                };
            }
            return { exists: false };
        });

        console.log('PDF 자료 관리 요소 정보:', materialElementInfo);

        // 7. JavaScript 함수 직접 테스트
        console.log('\n6. JavaScript 함수 직접 테스트...');

        const switchContentResult = await page.evaluate(() => {
            try {
                if (typeof switchContent === 'function') {
                    switchContent('문항 관리');
                    return { success: true, message: 'switchContent 함수 호출 성공' };
                } else {
                    return { success: false, message: 'switchContent 함수를 찾을 수 없음' };
                }
            } catch (error) {
                return { success: false, message: `switchContent 호출 중 오류: ${error.message}` };
            }
        });

        console.log('switchContent 함수 테스트 결과:', switchContentResult);

        // 최종 종합 스크린샷
        await page.screenshot({
            path: '/Users/yujeonghui/work/problem_bank/screenshots/final_verification_05_comprehensive.png',
            fullPage: true
        });
        console.log('✅ 최종 종합 스크린샷 저장 완료\n');

        // 8. 결과 리포트 생성
        const testResults = {
            timestamp: new Date().toISOString(),
            testResults: {
                pageLoad: true,
                problemManagementMenuClick: isProblemContentVisible,
                pdfManagementMenuClick: isMaterialContentVisible,
                consoleLogs: consoleLogs,
                domElements: {
                    problemPoolContent: problemElementInfo,
                    materialPoolContent: materialElementInfo
                },
                javascriptFunctionTest: switchContentResult
            }
        };

        // 결과를 JSON 파일로 저장
        fs.writeFileSync(
            '/Users/yujeonghui/work/problem_bank/final_verification_results.json',
            JSON.stringify(testResults, null, 2)
        );

        console.log('=== 테스트 완료 ===');
        console.log(`문항 관리 콘텐츠 표시: ${isProblemContentVisible ? '✅ 성공' : '❌ 실패'}`);
        console.log(`PDF 자료 관리 콘텐츠 표시: ${isMaterialContentVisible ? '✅ 성공' : '❌ 실패'}`);
        console.log(`JavaScript 함수 테스트: ${switchContentResult.success ? '✅ 성공' : '❌ 실패'}`);
        console.log(`수집된 콘솔 로그 개수: ${consoleLogs.length}개`);

        if (consoleLogs.length > 0) {
            console.log('\n=== 수집된 콘솔 로그 ===');
            consoleLogs.forEach((log, index) => {
                console.log(`${index + 1}. ${log}`);
            });
        }

    } catch (error) {
        console.error('테스트 중 오류 발생:', error);

        // 오류 상황 스크린샷
        await page.screenshot({
            path: '/Users/yujeonghui/work/problem_bank/screenshots/final_verification_error.png',
            fullPage: true
        });
    } finally {
        // 브라우저를 5초 후에 닫음 (결과 확인을 위해)
        await page.waitForTimeout(5000);
        await browser.close();
    }
}

testCBSPlatform().catch(console.error);