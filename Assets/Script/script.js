// ============================================
// NAVIGATION & MOBILE MENU
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initAnimations();
    
    // Page-specific initializations
    if (document.getElementById('facultyGrid')) {
        initFacultyDirectory();
    }
    
    if (document.getElementById('announcementsContainer')) {
        initAnnouncements();
    }
    
    if (document.getElementById('contactForm')) {
        initContactForm();
    }
    
    if (document.querySelector('.tab-btn')) {
        initProgramTabs();
    }
});

// Navigation initialization (mobile menu only)
function initNavigation() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navbar = document.getElementById('mainNav');
    
    // Mobile menu toggle
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }
    
    // Close mobile menu when link is clicked
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            if (navToggle) {
                navToggle.classList.remove('active');
            }
        });
    });
    
    // Scroll effect for navbar
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// ============================================
// ANIMATIONS & SCROLL EFFECTS
// ============================================

function initAnimations() {
    // Animate statistics counter
    animateCounters();
    
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements
    document.querySelectorAll('.link-card, .value-card, .program-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Animated counter for statistics
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        
        // Start animation when stats are visible
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                updateCounter();
                observer.disconnect();
            }
        }, { threshold: 0.5 });
        
        observer.observe(counter);
    });
}

// ============================================
// PROGRAM TABS & ACCORDION
// ============================================

function initProgramTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    
    // Load saved tab preference
    const savedTab = localStorage.getItem('selectedProgramTab');
    if (savedTab) {
        const savedButton = document.querySelector(`[data-tab="${savedTab}"]`);
        if (savedButton) {
            // Remove active from all
            tabButtons.forEach(btn => btn.classList.remove('active'));
            document.querySelectorAll('.tab-pane').forEach(pane => pane.classList.remove('active'));
            
            // Activate saved tab
            savedButton.classList.add('active');
            document.getElementById(savedTab).classList.add('active');
        }
    }
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.getAttribute('data-tab');
            
            // Remove active class from all buttons and panes
            tabButtons.forEach(btn => btn.classList.remove('active'));
            document.querySelectorAll('.tab-pane').forEach(pane => {
                pane.classList.remove('active');
            });
            
            // Add active class to clicked button and corresponding pane
            button.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
            
            // Save preference to localStorage
            localStorage.setItem('selectedProgramTab', targetTab);
        });
    });
}

// Accordion toggle for program details
function toggleAccordion(button) {
    const content = button.nextElementSibling;
    const isActive = content.classList.contains('active');
    
    // Close all accordions in the same container
    const allAccordions = button.closest('.programs-grid').querySelectorAll('.accordion-content');
    const allButtons = button.closest('.programs-grid').querySelectorAll('.accordion-toggle');
    
    allAccordions.forEach(acc => acc.classList.remove('active'));
    allButtons.forEach(btn => btn.classList.remove('active'));
    
    // Toggle current accordion
    if (!isActive) {
        content.classList.add('active');
        button.classList.add('active');
    }
}

// ============================================
// FACULTY DIRECTORY WITH SEARCH & FILTER
// ============================================

