// ============================================================
// JB JAR STORE - SCRIPT.JS
// ============================================================

// ===== LOADING =====
let loadingProgress = 0;
let loadingInterval;

function startLoading() {
    const bar = document.getElementById('loaderBar');
    const text = document.getElementById('loaderText');
    const messages = ['Loading...', 'Memuat Data...', 'Almost Ready...', 'Siap!'];

    loadingInterval = setInterval(() => {
        loadingProgress += Math.random() * 8 + 2;
        if (loadingProgress > 100) loadingProgress = 100;
        bar.style.width = loadingProgress + '%';

        if (loadingProgress < 30) text.textContent = messages[0];
        else if (loadingProgress < 60) text.textContent = messages[1];
        else if (loadingProgress < 90) text.textContent = messages[2];
        else text.textContent = messages[3];

        if (loadingProgress >= 100) {
            clearInterval(loadingInterval);
            setTimeout(hideLoading, 300);
        }
    }, 150);
}

function hideLoading() {
    const screen = document.getElementById('loadingScreen');
    const content = document.getElementById('mainContent');
    screen.classList.add('hide');
    content.classList.remove('hidden');

    const video = document.getElementById('mainVideo');
    if (video) {
        // PLAY VIDEO DENGAN SUARA!
        video.muted = false;
        video.play().catch(function(e) {
            console.log('Autoplay with sound error:', e);
        });
    }
}

function skipLoading() {
    clearInterval(loadingInterval);
    const bar = document.getElementById('loaderBar');
    bar.style.width = '100%';
    document.getElementById('loaderText').textContent = 'Siap!';
    setTimeout(hideLoading, 300);
}

// ===== COPY NUMBER =====
function copyNumber(number) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(number).then(() => {
            showToast('✅ Nomor berhasil disalin!');
        }).catch(() => {
            fallbackCopy(number);
        });
    } else {
        fallbackCopy(number);
    }
}

function fallbackCopy(text) {
    const input = document.createElement('input');
    input.value = text;
    input.style.position = 'fixed';
    input.style.opacity = '0';
    document.body.appendChild(input);
    input.select();
    document.execCommand('copy');
    document.body.removeChild(input);
    showToast('✅ Nomor berhasil disalin!');
}

// ===== TOAST =====
function showToast(message) {
    const oldToast = document.querySelector('.toast');
    if (oldToast) oldToast.remove();

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => toast.classList.add('show'), 10);
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 400);
    }, 2000);
}

// ===== QRIS REQUEST =====
function requestQris() {
    const waNumber = '6283175975689';
    const message = 'Halo JB Jar Store, saya mau minta QRIS untuk pembayaran. Terima kasih!';
    window.open('https://wa.me/' + waNumber + '?text=' + encodeURIComponent(message), '_blank');
    showToast('📱 Diarahkan ke WhatsApp...');
}

// ===== MENU =====
function showMenu() {
    alert(
        '📋 MENU JB JAR STORE\n' +
        '═══════════════════\n\n' +
        '🏠 Home\n' +
        '💳 DANA Payment\n' +
        '💰 GOPAY Payment\n' +
        '📱 QRIS Payment\n' +
        '📢 Saluran Info Daget\n' +
        '📞 Contact\n\n' +
        '═══════════════════\n' +
        'Terima kasih! 🙏'
    );
}

// ===== VIDEO AUTO SUARA =====
function setupVideo() {
    const video = document.getElementById('mainVideo');
    if (!video) return;

    // ===== UNMUTE =====
    video.muted = false;
    video.autoplay = true;
    video.loop = true;
    video.playsInline = true;

    // Coba play
    video.play().catch(function(e) {
        console.log('Autoplay error:', e);
        // Kalo error karena browser, coba lagi pake interaksi
        document.addEventListener('click', function playOnce() {
            video.play().catch(function() {});
            document.removeEventListener('click', playOnce);
        });
    });

    // ===== PAKSA PLAY TERUS =====
    video.addEventListener('pause', function() {
        setTimeout(function() {
            if (video.paused) {
                video.play().catch(function() {});
            }
        }, 100);
    });

    video.addEventListener('error', function(e) {
        console.warn('⚠️ Video error:', e);
    });

    console.log('🎬 Video auto suara aktif! 🔊');
}

// ===== START =====
document.addEventListener('DOMContentLoaded', function() {
    console.log('🔥 JB Jar Store loaded!');
    console.log('💜 #ALLAMAN #AMANAH');
    console.log('✨ Animasi goyang halus aktif!');

    setupVideo();
    startLoading();
});
