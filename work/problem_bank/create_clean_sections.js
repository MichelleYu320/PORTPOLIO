// 깔끔한 섹션만 만들기
const fs = require('fs');

// 기존 파일을 읽어서 문항관리, PDF관리 섹션만 깔끔하게 교체
fs.readFile('/Users/yujeonghui/work/problem_bank/03_Design/CBS_문제은행_플랫폼_소개_v5.html', 'utf8', (err, data) => {
    if (err) {
        console.error('파일 읽기 오류:', err);
        return;
    }

    console.log('기존 HTML 파일 읽기 완료');

    // 1. 문항 관리 섹션을 간단하고 깔끔하게 교체
    const problemManagementPattern = /<div class="problem-management-content" id="problem-management"[^>]*>[\s\S]*?(?=<!-- PDF 자료 관리 콘텐츠 -->)/;

    const cleanProblemSection = `<div class="problem-management-content" id="problem-management" style="display: none; padding: 20px; background: white;">
                <!-- AI 스마트 검색 영역 -->
                <div style="background: #f8fafc; border-radius: 12px; padding: 24px; margin-bottom: 24px; border: 1px solid #e2e8f0;">
                    <div style="margin-bottom: 16px;">
                        <h2 style="font-size: 18px; font-weight: 600; color: #1e40af; margin: 0; display: flex; align-items: center; gap: 8px;">
                            🤖 AI 스마트 검색
                        </h2>
                    </div>
                    <div style="display: flex; align-items: center; background: white; border: 1px solid #d1d5db; border-radius: 8px; padding: 12px; gap: 12px;">
                        <input type="text" placeholder="예: '이차함수 최댓값 문제 찾아줘' 또는 이미지를 업로드하세요"
                               style="flex: 1; border: none; outline: none; font-size: 14px; color: #374151;">
                        <div style="display: flex; gap: 8px; align-items: center;">
                            <button style="background: none; border: none; padding: 4px; cursor: pointer; font-size: 16px;">📷</button>
                            <button style="background: none; border: none; padding: 4px; cursor: pointer; font-size: 16px;">✏️</button>
                            <button style="background: #3b82f6; color: white; border: none; padding: 8px 16px; border-radius: 6px; font-size: 14px; font-weight: 500; cursor: pointer;">전송</button>
                        </div>
                    </div>
                    <div style="margin-top: 12px; display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
                        <span style="font-size: 12px; color: #6b7280;">추천 검색:</span>
                        <button style="background: #f3f4f6; border: 1px solid #d1d5db; border-radius: 12px; padding: 4px 10px; font-size: 12px; color: #374151; cursor: pointer;">중3 일차함수</button>
                        <button style="background: #f3f4f6; border: 1px solid #d1d5db; border-radius: 12px; padding: 4px 10px; font-size: 12px; color: #374151; cursor: pointer;">확률 문제</button>
                        <button style="background: #f3f4f6; border: 1px solid #d1d5db; border-radius: 12px; padding: 4px 10px; font-size: 12px; color: #374151; cursor: pointer;">객관식 5지선다</button>
                        <button style="background: #f3f4f6; border: 1px solid #d1d5db; border-radius: 12px; padding: 4px 10px; font-size: 12px; color: #374151; cursor: pointer;">난이도 중간</button>
                    </div>
                </div>

                <!-- 필터 검색 영역 -->
                <div style="background: white; border-radius: 8px; padding: 20px; margin-bottom: 20px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); border: 1px solid #e2e8f0;">
                    <div style="display: flex; gap: 12px; align-items: center; flex-wrap: wrap;">
                        <select style="padding: 8px 12px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 14px; background: white; min-width: 120px;">
                            <option>학년: 전체</option>
                            <option>초등</option>
                            <option>중1</option>
                            <option>중2</option>
                            <option>중3</option>
                            <option>고1</option>
                            <option>고2</option>
                            <option>고3</option>
                        </select>
                        <select style="padding: 8px 12px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 14px; background: white; min-width: 120px;">
                            <option>과목: 전체</option>
                            <option>수학</option>
                            <option>국어</option>
                            <option>영어</option>
                            <option>과학</option>
                            <option>사회</option>
                        </select>
                        <select style="padding: 8px 12px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 14px; background: white; min-width: 120px;">
                            <option>난이도: 전체</option>
                            <option>최하</option>
                            <option>하</option>
                            <option>중</option>
                            <option>상</option>
                            <option>최상</option>
                        </select>
                        <select style="padding: 8px 12px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 14px; background: white; min-width: 120px;">
                            <option>문항유형: 전체</option>
                            <option>객관식</option>
                            <option>주관식</option>
                            <option>서술형</option>
                        </select>
                        <button style="background: #3b82f6; color: white; border: none; padding: 8px 20px; border-radius: 6px; font-size: 14px; font-weight: 500; cursor: pointer;">검색</button>
                    </div>
                </div>

                <!-- 결과 표시 및 액션 버튼 -->
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                    <div style="font-size: 14px; color: #374151;">
                        총 2,847개 문항 | 선택: 0개
                    </div>
                    <div style="display: flex; gap: 8px;">
                        <button style="background: #f9fafb; color: #374151; border: 1px solid #d1d5db; padding: 8px 16px; border-radius: 6px; font-size: 14px; cursor: pointer;">엑셀 다운로드</button>
                        <button style="background: #3b82f6; color: white; border: none; padding: 8px 16px; border-radius: 6px; font-size: 14px; cursor: pointer;">문제 등록</button>
                        <button style="background: #3b82f6; color: white; border: none; padding: 8px 16px; border-radius: 6px; font-size: 14px; cursor: pointer;">일괄 등록</button>
                    </div>
                </div>

                <!-- 문항 관리 테이블 -->
                <div style="background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.1); border: 1px solid #e2e8f0;">
                    <table style="width: 100%; border-collapse: collapse;">
                        <thead style="background: #f8fafc;">
                            <tr>
                                <th style="padding: 12px 8px; text-align: center; font-size: 13px; font-weight: 600; color: #374151; border-bottom: 1px solid #e5e7eb; width: 50px;">
                                    <input type="checkbox" style="cursor: pointer;">
                                </th>
                                <th style="padding: 12px 8px; text-align: center; font-size: 13px; font-weight: 600; color: #374151; border-bottom: 1px solid #e5e7eb; width: 100px;">문제번호</th>
                                <th style="padding: 12px 8px; text-align: left; font-size: 13px; font-weight: 600; color: #374151; border-bottom: 1px solid #e5e7eb; width: 250px;">문제명</th>
                                <th style="padding: 12px 8px; text-align: center; font-size: 13px; font-weight: 600; color: #374151; border-bottom: 1px solid #e5e7eb; width: 100px;">과목</th>
                                <th style="padding: 12px 8px; text-align: center; font-size: 13px; font-weight: 600; color: #374151; border-bottom: 1px solid #e5e7eb; width: 100px;">학년</th>
                                <th style="padding: 12px 8px; text-align: center; font-size: 13px; font-weight: 600; color: #374151; border-bottom: 1px solid #e5e7eb; width: 100px;">문제유형</th>
                                <th style="padding: 12px 8px; text-align: center; font-size: 13px; font-weight: 600; color: #374151; border-bottom: 1px solid #e5e7eb; width: 100px;">정답률</th>
                                <th style="padding: 12px 8px; text-align: center; font-size: 13px; font-weight: 600; color: #374151; border-bottom: 1px solid #e5e7eb; width: 100px;">사용횟수</th>
                                <th style="padding: 12px 8px; text-align: center; font-size: 13px; font-weight: 600; color: #374151; border-bottom: 1px solid #e5e7eb; width: 150px;">액션</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr style="border-bottom: 1px solid #f0f0f0;">
                                <td style="padding: 12px 8px; text-align: center;">
                                    <input type="checkbox" style="cursor: pointer;">
                                </td>
                                <td style="padding: 12px 8px; text-align: center; font-weight: 600; color: #1f2937;">Q001</td>
                                <td style="padding: 12px 8px;">
                                    <div style="font-weight: 600; color: #1f2937; font-size: 14px; margin-bottom: 4px;">이차함수 최댓값 구하기</div>
                                    <div style="font-size: 12px; color: #6b7280;">이차함수 y = -x² + 4x - 1의 최댓값을 구하시오</div>
                                </td>
                                <td style="padding: 12px 8px; text-align: center; font-size: 13px;">수학</td>
                                <td style="padding: 12px 8px; text-align: center; font-size: 13px;">중3</td>
                                <td style="padding: 12px 8px; text-align: center; font-size: 13px;">주관식</td>
                                <td style="padding: 12px 8px; text-align: center; font-size: 13px;">75.2%</td>
                                <td style="padding: 12px 8px; text-align: center; font-size: 13px;">321회</td>
                                <td style="padding: 12px 8px; text-align: center;">
                                    <div style="display: flex; flex-direction: column; gap: 2px;">
                                        <button style="background: white; border: 1px solid #d1d5db; color: #374151; padding: 3px 6px; border-radius: 4px; font-size: 10px; cursor: pointer;">편집</button>
                                        <button style="background: white; border: 1px solid #d1d5db; color: #374151; padding: 3px 6px; border-radius: 4px; font-size: 10px; cursor: pointer;">미리보기</button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <!-- 페이지네이션 -->
                    <div style="display: flex; justify-content: center; align-items: center; gap: 8px; padding: 20px; background: white; border-top: 1px solid #e5e7eb;">
                        <button style="padding: 8px 12px; border: 1px solid #d1d5db; background: white; border-radius: 6px; font-size: 13px; color: #374151; cursor: pointer;">이전</button>
                        <button style="padding: 8px 12px; border: 1px solid #3b82f6; background: #3b82f6; color: white; border-radius: 6px; font-size: 13px; cursor: pointer;">1</button>
                        <button style="padding: 8px 12px; border: 1px solid #d1d5db; background: white; border-radius: 6px; font-size: 13px; color: #374151; cursor: pointer;">2</button>
                        <button style="padding: 8px 12px; border: 1px solid #d1d5db; background: white; border-radius: 6px; font-size: 13px; color: #374151; cursor: pointer;">3</button>
                        <button style="padding: 8px 12px; border: 1px solid #d1d5db; background: white; border-radius: 6px; font-size: 13px; color: #374151; cursor: pointer;">다음</button>
                    </div>
                </div>
            </div>

            `;

    let fixedHtml = data.replace(problemManagementPattern, cleanProblemSection);

    // 2. PDF 관리 섹션도 간단하고 깔끔하게 교체 (기존 것 유지하되 더 간단하게)
    const pdfManagementPattern = /<div class="pdf-management-content" id="pdf-management"[^>]*>[\s\S]*?(?=<\/body>|<!-- 온라인 시험지|$)/;

    const cleanPdfSection = `<div class="pdf-management-content" id="pdf-management" style="display: none; padding: 20px; background: white;">
                <!-- AI 스마트 검색 영역 -->
                <div style="background: #f8fafc; border-radius: 12px; padding: 24px; margin-bottom: 24px; border: 1px solid #e2e8f0;">
                    <div style="margin-bottom: 16px;">
                        <h2 style="font-size: 18px; font-weight: 600; color: #1e40af; margin: 0; display: flex; align-items: center; gap: 8px;">
                            🤖 AI 스마트 검색
                        </h2>
                    </div>
                    <div style="display: flex; align-items: center; background: white; border: 1px solid #d1d5db; border-radius: 8px; padding: 12px; gap: 12px;">
                        <input type="text" placeholder="예: '2024년 서울 중간고사 자료 찾아줘' 또는 이미지를 업로드하세요"
                               style="flex: 1; border: none; outline: none; font-size: 14px; color: #374151;">
                        <div style="display: flex; gap: 8px; align-items: center;">
                            <button style="background: none; border: none; padding: 4px; cursor: pointer; font-size: 16px;">📷</button>
                            <button style="background: none; border: none; padding: 4px; cursor: pointer; font-size: 16px;">✏️</button>
                            <button style="background: #3b82f6; color: white; border: none; padding: 8px 16px; border-radius: 6px; font-size: 14px; font-weight: 500; cursor: pointer;">전송</button>
                        </div>
                    </div>
                    <div style="margin-top: 12px; display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
                        <span style="font-size: 12px; color: #6b7280;">추천 검색:</span>
                        <button style="background: #f3f4f6; border: 1px solid #d1d5db; border-radius: 12px; padding: 4px 10px; font-size: 12px; color: #374151; cursor: pointer;">서울 기출문제</button>
                        <button style="background: #f3f4f6; border: 1px solid #d1d5db; border-radius: 12px; padding: 4px 10px; font-size: 12px; color: #374151; cursor: pointer;">수능 모의고사</button>
                        <button style="background: #f3f4f6; border: 1px solid #d1d5db; border-radius: 12px; padding: 4px 10px; font-size: 12px; color: #374151; cursor: pointer;">중간고사 2024</button>
                        <button style="background: #f3f4f6; border: 1px solid #d1d5db; border-radius: 12px; padding: 4px 10px; font-size: 12px; color: #374151; cursor: pointer;">수학 교과서</button>
                    </div>
                </div>

                <!-- 필터 검색 영역 -->
                <div style="background: white; border-radius: 8px; padding: 20px; margin-bottom: 20px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); border: 1px solid #e2e8f0;">
                    <div style="display: flex; gap: 12px; align-items: center; flex-wrap: wrap;">
                        <select style="padding: 8px 12px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 14px; background: white; min-width: 120px;">
                            <option>학년: 전체</option>
                            <option>초등</option>
                            <option>중1</option>
                            <option>중2</option>
                            <option>중3</option>
                            <option>고1</option>
                            <option>고2</option>
                            <option>고3</option>
                        </select>
                        <select style="padding: 8px 12px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 14px; background: white; min-width: 120px;">
                            <option>과목: 전체</option>
                            <option>수학</option>
                            <option>국어</option>
                            <option>영어</option>
                            <option>과학</option>
                            <option>사회</option>
                        </select>
                        <select style="padding: 8px 12px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 14px; background: white; min-width: 120px;">
                            <option>지역: 전체</option>
                            <option>서울</option>
                            <option>경기</option>
                            <option>부산</option>
                            <option>대구</option>
                            <option>인천</option>
                        </select>
                        <select style="padding: 8px 12px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 14px; background: white; min-width: 120px;">
                            <option>자료유형: 전체</option>
                            <option>교재/교과서</option>
                            <option>기출문제</option>
                            <option>참고서</option>
                            <option>문제집</option>
                        </select>
                        <button style="background: #3b82f6; color: white; border: none; padding: 8px 20px; border-radius: 6px; font-size: 14px; font-weight: 500; cursor: pointer;">검색</button>
                    </div>
                </div>

                <!-- 결과 표시 및 액션 버튼 -->
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                    <div style="font-size: 14px; color: #374151;">
                        총 1,523개 자료 | 선택: 0개
                    </div>
                    <div style="display: flex; gap: 8px;">
                        <button style="background: #f9fafb; color: #374151; border: 1px solid #d1d5db; padding: 8px 16px; border-radius: 6px; font-size: 14px; cursor: pointer;">엑셀 다운로드</button>
                        <button style="background: #3b82f6; color: white; border: none; padding: 8px 16px; border-radius: 6px; font-size: 14px; cursor: pointer;">AI 디지털화</button>
                        <button style="background: #3b82f6; color: white; border: none; padding: 8px 16px; border-radius: 6px; font-size: 14px; cursor: pointer;">파일 등록</button>
                        <button style="background: #3b82f6; color: white; border: none; padding: 8px 16px; border-radius: 6px; font-size: 14px; cursor: pointer;">일괄 등록</button>
                    </div>
                </div>

                <!-- PDF 자료 테이블 -->
                <div style="background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.1); border: 1px solid #e2e8f0;">
                    <table style="width: 100%; border-collapse: collapse;">
                        <thead style="background: #f8fafc;">
                            <tr>
                                <th style="padding: 12px 8px; text-align: center; font-size: 13px; font-weight: 600; color: #374151; border-bottom: 1px solid #e5e7eb; width: 50px;">
                                    <input type="checkbox" style="cursor: pointer;">
                                </th>
                                <th style="padding: 12px 8px; text-align: center; font-size: 13px; font-weight: 600; color: #374151; border-bottom: 1px solid #e5e7eb; width: 80px;">자료 ID</th>
                                <th style="padding: 12px 8px; text-align: center; font-size: 13px; font-weight: 600; color: #374151; border-bottom: 1px solid #e5e7eb; width: 320px;">자료명</th>
                                <th style="padding: 12px 8px; text-align: center; font-size: 13px; font-weight: 600; color: #374151; border-bottom: 1px solid #e5e7eb; width: 100px;">학년/학기</th>
                                <th style="padding: 12px 8px; text-align: center; font-size: 13px; font-weight: 600; color: #374151; border-bottom: 1px solid #e5e7eb; width: 80px;">과목</th>
                                <th style="padding: 12px 8px; text-align: center; font-size: 13px; font-weight: 600; color: #374151; border-bottom: 1px solid #e5e7eb; width: 80px;">생산연도</th>
                                <th style="padding: 12px 8px; text-align: center; font-size: 13px; font-weight: 600; color: #374151; border-bottom: 1px solid #e5e7eb; width: 120px;">지역/학교급</th>
                                <th style="padding: 12px 8px; text-align: center; font-size: 13px; font-weight: 600; color: #374151; border-bottom: 1px solid #e5e7eb; width: 100px;">자료유형</th>
                                <th style="padding: 12px 8px; text-align: center; font-size: 13px; font-weight: 600; color: #374151; border-bottom: 1px solid #e5e7eb; width: 100px;">액션</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr style="border-bottom: 1px solid #f0f0f0;">
                                <td style="padding: 12px 8px; text-align: center;">
                                    <input type="checkbox" style="cursor: pointer;">
                                </td>
                                <td style="padding: 12px 8px; text-align: center; font-weight: 600; color: #1f2937;">001</td>
                                <td style="padding: 12px 8px;">
                                    <div style="font-weight: 600; color: #1f2937; font-size: 14px; margin-bottom: 4px;">2024년 서울시 중3 수학 중간고사</div>
                                    <div style="font-size: 12px; color: #6b7280;">서울시 강남중학교 2024년 1학기 중간고사 기출문제 모음</div>
                                </td>
                                <td style="padding: 12px 8px; text-align: center; font-size: 13px;">중3 / 1학기</td>
                                <td style="padding: 12px 8px; text-align: center; font-size: 13px;">수학</td>
                                <td style="padding: 12px 8px; text-align: center; font-size: 13px;">2024</td>
                                <td style="padding: 12px 8px; text-align: center; font-size: 12px; line-height: 1.3;">
                                    서울<br>
                                    강남중학교
                                </td>
                                <td style="padding: 12px 8px; text-align: center; font-size: 13px;">중간고사</td>
                                <td style="padding: 12px 8px; text-align: center;">
                                    <div style="display: flex; flex-direction: column; gap: 2px;">
                                        <button style="background: white; border: 1px solid #d1d5db; color: #374151; padding: 3px 6px; border-radius: 4px; font-size: 10px; cursor: pointer;">미리보기</button>
                                        <button style="background: white; border: 1px solid #d1d5db; color: #374151; padding: 3px 6px; border-radius: 4px; font-size: 10px; cursor: pointer;">OCR변환</button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <!-- 페이지네이션 -->
                    <div style="display: flex; justify-content: center; align-items: center; gap: 8px; padding: 20px; background: white; border-top: 1px solid #e5e7eb;">
                        <button style="padding: 8px 12px; border: 1px solid #d1d5db; background: white; border-radius: 6px; font-size: 13px; color: #374151; cursor: pointer;">이전</button>
                        <button style="padding: 8px 12px; border: 1px solid #3b82f6; background: #3b82f6; color: white; border-radius: 6px; font-size: 13px; cursor: pointer;">1</button>
                        <button style="padding: 8px 12px; border: 1px solid #d1d5db; background: white; border-radius: 6px; font-size: 13px; color: #374151; cursor: pointer;">2</button>
                        <button style="padding: 8px 12px; border: 1px solid #d1d5db; background: white; border-radius: 6px; font-size: 13px; color: #374151; cursor: pointer;">3</button>
                        <button style="padding: 8px 12px; border: 1px solid #d1d5db; background: white; border-radius: 6px; font-size: 13px; color: #374151; cursor: pointer;">다음</button>
                    </div>
                </div>
            </div>

    `;

    // PDF 섹션 교체 (더 적절한 패턴 사용)
    fixedHtml = fixedHtml.replace(/(<div class="pdf-management-content" id="pdf-management"[^>]*>)[\s\S]*?(<div[^>]*class="[^"]*textbook|<script|$)/, cleanPdfSection + '\n\n            $2');

    // 고정된 HTML을 새 파일로 저장
    const fixedFilePath = '/Users/yujeonghui/work/problem_bank/03_Design/CBS_문제은행_플랫폼_소개_v5_CLEAN.html';

    fs.writeFile(fixedFilePath, fixedHtml, 'utf8', (writeErr) => {
        if (writeErr) {
            console.error('파일 쓰기 오류:', writeErr);
            return;
        }

        console.log('✅ 깔끔하게 수정된 HTML 파일 생성 완료:', fixedFilePath);
        console.log('이제 새 파일로 테스트를 진행합니다...');

        // 새 파일로 테스트 실행
        testCleanFile(fixedFilePath);
    });
});

