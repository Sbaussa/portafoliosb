/* ============================================
   Cursor Glow Effect
   ============================================ */
const cursorGlow = document.getElementById('cursorGlow');

document.addEventListener('mousemove', (e) => {
    cursorGlow.style.left = e.clientX + 'px';
    cursorGlow.style.top = e.clientY + 'px';
});

/* ============================================
   Navigation Scroll Effect
   ============================================ */
const nav = document.getElementById('nav');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        nav.classList.add('nav--scrolled');
    } else {
        nav.classList.remove('nav--scrolled');
    }
});

/* ============================================
   Mobile Menu Toggle
   ============================================ */
const menuBtn = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');

menuBtn.addEventListener('click', () => {
    menuBtn.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
});

document.querySelectorAll('.mobile-menu__link').forEach(link => {
    link.addEventListener('click', () => {
        menuBtn.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
    });
});

/* ============================================
   Smooth Scroll for Nav Links
   ============================================ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
});

/* ============================================
   Scroll Reveal Animation
   ============================================ */
const revealElements = () => {
    const elements = document.querySelectorAll(
        '.section__header, .about__image-wrapper, .about__content, ' +
        '.skill-card, .project-card, .contact__info, .contact__form'
    );

    elements.forEach(el => {
        if (!el.classList.contains('reveal')) el.classList.add('reveal');
    });

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => { entry.target.classList.add('visible'); }, index * 100);
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    elements.forEach(el => observer.observe(el));
};

/* ============================================
   Counter Animation (About Stats)
   ============================================ */
const animateCounters = () => {
    const counters = document.querySelectorAll('.about__stat-number');

    const counterObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = parseInt(entry.target.dataset.count);
                    const duration = 1500;
                    const start = performance.now();

                    const updateCounter = (currentTime) => {
                        const elapsed = currentTime - start;
                        const progress = Math.min(elapsed / duration, 1);
                        const eased = 1 - Math.pow(1 - progress, 3);
                        entry.target.textContent = Math.floor(eased * target);
                        if (progress < 1) {
                            requestAnimationFrame(updateCounter);
                        } else {
                            entry.target.textContent = target;
                        }
                    };

                    requestAnimationFrame(updateCounter);
                    counterObserver.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.5 }
    );

    counters.forEach(counter => counterObserver.observe(counter));
};

/* ============================================
   Skill Bars Animation
   ============================================ */
const animateSkillBars = () => {
    const bars = document.querySelectorAll('.skill-card__bar');

    const barObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const width = entry.target.dataset.width;
                    setTimeout(() => { entry.target.style.width = width + '%'; }, 300);
                    barObserver.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.3 }
    );

    bars.forEach(bar => barObserver.observe(bar));
};

/* ============================================
   Active Nav Link on Scroll
   ============================================ */
const highlightNavOnScroll = () => {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav__link');

    const sectionObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.id;
                    navLinks.forEach(link => {
                        link.style.color = link.getAttribute('href') === `#${id}` ? 'var(--text-primary)' : '';
                    });
                }
            });
        },
        { threshold: 0.3 }
    );

    sections.forEach(section => sectionObserver.observe(section));
};

