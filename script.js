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
        video.muted = false;
        video.play().catch(function(e) {
            console.log('Autoplay error:', e);
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

// ===== MODAL =====
function showDana() {
    const modal = document.getElementById('danaModal');
    if (modal) {
        modal.style.display = 'flex';
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }
}

function showGopay() {
    const modal = document.getElementById('gopayModal');
    if (modal) {
        modal.style.display = 'flex';
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(id) {
    const modal = document.getElementById(id);
    if (modal) {
        modal.style.display = 'none';
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }
}

// Tutup modal kalo klik di overlay
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('modal-overlay')) {
        const modal = e.target.closest('.modal');
        if (modal) {
            modal.style.display = 'none';
            modal.classList.remove('show');
            document.body.style.overflow = '';
        }
    }
});

// ===== VIDEO AUTO SUARA =====
function setupVideo() {
    const video = document.getElementById('mainVideo');
    if (!video) return;

    video.muted = false;
    video.autoplay = true;
    video.loop = true;
    video.playsInline = true;

    video.play().catch(function(e) {
        console.log('Autoplay error:', e);
        document.addEventListener('click', function playOnce() {
            video.play().catch(function() {});
            document.removeEventListener('click', playOnce);
        });
    });

    video.addEventListener('pause', function() {
        setTimeout(function() {
            if (video.paused) {
                video.play().catch(function() {});
            }
        }, 100);
    });

    console.log('🎬 Video auto suara aktif! 🔊');
}

// ===== MENU =====
function showMenu() {
    alert(
        '📋 MENU JB JAR STORE\n' +
        '═══════════════════════\n\n' +
        '🏠 Home\n' +
        '💳 DANA Payment\n' +
        '💰 GOPAY Payment\n' +
        '📱 QRIS Payment\n' +
        '📢 Saluran Info Daget\n' +
        '📞 Contact\n' +
        '⭐ Testimoni\n\n' +
        '═══════════════════════\n' +
        'Terima kasih sudah percaya! 🙏'
    );
}

// ===== START =====
document.addEventListener('DOMContentLoaded', function() {
    console.log('🔥 JB Jar Store v4.0 loaded!');
    console.log('💜 #ALLAMAN #AMANAH');
    console.log('✨ Animasi smooth & neon aktif!');

    setupVideo();
    startLoading();
});
