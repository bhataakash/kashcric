document.addEventListener('DOMContentLoaded', function() {
    // Remove update notification after 3 seconds
    setTimeout(() => {
        const notification = document.querySelector('.update-notification');
        if (notification) {
            notification.addEventListener('animationend', function(e) {
                if (e.animationName === 'slideUp') {
                    notification.remove();
                }
            });
        }
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

    // Menu functionality
    const menuBtn = document.querySelector('.menu-btn');
    const menuOverlay = document.querySelector('.menu-overlay');
    const contentOverlay = document.querySelector('.content-overlay');
    const backBtns = document.querySelectorAll('.back-btn');

    menuBtn.addEventListener('click', function() {
        this.classList.toggle('active');
        menuOverlay.classList.toggle('active');
    });

    // Handle menu item clicks
    document.querySelectorAll('.menu-items button').forEach(button => {
        button.addEventListener('click', function() {
            const type = this.getAttribute('data-type');
            showContent(type);
        });
    });

    // Handle back buttons
    backBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            contentOverlay.style.display = 'none';
            menuBtn.classList.remove('active');
            menuOverlay.classList.remove('active');
        });
    });

    function showContent(type) {
        contentOverlay.style.display = 'block';
        const containers = document.querySelectorAll('.content-container');
        containers.forEach(container => container.style.display = 'none');
        document.querySelector(`.${type}-container`).style.display = 'block';
    }

    // Handle KashCric Live button click
    const kashcricBtn = document.querySelector('.watch-btn.kashcric');
    const kashcricOptions = document.querySelector('.kashcric-options');
    
    if (kashcricBtn) {
        kashcricBtn.addEventListener('click', function() {
            // Directly show Hindi stream instead of options
            const url = "https://ifram.embedxt.site/iframe/frame.php";
            const kashcricBox = document.querySelector('.kashcric-box');
            const loadingMessage = kashcricBox.querySelector('.loading-message');
            const progressBar = kashcricBox.querySelector('.progress-fill');
            const frameContainer = kashcricBox.querySelector('.kashcric-frame-container');
            const iframe = frameContainer.querySelector('iframe');
            const closeButton = kashcricBox.querySelector('.close-button');

            // Show the box and loading state
            kashcricBox.style.display = 'block';
            loadingMessage.style.display = 'block';
            progressBar.style.width = '0%';
            frameContainer.style.display = 'none';
            
            // Clear existing iframe src
            iframe.src = '';

            // Close button handler
            closeButton.addEventListener('click', function() {
                kashcricBox.style.display = 'none';
                iframe.src = '';
                frameContainer.style.display = 'none';
                loadingMessage.style.display = 'none';
                progressBar.style.width = '0%';
            });

            // Simulate loading with progress bar
            let progress = 0;
            const interval = setInterval(() => {
                progress += 1;
                progressBar.style.width = `${progress}%`;
                
                if (progress >= 100) {
                    clearInterval(interval);
                    loadingMessage.style.display = 'none';
                    frameContainer.style.display = 'block';
                    
                    // Set up iframe with necessary attributes
                    iframe.setAttribute('sandbox', 'allow-forms allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox allow-presentation');
                    iframe.setAttribute('allow', 'autoplay; fullscreen; encrypted-media; picture-in-picture; presentation');
                    
                    // Add cache-busting parameter
                    const cacheBuster = new Date().getTime();
                    iframe.src = `${url}?cb=${cacheBuster}`;
                }
            }, 30);
        });
    }

    // Handle KashCric stream button clicks
    document.querySelectorAll('.kashcric-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const url = this.dataset.url;
            const kashcricBox = document.querySelector('.kashcric-box');
            const loadingMessage = kashcricBox.querySelector('.loading-message');
            const progressBar = kashcricBox.querySelector('.progress-fill');
            const frameContainer = kashcricBox.querySelector('.kashcric-frame-container');
            const iframe = frameContainer.querySelector('iframe');
            const closeButton = kashcricBox.querySelector('.close-button');

            // Show the box and loading state
            kashcricBox.style.display = 'block';
            loadingMessage.style.display = 'block';
            progressBar.style.width = '0%';
            frameContainer.style.display = 'none';
            
            // Clear existing iframe src
            iframe.src = '';

            // Close button handler
            closeButton.addEventListener('click', function() {
                kashcricBox.style.display = 'none';
                iframe.src = '';
                frameContainer.style.display = 'none';
                loadingMessage.style.display = 'none';
                progressBar.style.width = '0%';
            });

            // Simulate loading with progress bar
            let progress = 0;
            const interval = setInterval(() => {
                progress += 1;
                progressBar.style.width = `${progress}%`;
                
                if (progress >= 100) {
                    clearInterval(interval);
                    loadingMessage.style.display = 'none';
                    frameContainer.style.display = 'block';
                    
                    // Set up iframe with necessary attributes
                    iframe.setAttribute('sandbox', 'allow-forms allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox allow-presentation');
                    iframe.setAttribute('allow', 'autoplay; fullscreen; encrypted-media; picture-in-picture; presentation');
                    
                    // Add cache-busting parameter
                    const cacheBuster = new Date().getTime();
                    iframe.src = `${url}?cb=${cacheBuster}`;
                }
            }, 30);
        });
    });

    // Telegram text animation handler
    const telegramText = document.querySelector('.telegram-text');
    if (telegramText) {
        telegramText.addEventListener('animationend', function() {
            this.remove();
        });
    }
});