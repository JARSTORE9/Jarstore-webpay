/**
 * ============================================================
 * JB JAR STORE - SCRIPT.JS
 * Interaksi & Fungsi Lengkap
 * ============================================================
 */

document.addEventListener('DOMContentLoaded', function() {

    console.log('🔥 JB Jar Store v3.0 loaded!');
    console.log('💜 #ALLAMAN #AMANAH');
    console.log('📱 Created with love for JB Jar Store');

    // ============================================================
    // 1. MENU BUTTON
    // ============================================================
    const menuBtn = document.getElementById('navMenuBtn');
    if (menuBtn) {
        menuBtn.addEventListener('click', function() {
            alert(
                '📋 MENU JB JAR STORE\n\n' +
                '🏠 Home\n' +
                '💳 Payment (DANA & QRIS)\n' +
                '📹 Video Profile\n' +
                '📞 Contact (WA & IG)\n' +
                '🎮 Games (FF, ML, Roblox)\n' +
                '📢 Info Daget & Stok\n\n' +
                'Fitur akan segera hadir!\n' +
                'Stay tuned! 🔥'
            );
        });
    }

    // ============================================================
    // 2. COPY NUMBER
    // ============================================================
    window.copyNumber = function(number) {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(number).then(function() {
                showToast('✅ Nomor berhasil disalin!');
            }).catch(function() {
                fallbackCopy(number);
            });
        } else {
            fallbackCopy(number);
        }
    };

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

    // ============================================================
    // 3. TOAST NOTIFICATION
    // ============================================================
    function showToast(message) {
        const oldToast = document.querySelector('.toast-notification');
        if (oldToast) oldToast.remove();

        const toast = document.createElement('div');
        toast.className = 'toast-notification';
        toast.textContent = message;
        Object.assign(toast.style, {
            position: 'fixed',
            bottom: '30px',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'rgba(16, 12, 40, 0.95)',
            backdropFilter: 'blur(20px)',
            color: '#e8e0ff',
            padding: '14px 28px',
            borderRadius: '16px',
            fontSize: '14px',
            fontWeight: '600',
            border: '1px solid rgba(139, 92, 246, 0.15)',
            boxShadow: '0 10px 40px rgba(0,0,0,0.5)',
            zIndex: '9999',
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            maxWidth: '90%',
            textAlign: 'center'
        });
        document.body.appendChild(toast);

        toast.style.animation = 'toastIn 0.4s ease forwards';

        const style = document.createElement('style');
        style.textContent = `
            @keyframes toastIn {
                0% { opacity: 0; transform: translateX(-50%) translateY(30px) scale(0.95); }
                100% { opacity: 1; transform: translateX(-50%) translateY(0) scale(1); }
            }
            @keyframes toastOut {
                0% { opacity: 1; transform: translateX(-50%) translateY(0) scale(1); }
                100% { opacity: 0; transform: translateX(-50%) translateY(30px) scale(0.95); }
            }
        `;
        document.head.appendChild(style);

        setTimeout(function() {
            toast.style.animation = 'toastOut 0.4s ease forwards';
            setTimeout(function() {
                toast.remove();
                style.remove();
            }, 400);
        }, 2000);
    }

    // ============================================================
    // 4. QRIS REQUEST
    // ============================================================
    window.requestQris = function() {
        const waNumber = '6283175975689';
        const message = 'Halo JB Jar Store, saya mau minta QRIS untuk pembayaran. Terima kasih!';
        const url = 'https://wa.me/' + waNumber + '?text=' + encodeURIComponent(message);
        window.open(url, '_blank');
        showToast('📱 Diarahkan ke WhatsApp...');
    };

    // ============================================================
    // 5. VIDEO PLAY / PAUSE TOGGLE
    // ============================================================
    const video = document.getElementById('mainVideo');
    const overlay = document.getElementById('videoOverlay');

    if (video) {
        video.addEventListener('click', function() {
            if (this.paused) {
                this.play();
                if (overlay) {
                    overlay.innerHTML = '<i class="fas fa-pause-circle"></i><span>Pause</span>';
                }
            } else {
                this.pause();
                if (overlay) {
                    overlay.innerHTML = '<i class="fas fa-play-circle"></i><span>Play</span>';
                }
            }
        });

        video.addEventListener('ended', function() {
            if (overlay) {
                overlay.innerHTML = '<i class="fas fa-play-circle"></i><span>Klik untuk Play</span>';
            }
        });

        video.addEventListener('error', function() {
            console.warn('⚠️ Video gagal dimuat, pastikan assets/video.mp4 ada.');
            if (overlay) {
                overlay.innerHTML = '<i class="fas fa-exclamation-triangle"></i><span>Video Error</span>';
            }
        });

        video.addEventListener('play', function() {
            if (overlay) {
                overlay.innerHTML = '<i class="fas fa-pause-circle"></i><span>Pause</span>';
            }
        });

        video.addEventListener('pause', function() {
            if (overlay && !this.ended) {
                overlay.innerHTML = '<i class="fas fa-play-circle"></i><span>Play</span>';
            }
        });
    }

    // ============================================================
    // 6. CHANNEL CLICK TRACKING
    // ============================================================
    const channelBtn = document.querySelector('.btn-channel');
    if (channelBtn) {
        channelBtn.addEventListener('click', function() {
            console.log('📢 Mengarahkan ke Saluran Info Daget...');
            showToast('📢 Diarahkan ke Saluran Info Daget...');
        });
    }

    // ============================================================
    // 7. DETEKSI PERANGKAT
    // ============================================================
    const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|Opera Mini|IEMobile/i.test(navigator.userAgent);
    if (isMobile) {
        document.body.classList.add('is-mobile');
        console.log('📱 Perangkat Mobile terdeteksi');
    } else {
        document.body.classList.add('is-desktop');
        console.log('💻 Perangkat Desktop terdeteksi');
    }

    // ============================================================
    // 8. CEK TAHUN & UPDATE FOOTER
    // ============================================================
    const yearEl = document.querySelector('.footer .version');
    if (yearEl) {
        const currentYear = new Date().getFullYear();
        if (currentYear !== 2026) {
            yearEl.textContent = 'v3.0 • ' + currentYear;
        }
    }

    // ============================================================
    // 9. KEYBOARD SHORTCUT
    // ============================================================
    document.addEventListener('keydown', function(e) {
        // Alt + 1 = Copy DANA
        if (e.altKey && e.key === '1') {
            e.preventDefault();
            copyNumber('083175975689');
        }
        // Alt + 2 = QRIS Request
        if (e.altKey && e.key === '2') {
            e.preventDefault();
            requestQris();
        }
        // Alt + 3 = Channel
        if (e.altKey && e.key === '3') {
            e.preventDefault();
            const btn = document.querySelector('.btn-channel');
            if (btn) btn.click();
        }
        // Alt + M = Menu
        if (e.altKey && (e.key === 'm' || e.key === 'M')) {
            e.preventDefault();
            if (menuBtn) menuBtn.click();
        }
        // Spasi = Play/Pause Video
        if (e.key === ' ' && !e.repeat) {
            const activeEl = document.activeElement;
            if (activeEl && activeEl.tagName !== 'INPUT' && activeEl.tagName !== 'TEXTAREA' && activeEl.tagName !== 'BUTTON') {
                e.preventDefault();
                if (video) {
                    if (video.paused) {
                        video.play();
                    } else {
                        video.pause();
                    }
                }
            }
        }
    });

    console.log('✅ JB Jar Store siap digunakan!');
    console.log('💡 Shortcut: Alt+1=Copy DANA, Alt+2=QRIS, Alt+3=Channel, Alt+M=Menu, Spasi=Play/Pause Video');
    console.log('📢 Saluran Info Daget: https://whatsapp.com/channel/0029Vb8afdKDDmFcSB6ldm1O');
});