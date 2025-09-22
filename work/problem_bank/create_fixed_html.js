// 완전히 새로운 HTML 파일 생성
const fs = require('fs');

// 기존 HTML을 읽어서 문제 부분만 수정한 새 파일 생성
fs.readFile('/Users/yujeonghui/work/problem_bank/03_Design/CBS_문제은행_플랫폼_소개_v4_복구완료.html', 'utf8', (err, data) => {
    if (err) {
        console.error('파일 읽기 오류:', err);
        return;
    }

    console.log('기존 HTML 파일 읽기 완료');

    // 교재 제작 컨테이너를 일찍 닫도록 수정
    let fixedHtml = data;

    // 2658줄 근처에서 교재 제작 컨테이너를 닫고, 문항관리/PDF관리를 별도로 배치
    const searchPattern = /(\s*<\/div>\s*<!-- 교재 제작 관리 콘텐츠 종료 -->)/;
    const replacement = `$1

            <!-- 문항 관리 콘텐츠 영역 (교재 제작 컨테이너 밖으로 이동) -->
            <div class="problem-management-wrapper is-hidden">`;

    fixedHtml = fixedHtml.replace(searchPattern, replacement);

    // PDF 관리 영역 시작 전에 문항 관리 영역을 닫고 PDF 관리 영역 시작
    const pdfStartPattern = /(<!-- PDF 자료 관리 검색 영역 -->)/;
    const pdfReplacement = `            </div>
            <!-- 문항 관리 콘텐츠 영역 종료 -->

            <!-- PDF 자료 관리 콘텐츠 영역 (교재 제작 컨테이너 밖으로 이동) -->
            <div class="pdf-management-wrapper is-hidden">
            $1`;

    fixedHtml = fixedHtml.replace(pdfStartPattern, pdfReplacement);

    // main 종료 전에 PDF 관리 영역을 닫음
    const mainEndPattern = /(\s*<\/main>)/;
    const mainEndReplacement = `            </div>
            <!-- PDF 자료 관리 콘텐츠 영역 종료 -->
$1`;

    fixedHtml = fixedHtml.replace(mainEndPattern, mainEndReplacement);

    // switchContent 함수도 새로운 wrapper를 사용하도록 수정
    const switchContentPattern = /(case 'problem-management':[\s\S]*?showSection\('\\.problem-search', '📚 문항 관리'\);[\s\S]*?showSection\('\\.problem-pool-content'\);)/;
    const switchContentReplacement = `case 'problem-management':
                case '문항 관리':
                    showSection('.problem-management-wrapper', '📚 문항 관리');`;

    fixedHtml = fixedHtml.replace(switchContentPattern, switchContentReplacement);

    const pdfSwitchPattern = /(case 'pdf-management':[\s\S]*?showSection\('\\.material-search', '📁 PDF 자료 관리'\);[\s\S]*?showSection\('\\.material-pool-content'\);)/;
    const pdfSwitchReplacement = `case 'pdf-management':
                case 'PDF 자료 관리':
                    showSection('.pdf-management-wrapper', '📁 PDF 자료 관리');`;

    fixedHtml = fixedHtml.replace(pdfSwitchPattern, pdfSwitchReplacement);

    // 새로운 wrapper를 allContentSections에 추가
    const allContentPattern = /(const allContentSections = \[[\s\S]*?\];)/;
    fixedHtml = fixedHtml.replace(allContentPattern, (match) => {
        return match.replace(/\];/, `                '.problem-management-wrapper',
                '.pdf-management-wrapper'
            ];`);
    });

    // 고정된 HTML을 새 파일로 저장
    const fixedFilePath = '/Users/yujeonghui/work/problem_bank/03_Design/CBS_문제은행_플랫폼_소개_v4_FIXED.html';

    fs.writeFile(fixedFilePath, fixedHtml, 'utf8', (writeErr) => {
        if (writeErr) {
            console.error('파일 쓰기 오류:', writeErr);
            return;
        }

        console.log('✅ 수정된 HTML 파일 생성 완료:', fixedFilePath);
        console.log('이제 새 파일로 테스트를 진행합니다...');

        // 새 파일로 테스트 실행
        testFixedFile(fixedFilePath);
    });
});

async function testFixedFile(filePath) {
    const { chromium } = require('playwright');

    const browser = await chromium.launch({ headless: false });
    const page = await browser.newPage();
    await page.setViewportSize({ width: 1400, height: 900 });

    await page.goto('file://' + filePath);
    await page.waitForTimeout(3000);

    console.log('=== 수정된 파일 테스트 ===');

    // 문항 관리 클릭
    await page.click('a[data-section="problem-management"]');
    await page.waitForTimeout(2000);

    const result = await page.evaluate(() => {
        const wrapper = document.querySelector('.problem-management-wrapper');
        const problemSearch = document.querySelector('.problem-search');
        const problemPool = document.querySelector('.problem-pool-content');

        return {
            wrapperExists: !!wrapper,
            wrapperVisible: wrapper ? wrapper.getBoundingClientRect().width > 0 : false,
            problemSearchExists: !!problemSearch,
            problemPoolExists: !!problemPool,
            problemSearchVisible: problemSearch ? problemSearch.getBoundingClientRect().width > 0 : false,
            problemPoolVisible: problemPool ? problemPool.getBoundingClientRect().width > 0 : false,
            wrapperClasses: wrapper ? wrapper.className : null
        };
    });

    console.log('테스트 결과:', result);

    await page.screenshot({ path: '/Users/yujeonghui/work/problem_bank/screenshots/fixed_file_test.png', fullPage: true });

    if (result.problemSearchVisible && result.problemPoolVisible) {
        console.log('🎉 성공! 문제가 해결되었습니다!');
    } else {
        console.log('❌ 여전히 문제가 있습니다. 다른 방법을 시도하겠습니다.');
    }

    console.log('브라우저를 열어둡니다. 직접 확인해보세요!');
    await page.waitForTimeout(15000);

    await browser.close();
}

console.log('HTML 파일 수정 및 테스트를 시작합니다...');