# GitHub 레포지토리 v1 → v2 업데이트 가이드

## 🚨 업데이트 전 필수 확인사항

1. **백업 브랜치 생성** (이미 완료했는지 확인)
2. **Vercel 설정 확인** (Root Directory와 Framework Preset)
3. **도메인 설정 확인** (custom domain 사용 중인 경우)

## 📝 업데이트 순서

### Step 1: 레포지토리 클론 & 백업
```bash
# 1. 레포지토리 클론
git clone https://github.com/MichelleYu320/PORTPOLIO.git
cd PORTPOLIO

# 2. 현재 v1 백업 (중요!)
git checkout -b v1-backup-$(date +%Y%m%d)
git push origin v1-backup-$(date +%Y%m%d)

# 3. main 브랜치로 돌아오기
git checkout main
```

### Step 2: 기존 파일 삭제
```bash
# v1 파일들 삭제 (git에서 추적 중지)
git rm *.html
git rm *.png *.jpg *.jpeg 2>/dev/null || true
```

### Step 3: 새 파일 추가
```bash
# 이 폴더의 모든 파일을 레포지토리로 복사
cp /Users/yujeonghui/Downloads/02_개인_Portpolio/유정희\ 포트폴리오/github_deploy/* ./

# Git에 추가
git add .
```

### Step 4: 커밋 & 푸시
```bash
# 커밋
git commit -m "feat: v2 통합형 포트폴리오로 업데이트

- 개별 HTML 파일에서 단일 페이지 애플리케이션으로 전환
- 탭 기반 네비게이션 구현
- 반응형 디자인 개선
- 프로젝트별 핵심 성과 강조"

# 푸시
git push origin main
```

## ✅ Vercel 자동 배포 확인

1. 푸시 후 자동으로 Vercel이 새로 배포를 시작합니다
2. Vercel 대시보드에서 빌드 상태 확인: https://vercel.com/dashboard
3. 배포 완료 후 사이트 확인

## 🔧 문제 해결

### 만약 사이트가 제대로 안 보인다면:

1. **Vercel 설정 확인**
   - Framework Preset: `Other` 또는 `None`
   - Root Directory: `.` (루트)
   - Build Command: 비워두기 (정적 사이트)

2. **index.html 확인**
   - 파일명이 정확히 `index.html`인지 확인
   - 이미지 경로가 상대 경로로 되어있는지 확인

3. **캐시 문제**
   - 브라우저 캐시 삭제 (Ctrl+Shift+R 또는 Cmd+Shift+R)
   - Vercel에서 Redeploy 실행

## 📌 파일 구조

```
PORTPOLIO/
├── index.html           (메인 파일 - v2)
├── ocr.png
├── 생성1.png
├── 생성2.png
├── 그림1.jpg
├── 그림2.jpg
├── 그림3 (1).png
├── 그림3 (2).png
├── 그림3 (3).png
├── 그림3 (4).png
├── 그림3 (5).png
├── 그림3 (6).png
└── README.md
```

## 🔄 롤백 방법 (문제 발생 시)

```bash
# v1으로 되돌리기
git checkout v1-backup-[날짜]
git checkout -b main-rollback
git push origin main-rollback --force-with-lease

# 또는 Vercel에서 이전 배포로 롤백
# Vercel Dashboard → Deployments → 이전 성공 배포 → Promote to Production
```

## 📞 지원

문제가 발생하면:
1. Vercel 빌드 로그 확인
2. 브라우저 개발자 도구(F12) 콘솔 에러 확인
3. GitHub Actions 로그 확인 (사용 중인 경우)

---

⚠️ **중요**: 항상 백업을 먼저 만들고 작업하세요!