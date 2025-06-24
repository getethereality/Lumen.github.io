document.addEventListener('DOMContentLoaded', function() {
    // === PRELOADER ===
    const preloader = document.getElementById('preloader');
    if (preloader) {
        const loaderBar = preloader.querySelector('.loader-bar span');
        let width = 0;
        const interval = setInterval(() => {
            width += Math.floor(Math.random() * 10) + 1;
            if (width > 100) {
                clearInterval(interval);
                // Ð£Ð¼ÐµÐ½ÑŒÑˆÐ°ÐµÐ¼ Ñ‚Ð°Ð¹Ð¼Ð°ÑƒÑ‚ Ð´Ð»Ñ ÑÐºÑ€Ñ‹Ñ‚Ð¸Ñ Ð¿Ñ€ÐµÐ»Ð¾Ð°Ð´ÐµÑ€Ð°
                preloader.classList.add('hidden');
                setTimeout(() => {
                    preloader.style.display = 'none';
                }, 300);
            } else {
                if (loaderBar) loaderBar.style.width = width + '%';
            }
        }, 50); // Ð£ÑÐºÐ¾Ñ€ÑÐµÐ¼ Ð¸Ð½Ñ‚ÐµÑ€Ð²Ð°Ð» Ð¾Ð±Ð½Ð¾Ð²Ð»ÐµÐ½Ð¸Ñ Ð¿Ñ€Ð¾Ð³Ñ€ÐµÑÑÐ°
        
        // Ð”Ð¾Ð±Ð°Ð²Ð»ÑÐµÐ¼ ÑÑ‚Ñ€Ð°Ñ…Ð¾Ð²Ð¾Ñ‡Ð½Ñ‹Ð¹ Ñ‚Ð°Ð¹Ð¼ÐµÑ€ Ð´Ð»Ñ ÑƒÐ´Ð°Ð»ÐµÐ½Ð¸Ñ Ð¿Ñ€ÐµÐ»Ð¾Ð°Ð´ÐµÑ€Ð°
        setTimeout(() => {
            clearInterval(interval);
            preloader.classList.add('hidden');
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 300);
        }, 3000);
    }

    // === NOTIFICATION SYSTEM ===
    window.showNotification = function(message, duration = 3000) {
        const container = document.getElementById('notification-container');
        if (!container) return;

        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        container.appendChild(notification);

        notification.offsetWidth; // Force reflow
        notification.classList.add('show');
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.parentNode && notification.parentNode.removeChild(notification);
            }, 300);
        }, duration);
    };

    // === ANIMATIONS ===
    function isInViewport(element) {
        if (!element) return false;
        const rect = element.getBoundingClientRect();
        return (rect.top <= window.innerHeight * 0.9 && rect.bottom >= 0);
    }

    // Initial animations
    (function initializeAnimations() {
        const heroElements = document.querySelectorAll('.brand, .separator, .product-name, .description, .button-group, .password-container');
        
        heroElements.forEach((el, index) => {
            if (!el) return;
            el.style.opacity = '0';
            el.style.transform = 'translateY(15px)';
            
            setTimeout(() => {
                el.style.transition = 'all 0.5s cubic-bezier(0.22, 1, 0.36, 1)';
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, 100 + index * 100);
        });
    })();

    // Scroll animations
    const animateOnScroll = () => {
        const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const cards = document.querySelectorAll('.game-card, .feature-card, .faq-item');
        
        if (isReducedMotion) {
            cards.forEach(card => {
                if (!card) return;
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
                card.classList.add('animated');
            });
            return;
        }
        
        cards.forEach((card, index) => {
            if (!card) return;
            if (isInViewport(card) && !card.classList.contains('animated')) {
                card.classList.add('animated');
                
                setTimeout(() => {
                    card.style.transition = 'all 0.6s cubic-bezier(0.22, 1, 0.36, 1)';
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 50 * (index % 3));
            }
        });
    };

    // Debounce scroll event
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        if (!scrollTimeout) {
            scrollTimeout = setTimeout(() => {
                animateOnScroll();
                scrollTimeout = null;
            }, 100);
        }
    });
    
    setTimeout(animateOnScroll, 300);

    // === BUTTON INTERACTIONS ===
    // Features button scroll
    const featuresButton = document.getElementById('viewFeatures');
    if (featuresButton) {
        featuresButton.addEventListener('click', function() {
            const featuresSection = document.getElementById('features');
            if (!featuresSection) return;
            
            showNotification('Scrolling to features section...');
            
            if ('scrollBehavior' in document.documentElement.style) {
                window.scrollTo({
                    top: featuresSection.offsetTop - 80,
                    behavior: 'smooth'
                });
            } else {
                // Fallback
                const start = window.pageYOffset;
                const change = featuresSection.offsetTop - 80 - start;
                let currentTime = 0;
                const duration = 500;
                
                function animateScroll() {
                    currentTime += 20;
                    const val = (currentTime / duration / 2 < 1) 
                        ? change / 2 * (currentTime / duration) * (currentTime / duration) + start
                        : -change / 2 * ((currentTime / duration - 2) * (currentTime / duration - 2) - 2) + start;
                    window.scrollTo(0, val);
                    if (currentTime < duration) {
                        requestAnimationFrame(animateScroll);
                    }
                }
                
                requestAnimationFrame(animateScroll);
            }
        });
    }
