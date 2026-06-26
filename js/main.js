(function() {
    'use strict';

    const portfolioData = [
        {
            id: 1,
            title: 'طراحی وب سایت شخصی',
            category: ['front-end', 'bootstrap'],
            image: 'Theme/img/portfolio/1.jpg',
            alt: 'وبسایت مهیار کانتوری',
            description: 'وب سایت شخصی مهیار کانتوری. این سایت دارای رزومه و گالری عکس می باشد و سعی شده در هنگام نمایش، سایت بسیار سبک بارگذاری شود به همین دلیل و بخاطر ایستا بودن سایت من از کش استفاده کردم تا در بارگذاری های بعدی سایت بسیار روانتر اجرا بشه',
            date: '20 اردیبهشت 1401',
            tech: 'Html, Css, Bootstrap, JavaScript, jQuery',
            role: 'فرانت اند',
            link: 'https://mahyar-kantoori.ir/',
            linkText: 'مشاهده پروژه'
        },
        {
            id: 2,
            title: 'صفحه معرفی محصول',
            category: ['front-end', 'bootstrap'],
            image: 'Theme/img/portfolio/2.jpg',
            alt: 'صفحه فرود اپلیکیشن',
            description: 'صفحه فرود اپلیکیشن پرداخت یار. لندینگ پیج یا صفحه فرود به صفحه ای گفته می شود که جدای از سایت برای معرفی یک محصول، خدمت، اپلیکیشن و... ساخته می شود و در برگیرنده همه ویژگی های محصول می باشد. ما در این صفحه سعی کردیم ویژگی های این محصول رو برجسته کنیم و با انیمیشن ها و عکس های این اپلیکیشن به بهترین نحو ممکن کاربر رو متقاعد به نصب از یکی از استور های لینک شده در صفحه کنیم',
            date: '30 اردیبهشت 1401',
            tech: 'Html, Bootstrap, JavaScript, CSS',
            role: 'فرانت اند',
            link: null,
            linkText: 'هنوز منتشر نشده...'
        },
        {
            id: 3,
            title: 'پروژه تاریخ انقضا!',
            category: ['javascript'],
            image: 'Theme/img/portfolio/3.jpg',
            alt: 'افزونه جاوا اسکریپت',
            description: 'اجرای تایمر در سایت ها و بلاگ ها. در این پروژه که از جاوا اسکریپت استفاده شده قطعه کدی آماده شد که با اضافه کردن آن به سایت ها و بلاگ ها در تاریخ مشخص شده یک پیام پاپ آپ در صفحه به نمایش در میاد و هشدار اتمام قرارداد رو به کاربر متذکر میشه و بعد از گذشت یک هفته سایت رو از دسترس خارج میکنه و پیامی مبنی بر تمدید اشتراک با راه های ارتباطی را به نمایش در میاره',
            date: '19 خرداد 1401',
            tech: 'JavaScript',
            role: 'افزونه',
            link: null,
            linkText: 'قابل نمایش نیست'
        },
        {
            id: 4,
            title: 'API اپلیکیشن',
            category: ['back-end'],
            image: 'Theme/img/portfolio/4.jpg',
            alt: 'api اپلیکیشن',
            description: 'حذف اکانت تلگرام. در این پروژه مراحل حذف اکانت تلگرام توسط سرور انجام میشه و api تهیه شد که با دادن شماره تلفن و یکسری پارامتر ها به آن به راحتی و بدون نیاز به فیلتر شکن این کار رو انجام میده و به صورت هوشمند در صورت بروز هرگونه خطایی در حذف اکانت تلگرام، دلایل و کارهای مورد نیاز جهت رفع مشکل را به کاربر متذکر می شود. خروجی کار به صورت json هستش که به راحتی میشه برای توسعه برنامه های اندروید، ios، دسکتاپ و وب مورد استفاده قرار بگیره',
            date: '02 تیر 1401',
            tech: 'PHP',
            role: 'بک اند',
            link: null,
            linkText: 'قابل مشاهده نیست'
        },
        {
            id: 5,
            title: 'طراحی لوگو',
            category: ['design'],
            image: 'Theme/img/portfolio/5.jpg',
            alt: 'لوگوی استودیو اپدونه',
            description: 'طراحی لوگوی استودیو اپدونه. ضمینه فعالیت استودیو اپدونه در حوزه توسعه و طراحی اپلیکیشن اندروید می باشد.',
            date: '23 بهمن 1399',
            tech: '—',
            role: 'تصویر برند',
            link: null,
            linkText: '—'
        },
        {
            id: 6,
            title: 'طراحی مهر',
            category: ['design'],
            image: 'Theme/img/portfolio/6.jpg',
            alt: 'طراحی مهر شرکت',
            description: 'طراحی مهر شرکت کاسپین مدرن پویا. ضمینه فعالیت شرکت در حوزه صنعت گاز می باشد.',
            date: '24 خرداد 1401',
            tech: '—',
            role: 'تصویر مهر',
            link: null,
            linkText: '—'
        }
    ];

    let currentFilter = 'all';
    let currentModalIndex = 0;
    let filteredItems = [];

    function initLoader() {
        const loader = document.getElementById('loader');
        if (!loader) return;
        window.addEventListener('load', function() {
            setTimeout(function() {
                loader.classList.add('hidden');
            }, 800);
        });
        setTimeout(function() {
            if (!loader.classList.contains('hidden')) {
                loader.classList.add('hidden');
            }
        }, 4000);
    }

    function initCursor() {
        const dot = document.querySelector('.cursor-dot');
        const outline = document.querySelector('.cursor-outline');
        if (!dot || !outline) return;

        let mouseX = 0, mouseY = 0;
        let outlineX = 0, outlineY = 0;

        document.addEventListener('mousemove', function(e) {
            mouseX = e.clientX;
            mouseY = e.clientY;
            dot.style.transform = 'translate(' + mouseX + 'px, ' + mouseY + 'px) translate(-50%, -50%)';
        });

        function animateOutline() {
            outlineX += (mouseX - outlineX) * 0.12;
            outlineY += (mouseY - outlineY) * 0.12;
            outline.style.transform = 'translate(' + outlineX + 'px, ' + outlineY + 'px) translate(-50%, -50%)';
            requestAnimationFrame(animateOutline);
        }
        animateOutline();

        document.querySelectorAll('a, button, .skill-chip, .filter-btn, .portfolio-card, .contact-card').forEach(function(el) {
            el.addEventListener('mouseenter', function() {
                dot.style.transform = 'translate(' + mouseX + 'px, ' + mouseY + 'px) translate(-50%, -50%) scale(1.8)';
                dot.style.background = 'var(--accent-purple)';
                outline.style.transform = 'translate(' + outlineX + 'px, ' + outlineY + 'px) translate(-50%, -50%) scale(1.5)';
                outline.style.borderColor = 'var(--accent-purple)';
            });
            el.addEventListener('mouseleave', function() {
                dot.style.transform = 'translate(' + mouseX + 'px, ' + mouseY + 'px) translate(-50%, -50%) scale(1)';
                dot.style.background = 'var(--accent-cyan)';
                outline.style.transform = 'translate(' + outlineX + 'px, ' + outlineY + 'px) translate(-50%, -50%) scale(1)';
                outline.style.borderColor = 'rgba(0, 212, 255, 0.4)';
            });
        });
    }

    function initParticles() {
        var canvas = document.getElementById('particle-canvas');
        if (!canvas || typeof THREE === 'undefined') return;

        var scene = new THREE.Scene();
        var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        var renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        canvas.appendChild(renderer.domElement);

        var starsGeometry = new THREE.BufferGeometry();
        var starsCount = 2500;
        var positions = new Float32Array(starsCount * 3);
        var colors = new Float32Array(starsCount * 3);
        var sizes = new Float32Array(starsCount);

        var colorPalette = [
            new THREE.Color(0x6C63FF),
            new THREE.Color(0x00D4FF),
            new THREE.Color(0xFFFFFF),
            new THREE.Color(0xFFD700),
            new THREE.Color(0xFF6B9D)
        ];

        for (var i = 0; i < starsCount; i++) {
            var radius = 20 + Math.random() * 60;
            var theta = Math.random() * Math.PI * 2;
            var phi = Math.acos(2 * Math.random() - 1);

            positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
            positions[i * 3 + 1] = radius * Math.cos(phi) * 0.4;
            positions[i * 3 + 2] = radius * Math.sin(phi) * Math.sin(theta);

            var color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
            colors[i * 3] = color.r;
            colors[i * 3 + 1] = color.g;
            colors[i * 3 + 2] = color.b;

            sizes[i] = 0.5 + Math.random() * 2;
        }

        starsGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        starsGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        starsGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

        var starsMaterial = new THREE.PointsMaterial({
            size: 0.15,
            vertexColors: true,
            transparent: true,
            opacity: 0.8,
            blending: THREE.AdditiveBlending,
            sizeAttenuation: true
        });

        var starField = new THREE.Points(starsGeometry, starsMaterial);
        scene.add(starField);

        var secondField = new THREE.Points(
            new THREE.BufferGeometry(),
            new THREE.PointsMaterial({
                size: 0.05,
                color: 0x6C63FF,
                transparent: true,
                opacity: 0.3,
                blending: THREE.AdditiveBlending,
                sizeAttenuation: true
            })
        );
        var pos2 = new Float32Array(1500 * 3);
        for (var j = 0; j < 1500; j++) {
            pos2[j * 3] = (Math.random() - 0.5) * 200;
            pos2[j * 3 + 1] = (Math.random() - 0.5) * 100;
            pos2[j * 3 + 2] = (Math.random() - 0.5) * 200 - 50;
        }
        secondField.geometry.setAttribute('position', new THREE.BufferAttribute(pos2, 3));
        scene.add(secondField);

        camera.position.z = 40;

        var mouseX = 0;
        var mouseY = 0;

        document.addEventListener('mousemove', function(e) {
            mouseX = (e.clientX / window.innerWidth - 0.5) * 0.3;
            mouseY = (e.clientY / window.innerHeight - 0.5) * 0.3;
        });

        function animate() {
            requestAnimationFrame(animate);
            starField.rotation.y += 0.0003;
            starField.rotation.x += 0.0001;
            secondField.rotation.y -= 0.0002;

            starField.rotation.y += (mouseX - starField.rotation.y) * 0.01;
            starField.rotation.x += (mouseY - starField.rotation.x) * 0.01;

            renderer.render(scene, camera);
        }
        animate();

        window.addEventListener('resize', function() {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });
    }

    function initHeroAnimation() {
        if (typeof gsap === 'undefined') return;

        var tl = gsap.timeline({ delay: 1 });

        tl.from('#profileImg', {
            duration: 1.2,
            scale: 0,
            rotation: -15,
            ease: 'elastic.out(1, 0.5)'
        })
        .from('.hero-greeting', {
            duration: 0.6,
            y: 30,
            opacity: 0,
            ease: 'power3.out'
        }, '-=0.6')
        .from('.hero-name', {
            duration: 0.8,
            y: 50,
            opacity: 0,
            ease: 'power3.out'
        }, '-=0.4')
        .from('.hero-titles', {
            duration: 0.6,
            y: 30,
            opacity: 0,
            ease: 'power3.out'
        }, '-=0.5')
        .from('.hero-desc', {
            duration: 0.6,
            y: 30,
            opacity: 0,
            ease: 'power3.out'
        }, '-=0.4')
        .from('.hero-actions .btn', {
            duration: 0.5,
            y: 30,
            opacity: 0,
            stagger: 0.15,
            ease: 'back.out(1.7)'
        }, '-=0.3')
        .from('.scroll-indicator', {
            duration: 0.8,
            opacity: 0,
            ease: 'power2.out'
        }, '-=0.2');
    }

    function initScrollAnimations() {
        if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

        gsap.registerPlugin(ScrollTrigger);

        document.querySelectorAll('.section-header').forEach(function(header) {
            ScrollTrigger.create({
                trigger: header,
                start: 'top 85%',
                onEnter: function() { header.classList.add('revealed'); }
            });
        });

        document.querySelectorAll('.reveal').forEach(function(el) {
            ScrollTrigger.create({
                trigger: el,
                start: 'top 85%',
                onEnter: function() { el.classList.add('visible'); }
            });
        });

        if (typeof gsap.utils !== 'undefined') {
            gsap.utils.toArray('.skill-chip').forEach(function(chip, i) {
                gsap.from(chip, {
                    scrollTrigger: {
                        trigger: chip,
                        start: 'top 90%',
                        toggleActions: 'play none none none'
                    },
                    duration: 0.4,
                    scale: 0,
                    opacity: 0,
                    delay: i * 0.05,
                    ease: 'back.out(1.7)'
                });
            });

            gsap.utils.toArray('.contact-card').forEach(function(card, i) {
                gsap.from(card, {
                    scrollTrigger: {
                        trigger: card,
                        start: 'top 88%',
                        toggleActions: 'play none none none'
                    },
                    duration: 0.6,
                    y: 40,
                    opacity: 0,
                    delay: i * 0.12,
                    ease: 'power3.out'
                });
            });
        }
    }

    function generatePortfolioCards() {
        var grid = document.getElementById('portfolioGrid');
        if (!grid) return;

        grid.innerHTML = '';
        filteredItems = portfolioData.filter(function(item) {
            return currentFilter === 'all' || item.category.indexOf(currentFilter) !== -1;
        });

        filteredItems.forEach(function(item) {
            var card = document.createElement('div');
            card.className = 'portfolio-card';
            card.dataset.id = item.id;
            card.innerHTML = '<div class="portfolio-card-inner">' +
                '<img src="' + item.image + '" alt="' + item.alt + '" loading="lazy">' +
                '<div class="portfolio-card-overlay">' +
                '<h3 class="portfolio-card-title">' + item.title + '</h3>' +
                '<span class="portfolio-card-category">' + item.category.join('، ') + '</span>' +
                '</div>' +
                '</div>';

            card.addEventListener('click', function() {
                openModal(item.id);
            });

            if (typeof gsap !== 'undefined') {
                gsap.from(card, {
                    scrollTrigger: {
                        trigger: card,
                        start: 'top 88%',
                        toggleActions: 'play none none none'
                    },
                    duration: 0.5,
                    y: 30,
                    opacity: 0,
                    scale: 0.95,
                    delay: Math.random() * 0.2,
                    ease: 'power3.out'
                });
            }

            grid.appendChild(card);
        });
    }

    function initPortfolioFilters() {
        var filters = document.querySelectorAll('.filter-btn');
        if (!filters.length) return;

        filters.forEach(function(btn) {
            btn.addEventListener('click', function() {
                filters.forEach(function(b) { b.classList.remove('active'); });
                btn.classList.add('active');
                currentFilter = btn.dataset.filter;

                var grid = document.getElementById('portfolioGrid');
                if (typeof gsap !== 'undefined') {
                    gsap.to(grid, {
                        duration: 0.3,
                        opacity: 0,
                        y: 20,
                        ease: 'power2.out',
                        onComplete: function() {
                            generatePortfolioCards();
                            gsap.to(grid, {
                                duration: 0.4,
                                opacity: 1,
                                y: 0,
                                ease: 'power2.out'
                            });
                        }
                    });
                } else {
                    generatePortfolioCards();
                }
            });
        });
    }

    function openModal(id) {
        var modal = document.getElementById('portfolioModal');
        if (!modal) return;

        currentModalIndex = filteredItems.findIndex(function(item) { return item.id === id; });
        if (currentModalIndex === -1) currentModalIndex = 0;

        updateModalContent();
        modal.classList.add('open');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        var modal = document.getElementById('portfolioModal');
        if (!modal) return;
        modal.classList.remove('open');
        document.body.style.overflow = '';
    }

    function navigateModal(direction) {
        currentModalIndex += direction;
        if (currentModalIndex < 0) currentModalIndex = filteredItems.length - 1;
        if (currentModalIndex >= filteredItems.length) currentModalIndex = 0;
        updateModalContent();
    }

    function updateModalContent() {
        var item = filteredItems[currentModalIndex];
        if (!item) return;

        document.getElementById('modalImage').src = item.image;
        document.getElementById('modalImage').alt = item.alt;
        document.getElementById('modalTitle').textContent = item.title;
        document.getElementById('modalDesc').textContent = item.description;
        document.getElementById('modalDate').textContent = item.date;
        document.getElementById('modalTech').textContent = item.tech;
        document.getElementById('modalRole').textContent = item.role;

        var link = document.getElementById('modalLink');
        link.innerHTML = '<i class="fas fa-external-link-alt"></i> ' + item.linkText;
        if (item.link) {
            link.href = item.link;
            link.style.display = 'inline-flex';
        } else {
            link.removeAttribute('href');
            link.style.display = 'inline-flex';
        }
    }

    function initModal() {
        var closeBtn = document.getElementById('modalClose');
        var prevBtn = document.getElementById('modalPrev');
        var nextBtn = document.getElementById('modalNext');
        var modal = document.getElementById('portfolioModal');

        if (closeBtn) closeBtn.addEventListener('click', closeModal);
        if (prevBtn) prevBtn.addEventListener('click', function() { navigateModal(-1); });
        if (nextBtn) nextBtn.addEventListener('click', function() { navigateModal(1); });

        if (modal) {
            modal.addEventListener('click', function(e) {
                if (e.target === modal || e.target.classList.contains('modal-backdrop')) {
                    closeModal();
                }
            });

            document.addEventListener('keydown', function(e) {
                if (!modal.classList.contains('open')) return;
                if (e.key === 'Escape') closeModal();
                if (e.key === 'ArrowRight') navigateModal(-1);
                if (e.key === 'ArrowLeft') navigateModal(1);
            });
        }
    }

    function initNavbar() {
        var navbar = document.getElementById('navbar');
        var toggle = document.getElementById('navToggle');
        var navLinks = document.getElementById('navLinks');

        if (!navbar) return;

        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        if (toggle && navLinks) {
            toggle.addEventListener('click', function() {
                toggle.classList.toggle('active');
                navLinks.classList.toggle('open');
                document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
            });

            navLinks.querySelectorAll('.nav-link').forEach(function(link) {
                link.addEventListener('click', function() {
                    toggle.classList.remove('active');
                    navLinks.classList.remove('open');
                    document.body.style.overflow = '';
                });
            });
        }

        var sections = document.querySelectorAll('.section');
        var links = document.querySelectorAll('.nav-link');

        function updateActiveLink() {
            var scrollPos = window.scrollY + 150;
            var current = '';
            sections.forEach(function(section) {
                var top = section.offsetTop;
                var bottom = top + section.offsetHeight;
                if (scrollPos >= top && scrollPos < bottom) {
                    current = section.id;
                }
            });
            links.forEach(function(link) {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + current) {
                    link.classList.add('active');
                }
            });
        }

        window.addEventListener('scroll', updateActiveLink);
    }

    function initPortfolioCardTilt() {
        var grid = document.getElementById('portfolioGrid');
        if (!grid) return;

        grid.addEventListener('mousemove', function(e) {
            var card = e.target.closest('.portfolio-card');
            if (!card) return;

            var rect = card.getBoundingClientRect();
            var x = e.clientX - rect.left;
            var y = e.clientY - rect.top;
            var centerX = rect.width / 2;
            var centerY = rect.height / 2;
            var rotateX = (y - centerY) / centerY * -8;
            var rotateY = (x - centerX) / centerX * 8;

            card.style.transform = 'perspective(1000px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg) scale3d(1.02, 1.02, 1.02)';
        });

        grid.addEventListener('mouseleave', function(e) {
            var card = e.target.closest('.portfolio-card');
            if (card) {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
            }
        });
    }

    function isTouchDevice() {
        return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    }

    document.addEventListener('DOMContentLoaded', function() {
        initLoader();
        if (!isTouchDevice()) {
            initCursor();
        }
        initParticles();
        generatePortfolioCards();
        initPortfolioFilters();
        initModal();
        initNavbar();
        initPortfolioCardTilt();

        if (typeof gsap !== 'undefined') {
            initHeroAnimation();
            initScrollAnimations();
        }
    });

})();
