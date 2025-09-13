#!/usr/bin/env python3
"""
CBS 문제은행 프로토타입 세부 화면 캡처 스크립트
각 단계별 세부 기능 화면들을 추가로 캡처합니다.
"""

import asyncio
from playwright.async_api import async_playwright
import os

async def capture_detailed_screens():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=False)
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
        
        print("프로토타입 페이지 로드 완료 - 세부 화면 캡처 시작")
        
        await asyncio.sleep(2)
        captured_files = []
        
        # 1단계 세부 화면들
        print("\n=== 1단계: 기출시험지 관리 세부 화면 캡처 ===")
        
        # 1-3. 교재/교과서 화면
        print("1-3. 교재/교과서 화면 캡처")
        try:
            await page.click('text="교재/교과서"')
            await asyncio.sleep(2)
            screenshot_path = os.path.join(screenshot_dir, "step1_textbook_management.png")
            await page.screenshot(path=screenshot_path, full_page=True)
            captured_files.append(screenshot_path)
            print(f"저장됨: {screenshot_path}")
        except Exception as e:
            print(f"교재/교과서 화면 캡처 실패: {e}")
        
        # 1-4. 기출문제 화면
        print("1-4. 기출문제 화면 캡처")
        try:
            await page.click('text="기출문제"')
            await asyncio.sleep(2)
            screenshot_path = os.path.join(screenshot_dir, "step1_past_exam_management.png")
            await page.screenshot(path=screenshot_path, full_page=True)
            captured_files.append(screenshot_path)
            print(f"저장됨: {screenshot_path}")
        except Exception as e:
            print(f"기출문제 화면 캡처 실패: {e}")
        
        # 1-5. 처리 현황 화면
        print("1-5. 처리 현황 화면 캡처")
        try:
            await page.click('text="처리 현황"')
            await asyncio.sleep(2)
            screenshot_path = os.path.join(screenshot_dir, "step1_processing_status.png")
            await page.screenshot(path=screenshot_path, full_page=True)
            captured_files.append(screenshot_path)
            print(f"저장됨: {screenshot_path}")
        except Exception as e:
            print(f"처리 현황 화면 캡처 실패: {e}")
        
        # 2단계 세부 화면들
        print("\n=== 2단계: OCR 및 디지털화 세부 화면 캡처 ===")
        
        # 2-2. OCR 변환 화면
        print("2-2. OCR 변환 화면 캡처")
        try:
            await page.click('text="OCR 변환"')
            await asyncio.sleep(2)
            screenshot_path = os.path.join(screenshot_dir, "step2_ocr_conversion.png")
            await page.screenshot(path=screenshot_path, full_page=True)
            captured_files.append(screenshot_path)
            print(f"저장됨: {screenshot_path}")
        except Exception as e:
            print(f"OCR 변환 화면 캡처 실패: {e}")
        
        # 2-3. 수식 인식 화면
        print("2-3. 수식 인식 화면 캡처")
        try:
            await page.click('text="수식 인식"')
            await asyncio.sleep(2)
            screenshot_path = os.path.join(screenshot_dir, "step2_formula_recognition.png")
            await page.screenshot(path=screenshot_path, full_page=True)
            captured_files.append(screenshot_path)
            print(f"저장됨: {screenshot_path}")
        except Exception as e:
            print(f"수식 인식 화면 캡처 실패: {e}")
        
        # 2-4. 이미지 추출 화면
        print("2-4. 이미지 추출 화면 캡처")
        try:
            await page.click('text="이미지 추출"')
            await asyncio.sleep(2)
            screenshot_path = os.path.join(screenshot_dir, "step2_image_extraction.png")
            await page.screenshot(path=screenshot_path, full_page=True)
            captured_files.append(screenshot_path)
            print(f"저장됨: {screenshot_path}")
        except Exception as e:
            print(f"이미지 추출 화면 캡처 실패: {e}")
        
        # 2-5. 변환 이력 화면
        print("2-5. 변환 이력 화면 캡처")
        try:
            await page.click('text="변환 이력"')
            await asyncio.sleep(2)
            screenshot_path = os.path.join(screenshot_dir, "step2_conversion_history.png")
            await page.screenshot(path=screenshot_path, full_page=True)
            captured_files.append(screenshot_path)
            print(f"저장됨: {screenshot_path}")
        except Exception as e:
            print(f"변환 이력 화면 캡처 실패: {e}")
        
        # 3단계 세부 화면들
        print("\n=== 3단계: 문제은행 구축 세부 화면 캡처 ===")
        
        # 3-2. 전체 문항 화면
        print("3-2. 전체 문항 화면 캡처")
        try:
            await page.click('text="전체 문항"')
            await asyncio.sleep(2)
            screenshot_path = os.path.join(screenshot_dir, "step3_all_items.png")
            await page.screenshot(path=screenshot_path, full_page=True)
            captured_files.append(screenshot_path)
            print(f"저장됨: {screenshot_path}")
        except Exception as e:
            print(f"전체 문항 화면 캡처 실패: {e}")
        
        # 3-3. 국어 문항 화면
        print("3-3. 국어 문항 화면 캡처")
        try:
            await page.click('text="국어"')
            await asyncio.sleep(2)
            screenshot_path = os.path.join(screenshot_dir, "step3_korean_items.png")
            await page.screenshot(path=screenshot_path, full_page=True)
            captured_files.append(screenshot_path)
            print(f"저장됨: {screenshot_path}")
        except Exception as e:
            print(f"국어 문항 화면 캡처 실패: {e}")
        
        # 3-4. 수학 문항 화면
        print("3-4. 수학 문항 화면 캡처")
        try:
            await page.click('text="수학"')
            await asyncio.sleep(2)
            screenshot_path = os.path.join(screenshot_dir, "step3_math_items.png")
            await page.screenshot(path=screenshot_path, full_page=True)
            captured_files.append(screenshot_path)
            print(f"저장됨: {screenshot_path}")
        except Exception as e:
            print(f"수학 문항 화면 캡처 실패: {e}")
        
        # 4단계 세부 화면들
        print("\n=== 4단계: 콘텐츠 확장 세부 화면 캡처 ===")
        
        # 4-2. 해설 생성 화면
        print("4-2. 해설 생성 화면 캡처")
        try:
            await page.click('text="해설 생성"')
            await asyncio.sleep(2)
            screenshot_path = os.path.join(screenshot_dir, "step4_explanation_generation.png")
            await page.screenshot(path=screenshot_path, full_page=True)
            captured_files.append(screenshot_path)
            print(f"저장됨: {screenshot_path}")
        except Exception as e:
            print(f"해설 생성 화면 캡처 실패: {e}")
        
        # 4-3. 힌트 생성 화면
        print("4-3. 힌트 생성 화면 캡처")
        try:
            await page.click('text="힌트 생성"')
            await asyncio.sleep(2)
            screenshot_path = os.path.join(screenshot_dir, "step4_hint_generation.png")
            await page.screenshot(path=screenshot_path, full_page=True)
            captured_files.append(screenshot_path)
            print(f"저장됨: {screenshot_path}")
        except Exception as e:
            print(f"힌트 생성 화면 캡처 실패: {e}")
        
        # 4-4. 유사문항 화면
        print("4-4. 유사문항 화면 캡처")
        try:
            await page.click('text="유사문항"')
            await asyncio.sleep(2)
            screenshot_path = os.path.join(screenshot_dir, "step4_similar_items.png")
            await page.screenshot(path=screenshot_path, full_page=True)
            captured_files.append(screenshot_path)
            print(f"저장됨: {screenshot_path}")
        except Exception as e:
            print(f"유사문항 화면 캡처 실패: {e}")
        
        # 4-5. 난이도 분석 화면
        print("4-5. 난이도 분석 화면 캡처")
        try:
            await page.click('text="난이도 분석"')
            await asyncio.sleep(2)
            screenshot_path = os.path.join(screenshot_dir, "step4_difficulty_analysis.png")
            await page.screenshot(path=screenshot_path, full_page=True)
            captured_files.append(screenshot_path)
            print(f"저장됨: {screenshot_path}")
        except Exception as e:
            print(f"난이도 분석 화면 캡처 실패: {e}")
        
        # 5단계 세부 화면들
        print("\n=== 5단계: 서비스 확장 세부 화면 캡처 ===")
        
        # 5-2. 새 평가지 화면
        print("5-2. 새 평가지 화면 캡처")
        try:
            await page.click('text="새 평가지"')
            await asyncio.sleep(2)
            screenshot_path = os.path.join(screenshot_dir, "step5_new_assessment.png")
            await page.screenshot(path=screenshot_path, full_page=True)
            captured_files.append(screenshot_path)
            print(f"저장됨: {screenshot_path}")
        except Exception as e:
            print(f"새 평가지 화면 캡처 실패: {e}")
        
        # 5-3. 템플릿 관리 화면
        print("5-3. 템플릿 관리 화면 캡처")
        try:
            await page.click('text="템플릿 관리"')
            await asyncio.sleep(2)
            screenshot_path = os.path.join(screenshot_dir, "step5_template_management.png")
            await page.screenshot(path=screenshot_path, full_page=True)
            captured_files.append(screenshot_path)
            print(f"저장됨: {screenshot_path}")
        except Exception as e:
            print(f"템플릿 관리 화면 캡처 실패: {e}")
        
        # 5-4. 출제 기준 화면
        print("5-4. 출제 기준 화면 캡처")
        try:
            await page.click('text="출제 기준"')
            await asyncio.sleep(2)
            screenshot_path = os.path.join(screenshot_dir, "step5_exam_criteria.png")
            await page.screenshot(path=screenshot_path, full_page=True)
            captured_files.append(screenshot_path)
            print(f"저장됨: {screenshot_path}")
        except Exception as e:
            print(f"출제 기준 화면 캡처 실패: {e}")
        
        # 5-5. 제작 이력 화면
        print("5-5. 제작 이력 화면 캡처")
        try:
            await page.click('text="제작 이력"')
            await asyncio.sleep(2)
            screenshot_path = os.path.join(screenshot_dir, "step5_creation_history.png")
            await page.screenshot(path=screenshot_path, full_page=True)
            captured_files.append(screenshot_path)
            print(f"저장됨: {screenshot_path}")
        except Exception as e:
            print(f"제작 이력 화면 캡처 실패: {e}")
        
        await browser.close()
        
        print(f"\n=== 세부 화면 캡처 완료 ===")
        print(f"총 {len(captured_files)}개의 추가 스크린샷이 캡처되었습니다:")
        for file_path in captured_files:
            print(f"  - {file_path}")
        
        return captured_files

if __name__ == "__main__":
    captured_files = asyncio.run(capture_detailed_screens())