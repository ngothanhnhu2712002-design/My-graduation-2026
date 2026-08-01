// --- 1. Xử lý Bật / Tắt Nhạc Nền ---
function toggleMusic() {
    const music = document.getElementById('bgMusic');
    const btn = document.getElementById('musicToggleBtn');
    const text = document.getElementById('musicText');

    if (!music) return;

    if (music.paused) {
        music.play().then(() => {
            btn.classList.add('playing');
            text.textContent = 'Tắt nhạc';
        }).catch(err => {
            console.log("Trình duyệt chặn autoplay:", err);
        });
    } else {
        music.pause();
        btn.classList.remove('playing');
        text.textContent = 'Bật nhạc';
    }
}

// --- 2. Xử lý Mở / Đóng Phong Thư Tri Ân ---
function openEnvelope() {
    const wrapper = document.getElementById('envelopeWrapper');
    const btn = document.querySelector('.open-btn');
    const fullMessage = document.querySelector('.full-message');

    if (!wrapper) return;

    wrapper.classList.toggle('open');

    if (wrapper.classList.contains('open')) {
        if (btn) btn.textContent = 'CLOSE LETTER 🤍';
        
        if (fullMessage) {
            fullMessage.style.display = 'block';
        }

        setTimeout(() => {
            if (fullMessage) {
                fullMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }, 500);
    } else {
        if (btn) btn.textContent = 'OPEN LETTER ✨';
        wrapper.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

// --- 3. Xử lý Chuyển Tab (3 Nút Navigation) ---
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

    if (tabId === 'messageCard') {
        const wrapper = document.getElementById('envelopeWrapper');
        const btn = document.querySelector('.open-btn');
        if (wrapper && wrapper.classList.contains('open')) {
            wrapper.classList.remove('open');
            if (btn) btn.textContent = 'OPEN LETTER ✨';
        }
    }

    setTimeout(() => {
        if (selectedTab) {
            selectedTab.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, 150);
}

// --- 4. Lightbox Xem Ảnh Gallery ---
function openLightbox(element) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const img = element.querySelector('img');
    
    if (lightbox && lightboxImg && img) {
        lightboxImg.src = img.src;
        lightbox.classList.add('active');
    }
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        lightbox.classList.remove('active');
    }
}

// --- 5. Lightbox Xem Ảnh Chân Dung ---
function openPortraitLightbox() {
    const lightbox = document.getElementById('portraitLightbox');
    const lightboxImg = document.getElementById('portraitLightboxImg');
    const mainImg = document.getElementById('mainPortrait');
    
    if (lightbox && lightboxImg && mainImg) {
        lightboxImg.src = mainImg.src;
        lightbox.classList.add('active');
    }
}

function closePortraitLightbox() {
    const lightbox = document.getElementById('portraitLightbox');
    if (lightbox) {
        lightbox.classList.remove('active');
    }
}

// --- 6. Gán sự kiện khi DOM Ready ---
document.addEventListener('DOMContentLoaded', () => {
    const envelopeWrapper = document.getElementById('envelopeWrapper');
    if (envelopeWrapper) {
        envelopeWrapper.addEventListener('click', openEnvelope);
    }
});