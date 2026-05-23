document.addEventListener('DOMContentLoaded', () => {
    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
    
    const tl = gsap.timeline({ defaults: { ease: "power4.out", duration: 1.5 } });

    // Initial state
    gsap.set([".logo", ".nav-links li", ".contact-btn", ".bg-text", ".portrait-container", ".status-badge", ".bottom-left h1", ".hero-btns", ".bottom-right h2", ".description"], {
        opacity: 0
    });

    // Entrance Sequence
    tl.to(".bg-text", { opacity: 1, y: -20, duration: 2, scale: 1.1 })
      .to(".portrait-container", { opacity: 1, y: 0, startAt: { y: 100 }, duration: 1.8 }, "-=1.5")
      .to(".logo", { opacity: 1, y: 0, startAt: { y: -20 } }, "-=1.2")
      .to(".nav-links li", { opacity: 1, y: 0, startAt: { y: -20 }, stagger: 0.1 }, "-=1.0")
      .to(".contact-btn", { opacity: 1, x: 0, startAt: { x: 20 } }, "-=0.8")
      .to(".status-badge", { opacity: 1, y: 0, startAt: { y: -20 } }, "-=1.0")
      .to(".bottom-left h1", { opacity: 1, y: 0, startAt: { y: 50 } }, "-=0.8")
      .to(".hero-btns", { opacity: 1, y: 0, startAt: { y: 30 } }, "-=0.6")
      .to(".bottom-right h2", { opacity: 1, y: 0, startAt: { y: 50 } }, "-=0.8")
      .to(".description", { opacity: 1, x: 0, startAt: { x: 30 } }, "-=1.0");

    // General Mouse Move Effects
    document.addEventListener('mousemove', (e) => {
        const mouseX = (e.clientX / window.innerWidth) - 0.5;
        const mouseY = (e.clientY / window.innerHeight) - 0.5;
        
        // Hero Parallax
        gsap.to(".portrait-img", { duration: 1, x: mouseX * 20, y: mouseY * 20, ease: "power2.out" });
        gsap.to(".bg-text", { duration: 1.5, x: -mouseX * 40, y: -mouseY * 40, ease: "power2.out" });
    });

    // ScrollTrigger Animations for each section
    const sections = document.querySelectorAll('.section, main');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    sections.forEach(section => {
        // Active Nav Link tracking
        ScrollTrigger.create({
            trigger: section,
            start: "top 50%",
            end: "bottom 50%",
            onToggle: self => {
                if (self.isActive) {
                    const id = section.getAttribute('id');
                    navLinks.forEach(link => {
                        link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
                    });
                }
            }
        });

        // Get header and other elements
        const elements = section.querySelectorAll('.section-header, .work-item, .big-quote, .about-column, .service-item, .testimonial-card, .contact-big-text, .contact-email, .form-group, .submit-btn');
        
        if (elements.length > 0) {
            gsap.from(elements, {
                scrollTrigger: {
                    trigger: section,
                    start: "top 90%", 
                    end: "bottom 10%",
                    toggleActions: "play reverse play reverse"
                },
                opacity: 0,
                y: 50,
                duration: 1.2,
                stagger: 0.15,
                ease: "power3.out"
            });
        }
    });

    // Parallax for works images
    gsap.utils.toArray('.work-image').forEach(img => {
        gsap.to(img, {
            y: -60,
            ease: "none",
            scrollTrigger: {
                trigger: img,
                start: "top bottom",
                end: "bottom top",
                scrub: true
            }
        });
    });

    // Smooth Scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            gsap.to(window, {
                duration: 1.5,
                scrollTo: {
                    y: targetId,
                    autoKill: true
                },
                ease: "power4.out"
            });
        });
    });
});