const facultyData = [
    {
        name: 'Engr. Val Patrick Fabregas',
        rank: 'Professor',
        department: 'Computer Science & Information Technology',
        expertise: ['Artificial Intelligence', 'Machine Learning', 'Data Mining'],
        email: 'val.fabregas@ccs.edu.ph',
        image: 'images/faculty/val-fabregas.jpg' // Add your image here
    },
    {
        name: 'Prof. Roberto Malitao',
        rank: 'Professor',
        department: 'Information Technology',
        expertise: ['Algorithm Design', 'Theory of Computation', 'Game Design'],
        email: 'roberto.malitao@ccs.edu.ph',
        image: 'images/faculty/roberto-malitao.jpg' // Add your image here
    },
    {
        name: 'Dr. Sofia Cruz',
        rank: 'Professor',
        department: 'Data Science',
        expertise: ['Statistical Analysis', 'Big Data', 'Predictive Modeling'],
        email: 'sofia.cruz@ccs.edu.ph',
        image: 'images/faculty/sofia-cruz.jpg' // Add your image here
    },
    {
        name: 'Prof. Michael Tan',
        rank: 'Assistant Professor',
        department: 'Information Technology',
        expertise: ['Web Development', 'Cloud Computing', 'DevOps'],
        email: 'michael.tan@ccs.edu.ph',
        image: 'images/faculty/michael-tan.jpg' // Add your image here
    },
    {
        name: 'Dr. Anna Garcia',
        rank: 'Professor',
        department: 'Cybersecurity',
        expertise: ['Network Security', 'Ethical Hacking', 'Digital Forensics'],
        email: 'anna.garcia@ccs.edu.ph',
        image: 'images/faculty/anna-garcia.jpg' // Add your image here
    },
    {
        name: 'Prof. Robert Lim',
        rank: 'Lecturer',
        department: 'Information Technology',
        expertise: ['Mobile Development', 'UI/UX Design', 'Agile Methods'],
        email: 'robert.lim@ccs.edu.ph',
        image: 'images/faculty/robert-lim.jpg' // Add your image here
    },
    {
        name: 'Dr. Jennifer Wong',
        rank: 'Associate Professor',
        department: 'Data Science',
        expertise: ['Deep Learning', 'Neural Networks', 'Computer Vision'],
        email: 'jennifer.wong@ccs.edu.ph',
        image: 'images/faculty/jennifer-wong.jpg' // Add your image here
    },
    {
        name: 'Prof. David Chen',
        rank: 'Assistant Professor',
        department: 'Computer Science',
        expertise: ['Software Engineering', 'Distributed Systems', 'Cloud Architecture'],
        email: 'david.chen@ccs.edu.ph',
        image: 'images/faculty/david-chen.jpg' // Add your image here
    },
    {
        name: 'Dr. Elizabeth Ramos',
        rank: 'Professor',
        department: 'Cybersecurity',
        expertise: ['Cryptography', 'Security Protocols', 'Blockchain'],
        email: 'elizabeth.ramos@ccs.edu.ph',
        image: 'images/faculty/elizabeth-ramos.jpg' // Add your image here
    },
    {
        name: 'Prof. James Lee',
        rank: 'Lecturer',
        department: 'Information Technology',
        expertise: ['Database Systems', 'Data Architecture', 'SQL'],
        email: 'james.lee@ccs.edu.ph',
        image: 'images/faculty/james-lee.jpg' // Add your image here
    },
    {
        name: 'Dr. Catherine Gomez',
        rank: 'Associate Professor',
        department: 'Computer Science',
        expertise: ['Human-Computer Interaction', 'UX Research', 'Accessibility'],
        email: 'catherine.gomez@ccs.edu.ph',
        image: 'images/faculty/catherine-gomez.jpg' // Add your image here
    },
    {
        name: 'Prof. Daniel Kim',
        rank: 'Assistant Professor',
        department: 'Data Science',
        expertise: ['Natural Language Processing', 'Text Analytics', 'AI'],
        email: 'daniel.kim@ccs.edu.ph',
        image: 'images/faculty/daniel-kim.jpg' // Add your image here
    }
];

function initFacultyDirectory() {
    const searchInput = document.getElementById('facultySearch');
    const departmentFilter = document.getElementById('departmentFilter');
    const rankFilter = document.getElementById('rankFilter');
    
    // Render initial faculty list
    renderFaculty(facultyData);
    
    // Search functionality with debounce
    let searchTimeout;
    searchInput.addEventListener('input', (e) => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            filterFaculty();
        }, 300);
    });
    
    // Filter event listeners
    departmentFilter.addEventListener('change', filterFaculty);
    rankFilter.addEventListener('change', filterFaculty);
}

function filterFaculty() {
    const searchTerm = document.getElementById('facultySearch').value.toLowerCase();
    const department = document.getElementById('departmentFilter').value;
    const rank = document.getElementById('rankFilter').value;
    
    const filtered = facultyData.filter(faculty => {
        const matchesSearch = 
            faculty.name.toLowerCase().includes(searchTerm) ||
            faculty.expertise.some(exp => exp.toLowerCase().includes(searchTerm)) ||
            faculty.department.toLowerCase().includes(searchTerm);
        
        const matchesDepartment = !department || faculty.department === department;
        const matchesRank = !rank || faculty.rank === rank;
        
        return matchesSearch && matchesDepartment && matchesRank;
    });
    
    renderFaculty(filtered);
}

