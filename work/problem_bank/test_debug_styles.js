const { chromium } = require('playwright');
const path = require('path');

(async () => {
  console.log('🔍 스타일 디버깅 테스트 시작');

  const browser = await chromium.launch({
    headless: false,
    slowMo: 500
  });

  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 }
  });

  const page = await context.newPage();

  try {
    const htmlPath = path.resolve(__dirname, '03_Design/CBS_문제은행_플랫폼_소개_v4_복구완료.html');
    const htmlUrl = `file://${htmlPath}`;

    console.log('📂 페이지 로딩...');
    await page.goto(htmlUrl);
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);

    // 1. 초기 상태에서 요소들의 display 스타일 확인
    console.log('\n1️⃣ 초기 상태 확인');
    const initialStyles = await page.evaluate(() => {
      const problemContent = document.querySelector('.problem-pool-content');
      const materialContent = document.querySelector('.material-pool-content');

      return {
        problemContent: {
          exists: !!problemContent,
          inlineStyle: problemContent ? problemContent.style.display : 'null',
          computedStyle: problemContent ? window.getComputedStyle(problemContent).display : 'null'
        },
        materialContent: {
          exists: !!materialContent,
          inlineStyle: materialContent ? materialContent.style.display : 'null',
          computedStyle: materialContent ? window.getComputedStyle(materialContent).display : 'null'
        }
      };
    });

    console.log('🎨 초기 상태:', initialStyles);

    // 2. 문항 관리 메뉴 클릭 후 확인
    console.log('\n2️⃣ 문항 관리 메뉴 클릭');
    await page.click('text=📚 문항 관리');
    await page.waitForTimeout(1000);

    const afterProblemClick = await page.evaluate(() => {
      const problemContent = document.querySelector('.problem-pool-content');
      const materialContent = document.querySelector('.material-pool-content');

      return {
        problemContent: {
          inlineStyle: problemContent ? problemContent.style.display : 'null',
          computedStyle: problemContent ? window.getComputedStyle(problemContent).display : 'null'
        },
        materialContent: {
          inlineStyle: materialContent ? materialContent.style.display : 'null',
          computedStyle: materialContent ? window.getComputedStyle(materialContent).display : 'null'
        }
      };
    });

    console.log('🎨 문항 관리 클릭 후:', afterProblemClick);

    // 3. 강제로 스타일 수정해보기
    console.log('\n3️⃣ 강제 스타일 수정 테스트');
    await page.evaluate(() => {
      const problemContent = document.querySelector('.problem-pool-content');
      if (problemContent) {
        problemContent.style.display = 'block';
        problemContent.style.visibility = 'visible';
        problemContent.style.opacity = '1';
        console.log('강제로 문항 관리 콘텐츠 표시 설정 완료');
      }
    });

    await page.waitForTimeout(1000);

    console.log('📸 강제 수정 후 스크린샷');
    await page.screenshot({
      path: 'screenshots/debug_forced_display.png',
      fullPage: true
    });

    // 4. PDF 자료 관리 테스트
    console.log('\n4️⃣ PDF 자료 관리 메뉴 클릭');
    await page.click('text=📁 PDF 자료 관리');
    await page.waitForTimeout(1000);

    await page.evaluate(() => {
      const materialContent = document.querySelector('.material-pool-content');
      if (materialContent) {
        materialContent.style.display = 'block';
        materialContent.style.visibility = 'visible';
        materialContent.style.opacity = '1';
        console.log('강제로 PDF 자료 관리 콘텐츠 표시 설정 완료');
      }
    });

    await page.waitForTimeout(1000);

    console.log('📸 PDF 관리 강제 수정 후 스크린샷');
    await page.screenshot({
      path: 'screenshots/debug_forced_pdf_display.png',
      fullPage: true
    });

    // 5. switchContent 함수가 제대로 동작하는지 확인
    console.log('\n5️⃣ switchContent 함수 직접 호출 테스트');
    const functionTest = await page.evaluate(() => {
      try {
        if (typeof switchContent === 'function') {
          switchContent('📚 문항 관리');

          // 함수 실행 후 상태 확인
          const problemContent = document.querySelector('.problem-pool-content');
          return {
            success: true,
            afterFunction: {
              inlineStyle: problemContent ? problemContent.style.display : 'null',
              computedStyle: problemContent ? window.getComputedStyle(problemContent).display : 'null'
            }
          };
        } else {
          return { success: false, error: 'switchContent function not found' };
        }
      } catch (error) {
        return { success: false, error: error.message };
      }
    });

    console.log('⚙️ switchContent 함수 테스트 결과:', functionTest);

    console.log('\n✅ 디버깅 테스트 완료!');

  } catch (error) {
    console.error('❌ 테스트 실행 중 오류:', error);

    await page.screenshot({
      path: 'screenshots/debug_error.png',
      fullPage: true
    });
  } finally {
    await browser.close();
  }
})();