#!/usr/bin/env python3
"""
CBS 문제은행 프로토타입 빠른 화면 캡처 스크립트
"""

import asyncio
from playwright.async_api import async_playwright
import os

async def capture_specific_screens():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)  # headless로 빠르게 실행
        page = await browser.new_page()
        
        # 화면 크기를 1920x1080으로 설정
        await page.set_viewport_size({"width": 1920, "height": 1080})
        
        # 프로토타입 파일 경로
        file_path = "file:///Users/yujeonghui/work/problem_bank/03_Design/프로토타입_CBS스타일_통합_v2.html"
        
        # 파일 열기
        await page.goto(file_path)
        await page.wait_for_load_state('networkidle')
        
        # 스크린샷 저장 경로
        screenshot_dir = "/Users/yujeonghui/work/problem_bank/screenshots"
        
        print("프로토타입 페이지 로드 완료")
        await asyncio.sleep(1)
        
        captured_files = []
        
        # 주요 메뉴들만 빠르게 캡처
        menus = [
            ("교재/교과서", "step1_textbook_management"),
            ("기출문제", "step1_past_exam_management"), 
            ("처리 현황", "step1_processing_status"),
            ("OCR 변환", "step2_ocr_conversion"),
            ("수식 인식", "step2_formula_recognition"),
            ("이미지 추출", "step2_image_extraction"),
            ("변환 이력", "step2_conversion_history"),
            ("전체 문항", "step3_all_items"),
            ("국어", "step3_korean_items"),
            ("수학", "step3_math_items"),
            ("해설 생성", "step4_explanation_generation"),
            ("힌트 생성", "step4_hint_generation"),
            ("유사문항", "step4_similar_items"),
            ("난이도 분석", "step4_difficulty_analysis"),
            ("새 평가지", "step5_new_assessment"),
            ("템플릿 관리", "step5_template_management"),
            ("출제 기준", "step5_exam_criteria"),
            ("제작 이력", "step5_creation_history")
        ]
        
        for menu_text, filename in menus:
            try:
                print(f"캡처 중: {menu_text}")
                await page.click(f'text="{menu_text}"', timeout=3000)
                await asyncio.sleep(1)
                
                screenshot_path = os.path.join(screenshot_dir, f"{filename}.png")
                await page.screenshot(path=screenshot_path, full_page=True)
                captured_files.append(screenshot_path)
                print(f"저장됨: {screenshot_path}")
                
            except Exception as e:
                print(f"{menu_text} 캡처 실패: {e}")
                continue
        
        await browser.close()
        
        print(f"\n=== 캡처 완료 ===")
        print(f"총 {len(captured_files)}개의 스크린샷이 캡처되었습니다")
        return captured_files

if __name__ == "__main__":
    captured_files = asyncio.run(capture_specific_screens())