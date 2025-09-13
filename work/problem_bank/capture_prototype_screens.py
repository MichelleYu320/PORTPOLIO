#!/usr/bin/env python3
"""
CBS 문제은행 프로토타입 화면 캡처 스크립트
각 단계별 화면들을 체계적으로 캡처합니다.
"""

import asyncio
from playwright.async_api import async_playwright
import os
import time

async def capture_cbs_prototype_screens():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=False)  # 디버깅을 위해 headless=False
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
        print(f"페이지 제목: {await page.title()}")
        
        # 페이지가 로드된 후 잠시 대기
        await asyncio.sleep(2)
        
        captured_files = []
        
        # 1단계 - 기출시험지 관리
        print("\n=== 1단계: 기출시험지 관리 화면 캡처 ===")
        
        # 1-1. 메인 대시보드 화면 (기본 로딩 화면)
        print("1-1. 메인 대시보드 화면 캡처")
        screenshot_path = os.path.join(screenshot_dir, "step1_dashboard.png")
        await page.screenshot(path=screenshot_path, full_page=True)
        captured_files.append(screenshot_path)
        print(f"저장됨: {screenshot_path}")
        
        # 사이드바 메뉴들을 찾기 위해 페이지 구조 확인
        print("페이지 내 네비게이션 메뉴 확인...")
        
        # 1-2. PDF 자료 관리 화면
        print("1-2. PDF 자료 관리 화면 캡처 시도")
        try:
            # 다양한 셀렉터로 PDF 자료 관리 메뉴 클릭 시도
            selectors_to_try = [
                'text="PDF 자료 관리"',
                '[data-menu="pdf-management"]',
                '.nav-item:has-text("PDF")',
                'a[href*="pdf"]',
                'li:has-text("PDF")',
                '.sidebar a:has-text("PDF")'
            ]
            
            clicked = False
            for selector in selectors_to_try:
                try:
                    await page.click(selector, timeout=2000)
                    clicked = True
                    break
                except:
                    continue
            
            if clicked:
                await asyncio.sleep(2)
                screenshot_path = os.path.join(screenshot_dir, "step1_pdf_management.png")
                await page.screenshot(path=screenshot_path, full_page=True)
                captured_files.append(screenshot_path)
                print(f"저장됨: {screenshot_path}")
            else:
                print("PDF 자료 관리 메뉴를 찾을 수 없습니다.")
                
        except Exception as e:
            print(f"PDF 자료 관리 화면 캡처 실패: {e}")
        
        # 2단계 - OCR 및 디지털화
        print("\n=== 2단계: OCR 및 디지털화 화면 캡처 ===")
        
        # 2-1. AI 디지털화 화면
        print("2-1. AI 디지털화 화면 캡처 시도")
        try:
            selectors_to_try = [
                'text="AI 디지털화"',
                '[data-menu="ai-digitization"]',
                '.nav-item:has-text("AI")',
                'a[href*="digitization"]',
                'li:has-text("디지털화")',
                '.sidebar a:has-text("AI")'
            ]
            
            clicked = False
            for selector in selectors_to_try:
                try:
                    await page.click(selector, timeout=2000)
                    clicked = True
                    break
                except:
                    continue
            
            if clicked:
                await asyncio.sleep(2)
                screenshot_path = os.path.join(screenshot_dir, "step2_ai_digitization.png")
                await page.screenshot(path=screenshot_path, full_page=True)
                captured_files.append(screenshot_path)
                print(f"저장됨: {screenshot_path}")
            else:
                print("AI 디지털화 메뉴를 찾을 수 없습니다.")
                
        except Exception as e:
            print(f"AI 디지털화 화면 캡처 실패: {e}")
        
        # 3단계 - 문제은행 구축
        print("\n=== 3단계: 문제은행 구축 화면 캡처 ===")
        
        # 3-1. 문항 관리 화면
        print("3-1. 문항 관리 화면 캡처 시도")
        try:
            selectors_to_try = [
                'text="문항 관리"',
                '[data-menu="item-management"]',
                '.nav-item:has-text("문항")',
                'a[href*="item"]',
                'li:has-text("문항")',
                '.sidebar a:has-text("문항")'
            ]
            
            clicked = False
            for selector in selectors_to_try:
                try:
                    await page.click(selector, timeout=2000)
                    clicked = True
                    break
                except:
                    continue
            
            if clicked:
                await asyncio.sleep(2)
                screenshot_path = os.path.join(screenshot_dir, "step3_item_management.png")
                await page.screenshot(path=screenshot_path, full_page=True)
                captured_files.append(screenshot_path)
                print(f"저장됨: {screenshot_path}")
            else:
                print("문항 관리 메뉴를 찾을 수 없습니다.")
                
        except Exception as e:
            print(f"문항 관리 화면 캡처 실패: {e}")
        
        # 4단계 - 콘텐츠 확장
        print("\n=== 4단계: 콘텐츠 확장 화면 캡처 ===")
        
        # 4-1. 메타정보 관리 화면
        print("4-1. 메타정보 관리 화면 캡처 시도")
        try:
            selectors_to_try = [
                'text="메타정보 관리"',
                '[data-menu="meta-management"]',
                '.nav-item:has-text("메타")',
                'a[href*="meta"]',
                'li:has-text("메타")',
                '.sidebar a:has-text("메타")'
            ]
            
            clicked = False
            for selector in selectors_to_try:
                try:
                    await page.click(selector, timeout=2000)
                    clicked = True
                    break
                except:
                    continue
            
            if clicked:
                await asyncio.sleep(2)
                screenshot_path = os.path.join(screenshot_dir, "step4_meta_management.png")
                await page.screenshot(path=screenshot_path, full_page=True)
                captured_files.append(screenshot_path)
                print(f"저장됨: {screenshot_path}")
            else:
                print("메타정보 관리 메뉴를 찾을 수 없습니다.")
                
        except Exception as e:
            print(f"메타정보 관리 화면 캡처 실패: {e}")
        
        # 5단계 - 서비스 확장
        print("\n=== 5단계: 서비스 확장 화면 캡처 ===")
        
        # 5-1. 평가지 제작 화면
        print("5-1. 평가지 제작 화면 캡처 시도")
        try:
            selectors_to_try = [
                'text="평가지 제작"',
                '[data-menu="assessment-creation"]',
                '.nav-item:has-text("평가지")',
                'a[href*="assessment"]',
                'li:has-text("평가")',
                '.sidebar a:has-text("평가")'
            ]
            
            clicked = False
            for selector in selectors_to_try:
                try:
                    await page.click(selector, timeout=2000)
                    clicked = True
                    break
                except:
                    continue
            
            if clicked:
                await asyncio.sleep(2)
                screenshot_path = os.path.join(screenshot_dir, "step5_assessment_creation.png")
                await page.screenshot(path=screenshot_path, full_page=True)
                captured_files.append(screenshot_path)
                print(f"저장됨: {screenshot_path}")
            else:
                print("평가지 제작 메뉴를 찾을 수 없습니다.")
                
        except Exception as e:
            print(f"평가지 제작 화면 캡처 실패: {e}")
        
        # 페이지 구조 분석 - 실제 메뉴 확인
        print("\n=== 페이지 구조 분석 ===")
        try:
            # 사이드바나 네비게이션 메뉴 찾기
            nav_elements = await page.query_selector_all('.sidebar a, .nav-item, nav a, .menu-item')
            print(f"발견된 네비게이션 요소: {len(nav_elements)}개")
            
            for i, element in enumerate(nav_elements):
                text_content = await element.text_content()
                if text_content and text_content.strip():
                    print(f"  {i+1}. {text_content.strip()}")
        except Exception as e:
            print(f"페이지 구조 분석 실패: {e}")
        
        await browser.close()
        
        print(f"\n=== 캡처 완료 ===")
        print(f"총 {len(captured_files)}개의 스크린샷이 캡처되었습니다:")
        for file_path in captured_files:
            print(f"  - {file_path}")
        
        return captured_files

if __name__ == "__main__":
    captured_files = asyncio.run(capture_cbs_prototype_screens())