// 최종 종합 테스트
const { chromium } = require('playwright');

async function testFinalComprehensive() {
    const browser = await chromium.launch({
        headless: false,
        slowMo: 500
    });
    const page = await browser.newPage();
    await page.setViewportSize({ width: 1400, height: 900 });

    console.log('=== 최종 종합 테스트 시작 ===');

    try {
        await page.goto('file:///Users/yujeonghui/work/problem_bank/03_Design/CBS_문제은행_플랫폼_소개_v5.html');
        await page.waitForTimeout(3000);

        console.log('✅ 페이지 로드 성공');

        // 초기 상태 스크린샷
        await page.screenshot({ path: '/Users/yujeonghui/work/problem_bank/screenshots/final_comprehensive_01_initial.png', fullPage: true });

        // 1. 문항 관리 테스트
        console.log('\n1. 문항 관리 메뉴 테스트');
        await page.click('a[data-section="problem-management"]');
        await page.waitForTimeout(2000);

        const problemResult = await page.evaluate(() => {
            const section = document.getElementById('problem-management');
            const allSections = document.querySelectorAll('[id*="management"]');
            const visibleSections = [];

            allSections.forEach(sec => {
                if (sec.style.display !== 'none') {
                    visibleSections.push(sec.id);
                }
            });

            return {
                sectionExists: !!section,
                sectionVisible: section ? section.style.display !== 'none' : false,
                sectionDisplay: section ? section.style.display : null,
                allVisibleSections: visibleSections,
                sectionClasses: section ? section.className : null
            };
        });

        console.log('문항 관리 결과:', problemResult);
        await page.screenshot({ path: '/Users/yujeonghui/work/problem_bank/screenshots/final_comprehensive_02_problem.png', fullPage: true });

        // 2. PDF 관리 테스트
        console.log('\n2. PDF 관리 메뉴 테스트');
        await page.click('a[data-section="pdf-management"]');
        await page.waitForTimeout(2000);

        const pdfResult = await page.evaluate(() => {
            const section = document.getElementById('pdf-management');
            const allSections = document.querySelectorAll('[id*="management"]');
            const visibleSections = [];

            allSections.forEach(sec => {
                if (sec.style.display !== 'none') {
                    visibleSections.push(sec.id);
                }
            });

            return {
                sectionExists: !!section,
                sectionVisible: section ? section.style.display !== 'none' : false,
                sectionDisplay: section ? section.style.display : null,
                allVisibleSections: visibleSections,
                sectionClasses: section ? section.className : null
            };
        });

        console.log('PDF 관리 결과:', pdfResult);
        await page.screenshot({ path: '/Users/yujeonghui/work/problem_bank/screenshots/final_comprehensive_03_pdf.png', fullPage: true });

        // 3. 대시보드 테스트
        console.log('\n3. 대시보드 테스트');
        await page.click('a[data-section="dashboard"]');
        await page.waitForTimeout(2000);

        const dashboardResult = await page.evaluate(() => {
            const section = document.getElementById('dashboard');
            return {
                sectionExists: !!section,
                sectionVisible: section ? section.style.display !== 'none' : false,
                sectionDisplay: section ? section.style.display : null
            };
        });

        console.log('대시보드 결과:', dashboardResult);
        await page.screenshot({ path: '/Users/yujeonghui/work/problem_bank/screenshots/final_comprehensive_04_dashboard.png', fullPage: true });

        // 4. 메뉴 링크 확인
        console.log('\n4. 메뉴 링크 확인');
        const menuLinks = await page.evaluate(() => {
            const links = document.querySelectorAll('a[data-section]');
            const menuInfo = [];

            links.forEach(link => {
                menuInfo.push({
                    text: link.textContent.trim(),
                    dataSection: link.getAttribute('data-section'),
                    href: link.href
                });
            });

            return menuInfo;
        });

        console.log('메뉴 링크들:', menuLinks);

        // 최종 결과
        console.log('\n=== 최종 결과 ===');
        if (problemResult.sectionVisible) {
            console.log('✅ 문항 관리: 정상 표시');
        } else {
            console.log('❌ 문항 관리: 표시 안됨');
        }

        if (pdfResult.sectionVisible) {
            console.log('✅ PDF 관리: 정상 표시');
        } else {
            console.log('❌ PDF 관리: 표시 안됨');
        }

        if (dashboardResult.sectionVisible) {
            console.log('✅ 대시보드: 정상 표시');
        } else {
            console.log('❌ 대시보드: 표시 안됨');
        }

        console.log('\n브라우저를 열어둡니다. 수동으로 확인해보세요!');
        await page.waitForTimeout(60000);

    } catch (error) {
        console.error('테스트 중 오류 발생:', error);
    } finally {
        await browser.close();
    }
}

testFinalComprehensive().catch(console.error);