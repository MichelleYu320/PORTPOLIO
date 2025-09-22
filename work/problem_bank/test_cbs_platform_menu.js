const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

async function testCBSPlatform() {
    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    const page = await context.newPage();

    try {
        // HTML 파일 경로를 file:// URL로 변환
        const htmlFilePath = '/Users/yujeonghui/work/problem_bank/03_Design/CBS_문제은행_플랫폼_소개_v4_복구완료.html';
        const fileUrl = `file://${htmlFilePath}`;

        console.log(`Opening file: ${fileUrl}`);

        // 1. 페이지 로드 테스트
        await page.goto(fileUrl);
        await page.waitForLoadState('networkidle');
        console.log('✅ 페이지가 성공적으로 로드되었습니다.');

        // 초기 상태 스크린샷
        await page.screenshot({ path: '/Users/yujeonghui/work/problem_bank/screenshots/01_initial_state.png' });
        console.log('📸 초기 상태 스크린샷 저장 완료');

        // 2. 문항 관리 메뉴 클릭 테스트
        console.log('\n=== 문항 관리 메뉴 테스트 ===');

        // 문항 관리 메뉴 찾기 및 클릭 (더 구체적인 셀렉터 사용)
        const problemManagementMenu = await page.locator('.sidebar-menu a').filter({ hasText: '📚 문항 관리' });
        const isProblemMenuVisible = await problemManagementMenu.count() > 0;
        console.log(`문항 관리 메뉴 발견: ${isProblemMenuVisible}`);

        if (isProblemMenuVisible) {
            // JavaScript 함수를 통해 직접 호출
            await page.evaluate(() => {
                window.switchContent('📚 문항 관리');
            });
            await page.waitForTimeout(1500); // 애니메이션 대기

            // 문항 관리 콘텐츠 영역 확인
            const problemContent = await page.locator('.problem-pool-content');
            const problemContentExists = await problemContent.count() > 0;

            if (problemContentExists) {
                const isProblemContentVisible = await problemContent.isVisible();
                const problemContentDisplay = await problemContent.evaluate(el => window.getComputedStyle(el).display);

                console.log(`문항 관리 콘텐츠 가시성: ${isProblemContentVisible}`);
                console.log(`문항 관리 콘텐츠 display 스타일: ${problemContentDisplay}`);
            } else {
                console.log('문항 관리 콘텐츠 요소를 찾을 수 없음');
            }

            // 스크린샷 저장
            await page.screenshot({ path: '/Users/yujeonghui/work/problem_bank/screenshots/02_problem_management_active.png' });
            console.log('📸 문항 관리 활성화 스크린샷 저장 완료');
        }

        // 3. PDF 자료 관리 메뉴 클릭 테스트
        console.log('\n=== PDF 자료 관리 메뉴 테스트 ===');

        // PDF 관리 메뉴 찾기 및 클릭 (더 구체적인 셀렉터 사용)
        const pdfManagementMenu = await page.locator('.sidebar-menu a').filter({ hasText: '📁 PDF 자료 관리' });
        const isPdfMenuVisible = await pdfManagementMenu.count() > 0;
        console.log(`PDF 관리 메뉴 발견: ${isPdfMenuVisible}`);

        if (isPdfMenuVisible) {
            // JavaScript 함수를 통해 직접 호출
            await page.evaluate(() => {
                window.switchContent('📁 PDF 자료 관리');
            });
            await page.waitForTimeout(1500); // 애니메이션 대기

            // PDF 관리 콘텐츠 영역 확인
            const pdfContent = await page.locator('.material-pool-content');
            const pdfContentExists = await pdfContent.count() > 0;

            if (pdfContentExists) {
                const isPdfContentVisible = await pdfContent.isVisible();
                const pdfContentDisplay = await pdfContent.evaluate(el => window.getComputedStyle(el).display);

                console.log(`PDF 관리 콘텐츠 가시성: ${isPdfContentVisible}`);
                console.log(`PDF 관리 콘텐츠 display 스타일: ${pdfContentDisplay}`);
            } else {
                console.log('PDF 관리 콘텐츠 요소를 찾을 수 없음');
            }

            // 스크린샷 저장
            await page.screenshot({ path: '/Users/yujeonghui/work/problem_bank/screenshots/03_pdf_management_active.png' });
            console.log('📸 PDF 관리 활성화 스크린샷 저장 완료');
        }

        // 4. 모든 메뉴 아이템 및 콘텐츠 영역 상태 확인
        console.log('\n=== 전체 메뉴 및 콘텐츠 상태 확인 ===');

        // 모든 메뉴 아이템 찾기
        const allMenuItems = await page.locator('.menu-item').all();
        console.log(`총 메뉴 아이템 수: ${allMenuItems.length}`);

        for (let i = 0; i < allMenuItems.length; i++) {
            const menuText = await allMenuItems[i].textContent();
            const isVisible = await allMenuItems[i].isVisible();
            console.log(`메뉴 ${i + 1}: "${menuText}" - 가시성: ${isVisible}`);
        }

        // 모든 콘텐츠 영역 확인
        const contentAreas = [
            { selector: '.problem-pool-content', name: '문항 관리 콘텐츠' },
            { selector: '.material-pool-content', name: 'PDF 관리 콘텐츠' }
        ];

        for (const area of contentAreas) {
            try {
                const element = await page.locator(area.selector);
                const isVisible = await element.isVisible();
                const display = await element.evaluate(el => window.getComputedStyle(el).display);
                console.log(`${area.name}: 가시성=${isVisible}, display=${display}`);
            } catch (error) {
                console.log(`${area.name}: 요소를 찾을 수 없음`);
            }
        }

        console.log('\n✅ 모든 테스트가 완료되었습니다.');

    } catch (error) {
        console.error('❌ 테스트 중 오류 발생:', error);
    } finally {
        await browser.close();
    }
}

// 스크린샷 디렉토리 생성
const screenshotDir = '/Users/yujeonghui/work/problem_bank/screenshots';
if (!fs.existsSync(screenshotDir)) {
    fs.mkdirSync(screenshotDir, { recursive: true });
}

testCBSPlatform();