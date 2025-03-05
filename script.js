document.addEventListener('DOMContentLoaded', function() {
    // Add this notification code at the start of your existing DOMContentLoaded function
    const notification = document.querySelector('.temp-notification');
    const notificationText = notification.querySelector('.notification-text');
    
    // Text to be typed
    const text = "All Channels and Live Streams Fixed!";
    let charIndex = 0;
    
    // Show notification
    notification.classList.add('show');
    
    // Type text effect
    function typeText() {
        if (charIndex < text.length) {
            notificationText.textContent += text.charAt(charIndex);
            charIndex++;
            setTimeout(typeText, 50);
        }
    }
    
    // Start typing
    typeText();
    
    // Hide notification after 3 seconds
    setTimeout(() => {
        notification.classList.add('hide');
        setTimeout(() => {
            notification.remove();
        }, 500);
    }, 3000);

    // Splash screen handler
    const splashScreen = document.querySelector('.splash-screen');
    
    // Hide splash screen after 2 seconds
    setTimeout(() => {
        splashScreen.classList.add('fade-out');
        // Remove splash screen from DOM after animation
        setTimeout(() => {
            splashScreen.remove();
        }, 500);
    }, 2000);

    // Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100
    });

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Interactive hover effects for buttons
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('mouseover', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        button.addEventListener('mouseout', function() {
            this.style.transform = 'scale(1)';
        });
    });

    // Handle Watch Live button click
    const watchLiveButton = document.querySelector('.cta-button');
    if (watchLiveButton) {
        watchLiveButton.addEventListener('click', function(e) {
            e.preventDefault();
            showLoading();
            setTimeout(() => {
                window.location.href = 'live.html';
            }, 2000);
        });
    }

    // Handle navigation link clicks
    document.querySelectorAll('a[href="live.html"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            showLoading();
            setTimeout(() => {
                window.location.href = 'live.html';
            }, 2000);
        });
    });

    function showLoading() {
        // Create loading bar if it doesn't exist
        let loadingBar = document.querySelector('.loading-bar');
        if (!loadingBar) {
            loadingBar = document.createElement('div');
            loadingBar.className = 'loading-bar';
            document.body.appendChild(loadingBar);
        }
        
        // Trigger loading animation
        document.body.classList.add('loading');
        
        // Remove loading class after animation
        setTimeout(() => {
            document.body.classList.remove('loading');
        }, 2000);
    }

    // Handle mobile watch button click
    const mobileBtn = document.querySelector('.watch-btn.mobile.main-btn');
    const serverOptions = document.querySelector('.server-options');
    
    if (mobileBtn) {
        mobileBtn.addEventListener('click', function() {
            serverOptions.style.display = serverOptions.style.display === 'none' ? 'flex' : 'none';
        });
    }

    // Handle server button clicks
    document.querySelectorAll('.server-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const url = this.dataset.url;
            const isInline = this.dataset.inline === 'true';
            
            if (isInline) {
                // Create an iframe for inline viewing
                const container = document.querySelector('.trophy-container');
                const existingFrame = document.querySelector('.stream-frame');
                
                if (!existingFrame) {
                    const iframe = document.createElement('iframe');
                    iframe.src = url;
                    iframe.className = 'stream-frame';
                    iframe.style.width = '100%';
                    iframe.style.height = '500px';
                    iframe.style.border = 'none';
                    iframe.style.borderRadius = '12px';
                    iframe.style.marginTop = '2rem';
                    container.appendChild(iframe);
                }
            } else {
                // Redirect to external URL
                window.location.href = url;
            }
        });
    });

    // Handle mobile watch button click for WPL
    const wplWatchBtn = document.querySelector('.wpl-buttons .watch-btn.android');
    const wplServerOptions = document.querySelector('.wpl-buttons .server-options');
    
    if (wplWatchBtn) {
        wplWatchBtn.addEventListener('click', function() {
            wplServerOptions.style.display = wplServerOptions.style.display === 'none' ? 'flex' : 'none';
        });
    }

    // Update WPL server button clicks with improved video handling and close button
    document.querySelectorAll('.wpl-buttons .server-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const url = this.dataset.url;
            const isInline = this.dataset.inline === 'true';
            
            if (isInline) {
                const matchBox = document.querySelector('.match-box');
                const loadingMessage = document.querySelector('.loading-message');
                const progressBar = document.querySelector('.progress-fill');
                const matchFrame = document.querySelector('.match-frame-container');
                const iframe = matchFrame.querySelector('iframe');

                // Add close button functionality
                const closeButton = matchBox.querySelector('.close-button');
                if (closeButton) {
                    closeButton.addEventListener('click', function() {
                        matchBox.style.display = 'none';
                        iframe.src = '';  // Clear iframe source
                        matchFrame.style.display = 'none';
                        loadingMessage.style.display = 'none';
                        progressBar.style.width = '0%';
                    });
                }

                // Reset and show loading state
                matchBox.style.display = 'block';
                loadingMessage.style.display = 'block';
                progressBar.style.width = '0%';
                matchFrame.style.display = 'none';
                
                // Clear existing iframe src
                iframe.src = '';

                // Animate progress bar
                let progress = 0;
                const interval = setInterval(() => {
                    progress += 1;
                    progressBar.style.width = `${progress}%`;
                    
                    if (progress >= 100) {
                        clearInterval(interval);
                        loadingMessage.style.display = 'none';
                        matchFrame.style.display = 'block';
                        
                        // Add sandbox attributes to allow more permissions
                        iframe.setAttribute('sandbox', 'allow-forms allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox allow-presentation');
                        
                        // Add additional permissions
                        iframe.setAttribute('allow', 'autoplay; fullscreen; encrypted-media; picture-in-picture; presentation');
                        
                        // Set iframe src with cache-busting parameter
                        const cacheBuster = new Date().getTime();
                        iframe.src = `${url}?cb=${cacheBuster}`;
                    }
                }, 30);
            } else {
                window.location.href = url;
            }
        });
    });

    // WPL Watch Button Handler
    const wplWatchButton = document.getElementById('wplWatchButton');
    if (wplWatchButton) {
        wplWatchButton.addEventListener('click', function() {
            const matchBox = document.querySelector('.match-box');
            const loadingMessage = document.querySelector('.loading-message');
            const progressBar = document.querySelector('.progress-fill');
            const matchFrame = document.querySelector('.match-frame-container');
            const iframe = matchFrame.querySelector('iframe');
            const closeButton = matchBox.querySelector('.close-button');

            // Add close button functionality
            if (closeButton) {
                closeButton.addEventListener('click', function() {
                    matchBox.style.display = 'none';
                    iframe.src = '';  // Clear iframe source
                    matchFrame.style.display = 'none';
                    loadingMessage.style.display = 'none';
                    progressBar.style.width = '0%';
                });
            }

            matchBox.style.display = 'block';
            loadingMessage.style.display = 'block';
            progressBar.style.width = '0%';
            matchFrame.style.display = 'none';

            // Clear existing iframe src
            iframe.src = '';

            // Animate progress bar
            let progress = 0;
            const interval = setInterval(() => {
                progress += 1;
                progressBar.style.width = `${progress}%`;
                
                if (progress >= 100) {
                    clearInterval(interval);
                    loadingMessage.style.display = 'none';
                    matchFrame.style.display = 'block';
                    
                    // Add sandbox attributes to allow more permissions
                    iframe.setAttribute('sandbox', 'allow-forms allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox');
                    
                    // Add additional permissions
                    iframe.setAttribute('allow', 'autoplay; fullscreen; encrypted-media; picture-in-picture');
                    
                    // Set iframe src with cache-busting parameter
                    const cacheBuster = new Date().getTime();
                    iframe.src = `https://crichype.fun/p3/?id=Wsports&cb=${cacheBuster}`;
                }
            }, 30);
        });
    }

    // Remove Star Sports Hindi related event listeners
    const starSportsButton = document.getElementById('starSportsButton');
    if (starSportsButton) {
        starSportsButton.removeEventListener('click', null);
    }

    const starSportsCloseButton = document.querySelector('.star-sports-box .close-button');
    if (starSportsCloseButton) {
        starSportsCloseButton.removeEventListener('click', null);
    }

    // Remove the old channel button click handlers since we're using direct onclick now
    document.querySelectorAll('.watch-channel-btn').forEach((btn) => {
        btn.addEventListener('mouseover', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        btn.addEventListener('mouseout', function() {
            this.style.transform = 'scale(1)';
        });
    });

    // Handle close button clicks for channels
    document.querySelectorAll('.channel-box .close-button').forEach(btn => {
        btn.addEventListener('click', function() {
            const channelBox = btn.closest('.channel-box');
            const iframe = channelBox.querySelector('iframe');
            channelBox.style.display = 'none';
            if (iframe) {
                iframe.src = '';
            }
            document.body.classList.remove('box-open');
        });
    });

    // Handle server button clicks for channels
    document.querySelectorAll('.channel-server-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const url = this.dataset.url;
            const isInline = this.dataset.inline === 'true';
            
            if (isInline) {
                const channelBox = this.closest('.channel-box');
                const loadingMessage = channelBox.querySelector('.loading-message');
                const progressBar = channelBox.querySelector('.progress-fill');
                const channelFrame = channelBox.querySelector('.channel-frame-container');
                const iframe = channelFrame.querySelector('iframe');

                loadingMessage.style.display = 'block';
                progressBar.style.width = '0%';
                channelFrame.style.display = 'none';
                
                iframe.src = '';

                let progress = 0;
                const interval = setInterval(() => {
                    progress += 1;
                    progressBar.style.width = `${progress}%`;
                    
                    if (progress >= 100) {
                        clearInterval(interval);
                        loadingMessage.style.display = 'none';
                        channelFrame.style.display = 'block';
                        iframe.src = url;
                    }
                }, 30);
            } else {
                window.open(url, '_blank');
            }
        });
    });

    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const heroContent = document.querySelector('.hero-content');
        const scrolled = window.pageYOffset;
        heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
    });

    // Add background particles
    function createParticles() {
        const particlesContainer = document.createElement('div');
        particlesContainer.className = 'background-particles';
        document.body.appendChild(particlesContainer);

        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            // Random starting position
            const startX = Math.random() * window.innerWidth;
            const startY = Math.random() * window.innerHeight;
            
            // Random movement
            const moveX = (Math.random() - 0.5) * 200;
            const moveY = (Math.random() - 0.5) * 200;
            
            particle.style.left = `${startX}px`;
            particle.style.top = `${startY}px`;
            particle.style.setProperty('--moveX', `${moveX}px`);
            particle.style.setProperty('--moveY', `${moveY}px`);
            
            // Random delay
            particle.style.animationDelay = `${Math.random() * 20}s`;
            
            particlesContainer.appendChild(particle);
        }
    }

    createParticles();

    // Recreate particles on window resize
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function() {
            const oldParticles = document.querySelector('.background-particles');
            if (oldParticles) {
                oldParticles.remove();
            }
            createParticles();
        }, 250);
    });

    // Add background animations for the live page
    if (document.querySelector('.cricket-background')) {
        const background = document.getElementById('cricketBackground');
        
        // Function to create and add neon balls
        function addNeonBall() {
            const element = document.createElement('div');
            element.className = 'floating-element neon-ball';
            
            // Random starting position
            const startX = Math.random() * window.innerWidth;
            const startY = window.innerHeight + 100;
            
            element.style.left = `${startX}px`;
            element.style.top = `${startY}px`;
            
            // Random size variation
            const size = 10 + Math.random() * 15;
            element.style.width = `${size}px`;
            element.style.height = `${size}px`;
            
            // Random animation duration and delay
            const duration = 8 + Math.random() * 7;
            element.style.animation = `float ${duration}s linear infinite, colorChange ${4 + Math.random() * 2}s infinite alternate`;
            
            background.appendChild(element);
            
            // Remove element after animation
            setTimeout(() => {
                element.remove();
            }, duration * 1000);
        }

        // Add new neon balls periodically
        setInterval(addNeonBall, 1000);
        
        // Add initial neon balls
        for (let i = 0; i < 15; i++) {
            addNeonBall();
        }
    }

    // Set active state for current page in bottom navigation
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.bottom-nav .nav-links a');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // Menu Toggle Functionality
    const menuToggle = document.querySelector('.menu-toggle');
    const sideMenu = document.querySelector('.side-menu');
    const overlay = document.querySelector('.overlay');

    menuToggle.addEventListener('click', function() {
        menuToggle.classList.toggle('active');
        sideMenu.classList.toggle('active');
        overlay.classList.toggle('active');
    });

    overlay.addEventListener('click', function() {
        menuToggle.classList.remove('active');
        sideMenu.classList.remove('active');
        overlay.classList.remove('active');
    });

    // Update the developer link click handler
    document.getElementById('developer-link').addEventListener('click', function(e) {
        e.preventDefault();
        const developerInfo = `
            <div class="developer-info-modal">
                <div class="developer-profile">
                    <img src="IMG_20241020_113252_372.webp" alt="Developer Profile" class="developer-image">
                    <h2>Hi, I'm Akash</h2>
                    <p class="developer-title">aka Anonymous</p>
                    <p class="developer-description">Full Stack Developer passionate about creating innovative web experiences</p>
                    <div class="developer-expertise">
                        <span>Web Development</span>
                        <span>UI/UX Design</span>
                        <span>Mobile Apps</span>
                    </div>
                    <a href="t.me/anonymousmrak" class="contact-link" target="_blank">
                        <i class="fab fa-telegram"></i> Contact Me
                    </a>
                </div>
            </div>
        `;
        
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = developerInfo;
        
        const closeBtn = document.createElement('button');
        closeBtn.className = 'modal-close';
        closeBtn.innerHTML = '×';
        modal.querySelector('.developer-info-modal').appendChild(closeBtn);
        
        document.body.appendChild(modal);
        
        setTimeout(() => modal.classList.add('active'), 10);
        
        closeBtn.addEventListener('click', () => {
            modal.classList.remove('active');
            setTimeout(() => modal.remove(), 300);
        });
    });

    // Update the updates link click handler
    document.getElementById('updates-link').addEventListener('click', function(e) {
        e.preventDefault();
        const updatesInfo = `
            <div class="updates-info-modal">
                <div class="updates-content">
                    <h2>Latest Updates <span class="update-badge">NEW</span></h2>
                    <div class="update-items">
                        <div class="update-item">
                            <i class="fas fa-star"></i>
                            <div class="update-text">
                                <h3>New Features Added</h3>
                                <p>Multi-server support for smoother streaming experience</p>
                            </div>
                        </div>
                        <div class="update-item">
                            <i class="fas fa-tv"></i>
                            <div class="update-text">
                                <h3>More Channels</h3>
                                <p>Additional sports channels with HD quality streams</p>
                            </div>
                        </div>
                        <div class="update-item coming-soon">
                            <i class="fas fa-rocket"></i>
                            <div class="update-text">
                                <h3>Coming Soon</h3>
                                <ul>
                                    <li>Enhanced streaming quality</li>
                                    <li>Live match statistics</li>
                                    <li>User customization options</li>
                                    <li>More sports coverage</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = updatesInfo;
        
        const closeBtn = document.createElement('button');
        closeBtn.className = 'modal-close';
        closeBtn.innerHTML = '×';
        modal.querySelector('.updates-info-modal').appendChild(closeBtn);
        
        document.body.appendChild(modal);
        
        setTimeout(() => modal.classList.add('active'), 10);
        
        closeBtn.addEventListener('click', () => {
            modal.classList.remove('active');
            setTimeout(() => modal.remove(), 300);
        });
    });

    // Update the about link click handler
    document.querySelector('a[href="#about"]').addEventListener('click', function(e) {
        e.preventDefault();
        const aboutInfo = `
            <div class="about-info-modal">
                <div class="about-content">
                    <h2>About KashCric</h2>
                    <div class="about-description">
                        <p class="highlight">Your Premier Destination for Free Live Cricket Streaming</p>
                        <div class="about-features">
                            <div class="feature">
                                <i class="fas fa-check-circle"></i>
                                <span>HD Quality Streams</span>
                            </div>
                            <div class="feature">
                                <i class="fas fa-check-circle"></i>
                                <span>Multiple Server Options</span>
                            </div>
                            <div class="feature">
                                <i class="fas fa-check-circle"></i>
                                <span>24/7 Live Support</span>
                            </div>
                            <div class="feature">
                                <i class="fas fa-check-circle"></i>
                                <span>Mobile Friendly Interface</span>
                            </div>
                        </div>
                        <div class="auto-text">
                            <p>Experience cricket like never before with our premium features:</p>
                            <div class="typing-text"></div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = aboutInfo;
        
        const closeBtn = document.createElement('button');
        closeBtn.className = 'modal-close';
        closeBtn.innerHTML = '×';
        modal.querySelector('.about-info-modal').appendChild(closeBtn);
        
        document.body.appendChild(modal);
        
        setTimeout(() => modal.classList.add('active'), 10);
        
        // Auto-typing text effect
        const texts = [
            "Global coverage of all cricket matches",
            "Enhanced streaming technology",
            "Real-time match updates",
            "Dedicated server infrastructure",
            "User-friendly interface"
        ];
        
        let textIndex = 0;
        let charIndex = 0;
        const typingText = modal.querySelector('.typing-text');
        
        function type() {
            if (textIndex >= texts.length) textIndex = 0;
            if (charIndex < texts[textIndex].length) {
                typingText.textContent += texts[textIndex].charAt(charIndex);
                charIndex++;
                setTimeout(type, 50);
            } else {
                setTimeout(erase, 2000);
            }
        }
        
        function erase() {
            if (charIndex > 0) {
                typingText.textContent = texts[textIndex].substring(0, charIndex-1);
                charIndex--;
                setTimeout(erase, 25);
            } else {
                textIndex++;
                setTimeout(type, 500);
            }
        }
        
        type();
        
        closeBtn.addEventListener('click', () => {
            modal.classList.remove('active');
            setTimeout(() => modal.remove(), 300);
        });
    });

    // Add error handling for menu clicks
    document.querySelectorAll('.menu-link').forEach(link => {
        link.addEventListener('click', function(e) {
            // Only prevent default if it's not a regular navigation link
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
            }
        });
    });

    // Create animated elements for the hero section
    function createHeroAnimations() {
        const hero = document.querySelector('.hero');
        
        // Create balls
        for (let i = 0; i < 5; i++) {
            const ball = document.createElement('div');
            ball.className = 'animated-element cricket-ball';
            ball.style.animationDelay = `${i * 2}s`;
            ball.style.left = `${Math.random() * 100}%`;
            ball.style.top = `${Math.random() * 100}%`;
            hero.appendChild(ball);
        }
        
        // Create floating text
        const texts = ['I Love Cricket', 'Cricket is Life', 'Cricket Forever'];
        texts.forEach((text, index) => {
            const textElement = document.createElement('div');
            textElement.className = 'animated-element cricket-text';
            textElement.textContent = text;
            textElement.style.animationDelay = `${index * 4}s`;
            textElement.style.top = `${20 + (index * 25)}%`;
            hero.appendChild(textElement);
        });
        
        // Create stars
        for (let i = 0; i < 30; i++) {
            const star = document.createElement('div');
            star.className = 'animated-element star';
            star.style.left = `${Math.random() * 100}%`;
            star.style.top = `${Math.random() * 100}%`;
            star.style.animationDelay = `${Math.random() * 2}s`;
            hero.appendChild(star);
        }
    }

    // Initialize hero animations
    if (document.querySelector('.hero')) {
        createHeroAnimations();
        
        // Recreate animations on window resize
        let resizeTimeout;
        window.addEventListener('resize', function() {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(function() {
                const elements = document.querySelectorAll('.animated-element');
                elements.forEach(el => el.remove());
                createHeroAnimations();
            }, 250);
        });
    }
});