import { useEffect, useRef } from 'react';

// useScrollReveal — triggers .visible class when elements enter viewport.
// Pass a `deps` array when the page conditionally renders different
// .fade-up/.fade-in elements after mount (e.g. filtering a list) — otherwise
// elements added after the initial mount are never observed and stay hidden.
export function useScrollReveal(deps = []) {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.15 }
    );

    const elements = document.querySelectorAll('.fade-up, .fade-in');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

// useParallax — simple parallax on scroll
export function useParallax(ref, speed = 0.3) {
  useEffect(() => {
    const el = ref?.current;
    if (!el) return;
    const handleScroll = () => {
      const y = window.scrollY * speed;
      el.style.transform = `translateY(${y}px)`;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [ref, speed]);
}

// useGSAPReveal — stagger animation using GSAP (re-runs when dependencies change)
export function useGSAPReveal(containerRef, dependencies = []) {
  useEffect(() => {
    const animateItems = async () => {
      const { gsap: gsapModule } = await import('gsap');
      const gsap = gsapModule.default || gsapModule;
      
      if (!containerRef.current) return;
      const items = containerRef.current.querySelectorAll('[data-reveal]');
      if (!items.length) return;
      
      // Wait for next frame to ensure DOM is fully updated
      return new Promise(resolve => {
        requestAnimationFrame(() => {
          // Reset all items to initial state
          gsap.set(items, { y: 50, opacity: 0 });
          
          // Animate them in on the next frame
          requestAnimationFrame(() => {
            gsap.to(items, {
              y: 0,
              opacity: 1,
              duration: 0.9,
              stagger: 0.12,
              ease: 'power3.out',
              onComplete: resolve,
            });
          });
        });
      });
    };
    
    animateItems();
  }, [containerRef, ...dependencies]);
}
