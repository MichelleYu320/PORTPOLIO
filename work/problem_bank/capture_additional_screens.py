#!/usr/bin/env python3
import asyncio
from playwright.async_api import async_playwright
import os

async def capture_additional_screens():
    html_file = "/Users/yujeonghui/work/problem_bank/03_Design/프로토타입_CBS스타일_통합_v2.html"
    screenshots_dir = "/Users/yujeonghui/work/problem_bank/screenshots"
    
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=False)
        context = await browser.new_context(
            viewport={'width': 1920, 'height': 1080}
        )
        page = await context.new_page()
        
        try:
            await page.goto(f"file://{html_file}")
            await page.wait_for_load_state('networkidle')
            await page.wait_for_timeout(2000)
            
            print("=== 추가 세부 화면 캡처 시작 ===")
            
            # 문항 관리 - PDF자료 검색 탭
            print("문항 관리 화면으로 이동...")
            await page.click('text=📚 문항 관리')
            await page.wait_for_timeout(1000)
            
            print("PDF자료 검색 탭 클릭...")
            await page.click('#pdf-search-tab')
            await page.wait_for_timeout(1000)
            await page.screenshot(
                path=f"{screenshots_dir}/step3_pdf_search_tab.png",
                full_page=True
            )
            print("✓ step3_pdf_search_tab.png 저장 완료")
            
            # AI 디지털화 화면에서 업로드 영역 캡처
            print("AI 디지털화 화면으로 이동...")
            await page.click('text=🔄 AI 디지털화')
            await page.wait_for_timeout(1000)
            
            # 업로드 영역만 스크린샷
            upload_area = await page.query_selector('.upload-section')
            if upload_area:
                await upload_area.screenshot(
                    path=f"{screenshots_dir}/step2_upload_area.png"
                )
                print("✓ step2_upload_area.png 저장 완료")
            
            # OCR 처리 진행 영역 캡처
            progress_area = await page.query_selector('.processing-section')
            if progress_area:
                await progress_area.screenshot(
                    path=f"{screenshots_dir}/step2_ocr_processing.png"
                )
                print("✓ step2_ocr_processing.png 저장 완료")
            
            # 메타정보 관리 - AI 해설 생성 화면
            print("메타정보 관리 화면으로 이동...")
            await page.click('text=🤖 메타정보 관리')
            await page.wait_for_timeout(1000)
            
            # AI 해설 생성 버튼이 있다면 클릭
            try:
                ai_buttons = await page.query_selector_all('button:has-text("AI")')
                if ai_buttons:
                    await ai_buttons[0].click()
                    await page.wait_for_timeout(2000)
                    await page.screenshot(
                        path=f"{screenshots_dir}/step4_ai_explanation.png",
                        full_page=True
                    )
                    print("✓ step4_ai_explanation.png 저장 완료")
            except:
                print("! AI 해설 생성 화면 캡처 건너뜀")
            
            # 평가지 제작 - 템플릿 선택 화면
            print("평가지 제작 화면으로 이동...")
            await page.click('text=📄 평가지 제작')
            await page.wait_for_timeout(1000)
            
            # 템플릿 카드들이 있는 영역 캡처
            template_area = await page.query_selector('.template-grid')
            if template_area:
                await template_area.screenshot(
                    path=f"{screenshots_dir}/step5_template_selection.png"
                )
                print("✓ step5_template_selection.png 저장 완료")
            
            print("=== 추가 화면 캡처 완료 ===")
            
        except Exception as e:
            print(f"Error: {e}")
        
        finally:
            await browser.close()

if __name__ == "__main__":
    asyncio.run(capture_additional_screens())