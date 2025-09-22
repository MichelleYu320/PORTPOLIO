const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

async function testFinalCBSPlatform() {
    const browser = await chromium.launch({
        headless: false,
        slowMo: 1000
    });

    const context = await browser.newContext({
        viewport: { width: 1400, height: 900 }
    });

    const page = await context.newPage();

    try {
        console.log('🚀 CBS 문제은행 플랫폼 최종 버전 테스트 시작');

        // HTML 파일 경로
        const htmlPath = path.resolve('/Users/yujeonghui/work/problem_bank/03_Design/CBS_문제은행_플랫폼_소개_v4_복구완료.html');
        await page.goto(`file://${htmlPath}`);

        // 페이지 로드 대기
        await page.waitForTimeout(2000);

        console.log('📸 1단계: 초기 상태 - 통합 대시보드 화면 확인');
        await page.screenshot({
            path: '/Users/yujeonghui/work/problem_bank/screenshots/final_01_initial_dashboard.png',
            fullPage: true
        });

        // 초기 상태에서 대시보드 요소 확인
        const dashboardVisible = await page.isVisible('.dashboard-content');
        console.log(`✅ 대시보드 콘텐츠 표시 여부: ${dashboardVisible}`);

        // 사이드바 메뉴 확인
        const sidebarVisible = await page.isVisible('.sidebar-menu');
        console.log(`✅ 사이드바 메뉴 표시 여부: ${sidebarVisible}`);

        await page.waitForTimeout(1000);

        console.log('📸 2단계: 문항 관리 메뉴 클릭 테스트');

        // 문항 관리 메뉴 클릭 (텍스트 기반으로 찾기)
        await page.click('text=📚 문항 관리');
        await page.waitForTimeout(1500);

        // 문항 관리 화면 요소 확인
        console.log('🔍 문항 관리 화면 요소 확인 중...');

        // 문항 관리 검색 영역 확인
        const problemSearchVisible = await page.isVisible('.problem-search');
        console.log(`✅ 문항 관리 검색 영역 표시 여부: ${problemSearchVisible}`);

        // AI 스마트 검색 제목 확인 (검색 영역에서)
        let aiSearchTitle = '';
        try {
            aiSearchTitle = await page.textContent('.problem-search h2');
            console.log(`📝 AI 스마트 검색 제목: "${aiSearchTitle}"`);
        } catch (e) {
            console.log('⚠️ AI 스마트 검색 제목을 찾을 수 없습니다.');
        }

        // 검색 입력창 확인
        const searchInput = await page.isVisible('.problem-search input[placeholder*="검색"]');
        console.log(`✅ 문항 검색 입력창 표시 여부: ${searchInput}`);

        // 문항 관리 테이블 영역 확인
        const problemPoolVisible = await page.isVisible('.problem-pool-content');
        console.log(`✅ 문항 관리 테이블 영역 표시 여부: ${problemPoolVisible}`);

        // 문항 테이블 제목 확인
        let tableTitle = '';
        try {
            tableTitle = await page.textContent('.problem-pool-content h2');
            console.log(`📝 문항 테이블 제목: "${tableTitle}"`);
        } catch (e) {
            console.log('⚠️ 문항 테이블 제목을 찾을 수 없습니다.');
        }

        // 문항 개수 메시지 확인
        let countMessage = '';
        try {
            countMessage = await page.textContent('.problem-pool-content p');
            console.log(`📊 문항 개수 메시지: "${countMessage}"`);
        } catch (e) {
            console.log('⚠️ 문항 개수 메시지를 찾을 수 없습니다.');
        }

        // 테이블 영역 확인
        const tableVisible = await page.isVisible('.problem-pool-content .data-table');
        console.log(`✅ 문항 테이블 표시 여부: ${tableVisible}`);

        await page.screenshot({
            path: '/Users/yujeonghui/work/problem_bank/screenshots/final_02_problem_management.png',
            fullPage: true
        });

        await page.waitForTimeout(1000);

        console.log('📸 3단계: PDF 관리 메뉴 클릭 테스트');

        // PDF 관리 메뉴 클릭 (텍스트 기반으로 찾기)
        await page.click('text=📁 PDF 자료 관리');
        await page.waitForTimeout(1500);

        // PDF 관리 화면 요소 확인
        console.log('🔍 PDF 관리 화면 요소 확인 중...');

        // PDF 검색 영역 확인
        const pdfSearchVisible = await page.isVisible('.material-search');
        console.log(`✅ PDF 검색 영역 표시 여부: ${pdfSearchVisible}`);

        // PDF AI 스마트 검색 제목 확인
        let pdfSearchTitle = '';
        try {
            pdfSearchTitle = await page.textContent('.material-search h2');
            console.log(`📝 PDF AI 스마트 검색 제목: "${pdfSearchTitle}"`);
        } catch (e) {
            console.log('⚠️ PDF AI 스마트 검색 제목을 찾을 수 없습니다.');
        }

        // PDF 관리 테이블 영역 확인
        const materialPoolVisible = await page.isVisible('.material-pool-content');
        console.log(`✅ PDF 관리 테이블 영역 표시 여부: ${materialPoolVisible}`);

        // PDF 테이블 제목 확인
        let pdfTableTitle = '';
        try {
            pdfTableTitle = await page.textContent('.material-pool-content h2');
            console.log(`📝 PDF 테이블 제목: "${pdfTableTitle}"`);
        } catch (e) {
            console.log('⚠️ PDF 테이블 제목을 찾을 수 없습니다.');
        }

        // PDF 개수 메시지 확인
        let pdfCountMessage = '';
        try {
            pdfCountMessage = await page.textContent('.material-pool-content p');
            console.log(`📊 PDF 개수 메시지: "${pdfCountMessage}"`);
        } catch (e) {
            console.log('⚠️ PDF 개수 메시지를 찾을 수 없습니다.');
        }

        // PDF 테이블 영역 확인
        const pdfTableVisible = await page.isVisible('.material-pool-content .data-table');
        console.log(`✅ PDF 테이블 표시 여부: ${pdfTableVisible}`);

        await page.screenshot({
            path: '/Users/yujeonghui/work/problem_bank/screenshots/final_03_pdf_management.png',
            fullPage: true
        });

        await page.waitForTimeout(1000);

        console.log('📸 4단계: 다시 대시보드로 돌아가기');

        // 대시보드로 돌아가기 (텍스트 기반으로 찾기)
        await page.click('text=📊 통합 대시보드');
        await page.waitForTimeout(1000);

        await page.screenshot({
            path: '/Users/yujeonghui/work/problem_bank/screenshots/final_04_back_to_dashboard.png',
            fullPage: true
        });

        console.log('✅ CBS 문제은행 플랫폼 최종 테스트 완료!');

        // 테스트 결과 요약
        const testResults = {
            timestamp: new Date().toISOString(),
            testName: 'CBS 문제은행 플랫폼 최종 버전 테스트',
            results: {
                초기_대시보드: dashboardVisible,
                사이드바_메뉴: sidebarVisible,
                문항_관리_검색영역: problemSearchVisible,
                문항_관리_테이블영역: problemPoolVisible,
                문항_검색_입력창: searchInput,
                문항_테이블: tableVisible,
                PDF_관리_검색영역: pdfSearchVisible,
                PDF_관리_테이블영역: materialPoolVisible,
                PDF_테이블: pdfTableVisible
            },
            screenshots: [
                'final_01_initial_dashboard.png',
                'final_02_problem_management.png',
                'final_03_pdf_management.png',
                'final_04_back_to_dashboard.png'
            ],
            details: {
                문항_AI_검색_제목: aiSearchTitle,
                문항_테이블_제목: tableTitle,
                문항_개수_메시지: countMessage,
                PDF_AI_검색_제목: pdfSearchTitle,
                PDF_테이블_제목: pdfTableTitle,
                PDF_개수_메시지: pdfCountMessage
            }
        };

        // 결과를 JSON 파일로 저장
        fs.writeFileSync(
            '/Users/yujeonghui/work/problem_bank/final_test_results.json',
            JSON.stringify(testResults, null, 2),
            'utf8'
        );

        console.log('📄 테스트 결과가 final_test_results.json 파일에 저장되었습니다.');

    } catch (error) {
        console.error('❌ 테스트 중 오류 발생:', error);
        await page.screenshot({
            path: '/Users/yujeonghui/work/problem_bank/screenshots/final_error_state.png',
            fullPage: true
        });
    } finally {
        await browser.close();
    }
}

// 테스트 실행
testFinalCBSPlatform();