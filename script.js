let currentLanguage = 'vi';
let isMusicPlaying = false;

// --- 1. Phát / Dừng Nhạc ---
function toggleMusic() {
    const music = document.getElementById('bgMusic');
    const btn = document.getElementById('musicToggleBtn');
    const text = document.getElementById('musicText');

    if (!music) return;

    if (music.paused) {
        music.load();
        const playPromise = music.play();

        if (playPromise !== undefined) {
            playPromise.then(() => {
                isMusicPlaying = true;
                btn.classList.add('playing');
                text.textContent = currentLanguage === 'vi' ? 'Tắt nhạc' : 'Stop Music';
            }).catch(err => {
                console.error("Lỗi phát nhạc:", err);
            });
        }
    } else {
        isMusicPlaying = false;
        music.pause();
        btn.classList.remove('playing');
        text.textContent = currentLanguage === 'vi' ? 'Bật nhạc' : 'Play Music';
    }
}

// --- 2. Đổi Ngôn Ngữ ---
function toggleLanguage() {
    currentLanguage = currentLanguage === 'vi' ? 'en' : 'vi';
    document.documentElement.lang = currentLanguage;

    const langLabel = document.getElementById('langText');
    if (langLabel) {
        langLabel.textContent = currentLanguage === 'vi' ? 'EN' : 'VI';
    }

    const elements = document.querySelectorAll('[data-vi][data-en]');
    elements.forEach(el => {
        el.innerHTML = el.getAttribute(`data-${currentLanguage}`);
    });

    const letter = document.getElementById("fullMessage");
    const letterBtn = document.getElementById("openLetterBtn");
    if (letter && letterBtn) {
        if (letter.style.display === "block") {
            letterBtn.textContent = currentLanguage === 'vi' ? "ĐÓNG THƯ ✖" : "CLOSE LETTER ✖";
        } else {
            letterBtn.textContent = currentLanguage === 'vi' ? "MỞ THƯ ✨" : "OPEN LETTER ✨";
        }
    }

    const musicText = document.getElementById('musicText');
    if (musicText) {
        if (isMusicPlaying) {
            musicText.textContent = currentLanguage === 'vi' ? 'Tắt nhạc' : 'Stop Music';
        } else {
            musicText.textContent = currentLanguage === 'vi' ? 'Bật nhạc' : 'Play Music';
        }
    }
}

// --- 3. Đóng/Mở Thư ---
function toggleLetter() {
    const letter = document.getElementById("fullMessage");
    const btn = document.getElementById("openLetterBtn");

    if (!letter || !btn) return;

    if (letter.style.display === "none" || letter.style.display === "") {
        letter.style.display = "block";
        btn.textContent = currentLanguage === 'vi' ? "ĐÓNG THƯ ✖" : "CLOSE LETTER ✖";
        
        setTimeout(() => {
            letter.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 100);
    } else {
        letter.style.display = "none";
        btn.textContent = currentLanguage === 'vi' ? "MỞ THƯ ✨" : "OPEN LETTER ✨";
        
        btn.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

// --- 4. Chuyển Tab ---
function scrollToSection(tabId) {
    const allTabs = document.querySelectorAll('.tab-content');
    allTabs.forEach(tab => {
        tab.classList.remove('active-tab');
    });

    const allBtns = document.querySelectorAll('.nav-btn');
    allBtns.forEach(btn => {
        btn.classList.remove('active-btn');
    });

    const selectedTab = document.getElementById(tabId);
    if (selectedTab) {
        selectedTab.classList.add('active-tab');
    }

    if (window.event && window.event.currentTarget) {
        window.event.currentTarget.classList.add('active-btn');
    }

    setTimeout(() => {
        if (selectedTab) {
            selectedTab.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, 150);
}

// --- 5. Lightbox Mở Phóng To (Dùng cho cả Ảnh Chân Dung và Sơ đồ) ---
function openLightbox(imageSrc) {
    const lightbox = document.getElementById('imageLightbox');
    const lightboxImg = document.getElementById('lightboxImg');

    if (lightbox && lightboxImg) {
        lightboxImg.src = imageSrc;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeLightbox() {
    const lightbox = document.getElementById('imageLightbox');
    if (lightbox) {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }
}