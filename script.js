// Initialize visitor counter
let visitorCount = localStorage.getItem('visitorCount') || 0;

// Function to generate a random increment between 1-5
function getRandomIncrement() {
    return Math.floor(Math.random() * 5) + 1;
}

// Function to update visitor count
function updateVisitorCount() {
    // Increment count
    visitorCount = parseInt(visitorCount) + getRandomIncrement();
    
    // Save to localStorage
    localStorage.setItem('visitorCount', visitorCount);
    
    // Update display
    const visitorCountElement = document.querySelector('.visitor-count');
    if (visitorCountElement) {
        visitorCountElement.textContent = visitorCount.toLocaleString();
    }
}

// Update count every 30 seconds
setInterval(updateVisitorCount, 30000);

// Array of notification messages
const notificationMessages = [
  {
    title: "New Feature Added",
    message: "Multi-language support coming soon!",
    icon: "fas fa-globe"
  },
  {
    title: "Performance Update",
    message: "Enhanced streaming quality and reduced buffering",
    icon: "fas fa-bolt"  
  },
  {
    title: "Server Upgrade",
    message: "New servers added for faster streaming",
    icon: "fas fa-server"
  },
  {
    title: "Security Enhancement",
    message: "Advanced encryption protocols implemented",
    icon: "fas fa-shield-alt"
  },
  {
    title: "UI Improvement",
    message: "Redesigned player controls for better experience",
    icon: "fas fa-paint-brush"
  },
  {
    title: "New Channels",
    message: "Added more sports channels to our lineup",
    icon: "fas fa-tv"
  },
  {
    title: "Mobile App Update",
    message: "Download our latest mobile app version",
    icon: "fas fa-mobile-alt"
  },
  {
    title: "Bug Fix",
    message: "Fixed various streaming issues",
    icon: "fas fa-bug"
  },
  {
    title: "New Tournament",
    message: "IPL 2025 streaming schedule available",
    icon: "fas fa-trophy"
  },
  {
    title: "Community Growth",
    message: "Over 1 million active users!",
    icon: "fas fa-users"
  }
];

// Store notifications
let storedNotifications = [];
const MAX_STORED_NOTIFICATIONS = 10;

// Function to create and show notification
function showSiteNotification() {
  const notification = notificationMessages[Math.floor(Math.random() * notificationMessages.length)];
  
  // Create notification element
  const notifEl = document.createElement('div');
  notifEl.className = 'site-notification';
  notifEl.innerHTML = `
    <div class="site-notification-content">
      <i class="${notification.icon}"></i>
      <div class="notification-text">
        <h4>${notification.title}</h4>
        <p>${notification.message}</p>
      </div>
    </div>
  `;
  
  document.body.appendChild(notifEl);
  
  // Store notification
  storeNotification(notification);
  
  // Remove notification after animation
  setTimeout(() => {
    notifEl.classList.add('fade-out');
    setTimeout(() => {
      notifEl.remove();
    }, 500);
  }, 5000);

  // Schedule next notification
  setTimeout(showSiteNotification, Math.random() * (30000 - 10000) + 10000); // Random between 10-30 seconds
}

// Function to store notifications
function storeNotification(notification) {
  const timestamp = new Date().toLocaleTimeString();
  storedNotifications.unshift({ ...notification, timestamp });
  
  // Keep only last 10 notifications
  if (storedNotifications.length > MAX_STORED_NOTIFICATIONS) {
    storedNotifications.pop();
  }
  
  // Update notifications container if it exists
  updateNotificationsContainer();
}

// Function to update notifications container
function updateNotificationsContainer() {
  const container = document.querySelector('.updates-container');
  if (container) {
    const notificationsList = container.querySelector('.notifications-list') || document.createElement('div');
    notificationsList.className = 'notifications-list';
    notificationsList.innerHTML = storedNotifications.map(notification => `
      <div class="notification-item" data-aos="fade-up">
        <div class="notification-header">
          <i class="${notification.icon}"></i>
          <h3>${notification.title}</h3>
          <span class="notification-time">${notification.timestamp}</span>
        </div>
        <p>${notification.message}</p>
      </div>
    `).join('');
    
    if (!container.querySelector('.notifications-list')) {
      container.appendChild(notificationsList);
    }
  }
}

