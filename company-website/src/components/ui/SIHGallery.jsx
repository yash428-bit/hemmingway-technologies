import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react';

const PHOTOS = [
  {
    src: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    caption: 'Team Hemmingway celebrating our SIH 2025 victory 🏆',
    label: 'Grand Finale — SIH 2025',
  },
  {
    src: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    caption: 'Presenting our Ministry of Coal app prototype to the judges',
    label: 'Project Presentation',
  },
  {
    src: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    caption: 'Late-night hustle — 36 hours of coding, zero sleep',
    label: 'The Grind',
  },
  {
    src: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    caption: 'Receiving the winning certificate from the jury panel',
    label: 'Award Ceremony',
  },
  {
    src: 'https://images.unsplash.com/photo-1528901166007-3784c7dd3653?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    caption: 'The moment that sparked the founding of Hemmingway Technologies',
    label: 'The Spark 🚀',
  },
];

export default function SIHGallery() {
  const [current, setCurrent] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState('next');

  const goTo = useCallback(
    (idx, dir = 'next') => {
      if (isAnimating) return;
      setDirection(dir);
      setIsAnimating(true);
      setTimeout(() => {
        setCurrent(idx);
        setIsAnimating(false);
      }, 350);
    },
    [isAnimating]
  );

  const prev = () => goTo((current - 1 + PHOTOS.length) % PHOTOS.length, 'prev');
  const next = () => goTo((current + 1) % PHOTOS.length, 'next');

  // Auto-advance
  useEffect(() => {
    if (lightbox) return;
    const t = setTimeout(() => next(), 4500);
    return () => clearTimeout(t);
  }, [current, lightbox]);

  // Keyboard navigation
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
      if (e.key === 'Escape') setLightbox(false);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [current]);

  return (
    <>
      <div className="sih-gallery">
        {/* Main Slider */}
        <div className="sih-slider">
          <div
            className={`sih-slide ${isAnimating ? `slide-exit-${direction}` : 'slide-enter'}`}
          >
            <img src={PHOTOS[current].src} alt={PHOTOS[current].caption} />
            <div className="sih-slide-overlay" />
            <div className="sih-slide-info">
              <span className="sih-slide-label">{PHOTOS[current].label}</span>
              <p className="sih-slide-caption">{PHOTOS[current].caption}</p>
            </div>
            <button
              className="sih-zoom-btn"
              onClick={() => setLightbox(true)}
              aria-label="Zoom photo"
            >
              <ZoomIn size={18} />
            </button>
          </div>

          {/* Arrows */}
          <button className="sih-arrow sih-arrow-prev" onClick={prev} aria-label="Previous">
            <ChevronLeft size={22} />
          </button>
          <button className="sih-arrow sih-arrow-next" onClick={next} aria-label="Next">
            <ChevronRight size={22} />
          </button>
        </div>

        {/* Thumbnail Strip */}
        <div className="sih-thumbs">
          {PHOTOS.map((p, i) => (
            <button
              key={i}
              className={`sih-thumb ${i === current ? 'active' : ''}`}
              onClick={() => goTo(i, i > current ? 'next' : 'prev')}
              aria-label={`Photo ${i + 1}`}
            >
              <img src={p.src} alt={p.caption} />
            </button>
          ))}
        </div>

        {/* Dot navigation */}
        <div className="sih-dots">
          {PHOTOS.map((_, i) => (
            <button
              key={i}
              className={`sih-dot ${i === current ? 'active' : ''}`}
              onClick={() => goTo(i, i > current ? 'next' : 'prev')}
              aria-label={`Go to photo ${i + 1}`}
            />
          ))}
        </div>

        {/* Counter */}
        <div className="sih-counter">
          {current + 1} / {PHOTOS.length}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div className="sih-lightbox" onClick={() => setLightbox(false)}>
          <button className="sih-lightbox-close" onClick={() => setLightbox(false)}>
            <X size={24} />
          </button>
          <img
            src={PHOTOS[current].src}
            alt={PHOTOS[current].caption}
            onClick={(e) => e.stopPropagation()}
          />
          <p className="sih-lightbox-caption">{PHOTOS[current].caption}</p>
          <button
            className="sih-arrow sih-arrow-prev sih-lightbox-arrow"
            onClick={(e) => { e.stopPropagation(); prev(); }}
          >
            <ChevronLeft size={28} />
          </button>
          <button
            className="sih-arrow sih-arrow-next sih-lightbox-arrow"
            onClick={(e) => { e.stopPropagation(); next(); }}
          >
            <ChevronRight size={28} />
          </button>
        </div>
      )}
    </>
  );
}
