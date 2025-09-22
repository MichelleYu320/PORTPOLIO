const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

async function testCBSPlatformCorrected() {
    console.log('=== CBS 플랫폼 수정된 최종 검증 테스트 시작 ===\n');

    const browser = await chromium.launch({
        headless: false,
        slowMo: 1500,
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
        await page.waitForTimeout(2000);

        // 초기 상태 스크린샷
        await page.screenshot({
            path: '/Users/yujeonghui/work/problem_bank/screenshots/corrected_01_initial.png',
            fullPage: true
        });
        console.log('✅ 초기 상태 스크린샷 저장 완료\n');

        // 2. "📚 문항 관리" 메뉴 클릭 테스트 (텍스트 기반)
        console.log('2. "📚 문항 관리" 메뉴 클릭 테스트...');

        // 정확한 셀렉터로 문항 관리 메뉴 찾기
        const problemManagementMenu = await page.locator('text=📚 문항 관리').first();
        await problemManagementMenu.waitFor({ state: 'visible', timeout: 5000 });

        console.log('문항 관리 메뉴를 클릭합니다...');
        await problemManagementMenu.click();
        await page.waitForTimeout(3000);

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
                    visibility: computed.visibility,
                    opacity: computed.opacity,
                    backgroundColor: computed.backgroundColor,
                    border: computed.border,
                    padding: computed.padding,
                    position: computed.position,
                    zIndex: computed.zIndex
                };
            });
            console.log('문항 관리 콘텐츠 CSS 스타일:', problemContentStyles);

            // 테이블 확인
            const tableInfo = await problemContent.evaluate(el => {
                const table = el.querySelector('table');
                const rows = el.querySelectorAll('tr');
                return {
                    hasTable: !!table,
                    rowCount: rows.length,
                    firstRowText: rows[0] ? rows[0].textContent : null
                };
            });
            console.log('문항 관리 테이블 정보:', tableInfo);
        }

        // 문항 관리 상태 스크린샷
        await page.screenshot({
            path: '/Users/yujeonghui/work/problem_bank/screenshots/corrected_02_problem_mgmt.png',
            fullPage: true
        });
        console.log('✅ 문항 관리 상태 스크린샷 저장 완료\n');

        // 3. "📁 PDF 자료 관리" 메뉴 클릭 테스트
        console.log('3. "📁 PDF 자료 관리" 메뉴 클릭 테스트...');

        const pdfManagementMenu = await page.locator('text=📁 PDF 자료 관리').first();
        await pdfManagementMenu.waitFor({ state: 'visible', timeout: 5000 });

        console.log('PDF 자료 관리 메뉴를 클릭합니다...');
        await pdfManagementMenu.click();
        await page.waitForTimeout(3000);

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
                    visibility: computed.visibility,
                    opacity: computed.opacity,
                    backgroundColor: computed.backgroundColor,
                    border: computed.border,
                    padding: computed.padding,
                    position: computed.position,
                    zIndex: computed.zIndex
                };
            });
            console.log('PDF 자료 관리 콘텐츠 CSS 스타일:', materialContentStyles);

            // 테이블 확인
            const tableInfo = await materialContent.evaluate(el => {
                const table = el.querySelector('table');
                const rows = el.querySelectorAll('tr');
                return {
                    hasTable: !!table,
                    rowCount: rows.length,
                    firstRowText: rows[0] ? rows[0].textContent : null
                };
            });
            console.log('PDF 자료 관리 테이블 정보:', tableInfo);
        }

        // PDF 자료 관리 상태 스크린샷
        await page.screenshot({
            path: '/Users/yujeonghui/work/problem_bank/screenshots/corrected_03_pdf_mgmt.png',
            fullPage: true
        });
        console.log('✅ PDF 자료 관리 상태 스크린샷 저장 완료\n');

        // 4. 대시보드로 돌아가기 테스트
        console.log('4. 대시보드로 돌아가기 테스트...');
        const dashboardMenu = await page.locator('text=📊 통합 대시보드').first();
        await dashboardMenu.click();
        await page.waitForTimeout(2000);

        // 대시보드 상태 스크린샷
        await page.screenshot({
            path: '/Users/yujeonghui/work/problem_bank/screenshots/corrected_04_dashboard.png',
            fullPage: true
        });
        console.log('✅ 대시보드 상태 스크린샷 저장 완료\n');

        // 5. 차트 버튼 테스트 (대시보드에서)
        console.log('5. 차트 버튼 기능 테스트...');

        // 평가원 버튼 클릭
        try {
            const evaluationBtn = await page.locator('button:has-text("평가원")').first();
            if (await evaluationBtn.isVisible()) {
                await evaluationBtn.click();
                await page.waitForTimeout(1000);
                await page.screenshot({
                    path: '/Users/yujeonghui/work/problem_bank/screenshots/corrected_12_btn_evaluation.png',
                    fullPage: true
                });
                console.log('✅ 평가원 버튼 클릭 완료');
            }
        } catch (error) {
            console.log('평가원 버튼 테스트 중 오류:', error.message);
        }

        // 년도 버튼 클릭
        try {
            const yearBtn = await page.locator('button:has-text("년도")').first();
            if (await yearBtn.isVisible()) {
                await yearBtn.click();
                await page.waitForTimeout(1000);
                await page.screenshot({
                    path: '/Users/yujeonghui/work/problem_bank/screenshots/corrected_13_btn_year.png',
                    fullPage: true
                });
                console.log('✅ 년도 버튼 클릭 완료');
            }
        } catch (error) {
            console.log('년도 버튼 테스트 중 오류:', error.message);
        }

        // 학년 버튼 클릭
        try {
            const gradeBtn = await page.locator('button:has-text("학년")').first();
            if (await gradeBtn.isVisible()) {
                await gradeBtn.click();
                await page.waitForTimeout(1000);
                await page.screenshot({
                    path: '/Users/yujeonghui/work/problem_bank/screenshots/corrected_14_btn_grade.png',
                    fullPage: true
                });
                console.log('✅ 학년 버튼 클릭 완료');
            }
        } catch (error) {
            console.log('학년 버튼 테스트 중 오류:', error.message);
        }

        // 6. JavaScript 함수 직접 테스트
        console.log('\n6. JavaScript 함수 직접 테스트...');

        const functionTests = await page.evaluate(() => {
            const results = {};

            // switchContent 함수 테스트
            try {
                if (typeof switchContent === 'function') {
                    switchContent('문항 관리');
                    results.switchContent = { success: true, message: 'switchContent 함수 호출 성공' };
                } else {
                    results.switchContent = { success: false, message: 'switchContent 함수를 찾을 수 없음' };
                }
            } catch (error) {
                results.switchContent = { success: false, message: `switchContent 호출 중 오류: ${error.message}` };
            }

            // 기타 함수들 확인
            const availableFunctions = [];
            for (let prop in window) {
                if (typeof window[prop] === 'function' && prop.includes('Content') || prop.includes('Chart') || prop.includes('switch')) {
                    availableFunctions.push(prop);
                }
            }
            results.availableFunctions = availableFunctions;

            return results;
        });

        console.log('JavaScript 함수 테스트 결과:', functionTests);

        // 최종 종합 스크린샷
        await page.screenshot({
            path: '/Users/yujeonghui/work/problem_bank/screenshots/corrected_15_final_comprehensive.png',
            fullPage: true
        });
        console.log('✅ 최종 종합 스크린샷 저장 완료\n');

        // 7. 결과 리포트 생성
        const testResults = {
            timestamp: new Date().toISOString(),
            testResults: {
                pageLoad: true,
                problemManagementMenuClick: isProblemContentVisible,
                pdfManagementMenuClick: isMaterialContentVisible,
                consoleLogs: consoleLogs,
                javascriptFunctionTests: functionTests
            }
        };

        // 결과를 JSON 파일로 저장
        fs.writeFileSync(
            '/Users/yujeonghui/work/problem_bank/corrected_verification_results.json',
            JSON.stringify(testResults, null, 2)
        );

        console.log('\n=== 테스트 완료 ===');
        console.log(`문항 관리 콘텐츠 표시: ${isProblemContentVisible ? '✅ 성공' : '❌ 실패'}`);
        console.log(`PDF 자료 관리 콘텐츠 표시: ${isMaterialContentVisible ? '✅ 성공' : '❌ 실패'}`);
        console.log(`JavaScript 함수 테스트: ${functionTests.switchContent?.success ? '✅ 성공' : '❌ 실패'}`);
        console.log(`수집된 콘솔 로그 개수: ${consoleLogs.length}개`);

        if (consoleLogs.length > 0) {
            console.log('\n=== 중요한 콘솔 로그 ===');
            consoleLogs.filter(log =>
                log.includes('switchContent') ||
                log.includes('표시') ||
                log.includes('완료') ||
                log.includes('error') ||
                log.includes('Error')
            ).forEach((log, index) => {
                console.log(`${index + 1}. ${log}`);
            });
        }

    } catch (error) {
        console.error('테스트 중 오류 발생:', error);

        // 오류 상황 스크린샷
        await page.screenshot({
            path: '/Users/yujeonghui/work/problem_bank/screenshots/corrected_error.png',
            fullPage: true
        });
    } finally {
        // 브라우저를 7초 후에 닫음 (결과 확인을 위해)
        await page.waitForTimeout(7000);
        await browser.close();
    }
}

testCBSPlatformCorrected().catch(console.error);