async function testCleanFile(filePath) {
    const { chromium } = require('playwright');

    const browser = await chromium.launch({ headless: false });
    const page = await browser.newPage();
    await page.setViewportSize({ width: 1400, height: 900 });

    await page.goto('file://' + filePath);
    await page.waitForTimeout(3000);

    console.log('=== 깔끔한 파일 테스트 ===');

    // 문항 관리 클릭
    await page.click('a[data-section="problem-management"]');
    await page.waitForTimeout(2000);

    const problemResult = await page.evaluate(() => {
        const section = document.getElementById('problem-management');
        const smartSearch = document.querySelector('#problem-management [style*="f8fafc"]'); // AI 검색 영역

        return {
            sectionExists: !!section,
            sectionVisible: section ? section.style.display !== 'none' : false,
            smartSearchExists: !!smartSearch,
            smartSearchVisible: smartSearch ? smartSearch.offsetWidth > 0 : false,
            sectionClasses: section ? section.className : null
        };
    });

    console.log('문항 관리 결과:', problemResult);
    await page.screenshot({ path: '/Users/yujeonghui/work/problem_bank/screenshots/clean_problem.png', fullPage: true });

    // PDF 관리 클릭
    await page.click('a[data-section="pdf-management"]');
    await page.waitForTimeout(2000);

    const pdfResult = await page.evaluate(() => {
        const section = document.getElementById('pdf-management');
        const smartSearch = document.querySelector('#pdf-management [style*="f8fafc"]'); // AI 검색 영역

        return {
            sectionExists: !!section,
            sectionVisible: section ? section.style.display !== 'none' : false,
            smartSearchExists: !!smartSearch,
            smartSearchVisible: smartSearch ? smartSearch.offsetWidth > 0 : false,
            sectionClasses: section ? section.className : null
        };
    });

    console.log('PDF 관리 결과:', pdfResult);
    await page.screenshot({ path: '/Users/yujeonghui/work/problem_bank/screenshots/clean_pdf.png', fullPage: true });

    if (problemResult.smartSearchVisible && pdfResult.smartSearchVisible) {
        console.log('🎉 성공! 두 섹션 모두 완벽하게 작동합니다!');
    } else {
        console.log('❌ 여전히 문제가 있습니다.');
    }

    console.log('브라우저를 열어둡니다. 직접 확인해보세요!');
    await page.waitForTimeout(30000);

    await browser.close();
}

console.log('깔끔한 HTML 생성을 시작합니다...');