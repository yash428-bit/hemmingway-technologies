import { useEffect, useRef, useState } from 'react';
import { CheckCircle, XCircle, Info, X } from 'lucide-react';

// ── Duration the toast stays visible (ms) ────────────────────────────────────
const DURATION = 5000;

const VARIANTS = {
  success: {
    icon: CheckCircle,
    color: '#22c55e',
    glow: 'rgba(34,197,94,0.25)',
    border: 'rgba(34,197,94,0.35)',
    bg: 'rgba(34,197,94,0.08)',
    bar: 'linear-gradient(90deg,#16a34a,#22c55e)',
  },
  error: {
    icon: XCircle,
    color: '#ef4444',
    glow: 'rgba(239,68,68,0.25)',
    border: 'rgba(239,68,68,0.35)',
    bg: 'rgba(239,68,68,0.08)',
    bar: 'linear-gradient(90deg,#dc2626,#ef4444)',
  },
  info: {
    icon: Info,
    color: '#6367f1',
    glow: 'rgba(99,103,241,0.25)',
    border: 'rgba(99,103,241,0.35)',
    bg: 'rgba(99,103,241,0.08)',
    bar: 'linear-gradient(90deg,#4f46e5,#a78bfa)',
  },
};

export default function Toast({ message, type = 'success', onClose }) {
  const v = VARIANTS[type] ?? VARIANTS.success;
  const Icon = v.icon;

  // Controls slide-in / slide-out
  const [visible, setVisible] = useState(false);
  const timerRef = useRef(null);

  // Animate in on mount, auto-dismiss after DURATION
  useEffect(() => {
    // Tiny delay so the slide-in transition fires after first paint
    const enterTimer = setTimeout(() => setVisible(true), 20);

    timerRef.current = setTimeout(() => {
      handleClose();
    }, DURATION);

    return () => {
      clearTimeout(enterTimer);
      clearTimeout(timerRef.current);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleClose = () => {
    setVisible(false);
    // Let the slide-out animation finish before unmounting
    setTimeout(onClose, 400);
  };

  return (
    <div
      role="alert"
      aria-live="assertive"
      style={{
        position: 'fixed',
        top: '24px',
        right: '24px',
        zIndex: 9999,
        maxWidth: '420px',
        width: 'calc(100vw - 48px)',
        /* Slide in from the right */
        transform: visible ? 'translateX(0) translateY(0)' : 'translateX(120%) translateY(-8px)',
        opacity: visible ? 1 : 0,
        transition: 'transform 0.45s cubic-bezier(0.22,1,0.36,1), opacity 0.45s ease',
        pointerEvents: 'auto',
      }}
    >
      {/* Card */}
      <div
        style={{
          background: 'rgba(12,12,26,0.95)',
          border: `1px solid ${v.border}`,
          borderRadius: '16px',
          boxShadow: `0 24px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04), 0 0 40px ${v.glow}`,
          backdropFilter: 'blur(20px)',
          overflow: 'hidden',
        }}
      >
        {/* Progress bar */}
        <div
          style={{
            height: '3px',
            background: v.bar,
            transformOrigin: 'left',
            animation: `toast-shrink ${DURATION}ms linear forwards`,
          }}
        />

        {/* Body */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: '14px',
            padding: '18px 20px',
          }}
        >
          {/* Icon bubble */}
          <div
            style={{
              flexShrink: 0,
              width: '40px',
              height: '40px',
              borderRadius: '12px',
              background: v.bg,
              border: `1px solid ${v.border}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Icon size={20} color={v.color} strokeWidth={2.2} />
          </div>

          {/* Text */}
          <div style={{ flex: 1, paddingTop: '2px' }}>
            <div
              style={{
                fontFamily: "'Space Grotesk', 'Inter', sans-serif",
                fontWeight: 700,
                fontSize: '15px',
                color: '#ffffff',
                marginBottom: '4px',
              }}
            >
              {type === 'success' ? 'Message Sent!' : type === 'error' ? 'Send Failed' : 'Notice'}
            </div>
            <div
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '13px',
                color: '#a0a0b8',
                lineHeight: 1.55,
              }}
            >
              {message}
            </div>
          </div>

          {/* Close button */}
          <button
            onClick={handleClose}
            aria-label="Dismiss notification"
            style={{
              flexShrink: 0,
              width: '28px',
              height: '28px',
              borderRadius: '8px',
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.08)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'background 0.2s, border-color 0.2s',
              color: '#a0a0b8',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.12)';
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.18)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
            }}
          >
            <X size={14} strokeWidth={2.5} />
          </button>
        </div>
      </div>

      {/* Keyframe injected inline — only once via a <style> tag */}
      <style>{`
        @keyframes toast-shrink {
          from { transform: scaleX(1); }
          to   { transform: scaleX(0); }
        }
      `}</style>
    </div>
  );
}
