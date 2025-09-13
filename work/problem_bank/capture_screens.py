#!/usr/bin/env python3
import asyncio
from playwright.async_api import async_playwright
import os

async def capture_screens():
    # 파일 경로 설정
    html_file = "/Users/yujeonghui/work/problem_bank/03_Design/프로토타입_CBS스타일_통합_v2.html"
    screenshots_dir = "/Users/yujeonghui/work/problem_bank/screenshots"
    
    # 스크린샷 디렉토리 생성
    os.makedirs(screenshots_dir, exist_ok=True)
    
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=False)
        context = await browser.new_context(
            viewport={'width': 1920, 'height': 1080}
        )
        page = await context.new_page()
        
        try:
            # HTML 파일 로드
            await page.goto(f"file://{html_file}")
            await page.wait_for_load_state('networkidle')
            await page.wait_for_timeout(2000)  # 2초 대기
            
            print("=== 1단계 화면 캡처 시작 ===")
            
            # 1단계: 메인 대시보드 화면
            print("1-1. 메인 대시보드 캡처 중...")
            await page.screenshot(
                path=f"{screenshots_dir}/step1_dashboard.png",
                full_page=True
            )
            print("✓ step1_dashboard.png 저장 완료")
            
            # 1단계: PDF 자료 관리 화면
            print("1-2. PDF 자료 관리 화면으로 이동 중...")
            await page.click('text=📁 PDF 자료 관리')
            await page.wait_for_timeout(1000)
            await page.screenshot(
                path=f"{screenshots_dir}/step1_pdf_management.png",
                full_page=True
            )
            print("✓ step1_pdf_management.png 저장 완료")
            
            # 1단계: 파일 업로드 인터페이스 (PDF 관리 화면 내에 포함)
            print("1-3. 파일 업로드 인터페이스 캡처...")
            await page.screenshot(
                path=f"{screenshots_dir}/step1_file_upload.png",
                full_page=True
            )
            print("✓ step1_file_upload.png 저장 완료")
            
            print("=== 2단계 화면 캡처 시작 ===")
            
            # 2단계: AI 디지털화 화면
            print("2-1. AI 디지털화 화면으로 이동 중...")
            await page.click('text=🔄 AI 디지털화')
            await page.wait_for_timeout(1000)
            await page.screenshot(
                path=f"{screenshots_dir}/step2_ai_digitization.png",
                full_page=True
            )
            print("✓ step2_ai_digitization.png 저장 완료")
            
            # 2단계: OCR 변환 진행 화면 (디지털화 버튼 클릭)
            print("2-2. OCR 변환 진행 화면 캡처 중...")
            # 디지털화 시작 버튼 클릭
            try:
                await page.click('.btn-primary')
                await page.wait_for_timeout(2000)
                await page.screenshot(
                    path=f"{screenshots_dir}/step2_ocr_progress.png",
                    full_page=True
                )
                print("✓ step2_ocr_progress.png 저장 완료")
            except:
                print("! OCR 진행 화면 캡처 건너뜀")
            
            # 2단계: 변환 결과 화면
            print("2-3. 변환 결과 화면 캡처 중...")
            await page.wait_for_timeout(1000)
            await page.screenshot(
                path=f"{screenshots_dir}/step2_conversion_result.png",
                full_page=True
            )
            print("✓ step2_conversion_result.png 저장 완료")
            
            print("=== 3단계 화면 캡처 시작 ===")
            
            # 3단계: 문항 관리 화면
            print("3-1. 문항 관리 화면으로 이동 중...")
            await page.click('text=📚 문항 관리')
            await page.wait_for_timeout(1000)
            await page.screenshot(
                path=f"{screenshots_dir}/step3_item_management.png",
                full_page=True
            )
            print("✓ step3_item_management.png 저장 완료")
            
            # 3단계: 스마트 검색 인터페이스
            print("3-2. 스마트 검색 인터페이스 캡처 중...")
            await page.screenshot(
                path=f"{screenshots_dir}/step3_smart_search.png",
                full_page=True
            )
            print("✓ step3_smart_search.png 저장 완료")
            
            # 3단계: AI 스마트 검색 결과 화면 (검색 버튼 클릭)
            print("3-3. AI 스마트 검색 결과 화면 캡처 중...")
            try:
                # 검색어 입력
                await page.fill('input[type="text"]', '수학 함수')
                await page.click('.btn-primary')
                await page.wait_for_timeout(2000)
                await page.screenshot(
                    path=f"{screenshots_dir}/step3_search_results.png",
                    full_page=True
                )
                print("✓ step3_search_results.png 저장 완료")
            except:
                print("! 검색 결과 화면 캡처 건너뜀")
            
            print("=== 4단계 화면 캡처 시작 ===")
            
            # 4단계: 메타정보 관리 화면
            print("4-1. 메타정보 관리 화면으로 이동 중...")
            await page.click('text=🤖 메타정보 관리')
            await page.wait_for_timeout(1000)
            await page.screenshot(
                path=f"{screenshots_dir}/step4_meta_management.png",
                full_page=True
            )
            print("✓ step4_meta_management.png 저장 완료")
            
            # 4단계: AI 생성 화면 (해설/힌트 생성)
            print("4-2. AI 생성 화면 캡처 중...")
            try:
                await page.click('.btn-success')  # AI 생성 버튼
                await page.wait_for_timeout(2000)
                await page.screenshot(
                    path=f"{screenshots_dir}/step4_ai_generation.png",
                    full_page=True
                )
                print("✓ step4_ai_generation.png 저장 완료")
            except:
                print("! AI 생성 화면 캡처 건너뜀")
            
            # 4단계: 콘텐츠 생성 결과
            print("4-3. 콘텐츠 생성 결과 화면 캡처 중...")
            await page.screenshot(
                path=f"{screenshots_dir}/step4_content_result.png",
                full_page=True
            )
            print("✓ step4_content_result.png 저장 완료")
            
            print("=== 5단계 화면 캡처 시작 ===")
            
            # 5단계: 평가지 제작 화면
            print("5-1. 평가지 제작 화면으로 이동 중...")
            await page.click('text=📄 평가지 제작')
            await page.wait_for_timeout(1000)
            await page.screenshot(
                path=f"{screenshots_dir}/step5_assessment_creation.png",
                full_page=True
            )
            print("✓ step5_assessment_creation.png 저장 완료")
            
            # 5단계: 브랜드별 통계 화면
            print("5-2. 브랜드별 통계 화면 캡처 중...")
            try:
                # 통계 탭 클릭
                await page.click('button:has-text("통계")')
                await page.wait_for_timeout(1000)
                await page.screenshot(
                    path=f"{screenshots_dir}/step5_brand_statistics.png",
                    full_page=True
                )
                print("✓ step5_brand_statistics.png 저장 완료")
            except:
                print("! 브랜드 통계 화면 캡처 건너뜀")
            
            # 5단계: 통합 대시보드 상세 화면
            print("5-3. 통합 대시보드 상세 화면으로 이동 중...")
            await page.click('text=📊 통합 대시보드')
            await page.wait_for_timeout(1000)
            await page.screenshot(
                path=f"{screenshots_dir}/step5_dashboard_detail.png",
                full_page=True
            )
            print("✓ step5_dashboard_detail.png 저장 완료")
            
            print("\n=== 모든 화면 캡처 완료 ===")
            
        except Exception as e:
            print(f"Error: {e}")
        
        finally:
            await browser.close()

# 스크립트 실행
if __name__ == "__main__":
    asyncio.run(capture_screens())