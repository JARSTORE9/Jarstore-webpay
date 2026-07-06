// ============================================================
// JB JAR STORE - SCRIPT.JS
// Simple & Clean + Animasi
// ============================================================

// ===== LOADING =====
let loadingProgress = 0;
let loadingInterval;

function startLoading() {
    const bar = document.getElementById('loaderBar');
    const text = document.getElementById('loaderText');
    const messages = [
        'Loading...',
        'Memuat Data...',
        'Almost Ready...',
        'Siap!'
    ];

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

    // ===== PLAY VIDEO SETELAH LOADING =====
    const video = document.getElementById('mainVideo');
    if (video) {
        video.play().catch(function(e) {
            console.log('Video autoplay error:', e);
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
        '📞 Contact\n\n' +
        '═══════════════════\n' +
        'Terima kasih! 🙏'
    );
}

// ===== VIDEO - AUTOPLAY NO PAUSE =====
function setupVideo() {
    const video = document.getElementById('mainVideo');
    if (!video) return;

    // Force autoplay
    video.muted = true;
    video.autoplay = true;
    video.loop = true;
    video.playsInline = true;

    // Coba play
    video.play().catch(function(e) {
        console.log('Autoplay dicegah browser, menunggu interaksi user');
        // Coba lagi setelah user klik
        document.addEventListener('click', function playOnce() {
            video.play().catch(function() {});
            document.removeEventListener('click', playOnce);
        });
    });

    // Video error handler
    video.addEventListener('error', function(e) {
        console.warn('⚠️ Video error:', e);
    });

    // Pastikan video tetap play (jika pause karena sesuatu)
    video.addEventListener('pause', function() {
        // Jika video kepause karena sesuatu, play lagi
        setTimeout(function() {
            if (video.paused) {
                video.play().catch(function() {});
            }
        }, 100);
    });

    console.log('🎬 Video autoplay siap!');
}

// ===== START =====
document.addEventListener('DOMContentLoaded', function() {
    console.log('🔥 JB Jar Store loaded!');
    console.log('💜 #ALLAMAN #AMANAH');
    console.log('✨ Animasi goyang halus aktif!');

    setupVideo();
    startLoading();
});