function renderFaculty(facultyList) {
    const grid = document.getElementById('facultyGrid');
    const noResults = document.getElementById('noResults');
    const countDisplay = document.getElementById('facultyCount');
    
    if (facultyList.length === 0) {
        grid.innerHTML = '';
        noResults.style.display = 'block';
        countDisplay.textContent = 'No faculty members found';
    } else {
        noResults.style.display = 'none';
        countDisplay.textContent = `Showing ${facultyList.length} faculty member${facultyList.length !== 1 ? 's' : ''}`;
        
        grid.innerHTML = facultyList.map((faculty, index) => {
            const initials = faculty.name.split(' ').map(n => n[0]).join('');
            const staggerDelay = index * 0.05;
            
            return `
                <div class="faculty-card" style="animation-delay: ${staggerDelay}s">
                    <div class="faculty-image-container">
                        <img 
                            data-src="${faculty.image}" 
                            alt="${faculty.name}"
                            class="faculty-image lazy-load"
                            onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"
                        >
                        <div class="faculty-avatar" style="display: none;">${initials}</div>
                        <div class="image-overlay" onclick="openImageModal('${faculty.image}', '${faculty.name}')">
                            <span class="zoom-icon">🔍</span>
                        </div>
                    </div>
                    <div class="faculty-name">${faculty.name}</div>
                    <div class="faculty-rank">${faculty.rank}</div>
                    <div class="faculty-department">${faculty.department}</div>
                    <div class="faculty-expertise">
                        ${faculty.expertise.map(exp => `<span class="expertise-tag">${exp}</span>`).join('')}
                    </div>
                    <div class="faculty-email">${faculty.email}</div>
                </div>
            `;
        }).join('');
        
        // Initialize lazy loading for images
        initLazyLoading();
    }
}

// ============================================
// ANNOUNCEMENTS & EVENTS
// ============================================

const announcementsData = [
    {
        id: 1,
        title: 'Enrollment for Second Semester Now Open',
        date: '2024-02-15',
        category: 'academic',
        location: 'Online Registration',
        content: 'Students can now register for the second semester. Visit the registrar\'s office or use the online portal to complete your enrollment.',
        image: 'images/events/enrollment.png' // Add your image here
    },
    {
        id: 2,
        title: 'AI and Machine Learning Symposium 2024',
        date: '2024-03-10',
        category: 'event',
        location: 'Main Auditorium',
        content: 'Join us for a full-day symposium featuring keynote speakers from leading tech companies and research institutions discussing the latest in AI and ML.',
        image: 'images/events/ai-symposium.jpg' // Add your image here
    },
    {
        id: 3,
        title: 'Guest Lecture: Blockchain Technology in Finance',
        date: '2024-02-28',
        category: 'seminar',
        location: 'Room 301, Tech Building',
        content: 'Industry expert Dr. Robert Chen will discuss the applications of blockchain technology in modern financial systems. Open to all students and faculty.',
        image: 'images/events/blockchain-lecture.jpg' // Add your image here
    },
    {
        id: 4,
        title: 'Research Proposal Submission Deadline',
        date: '2024-02-20',
        category: 'deadline',
        location: 'Dean\'s Office',
        content: 'All graduate students must submit their thesis proposals by February 20, 2024. Late submissions will not be accepted.',
        image: 'images/events/thesis-deadline.png' // Add your image here
    },
    {
        id: 5,
        title: 'Cybersecurity Workshop Series Begins',
        date: '2024-03-01',
        category: 'event',
        location: 'Computer Lab 2',
        content: 'A 4-week workshop series covering penetration testing, security auditing, and ethical hacking fundamentals. Registration is now open.',
        image: 'images/events/cybersecurity-workshop.jpg' // Add your image here
    },
    {
        id: 6,
        title: 'Programming Competition: Code Sprint 2024',
        date: '2024-03-15',
        category: 'event',
        location: 'CCS Building',
        content: 'Annual inter-college programming competition. Form teams of 3 and compete for prizes. Registration deadline: March 8, 2024.',
        image: 'images/events/code-sprint.jpg' // Add your image here
    },
    {
        id: 7,
        title: 'Research Grant Applications Due',
        date: '2024-02-25',
        category: 'deadline',
        location: 'Research Office',
        content: 'Faculty members applying for research grants must submit their proposals by February 25. Guidelines are available on the portal.',
        image: 'images/events/research-grant.png' // Add your image here
    },
    {
        id: 8,
        title: 'Web Development Bootcamp',
        date: '2024-03-05',
        category: 'seminar',
        location: 'Lab 404',
        content: 'Intensive 2-day bootcamp covering modern web development frameworks including React, Node.js, and MongoDB. Limited slots available.',
        image: 'images/events/web-bootcamp.jpg' // Add your image here
    }
];