/* ============================================
   Contact Form — WhatsApp directo
   ============================================ */
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    const WA_NUMBER = '573009626009';

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const nombre = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const mensaje = document.getElementById('message').value.trim();

        // Validación simple
        if (!nombre || !email || !mensaje) {
            alert('Por favor llena todos los campos');
            return;
        }

        // Armar mensaje de WhatsApp
        const waMessage =
            `🌐 *Nuevo mensaje desde el Portfolio*\n\n` +
            `👤 *Nombre:* ${nombre}\n` +
            `📧 *Email:* ${email}\n\n` +
            `💬 *Mensaje:*\n${mensaje}`;

        const waURL = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(waMessage)}`;

        // Cambiar botón y redirigir
        const btn = form.querySelector('button[type="submit"]');
        if (btn) {
            btn.innerHTML = 'Abriendo WhatsApp...';
            btn.style.background = '#25d366';
            btn.style.color = '#fff';
        }

        setTimeout(() => {
            window.location.href = waURL;
        }, 400);
    });
}

/* ============================================
   Parallax on Hero (subtle)
   ============================================ */
const hero = document.getElementById('hero');

window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    if (scrolled < window.innerHeight) {
        hero.style.transform = `translateY(${scrolled * 0.15}px)`;
        hero.style.opacity = 1 - scrolled / (window.innerHeight * 1.2);
    }
});

/* ============================================
   Magnetic Effect on Buttons (desktop)
   ============================================ */
if (window.matchMedia('(pointer: fine)').matches) {
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
        });
        btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
    });
}

/* ============================================
   Tilt Effect on Project Cards (desktop)
   ============================================ */
if (window.matchMedia('(pointer: fine)').matches) {
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            card.style.transform = `perspective(800px) rotateY(${x * 4}deg) rotateX(${-y * 4}deg) translateY(-3px)`;
        });
        card.addEventListener('mouseleave', () => { card.style.transform = ''; });
    });
}

/* ============================================
   Lightbox
   ============================================ */
function openLightbox(src) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    if (!lightbox || !lightboxImg) return;
    lightboxImg.src = src;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (!lightbox) return;
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
});

/* ============================================
   Eyes Tracking (Hero)
   ============================================ */
const initEyes = () => {
    const svg = document.getElementById('eyesSvg');
    const leftPupil = document.getElementById('leftPupilGroup');
    const rightPupil = document.getElementById('rightPupilGroup');

    if (!svg || !leftPupil || !rightPupil) return;

    const leftCenter = { x: 230, y: 150 };
    const rightCenter = { x: 450, y: 150 };
    const maxDist = 12;

    let targetLX = leftCenter.x, targetLY = leftCenter.y;
    let targetRX = rightCenter.x, targetRY = rightCenter.y;
    let currentLX = leftCenter.x, currentLY = leftCenter.y;
    let currentRX = rightCenter.x, currentRY = rightCenter.y;

    function getEyeOffset(mouseX, mouseY, center) {
        const dx = mouseX - center.x;
        const dy = mouseY - center.y;
        const angle = Math.atan2(dy, dx);
        const dist = Math.min(Math.sqrt(dx * dx + dy * dy) * 0.04, maxDist);
        return {
            x: center.x + Math.cos(angle) * dist,
            y: center.y + Math.sin(angle) * dist
        };
    }

    document.addEventListener('mousemove', (e) => {
        const rect = svg.getBoundingClientRect();
        const scaleX = 680 / rect.width;
        const scaleY = 300 / rect.height;
        const mouseX = (e.clientX - rect.left) * scaleX;
        const mouseY = (e.clientY - rect.top) * scaleY;

        const left = getEyeOffset(mouseX, mouseY, leftCenter);
        const right = getEyeOffset(mouseX, mouseY, rightCenter);

        targetLX = left.x; targetLY = left.y;
        targetRX = right.x; targetRY = right.y;
    });

    function animateEyes() {
        const ease = 0.12;
        currentLX += (targetLX - currentLX) * ease;
        currentLY += (targetLY - currentLY) * ease;
        currentRX += (targetRX - currentRX) * ease;
        currentRY += (targetRY - currentRY) * ease;

        leftPupil.setAttribute('transform', `translate(${currentLX},${currentLY})`);
        rightPupil.setAttribute('transform', `translate(${currentRX},${currentRY})`);

        requestAnimationFrame(animateEyes);
    }

    animateEyes();
};

/* ============================================
   Init
   ============================================ */
document.addEventListener('DOMContentLoaded', () => {
    revealElements();
    animateCounters();
    animateSkillBars();
    highlightNavOnScroll();
    initContactForm();
    initEyes();
});
