(function() {
    'use strict';

    var COUNTDOWN_DATE = new Date('Jan 31, 2021 16:00:00').getTime();

    function initLoader() {
        var loader = document.getElementById('loader');
        if (!loader) return;
        window.addEventListener('load', function() {
            setTimeout(function() {
                loader.classList.add('hidden');
            }, 1500);
        });
        setTimeout(function() {
            if (!loader.classList.contains('hidden')) {
                loader.classList.add('hidden');
            }
        }, 5000);
    }

    function initCountdown() {
        var els = {
            years: document.getElementById('years'),
            months: document.getElementById('months'),
            weeks: document.getElementById('weeks'),
            days: document.getElementById('days'),
            hours: document.getElementById('hours'),
            minutes: document.getElementById('minutes'),
            seconds: document.getElementById('seconds')
        };

        function pad(n) {
            return n < 10 ? '0' + n : '' + n;
        }

        function update() {
            var now = new Date().getTime();
            var distance = now - COUNTDOWN_DATE;

            if (distance < 0) {
                Object.values(els).forEach(function(el) { if (el) el.textContent = '00'; });
                return;
            }

            var years = Math.floor(distance / (1000 * 60 * 60 * 24 * 30 * 12));
            var remainder = distance % (1000 * 60 * 60 * 24 * 30 * 12);
            var months = Math.floor(remainder / (1000 * 60 * 60 * 24 * 30));
            remainder = remainder % (1000 * 60 * 60 * 24 * 30);
            var weeks = Math.floor(remainder / (1000 * 60 * 60 * 24 * 7));
            remainder = remainder % (1000 * 60 * 60 * 24 * 7);
            var days = Math.floor(remainder / (1000 * 60 * 60 * 24));
            remainder = remainder % (1000 * 60 * 60 * 24);
            var hours = Math.floor(remainder / (1000 * 60 * 60));
            remainder = remainder % (1000 * 60 * 60);
            var minutes = Math.floor(remainder / (1000 * 60));
            var seconds = Math.floor(remainder % (1000 * 60) / 1000);

            if (els.years) els.years.textContent = pad(years);
            if (els.months) els.months.textContent = pad(months);
            if (els.weeks) els.weeks.textContent = pad(weeks);
            if (els.days) els.days.textContent = pad(days);
            if (els.hours) els.hours.textContent = pad(hours);
            if (els.minutes) els.minutes.textContent = pad(minutes);
            if (els.seconds) els.seconds.textContent = pad(seconds);
        }

        update();
        setInterval(update, 1000);
    }

    function initThreeHearts() {
        var canvas = document.getElementById('heartCanvas');
        if (!canvas || typeof THREE === 'undefined') return;

        var scene = new THREE.Scene();
        var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        var renderer = new THREE.WebGLRenderer({
            canvas: canvas,
            alpha: true,
            antialias: true
        });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        var heartShape = new THREE.Shape();
        heartShape.moveTo(0, 0);
        heartShape.bezierCurveTo(0, -0.75, -1, -1.5, -2, -1.5);
        heartShape.bezierCurveTo(-3.5, -1.5, -4, -0.5, -4, 0);
        heartShape.bezierCurveTo(-4, 1, -2, 2.5, 0, 4);
        heartShape.bezierCurveTo(2, 2.5, 4, 1, 4, 0);
        heartShape.bezierCurveTo(4, -0.5, 3.5, -1.5, 2, -1.5);
        heartShape.bezierCurveTo(1, -1.5, 0, -0.75, 0, 0);

        var particleCount = 400;
        var geometry = new THREE.BufferGeometry();
        var positions = new Float32Array(particleCount * 3);
        var colors = new Float32Array(particleCount * 3);
        var sizes = new Float32Array(particleCount);
        var velocities = [];
        var origins = [];

        var color1 = new THREE.Color(0xff1a5e);
        var color2 = new THREE.Color(0xe8a0b4);
        var color3 = new THREE.Color(0xc9a84c);

        var points = heartShape.getPoints(50);

        for (var i = 0; i < particleCount; i++) {
            var pt = points[Math.floor(Math.random() * points.length)];
            var spread = 0.3;
            var x = (pt.x + (Math.random() - 0.5) * spread) * 0.8;
            var y = (pt.y + (Math.random() - 0.5) * spread) * 0.8;
            var z = (Math.random() - 0.5) * 1.5;

            positions[i * 3] = x;
            positions[i * 3 + 1] = y;
            positions[i * 3 + 2] = z;

            origins.push({ x: x, y: y, z: z });

            var c = Math.random() > 0.6 ? (Math.random() > 0.5 ? color2 : color3) : color1;
            colors[i * 3] = c.r;
            colors[i * 3 + 1] = c.g;
            colors[i * 3 + 2] = c.b;

            sizes[i] = 0.04 + Math.random() * 0.08;

            velocities.push({
                x: (Math.random() - 0.5) * 0.02,
                y: (Math.random() - 0.5) * 0.02,
                z: (Math.random() - 0.5) * 0.02,
                phase: Math.random() * Math.PI * 2
            });
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

        var material = new THREE.PointsMaterial({
            size: 0.12,
            vertexColors: true,
            transparent: true,
            opacity: 0.8,
            blending: THREE.AdditiveBlending,
            sizeAttenuation: true,
            depthWrite: false
        });

        var particleSystem = new THREE.Points(geometry, material);
        particleSystem.position.set(0, -0.5, 0);
        scene.add(particleSystem);

        camera.position.z = 6;

        var exploding = false;
        var explodeTime = 0;
        var floatTime = 0;

        window.explodeHearts = function() {
            exploding = true;
            explodeTime = 0;
        };

        var posAttr = geometry.attributes.position;
        var posArray = posAttr.array;

        function animate() {
            requestAnimationFrame(animate);
            floatTime += 0.01;

            if (exploding) {
                explodeTime += 0.03;
                var explosionSpeed = 0.3;
                for (var i = 0; i < particleCount; i++) {
                    var v = velocities[i];
                    posArray[i * 3] += v.x * explosionSpeed + (Math.random() - 0.5) * 0.01;
                    posArray[i * 3 + 1] += v.y * explosionSpeed + (Math.random() - 0.5) * 0.01;
                    posArray[i * 3 + 2] += v.z * explosionSpeed + (Math.random() - 0.5) * 0.01;
                    v.x *= 0.99;
                    v.y *= 0.99;
                    v.z *= 0.99;
                }
                material.opacity = Math.max(0, 0.8 - explodeTime * 0.5);
                if (explodeTime > 1.5) {
                    exploding = false;
                    for (var j = 0; j < particleCount; j++) {
                        posArray[j * 3] = origins[j].x;
                        posArray[j * 3 + 1] = origins[j].y;
                        posArray[j * 3 + 2] = origins[j].z;
                        velocities[j].x = (Math.random() - 0.5) * 0.02;
                        velocities[j].y = (Math.random() - 0.5) * 0.02;
                        velocities[j].z = (Math.random() - 0.5) * 0.02;
                    }
                    material.opacity = 0.8;
                }
                posAttr.needsUpdate = true;
            } else {
                var gentleFloat = 0.003;
                for (var k = 0; k < particleCount; k++) {
                    var phase = velocities[k].phase;
                    posArray[k * 3] = origins[k].x + Math.sin(floatTime * 0.5 + phase) * gentleFloat * 2;
                    posArray[k * 3 + 1] = origins[k].y + Math.cos(floatTime * 0.3 + phase * 1.3) * gentleFloat;
                    posArray[k * 3 + 2] = origins[k].z + Math.sin(floatTime * 0.4 + phase * 0.7) * gentleFloat;
                }
                posAttr.needsUpdate = true;
            }

            particleSystem.rotation.y = Math.sin(floatTime * 0.05) * 0.05;

            renderer.render(scene, camera);
        }

        animate();

        window.addEventListener('resize', function() {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });
    }

    function initGSAPAnimations() {
        if (typeof gsap === 'undefined') return;

        var tl = gsap.timeline({ delay: 1.8 });

        tl.to('.hero-content', {
            duration: 1.2,
            opacity: 1,
            y: 0,
            ease: 'power3.out'
        })
        .to('.hero-title', {
            duration: 1.2,
            opacity: 1,
            y: 0,
            ease: 'power3.out'
        }, '-=0.8')
        .to('.hero-subtitle', {
            duration: 0.8,
            opacity: 1,
            ease: 'power3.out'
        }, '-=0.6')
        .from('.counter-block', {
            duration: 0.6,
            y: 30,
            opacity: 0,
            stagger: 0.08,
            ease: 'back.out(1.7)'
        }, '-=0.4')
        .to('.scroll-hint', {
            duration: 1,
            opacity: 0.8,
            ease: 'power2.out'
        }, '-=0.2');

        if (typeof ScrollTrigger !== 'undefined') {
            gsap.registerPlugin(ScrollTrigger);

            ScrollTrigger.create({
                trigger: '#photo',
                start: 'top 75%',
                onEnter: function() {
                    gsap.to('.photo-content', {
                        duration: 1,
                        opacity: 1,
                        y: 0,
                        ease: 'power3.out'
                    });
                    gsap.to('.photo-text', {
                        duration: 0.8,
                        opacity: 1,
                        delay: 0.4,
                        ease: 'power3.out'
                    });
                }
            });

            ScrollTrigger.create({
                trigger: '#heartbeat',
                start: 'top 75%',
                onEnter: function() {
                    gsap.to('.heartbeat-line', {
                        duration: 1.2,
                        opacity: 1,
                        scale: 1,
                        ease: 'elastic.out(1, 0.5)'
                    });
                }
            });

            ScrollTrigger.create({
                trigger: '#heartbeat',
                start: 'top 40%',
                onEnter: function() {
                    if (typeof window.explodeHearts === 'function') {
                        window.explodeHearts();
                    }
                    gsap.to('.hidden-message', {
                        duration: 1,
                        opacity: 1,
                        y: 0,
                        delay: 1.5,
                        ease: 'power3.out'
                    });
                }
            });
        }
    }

    function initHeartClick() {
        var heart = document.getElementById('heartIcon');
        if (!heart) return;

        heart.addEventListener('click', function() {
            if (typeof window.explodeHearts === 'function') {
                window.explodeHearts();
            }
            gsap.to('.hidden-message', {
                duration: 1,
                opacity: 1,
                y: 0,
                ease: 'power3.out'
            });
            gsap.from('.message-date', {
                duration: 0.6,
                scale: 0.5,
                opacity: 0,
                ease: 'back.out(2)'
            });
        });
    }

    function initScrollParallax() {
        var video = document.querySelector('.video-bg video');
        if (!video) return;

        window.addEventListener('scroll', function() {
            var scrollY = window.scrollY;
            var maxScroll = document.documentElement.scrollHeight - window.innerHeight;
            var progress = scrollY / maxScroll;
            var scale = 1 + progress * 0.15;
            video.style.transform = 'scale(' + scale + ')';
        });
    }

    document.addEventListener('DOMContentLoaded', function() {
        initLoader();
        initCountdown();

        if (typeof THREE !== 'undefined') {
            initThreeHearts();
        }

        if (typeof gsap !== 'undefined') {
            initGSAPAnimations();
        }

        initHeartClick();
        initScrollParallax();
    });

})();