function initAnnouncements() {
    // Load saved filter preference
    const savedFilter = localStorage.getItem('announcementFilter') || 'all';
    
    // Render announcements with saved filter
    renderAnnouncements(savedFilter);
    
    // Update active tab button
    const filterTabs = document.querySelectorAll('.filter-tab');
    filterTabs.forEach(tab => {
        if (tab.getAttribute('data-category') === savedFilter) {
            tab.classList.add('active');
        } else {
            tab.classList.remove('active');
        }
    });
    
    // Add filter tab listeners
    filterTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Update active tab
            filterTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            // Filter and render
            const category = tab.getAttribute('data-category');
            renderAnnouncements(category);
            
            // Save preference to localStorage
            localStorage.setItem('announcementFilter', category);
        });
    });
}

function renderAnnouncements(category) {
    const container = document.getElementById('announcementsContainer');
    
    let filtered = category === 'all' 
        ? announcementsData 
        : announcementsData.filter(a => a.category === category);
    
    // Sort by date (newest first)
    filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    container.innerHTML = filtered.map((announcement, index) => {
        const date = new Date(announcement.date);
        const formattedDate = date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
        
        const staggerDelay = index * 0.05;
        
        return `
            <div class="announcement-card" style="animation-delay: ${staggerDelay}s">
                ${announcement.image ? `
                    <div class="announcement-image-container" onclick="openImageModal('${announcement.image}', '${announcement.title}')">
                        <img 
                            data-src="${announcement.image}" 
                            alt="${announcement.title}"
                            class="announcement-image lazy-load"
                            onerror="this.parentElement.style.display='none';"
                        >
                        <div class="image-badge">${announcement.category}</div>
                    </div>
                ` : ''}
                <div class="announcement-header">
                    <div>
                        <h3 class="announcement-title">${announcement.title}</h3>
                        <div class="announcement-meta">
                            <span class="announcement-date">📅 ${formattedDate}</span>
                            <span class="announcement-location">📍 ${announcement.location}</span>
                        </div>
                    </div>
                    <span class="announcement-category category-${announcement.category}">${announcement.category}</span>
                </div>
                <p class="announcement-content">${announcement.content}</p>
            </div>
        `;
    }).join('');
    
    // Initialize lazy loading for images
    initLazyLoading();
}

// ============================================
// CONTACT FORM WITH VALIDATION
// ============================================

function initContactForm() {
    const form = document.getElementById('contactForm');
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        if (validateForm()) {
            // Get form data
            const formData = {
                firstName: document.getElementById('firstName').value,
                lastName: document.getElementById('lastName').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                inquiryType: document.getElementById('inquiryType').value,
                message: document.getElementById('message').value,
                timestamp: new Date().toISOString()
            };
            
            // Save to localStorage
            saveInquiry(formData);
            
            // Show success modal
            showModal();
            
            // Reset form
            form.reset();
            clearValidationErrors();
        }
    });
    
    // Real-time validation
    const inputs = form.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', () => {
            validateField(input);
        });
        
        input.addEventListener('input', () => {
            // Clear error on input
            const formGroup = input.closest('.form-group');
            formGroup.classList.remove('error');
        });
    });
}

function validateForm() {
    let isValid = true;
    const form = document.getElementById('contactForm');
    const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
    
    inputs.forEach(input => {
        if (!validateField(input)) {
            isValid = false;
        }
    });
    
    return isValid;
}

function validateField(input) {
    const formGroup = input.closest('.form-group');
    const errorMessage = formGroup.querySelector('.error-message');
    let isValid = true;
    let message = '';
    
    // Remove previous error
    formGroup.classList.remove('error');
    
    // Check if required field is empty
    if (input.hasAttribute('required') && !input.value.trim()) {
        isValid = false;
        message = 'This field is required';
    }
    // Email validation
    else if (input.type === 'email' && input.value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(input.value)) {
            isValid = false;
            message = 'Please enter a valid email address';
        }
    }
    // Phone validation (optional field)
    else if (input.type === 'tel' && input.value) {
        const phoneRegex = /^[\d\s\-\+\(\)]+$/;
        if (!phoneRegex.test(input.value)) {
            isValid = false;
            message = 'Please enter a valid phone number';
        }
    }
    // Message length validation
    else if (input.id === 'message' && input.value.trim().length < 10) {
        isValid = false;
        message = 'Message must be at least 10 characters long';
    }
    
    if (!isValid) {
        formGroup.classList.add('error');
        errorMessage.textContent = message;
    }
    
    return isValid;
}

