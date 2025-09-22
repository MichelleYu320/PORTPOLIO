// 문항 관리 메뉴 셀렉터 디버깅
const { chromium } = require('playwright');

async function debugMenuSelector() {
    const browser = await chromium.launch({ headless: false });
    const page = await browser.newPage();

    // HTML 파일 열기
    await page.goto('file:///Users/yujeonghui/work/problem_bank/03_Design/CBS_문제은행_플랫폼_소개_v4_복구완료.html');

    // 페이지 로드 대기
    await page.waitForTimeout(2000);

    console.log('=== 메뉴 요소 확인 ===');

    // 문항 관리 메뉴 요소 확인
    const problemMenu = await page.locator('a[data-section="problem-management"]');
    const problemMenuExists = await problemMenu.count();
    console.log('문항 관리 메뉴 존재:', problemMenuExists > 0);

    if (problemMenuExists > 0) {
        const menuText = await problemMenu.textContent();
        console.log('문항 관리 메뉴 텍스트:', menuText.trim());

        const dataSection = await problemMenu.getAttribute('data-section');
        console.log('data-section 속성:', dataSection);
    }

    // 모든 메뉴 요소 확인
    console.log('\n=== 모든 메뉴 요소 ===');
    const allMenus = await page.locator('.sidebar-menu > li > a').all();
    for (let i = 0; i < allMenus.length; i++) {
        const menu = allMenus[i];
        const text = await menu.textContent();
        const dataSection = await menu.getAttribute('data-section');
        console.log(`메뉴 ${i + 1}: "${text.trim()}" - data-section: ${dataSection}`);
    }

    // 이벤트 리스너 작동 확인
    console.log('\n=== 이벤트 리스너 확인 ===');

    // 스크립트를 통해 직접 클릭 이벤트 확인
    await page.evaluate(() => {
        const problemMenu = document.querySelector('a[data-section="problem-management"]');
        console.log('문항 관리 메뉴 DOM 요소:', problemMenu);
        console.log('이벤트 리스너 개수:', getEventListeners ? getEventListeners(problemMenu) : '확인 불가');
    });

    // 수동으로 이벤트 트리거
    console.log('\n=== 수동 이벤트 트리거 ===');

    await page.evaluate(() => {
        const problemMenu = document.querySelector('a[data-section="problem-management"]');
        if (problemMenu) {
            console.log('문항 관리 메뉴에 click 이벤트 수동 트리거');
            problemMenu.click();
        }
    });

    await page.waitForTimeout(1000);

    // 상태 확인
    const problemSearchVisible = await page.isVisible('.problem-search');
    const problemPoolVisible = await page.isVisible('.problem-pool-content');
    console.log('수동 클릭 후 - 문항 검색 영역 표시:', problemSearchVisible);
    console.log('수동 클릭 후 - 문항 테이블 영역 표시:', problemPoolVisible);

    await page.waitForTimeout(5000);
    await browser.close();
}

debugMenuSelector().catch(console.error);