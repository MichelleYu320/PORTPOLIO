// 언어 토글 공통 JavaScript
class LanguageToggle {
    constructor() {
        this.currentLang = 'ko';
        this.init();
    }

    init() {
        // 언어 버튼 이벤트 리스너 추가
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const lang = e.target.dataset.lang;
                this.switchLanguage(lang);
            });
        });

        // 초기 언어 설정 (브라우저 언어 감지)
        const savedLang = localStorage.getItem('preferredLanguage');
        const browserLang = navigator.language.startsWith('ko') ? 'ko' : 'en';
        const initialLang = savedLang || browserLang;
        this.switchLanguage(initialLang);
    }

    switchLanguage(lang) {
        if (this.currentLang === lang) return;

        // 부드러운 전환 효과
        document.body.style.transition = 'opacity 0.3s ease';
        document.body.style.opacity = '0.7';

        setTimeout(() => {
            // 언어 데이터 속성을 가진 모든 요소 업데이트
            document.querySelectorAll('[data-ko][data-en]').forEach(element => {
                const text = element.getAttribute(`data-${lang}`);
                if (text) {
                    element.innerHTML = text;
                }
            });

            // HTML lang 속성 업데이트
            document.documentElement.lang = lang;

            // body 클래스 업데이트 (폰트 변경용)
            document.body.className = document.body.className.replace(/\ben\b/g, '');
            if (lang === 'en') {
                document.body.classList.add('en');
            }

            // 버튼 활성 상태 업데이트
            document.querySelectorAll('.lang-btn').forEach(btn => {
                btn.classList.toggle('active', btn.dataset.lang === lang);
            });

            // 현재 언어 업데이트
            this.currentLang = lang;

            // 언어 설정 저장
            localStorage.setItem('preferredLanguage', lang);

            // 페이지별 제목 업데이트
            this.updatePageTitle(lang);

            // 페이드 인
            document.body.style.opacity = '1';
        }, 150);
    }

    updatePageTitle(lang) {
        const currentPage = window.location.pathname.split('/').pop();
        
        const titles = {
            'index.html': {
                ko: '유정희 포트폴리오',
                en: 'Michelle Yu Portfolio'
            },
            'page1.html': {
                ko: 'BreatheLog - 프리다이빙 기록 관리 시스템',
                en: 'BreatheLog - Freediving Record Management System'
            },
            'page2.html': {
                ko: 'BreatheLog - 주요 기능',
                en: 'BreatheLog - Key Features'
            },
            'page3.html': {
                ko: 'BreatheLog - 기술 스택',
                en: 'BreatheLog - Tech Stack'
            },
            'page4.html': {
                ko: 'BreatheLog - 시스템 아키텍처',
                en: 'BreatheLog - System Architecture'
            },
            'page5.html': {
                ko: 'BreatheLog - 사용자 인터페이스',
                en: 'BreatheLog - User Interface'
            },
            'page6.html': {
                ko: 'BreatheLog - 데이터 관리',
                en: 'BreatheLog - Data Management'
            },
            'page7.html': {
                ko: 'BreatheLog - 팀 관리',
                en: 'BreatheLog - Team Management'
            },
            'page8.html': {
                ko: 'BreatheLog - 성능 분석',
                en: 'BreatheLog - Performance Analysis'
            },
            'page9.html': {
                ko: 'BreatheLog - 향후 계획',
                en: 'BreatheLog - Future Plans'
            },
            'page10.html': {
                ko: 'BreatheLog - 연락처',
                en: 'BreatheLog - Contact'
            }
        };

        if (titles[currentPage]) {
            document.title = titles[currentPage][lang];
        }
    }
}

// 전역 함수로 내보내기 (다른 스크립트에서 접근 가능)
window.LanguageToggle = LanguageToggle;

// 페이지 로드 시 자동 초기화
document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('.lang-toggle')) {
        new LanguageToggle();
    }
}); 