function clearValidationErrors() {
    const formGroups = document.querySelectorAll('.form-group');
    formGroups.forEach(group => {
        group.classList.remove('error');
    });
}

function saveInquiry(data) {
    // Get existing inquiries from localStorage
    let inquiries = JSON.parse(localStorage.getItem('contactInquiries')) || [];
    
    // Add new inquiry
    inquiries.push(data);
    
    // Save back to localStorage
    localStorage.setItem('contactInquiries', JSON.stringify(inquiries));
}

// ============================================
// MODAL FUNCTIONALITY
// ============================================

function showModal() {
    const modal = document.getElementById('successModal');
    modal.classList.add('active');
    
    // Auto-close after 3 seconds
    setTimeout(() => {
        closeModal();
    }, 3000);
}

function closeModal() {
    const modal = document.getElementById('successModal');
    modal.classList.remove('active');
}

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    const modal = document.getElementById('successModal');
    if (e.target === modal) {
        closeModal();
    }
});

// ============================================
// LOCAL STORAGE FOR FORM DATA
// ============================================

function saveInquiry(data) {
    // Get existing inquiries from localStorage
    let inquiries = JSON.parse(localStorage.getItem('contactInquiries')) || [];
    
    // Add new inquiry
    inquiries.push(data);
    
    // Save back to localStorage
    localStorage.setItem('contactInquiries', JSON.stringify(inquiries));
}

// ============================================
// DYNAMIC UI INTERACTIONS
// ============================================

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const targetPage = href.substring(1);
            navigateToPage(targetPage);
        }
    });
});

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    // Close modal on Escape
    if (e.key === 'Escape') {
        closeModal();
    }
});

// Add loading animation for dynamic content
function showLoadingState(container) {
    container.innerHTML = '<div class="loading">Loading...</div>';
}

// Intersection Observer for lazy loading
const lazyLoadObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('loaded');
            lazyLoadObserver.unobserve(entry.target);
        }
    });
});

// ============================================
// ADVANCED IMAGE FUNCTIONALITIES
// ============================================

// Lazy Loading Images with Intersection Observer
function initLazyLoading() {
    const lazyImages = document.querySelectorAll('.lazy-load');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                const src = img.getAttribute('data-src');
                
                // Show loading state
                img.classList.add('loading');
                
                // Preload the image
                const tempImg = new Image();
                tempImg.onload = () => {
                    img.src = src;
                    img.classList.remove('loading');
                    img.classList.add('loaded');
                    
                    // Fade in animation
                    img.style.opacity = '0';
                    setTimeout(() => {
                        img.style.transition = 'opacity 0.5s ease';
                        img.style.opacity = '1';
                    }, 10);
                };
                
                tempImg.onerror = () => {
                    img.classList.remove('loading');
                    img.classList.add('error');
                    // Fallback will be handled by onerror attribute
                };
                
                tempImg.src = src;
                observer.unobserve(img);
            }
        });
    }, {
        rootMargin: '50px' // Start loading 50px before image enters viewport
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));
}

