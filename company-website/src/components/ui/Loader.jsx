import { useEffect, useRef } from 'react';

export default function Loader({ onComplete }) {
  const loaderRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (loaderRef.current) {
        loaderRef.current.classList.add('hidden');
      }
      setTimeout(onComplete, 800);
    }, 2000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="loader" ref={loaderRef}>
      <img src="/logo-icon.webp" alt="Loading" className="loader-logo" />
      <div className="loader-bar">
        <div className="loader-fill" />
      </div>
      <p style={{ color: 'var(--text-muted)', fontSize: '12px', letterSpacing: '3px', textTransform: 'uppercase' }}>
        Initializing
      </p>
    </div>
  );
}