document.addEventListener('DOMContentLoaded', function() {
    // Array of example names
    const viewerNames = [
        'Saqib', 'Danish', 'Ujval', 'Kumar', 'Owais', 
        'Jasria', 'Alia', 'Anjali', 'Karshna',
        'Rahul', 'Priya', 'Arjun', 'Zara', 'Farah',
        'Mohammed', 'Ravi', 'Neha', 'Kavya', 'Arun',
        'Ishaan', 'Diya', 'Vihaan', 'Anaya', 'Yash'
    ];

    // Function to generate a random name
    function getRandomName() {
        return viewerNames[Math.floor(Math.random() * viewerNames.length)];
    }

    // Function to get random time between 10-20 seconds
    function getRandomInterval() {
        return Math.floor(Math.random() * (20000 - 10000 + 1) + 10000); // Random between 10000ms and 20000ms
    }

    // Function to create and show viewer notification
    function showViewerNotification() {
        const name = getRandomName();
        const notifications = [
            `${name} joined the live stream!`,
            `Welcome ${name} to the stream!`,
            `${name} is now watching!`,
            `New viewer: ${name}`,
            `${name} has joined the match!`
        ];
        const notification = notifications[Math.floor(Math.random() * notifications.length)];
        
        // Create notification element
        const notifEl = document.createElement('div');
        notifEl.className = 'viewer-notification';
        notifEl.innerHTML = `
            <div class="viewer-notification-content">
                <i class="fas fa-user-plus"></i>
                <span>${notification}</span>
            </div>
        `;
        
        document.body.appendChild(notifEl);
        
        // Remove notification after animation
        setTimeout(() => {
            notifEl.classList.add('fade-out');
            setTimeout(() => {
                notifEl.remove();
            }, 500);
        }, 3000);

        // Schedule next notification with random interval
        setTimeout(showViewerNotification, getRandomInterval());
    }

    // Start showing notifications with initial random interval
    setTimeout(showViewerNotification, getRandomInterval());

    // Update the visitor count with actual increment
    function updateVisitorCount() {
        // Generate random increment between 1-5
        const increment = Math.floor(Math.random() * 5) + 1;
        
        // Update count
        visitorCount = parseInt(visitorCount) + increment;
        
        // Save to localStorage
        localStorage.setItem('visitorCount', visitorCount);
        
        // Update display
        const visitorCountElement = document.querySelector('.visitor-count');
        if (visitorCountElement) {
            visitorCountElement.textContent = visitorCount.toLocaleString();
            
            // Add animation class
            visitorCountElement.classList.add('count-update');
            setTimeout(() => {
                visitorCountElement.classList.remove('count-update');
            }, 300);
        }
    }

    updateVisitorCount();

    // Get stored profile data
    const profileData = JSON.parse(localStorage.getItem('userProfile') || '{}');
    
    // Update website title if profile exists
    if (profileData.fullName || profileData.profilePic) {
        const navLogo = document.querySelector('.nav-logo');
        if (navLogo) {
            // Create profile container if it doesn't exist
            let profileContainer = navLogo.querySelector('.profile-info');
            if (!profileContainer) {
                profileContainer = document.createElement('div');
                profileContainer.className = 'profile-info';
                navLogo.appendChild(profileContainer);
            }

            // Update profile HTML
            profileContainer.innerHTML = `
                ${profileData.profilePic ? `
                    <img src="${profileData.profilePic}" alt="Profile" class="nav-profile-pic">
                ` : ''}
                ${profileData.fullName ? `
                    <small class="nav-profile-name">${profileData.fullName}</small>
                ` : ''}
            `;
        }
    }

    // Add this check at the beginning to conditionally enable menu functionality
    const isLivePage = window.location.pathname.includes('live.html');
    const menuBtn = document.querySelector('.menu-btn');
    
    if (!isLivePage && menuBtn) {
        // Only initialize menu functionality if not on live page
        menuBtn.addEventListener('click', function() {
            this.classList.toggle('active');
            document.querySelector('.menu-overlay').classList.toggle('active');
        });

        // Handle menu item clicks
        document.querySelectorAll('.menu-items button').forEach(button => {
            button.addEventListener('click', function() {
                const type = this.getAttribute('data-type');
                showContent(type);
            });
        });

        // Handle back buttons
        document.querySelectorAll('.back-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                document.querySelector('.content-overlay').style.display = 'none';
                menuBtn.classList.remove('active');
                document.querySelector('.menu-overlay').classList.remove('active');
            });
        });
    }

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

    function showContent(type) {
        document.querySelector('.content-overlay').style.display = 'block';
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

    // Schedule handling
    const scheduleBtn = document.querySelector('.schedule-only');
    const scheduleMenu = document.querySelector('.schedule-menu');
    
    if (scheduleBtn) {
        scheduleBtn.addEventListener('click', function() {
            this.classList.toggle('active');
            scheduleMenu.classList.toggle('active');
        });
    }

    // Update today's match information
    function updateTodayMatch() {
        const matches = {
            '2025-03-24': {
                team1: {
                    code: 'DC',
                    logo: 'download (5).jpeg'
                },
                team2: {
                    code: 'LSG', 
                    logo: 'images (3).jpeg'
                },
                time: '7:30 PM IST',
                venue: 'Dr. Y.S. Rajasekhara Reddy ACA-VDCA Cricket Stadium, Visakhapatnam'
            },
            '2025-03-25': {
                team1: {
                    code: 'GT',
                    logo: 'Cricketdata-IPL-Flag-Gujarat-Titans-2.jpg'
                },
                team2: {
                    code: 'PBKS',
                    logo: 'download (6).jpeg'  
                },
                time: '7:30 PM IST',
                venue: 'Narendra Modi Stadium, Ahmedabad'
            },
            // Add more matches as needed
        };

        // Get today's date in YYYY-MM-DD format
        const today = new Date();
        const dateStr = today.toISOString().split('T')[0];
        
        // Get match for today or next available match
        let match = matches[dateStr];
        if (!match) {
            // If no match today, find next available match
            const availableDates = Object.keys(matches).sort();
            const nextMatchDate = availableDates.find(date => date > dateStr);
            match = matches[nextMatchDate] || matches[availableDates[0]]; // Fallback to first match if none found
        }

        if (match) {
            // Update team logos and names
            document.querySelector('.team1').textContent = match.team1.code;
            document.querySelector('.team2').textContent = match.team2.code;
            document.querySelector('.team-container:first-child img').src = match.team1.logo;
            document.querySelector('.team-container:last-child img').src = match.team2.logo;
            
            // Update match info
            document.querySelector('.match-time').textContent = match.time;
            document.querySelector('.match-venue').textContent = match.venue;
            document.querySelector('.match-date').textContent = today.toLocaleDateString();
        }
    }

    // Call updateTodayMatch when page loads and every day at midnight
    if (document.querySelector('.todays-match')) {
        updateTodayMatch();
        
        // Calculate time until next midnight
        const now = new Date();
        const tomorrow = new Date(now);
        tomorrow.setDate(tomorrow.getDate() + 1);
        tomorrow.setHours(0, 0, 0, 0);
        const timeUntilMidnight = tomorrow - now;

        // Set up daily updates
        setTimeout(() => {
            updateTodayMatch();
            // After first update, update every 24 hours
            setInterval(updateTodayMatch, 24 * 60 * 60 * 1000);
        }, timeUntilMidnight);
    }

    // Handle PC/iOS watch button click
    const pciosBtn = document.querySelector('.watch-btn.pc-ios');
    if (pciosBtn) {
        pciosBtn.addEventListener('click', function() {
            const pciosBox = document.querySelector('.pc-ios-box');
            const loadingMessage = pciosBox.querySelector('.loading-message');
            const progressBar = pciosBox.querySelector('.progress-fill');
            const frameContainer = pciosBox.querySelector('.pc-ios-frame-container');
            const iframe = frameContainer.querySelector('iframe');
            const closeButton = pciosBox.querySelector('.close-button');

            // Show the box and loading state
            pciosBox.style.display = 'block';
            loadingMessage.style.display = 'block';
            progressBar.style.width = '0%';
            frameContainer.style.display = 'none';
            
            // Clear existing iframe src
            iframe.src = '';

            // Close button handler
            closeButton.addEventListener('click', function() {
                pciosBox.style.display = 'none';
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
                    iframe.src = `https://denverisalive.github.io/SportsLovers/Sports18HD.html?cb=${cacheBuster}`;
                }
            }, 30);
        });
    }

    // Handle HOTSTAR button click
    const hotstarBtn = document.querySelector('.watch-btn.hotstar');
    if (hotstarBtn) {
        hotstarBtn.addEventListener('click', function() {
            const hotstarBox = document.querySelector('.hotstar-box');
            const loadingMessage = hotstarBox.querySelector('.loading-message');
            const progressBar = hotstarBox.querySelector('.progress-fill');
            const frameContainer = hotstarBox.querySelector('.hotstar-frame-container');
            const iframe = frameContainer.querySelector('iframe');
            const closeButton = hotstarBox.querySelector('.close-button');

            // Show the box and loading state
            hotstarBox.style.display = 'block';
            loadingMessage.style.display = 'block';
            progressBar.style.width = '0%';
            frameContainer.style.display = 'none';
            
            // Clear existing iframe src
            iframe.src = '';

            // Close button handler
            closeButton.addEventListener('click', function() {
                hotstarBox.style.display = 'none';
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
                    iframe.src = `https://vimeo.com/event/5014412/embed?cb=${cacheBuster}`;
                }
            }, 30);
        });
    }

    document.querySelector('.watch-live-btn').addEventListener('click', function() {
        const loadingCircle = this.querySelector('.loading-circle');
        const btnText = this.textContent;
        
        // Show loading animation
        loadingCircle.style.display = 'block';
        this.style.paddingRight = '40px';
        this.disabled = true;
        
        // Simulate loading
        setTimeout(() => {
            // Hide loading animation
            loadingCircle.style.display = 'none';
            this.style.paddingRight = '2rem';
            this.disabled = false;
            
            // Redirect to live page
            window.location.href = 'live.html';
        }, 1500);
    });

    // Profile submit and remove handlers
    const profileForm = document.querySelector('.profile-form');
    if (profileForm) {
        // Add remove profile button if it doesn't exist
        let removeProfileBtn = profileForm.querySelector('.remove-profile-btn');
        if (!removeProfileBtn) {
            removeProfileBtn = document.createElement('button');
            removeProfileBtn.className = 'remove-profile-btn';
            removeProfileBtn.type = 'button';
            removeProfileBtn.innerHTML = '<i class="fas fa-user-times"></i> Remove Profile';
            profileForm.appendChild(removeProfileBtn);
        }

        // Remove profile handler
        removeProfileBtn.addEventListener('click', function() {
            // Clear localStorage
            localStorage.removeItem('userProfile');
            
            // Reset form
            profileForm.reset();
            
            // Reset profile picture
            const profilePicture = document.querySelector('.profile-picture-container img');
            const profilePlaceholder = document.querySelector('.profile-picture-container .placeholder');
            if (profilePicture && profilePlaceholder) {
                profilePicture.src = '';
                profilePicture.style.display = 'none';
                profilePlaceholder.style.display = 'flex';
            }
            
            // Remove profile info from nav
            const profileInfo = document.querySelector('.profile-info');
            if (profileInfo) {
                profileInfo.remove();
            }
            
            // Show success message
            const successMsg = document.createElement('div');
            successMsg.className = 'success-message';
            successMsg.textContent = 'Profile removed successfully!';
            profileForm.appendChild(successMsg);
            
            setTimeout(() => {
                successMsg.remove();
            }, 3000);
        });

        profileForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = {
                fullName: this.fullName.value,
                email: this.email.value,
                profilePic: profilePicture.src || ''
            };
            localStorage.setItem('userProfile', JSON.stringify(formData));
            
            // Update website title
            const navLogo = document.querySelector('.nav-logo');
            if (navLogo) {
                let profileContainer = navLogo.querySelector('.profile-info');
                if (!profileContainer) {
                    profileContainer = document.createElement('div');
                    profileContainer.className = 'profile-info';
                    navLogo.appendChild(profileContainer);
                }

                // Update profile HTML
                profileContainer.innerHTML = `
                    ${formData.profilePic ? `
                        <img src="${formData.profilePic}" alt="Profile" class="nav-profile-pic">
                    ` : ''}
                    ${formData.fullName ? `
                        <small class="nav-profile-name">${formData.fullName}</small>
                    ` : ''}
                `;
            }
            
            // Show success message
            const successMsg = document.createElement('div');
            successMsg.className = 'success-message';
            successMsg.textContent = 'Profile updated successfully!';
            this.appendChild(successMsg);
            
            setTimeout(() => {
                successMsg.remove();
            }, 3000);
        });
    }

    // Profile picture preview handler
    const profilePictureInput = document.querySelector('.profile-picture-input');
    const profilePicture = document.querySelector('.profile-picture-container img');
    const profilePlaceholder = document.querySelector('.profile-picture-container .placeholder');

    if (profilePictureInput) {
        // Load existing profile picture if any
        const profileData = JSON.parse(localStorage.getItem('userProfile') || '{}');
        if (profileData.profilePic) {
            profilePicture.src = profileData.profilePic;
            profilePicture.style.display = 'block';
            profilePlaceholder.style.display = 'none';
        }

        profilePictureInput.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    profilePicture.src = e.target.result;
                    profilePicture.style.display = 'block';
                    profilePlaceholder.style.display = 'none';
                    
                    // Store the image data
                    const profileData = JSON.parse(localStorage.getItem('userProfile') || '{}');
                    profileData.profilePic = e.target.result;
                    localStorage.setItem('userProfile', JSON.stringify(profileData));
                };
                reader.readAsDataURL(file);
            }
        });
    }
    
    // Start notifications after page load
    setTimeout(showSiteNotification, 5000); // Start first notification after 5 seconds
});