// Image Lightbox Modal
function openImageModal(imageSrc, title) {
    // Create modal if it doesn't exist
    let modal = document.getElementById('imageLightboxModal');
    
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'imageLightboxModal';
        modal.className = 'image-modal';
        modal.innerHTML = `
            <div class="image-modal-content">
                <span class="image-modal-close" onclick="closeImageModal()">&times;</span>
                <img class="image-modal-img" id="modalImage" alt="">
                <div class="image-modal-caption" id="modalCaption"></div>
                <div class="image-modal-controls">
                    <button class="image-control-btn" onclick="downloadImage()" title="Download">
                        ⬇️ Download
                    </button>
                    <button class="image-control-btn" onclick="shareImage()" title="Share">
                        🔗 Share
                    </button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
        
        // Close on click outside
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeImageModal();
            }
        });
        
        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                closeImageModal();
            }
        });
    }
    
    // Set image and caption
    const modalImg = document.getElementById('modalImage');
    const modalCaption = document.getElementById('modalCaption');
    
    modalImg.src = imageSrc;
    modalCaption.textContent = title;
    
    // Store current image for download/share
    modal.dataset.currentImage = imageSrc;
    modal.dataset.currentTitle = title;
    
    // Show modal with animation
    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent scrolling
    
    // Add zoom functionality
    addImageZoom(modalImg);
}

function closeImageModal() {
    const modal = document.getElementById('imageLightboxModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
        
        // Reset zoom
        const modalImg = document.getElementById('modalImage');
        modalImg.style.transform = 'scale(1)';
    }
}

// Image zoom functionality
function addImageZoom(img) {
    let scale = 1;
    
    img.addEventListener('wheel', (e) => {
        e.preventDefault();
        
        if (e.deltaY < 0) {
            scale = Math.min(scale + 0.1, 3); // Max 3x zoom
        } else {
            scale = Math.max(scale - 0.1, 1); // Min 1x zoom
        }
        
        img.style.transform = `scale(${scale})`;
        img.style.cursor = scale > 1 ? 'zoom-out' : 'zoom-in';
    });
    
    img.addEventListener('click', () => {
        if (scale > 1) {
            scale = 1;
            img.style.transform = 'scale(1)';
            img.style.cursor = 'zoom-in';
        } else {
            scale = 2;
            img.style.transform = 'scale(2)';
            img.style.cursor = 'zoom-out';
        }
    });
}

// Download image functionality
function downloadImage() {
    const modal = document.getElementById('imageLightboxModal');
    const imageSrc = modal.dataset.currentImage;
    const title = modal.dataset.currentTitle;
    
    // Create download link
    const link = document.createElement('a');
    link.href = imageSrc;
    link.download = title.replace(/[^a-z0-9]/gi, '_').toLowerCase() + '.jpg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Show feedback
    showToast('Image downloaded successfully!');
}

// Share image functionality
async function shareImage() {
    const modal = document.getElementById('imageLightboxModal');
    const imageSrc = modal.dataset.currentImage;
    const title = modal.dataset.currentTitle;
    
    // Use Web Share API if available
    if (navigator.share) {
        try {
            await navigator.share({
                title: title,
                text: `Check out this image: ${title}`,
                url: imageSrc
            });
            showToast('Shared successfully!');
        } catch (err) {
            // User cancelled or error occurred
            copyImageUrlToClipboard(imageSrc);
        }
    } else {
        // Fallback: Copy to clipboard
        copyImageUrlToClipboard(imageSrc);
    }
}

function copyImageUrlToClipboard(url) {
    const fullUrl = window.location.origin + '/' + url;
    navigator.clipboard.writeText(fullUrl).then(() => {
        showToast('Image URL copied to clipboard!');
    }).catch(() => {
        showToast('Failed to copy URL');
    });
}

// Toast notification for user feedback
function showToast(message) {
    // Remove existing toast if any
    const existingToast = document.querySelector('.toast-notification');
    if (existingToast) {
        existingToast.remove();
    }
    
    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.textContent = message;
    document.body.appendChild(toast);
    
    // Trigger animation
    setTimeout(() => toast.classList.add('show'), 10);
    
    // Remove after 3 seconds
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

// Debounce function for search
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Format date helper
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

// Initialize tooltips (if needed in future)
function initTooltips() {
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    tooltipElements.forEach(el => {
        el.addEventListener('mouseenter', showTooltip);
        el.addEventListener('mouseleave', hideTooltip);
    });
}

function showTooltip(e) {
    const tooltipText = e.target.getAttribute('data-tooltip');
    // Tooltip implementation
}

function hideTooltip(e) {
    // Hide tooltip implementation
}

// Console welcome message
console.log('%c College of Computer Studies ', 'background: #0066ff; color: white; font-size: 20px; padding: 10px;');
console.log('%c Innovating Tomorrow\'s Technology Leaders ', 'font-size: 14px; color: #0066ff;');
console.log('%c Website built with vanilla JavaScript - No frameworks needed! ', 'font-size: 12px; color: #666;');

// Export functions for global use (attached to window)
window.toggleAccordion = toggleAccordion;
window.closeModal = closeModal;
window.openImageModal = openImageModal;
window.closeImageModal = closeImageModal;
window.downloadImage = downloadImage;
window.shareImage = shareImage;