// Download button
const downloadBtn = document.getElementById('download-btn');
if (downloadBtn) {
    downloadBtn.addEventListener('click', function() {
        const btn = this;
        const originalText = btn.innerHTML;

        btn.classList.add('downloading');

        setTimeout(() => {
            const link = document.createElement('a');
            link.href = 'https://gofile.io/d/j73ws7';
            link.style.display = 'none';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            showNotification('Download started!');

            setTimeout(() => {
                btn.classList.remove('downloading');
                btn.innerHTML = originalText;
            }, 1000);
        }, 500);
    });
}
    // === PASSWORD COPY ===
    const copyBtn = document.getElementById('copy-btn');
    if (copyBtn) {
        copyBtn.addEventListener('click', function() {
            // ÐŸÑ€Ð¾ÑÑ‚Ð¾Ð¹ ÑÐ¿Ð¾ÑÐ¾Ð± â€” Ð¿Ñ€Ð¾ÑÑ‚Ð¾ Ð¸ÑÐ¿Ð¾Ð»ÑŒÐ·ÑƒÐµÐ¼ ÑÑ‚Ñ€Ð¾ÐºÐ¾Ð²ÑƒÑŽ ÐºÐ¾Ð½ÑÑ‚Ð°Ð½Ñ‚Ñƒ
            const passwordText = "LUMEN";
            
            try {
                // ÐŸÐ¾Ð¿Ñ‹Ñ‚ÐºÐ° Ð¸ÑÐ¿Ð¾Ð»ÑŒÐ·Ð¾Ð²Ð°Ñ‚ÑŒ ÑÐ¾Ð²Ñ€ÐµÐ¼ÐµÐ½Ð½Ñ‹Ð¹ API Ð±ÑƒÑ„ÐµÑ€Ð° Ð¾Ð±Ð¼ÐµÐ½Ð°
                if (navigator.clipboard && window.isSecureContext) {
                    navigator.clipboard.writeText(passwordText).then(() => {
                        showCopyFeedback(true);
                    }).catch(err => {
                        console.error('Copy error:', err);
                        showCopyFeedback(false);
                    });
                } else {
                    // Ð—Ð°Ð¿Ð°ÑÐ½Ð¾Ð¹ Ð¼ÐµÑ‚Ð¾Ð´ Ð´Ð»Ñ Ð±Ñ€Ð°ÑƒÐ·ÐµÑ€Ð¾Ð², ÐºÐ¾Ñ‚Ð¾Ñ€Ñ‹Ðµ Ð½Ðµ Ð¿Ð¾Ð´Ð´ÐµÑ€Ð¶Ð¸Ð²Ð°ÑŽÑ‚ API Ð±ÑƒÑ„ÐµÑ€Ð° Ð¾Ð±Ð¼ÐµÐ½Ð°
                    const textArea = document.createElement('textarea');
                    textArea.value = passwordText;
                    textArea.style.position = 'fixed';
                    textArea.style.left = '-999999px';
                    textArea.style.top = '-999999px';
                    document.body.appendChild(textArea);
                    textArea.focus();
                    textArea.select();
                    
                    const success = document.execCommand('copy');
                    document.body.removeChild(textArea);
                    showCopyFeedback(success);
                }
            } catch(err) {
                console.error('Copy error:', err);
                showCopyFeedback(false);
            }

            function showCopyFeedback(success) {
                const btn = document.getElementById('copy-btn');
                if (!btn) return;
                
                btn.textContent = success ? 'Copied!' : 'Error!';
                btn.style.backgroundColor = success ? 'rgba(0, 255, 136, 0.3)' : 'rgba(255, 0, 0, 0.3)';
                btn.disabled = true;

                setTimeout(() => {
                    btn.textContent = 'Copy';
                    btn.style.backgroundColor = '';
                    btn.disabled = false;
                }, 2000);

                showNotification(success ? 'Password copied!' : 'Copy failed. Select manually', 2000);
            }
        });
    }

    // Password selection
    const passwordElement = document.getElementById('password-text');
    if (passwordElement) {
        passwordElement.style.cursor = 'pointer';
        passwordElement.addEventListener('click', function() {
            const password = "LUMEN"; // Ð–ÐµÑÑ‚ÐºÐ°Ñ ÐºÐ¾Ð½ÑÑ‚Ð°Ð½Ñ‚Ð° Ð²Ð¼ÐµÑÑ‚Ð¾ Ð¸Ð·Ð²Ð»ÐµÑ‡ÐµÐ½Ð¸Ñ Ð¸Ð· DOM
            
            try {
                if (navigator.clipboard && window.isSecureContext) {
                    navigator.clipboard.writeText(password).then(() => {
                        showNotification('Password copied!', 2000);
                    }).catch(err => {
                        console.error('Copy error:', err);
                        // Ð•ÑÐ»Ð¸ ÑÐ¾Ð²Ñ€ÐµÐ¼ÐµÐ½Ð½Ñ‹Ð¹ Ð¼ÐµÑ‚Ð¾Ð´ Ð½Ðµ ÑÑ€Ð°Ð±Ð¾Ñ‚Ð°Ð», Ð¿Ñ€Ð¾Ð±ÑƒÐµÐ¼ Ð²Ñ‹Ð´ÐµÐ»Ð¸Ñ‚ÑŒ Ñ‚ÐµÐºÑÑ‚
                        selectText();
                    });
                } else {
                    // Ð•ÑÐ»Ð¸ API Ð±ÑƒÑ„ÐµÑ€Ð° Ð¾Ð±Ð¼ÐµÐ½Ð° Ð½ÐµÐ´Ð¾ÑÑ‚ÑƒÐ¿ÐµÐ½, Ð²Ñ‹Ð´ÐµÐ»ÑÐµÐ¼ Ñ‚ÐµÐºÑÑ‚ Ð´Ð»Ñ Ñ€ÑƒÑ‡Ð½Ð¾Ð³Ð¾ ÐºÐ¾Ð¿Ð¸Ñ€Ð¾Ð²Ð°Ð½Ð¸Ñ
                    selectText();
                }
            } catch (err) {
                console.error('Selection error:', err);
                selectText(); // Ð—Ð°Ð¿Ð°ÑÐ½Ð¾Ð¹ Ð¿Ð»Ð°Ð½
            }
            
            function selectText() {
                if (window.getSelection && document.createRange) {
                    const selection = window.getSelection();
                    const range = document.createRange();
                    range.selectNodeContents(passwordElement);
                    selection.removeAllRanges();
                    selection.addRange(range);
                    
                    showNotification('Select and copy manually (Ctrl+C)', 2000);
                } else if (document.selection && document.selection.createRange) {
                    // IE
                    const range = document.selection.createRange();
                    range.moveToElementText(passwordElement);
                    range.select();
                    
                    showNotification('Select and copy manually (Ctrl+C)', 2000);
                }
            }
        });
    }

    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    if (faqItems.length) {
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            const answer = item.querySelector('.faq-answer');
            
            if (question && answer) {
                question.addEventListener('click', () => {
                    const wasOpen = item.classList.contains('active');
                    
                    // Close all other items
                    faqItems.forEach(otherItem => {
                        if (otherItem !== item) {
                            otherItem.classList.remove('active');
                            const otherAnswer = otherItem.querySelector('.faq-answer');
                            if (otherAnswer) otherAnswer.style.maxHeight = null;
                        }
                    });
                    
                    // Toggle clicked item
                    if (wasOpen) {
                        item.classList.remove('active');
                        answer.style.maxHeight = null;
                    } else {
                        item.classList.add('active');
                        answer.style.maxHeight = answer.scrollHeight + 'px';
                    }
                });
            }
        });
    }

    // Mobile Menu Toggle
    const header = document.querySelector('.top-header');
    if (header && !document.querySelector('.menu-toggle')) {
        const menuToggle = document.createElement('button');
        menuToggle.className = 'menu-toggle';
        menuToggle.innerHTML = 'â˜°';
        header.appendChild(menuToggle);
        
        const nav = document.querySelector('.main-nav');
        
        if (menuToggle && nav) {
            menuToggle.addEventListener('click', () => {
                nav.classList.toggle('active');
                menuToggle.innerHTML = nav.classList.contains('active') ? 'âœ•' : 'â˜°';
            });
            
            // Close menu when clicking a link
            const navLinks = nav.querySelectorAll('a');
            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    nav.classList.remove('active');
                    menuToggle.innerHTML = 'â˜°';
                });
            });
        }
    }

    // === ENHANCED PROTECTION ===
    (function enhancedProtection() {
        // ÐšÐ¾Ð¼Ð¼ÐµÐ½Ñ‚Ð¸Ñ€ÑƒÐµÐ¼ Ð¿Ð¾Ñ‚ÐµÐ½Ñ†Ð¸Ð°Ð»ÑŒÐ½Ð¾ Ð¿Ñ€Ð¾Ð±Ð»ÐµÐ¼Ð½Ñ‹Ðµ ÑƒÑ‡Ð°ÑÑ‚ÐºÐ¸ ÐºÐ¾Ð´Ð°
        /*
        // Anti-DevTools detection
        let devtoolsOpen = false;
        
        function detectDevTools(showWarning) {
            // Method 1: Detect using element sizing
            const element = document.createElement('div');
            Object.defineProperty(element, 'id', {
                get: function() {
                    devtoolsOpen = true;
                    if (showWarning) displayDevToolsWarning();
                    return 'id';
                }
            });
            console.log(element);
            
            // Method 2: Using console.clear with timing measurement
            const start = performance.now();
            console.clear();
            const end = performance.now();
            if (end - start > 20) {
                devtoolsOpen = true;
                if (showWarning) displayDevToolsWarning();
            }
            
            // Method 3: Debug function override
            Function.prototype.toString = function() {
                devtoolsOpen = true;
                if (showWarning) displayDevToolsWarning();
                return 'function { [native code] }';
            };
        }
        
        function displayDevToolsWarning() {
            showWarning('Warning: Debugging tools detected. For security reasons, please close developer tools.');
        }
        */
        
        function showWarning(msg) {
            showNotification(msg, 3000);
        }
        
        // Execute anti-DevTools detection
        // detectDevTools(true);
        
        // Periodic check
        // setInterval(() => detectDevTools(true), 1000);
        
        // Make code harder to inspect
        (function obfuscateScripts() {
            const scripts = document.querySelectorAll('script');
            scripts.forEach(script => {
                script.setAttribute('data-protected', 'true');
            });
        })();
        
        // Anti-right-click - Ð¾Ñ‚ÐºÐ»ÑŽÑ‡Ð°ÐµÐ¼, Ð¼Ð¾Ð¶ÐµÑ‚ Ð¼ÐµÑˆÐ°Ñ‚ÑŒ Ð¿Ð¾Ð»ÑŒÐ·Ð¾Ð²Ð°Ñ‚ÑŒÑÑ ÑÐ°Ð¹Ñ‚Ð¾Ð¼
        /*
        document.addEventListener('contextmenu', e => {
            e.preventDefault();
            showNotification('Right-click is disabled for security reasons', 1500);
            return false;
        });
        */
        
        // Prevent inspection shortcuts - Ð¾Ñ‚ÐºÐ»ÑŽÑ‡Ð°ÐµÐ¼, Ð¼Ð¾Ð¶ÐµÑ‚ Ð²Ñ‹Ð·Ñ‹Ð²Ð°Ñ‚ÑŒ ÐºÐ¾Ð½Ñ„Ð»Ð¸ÐºÑ‚Ñ‹
        /*
        document.addEventListener('keydown', e => {
            // Check for common inspection shortcuts
            if (
                (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'i' || e.key === 'C' || e.key === 'c' || e.key === 'J' || e.key === 'j')) ||
                (e.ctrlKey && (e.key === 'U' || e.key === 'u')) ||
                e.key === 'F12'
            ) {
                e.preventDefault();
                showNotification('This keyboard shortcut is disabled for security reasons', 1500);
                return false;
            }
        });
        */
    })();

    // === BROWSER OPTIMIZATIONS ===
    function optimizeBrowserSpecifics() {
        // Detect browser
        const ua = navigator.userAgent;
        const isChrome = /Chrome/.test(ua) && /Google Inc/.test(navigator.vendor);
        const isFirefox = /Firefox/.test(ua);
        const isSafari = /Safari/.test(ua) && !/Chrome/.test(ua);
        const isEdge = /Edg/.test(ua);
        const isIE = /Trident/.test(ua);
        
        // Add browser-specific class to body
        if (isChrome) document.body.classList.add('chrome');
        if (isFirefox) document.body.classList.add('firefox');
        if (isSafari) document.body.classList.add('safari');
        if (isEdge) document.body.classList.add('edge');
        if (isIE) document.body.classList.add('ie');
        
        // Optimize animations based on browser
        if (isIE || (isEdge && /Edge\/\d+/.test(ua))) {
            document.querySelectorAll('.wave-layer-1, .wave-layer-2, .wave-layer-3').forEach(wave => {
                wave.style.animationDuration = '60s'; // Slower animation for IE/older Edge
            });
        }
        
        // Optimize for mobile
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua)) {
            document.body.classList.add('mobile');
            
            // Reduce wave animation complexity on mobile
            document.querySelectorAll('.wave-layer-3').forEach(wave => {
                wave.style.opacity = '0';
            });
        }
    }
    
    optimizeBrowserSpecifics();

    // === ENHANCED WAVE EFFECTS ===
    function enhanceWaves() {
        const waves = document.querySelectorAll('.wave-layer-1, .wave-layer-2, .wave-layer-3');
        
        if (!waves.length) return;
        
        // Add random slight variations to wave animations
        waves.forEach(wave => {
            const randomDelay = -Math.random() * 10;
            wave.style.animationDelay = randomDelay + 's';
        });
        
        // Change wave colors periodically
        animateWaveColors();
        
        function animateWaveColors() {
            const colors = [
                ['rgba(0, 255, 136, 0.15)', 'rgba(0, 136, 255, 0.1)', 'rgba(0, 85, 136, 0.1)'], // Green - Blue
                ['rgba(0, 255, 136, 0.15)', 'rgba(255, 0, 136, 0.1)', 'rgba(136, 0, 85, 0.1)'], // Green - Pink
                ['rgba(0, 255, 136, 0.15)', 'rgba(255, 136, 0, 0.1)', 'rgba(136, 85, 0, 0.1)'], // Green - Orange
                ['rgba(0, 255, 136, 0.15)', 'rgba(136, 0, 255, 0.1)', 'rgba(85, 0, 136, 0.1)']  // Green - Purple
            ];
            
            let currentColor = 0;
            
            setInterval(() => {
                currentColor = (currentColor + 1) % colors.length;
                
                waves.forEach((wave, index) => {
                    const style = window.getComputedStyle(wave);
                    const bgImage = style.backgroundImage;
                    
                    if (bgImage && bgImage.includes('svg')) {
                        const newImage = bgImage.replace(/fill='[^']*'/, `fill='${colors[currentColor][index % 3]}'`);
                        wave.style.backgroundImage = newImage;
                    }
                });
            }, 30000); // Change every 30 seconds
        }
    }
    
    enhanceWaves();

    // Privacy Policy Link
    const privacyLink = document.getElementById('privacy-link');
    if (privacyLink) {
        privacyLink.addEventListener('click', (e) => {
            e.preventDefault();
            
            const privacyModal = document.createElement('div');
            privacyModal.className = 'privacy-modal';
            privacyModal.innerHTML = `
                <div class="privacy-modal-content">
                    <span class="privacy-close">&times;</span>
                    <h2>Privacy Policy</h2>
                    <div class="privacy-text">
                        <p><strong>Effective Date:</strong> January 1, 2023</p>
                        
                        <h3>1. Introduction</h3>
                        <p>LUMEN ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you use our software products and services.</p>
                        
                        <h3>2. Information We Collect</h3>
                        <p>We collect minimal information necessary to provide our services:</p>
                        <ul>
                            <li>System information for compatibility checks</li>
                            <li>Usage statistics to improve our software</li>
                            <li>Crash reports to identify and fix bugs</li>
                        </ul>
                        
                        <h3>3. How We Use Your Information</h3>
                        <p>We use collected information to:</p>
                        <ul>
                            <li>Improve and optimize our software</li>
                            <li>Detect and prevent security threats</li>
                            <li>Provide software updates</li>
                        </ul>
                        
                        <h3>4. Data Security</h3>
                        <p>We implement appropriate security measures to protect your information. However, no method of transmission over the Internet is 100% secure.</p>
                        
                        <h3>5. Contact Us</h3>
                        <p>If you have questions about this Privacy Policy, please contact us at support@lumen-software.com.</p>
                    </div>
                </div>
            `;
            
            document.body.appendChild(privacyModal);
            document.body.style.overflow = 'hidden';
            
            const closeButton = privacyModal.querySelector('.privacy-close');
            if (closeButton) {
                closeButton.addEventListener('click', () => {
                    document.body.removeChild(privacyModal);
                    document.body.style.overflow = '';
                });
            }
            
            // Close when clicking outside
            privacyModal.addEventListener('click', (e) => {
                if (e.target === privacyModal) {
                    document.body.removeChild(privacyModal);
                    document.body.style.overflow = '';
                }
            });
        });
    }
    
    // Add GA4 script asynchronously
    (function() {
        const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX'; // Replace with your actual GA4 ID
        
        const script = document.createElement('script');
        script.async = true;
        script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
        document.head.appendChild(script);
        
        window.dataLayer = window.dataLayer || [];
        function gtag() {
            dataLayer.push(arguments);
        }
        gtag('js', new Date());
        gtag('config', GA_MEASUREMENT_ID);
    })();
});
