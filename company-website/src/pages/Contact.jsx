import { useState, useRef, useCallback } from 'react';
import { CheckCircle, ChevronDown, AlertCircle, Loader2, XCircle } from 'lucide-react';
import { useScrollReveal } from '../hooks/useAnimations';
import { Helmet } from 'react-helmet-async';
import Toast from '../components/ui/Toast';

// ── API endpoint ───────────────────────────────────────────────────────────────
// Dev  → Vite proxy forwards /api/* to http://localhost:5000
// Prod → set VITE_API_URL to your deployed backend URL, e.g. https://api.yourdomain.com
const API_URL = import.meta.env.VITE_API_URL
  ? `${import.meta.env.VITE_API_URL}/api/send`
  : '/api/send';

// ── Service labels ─────────────────────────────────────────────────────────────
const SERVICES = [
  { value: 'custom',   label: 'Custom Software Development' },
  { value: 'ai',       label: 'AI & Machine Learning' },
  { value: 'cloud',    label: 'Cloud Architecture' },
  { value: 'security', label: 'Cybersecurity' },
  { value: 'mobile',   label: 'Mobile & Web Apps' },
  { value: 'api',      label: 'API & Integrations' },
  { value: 'other',    label: 'Other / Not Sure Yet' },
];

// ── Client-side validation ─────────────────────────────────────────────────────
function validate(form) {
  const errs = {};
  if (!form.name.trim())    errs.name    = 'Full name is required.';
  if (!form.email.trim())   errs.email   = 'Email address is required.';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
                            errs.email   = 'Please enter a valid email address.';
  if (!form.message.trim()) errs.message = 'Please describe your project.';
  return errs;
}

export default function Contact() {
  useScrollReveal();

  const [form, setForm] = useState({
    name: '', email: '', company: '', service: '', message: '',
  });
  const [errors,    setErrors]    = useState({});
  const [status,    setStatus]    = useState('idle'); // idle | loading | success | error
  const [serverMsg, setServerMsg] = useState('');
  const [toast,     setToast]     = useState(null);  // { message, type } | null

  const textareaRef = useRef(null);

  // ── Field change handler ───────────────────────────────────────────────────
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Clear field-level error on first keystroke
    setErrors((prev) => (prev[name] ? { ...prev, [name]: '' } : prev));
  }, []);

  // ── Auto-expand textarea ───────────────────────────────────────────────────
  const handleTextareaInput = useCallback((e) => {
    const el = e.target;
    el.style.height = 'auto';
    el.style.height = `${el.scrollHeight}px`;
    handleChange(e);
  }, [handleChange]);

  // ── Form submit ────────────────────────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1. Client-side validation
    const clientErrors = validate(form);
    if (Object.keys(clientErrors).length > 0) {
      setErrors(clientErrors);
      // Scroll to the first error field
      const firstError = Object.keys(clientErrors)[0];
      document.getElementById(firstError)?.focus();
      return;
    }

    setStatus('loading');
    setServerMsg('');

    try {
      // 2. POST to the mailer backend
      const res = await fetch(API_URL, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(form),
      });

      // Guard: if the server returned an empty / non-JSON body (e.g. backend
      // is down and the Vite proxy returned an HTML error page), parse safely.
      let data;
      try {
        data = await res.json();
      } catch (_parseErr) {
        throw new Error(
          'Could not reach the mail server. Please make sure the backend is running and try again.'
        );
      }

      if (res.ok && data.success) {
        setStatus('success');
        setToast({
          type: 'success',
          message: `Thanks ${form.name.split(' ')[0]}! We've received your message and will reply within one business day. A confirmation has been sent to ${form.email}.`,
        });
      } else if (res.status === 422 && data.errors) {
        // Server returned field-level validation errors
        setErrors(data.errors);
        setStatus('idle');
      } else {
        throw new Error(data.message || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      const msg =
        err.message === 'Failed to fetch'
          ? 'Could not reach the mail server. Please check your connection or try again later.'
          : err.message;
      setStatus('error');
      setServerMsg(msg);
      setToast({ type: 'error', message: msg });
    }
  };

  // ── Reset form ─────────────────────────────────────────────────────────────
  const handleReset = () => {
    setForm({ name: '', email: '', company: '', service: '', message: '' });
    setErrors({});
    setStatus('idle');
    setServerMsg('');
    if (textareaRef.current) textareaRef.current.style.height = 'auto';
  };

  // ── CSS class helper ───────────────────────────────────────────────────────
  const fieldClass = (field) => `form-group${errors[field] ? ' has-error' : ''}`;

  return (
    <>
      {/* ── Toast notification ── */}
      {toast && (
        <Toast
          key={Date.now()}
          type={toast.type}
          message={toast.message}
          onClose={() => setToast(null)}
        />
      )}

      <Helmet>
        <title>Contact Us | Hemmingway Technologies</title>
        <meta
          name="description"
          content="Get in touch with Hemmingway Technologies for software development, AI, cloud, and cybersecurity solutions."
        />
      </Helmet>

      {/* ── PAGE HERO ── */}
      <section className="page-hero" style={{ paddingBottom: '40px' }}>
        <div className="page-hero-glow" />
        <div className="container">
          <div className="tag fade-in visible">Contact</div>
        </div>
      </section>

      {/* ── CONTACT BODY ── */}
      <section style={{ padding: '0 0 120px' }}>
        <div className="container">
          <div className="contact-grid">

            {/* ── LEFT INFO ─────────────────────────────────────────────── */}
            <div>
              <h3 className="fade-up">We'd love to hear<br />from you</h3>
              <p className="fade-up" style={{ marginTop: '16px', transitionDelay: '0.1s' }}>
                Reach out through any of the channels below, or fill out the form and our team
                will respond within one business day.
              </p>

              <div style={{ marginTop: '48px' }}>
                {[
                  { icon: '📍', label: 'Headquarters', value: 'RZ F1/380, Mahavir Enclave, New Delhi' },
                  { icon: '✉️', label: 'Email',         value: 'hemmingway.tech@gmail.com' },
                  { icon: '📞', label: 'Phone',         value: '+91 7011012021' },
                  { icon: '🕐', label: 'Hours',         value: 'Mon–Fri, 9am–6pm IST' },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="contact-item fade-up"
                    style={{ transitionDelay: `${0.15 + i * 0.1}s` }}
                  >
                    <div className="contact-item-icon">{item.icon}</div>
                    <div>
                      <div className="contact-item-label">{item.label}</div>
                      <div className="contact-item-value">{item.value}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Social row */}
              <div style={{ marginTop: '48px' }}>
                <div style={{
                  fontSize: '13px', fontWeight: 600, color: 'var(--text-bright)',
                  marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '1px',
                }}>
                  Follow Us
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                  {[
                    { icon: '𝕏',  label: 'X/Twitter' },
                    { icon: 'in', label: 'LinkedIn' },
                    { icon: '⌨️', label: 'GitHub' },
                  ].map((s) => (
                    <a
                      key={s.label}
                      href="#"
                      aria-label={s.label}
                      style={{
                        width: '44px', height: '44px', borderRadius: '12px',
                        background: 'var(--bg-card)', border: '1px solid var(--border)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontWeight: 700, fontSize: '14px', color: 'var(--text)',
                        transition: 'all 0.3s',
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.borderColor = 'var(--primary)';
                        e.currentTarget.style.color = 'var(--primary)';
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.borderColor = 'var(--border)';
                        e.currentTarget.style.color = 'var(--text)';
                      }}
                    >
                      {s.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* ── RIGHT FORM ────────────────────────────────────────────── */}
            <div className="contact-form fade-up" style={{ transitionDelay: '0.2s' }}>

              {/* ── SUCCESS STATE ── */}
              {status === 'success' ? (
                <div className="form-success show">
                  <div className="form-success-icon">
                    <CheckCircle size={52} style={{ color: '#22c55e' }} />
                  </div>
                  <h3>Message Sent!</h3>
                  <p>
                    Thanks <strong style={{ color: 'var(--text-bright)' }}>{form.name}</strong>!
                    We've received your message and will be in touch within one business day.
                    A confirmation has also been sent to{' '}
                    <strong style={{ color: 'var(--text-bright)' }}>{form.email}</strong>.
                  </p>
                  <button
                    onClick={handleReset}
                    className="btn-primary"
                    style={{ marginTop: '28px', display: 'inline-flex' }}
                  >
                    Send Another Message
                  </button>
                </div>

              ) : (
                /* ── FORM ── */
                <form onSubmit={handleSubmit} noValidate>
                  <div style={{ marginBottom: '32px' }}>
                    <h3 style={{ fontSize: '22px', marginBottom: '8px' }}>Send us a message</h3>
                    <p style={{ color: 'var(--text)', fontSize: '14px' }}>
                      We'll get back to you within 24 hours.
                    </p>
                  </div>

                  {/* ── Server-level error banner ── */}
                  {status === 'error' && (
                    <div className="form-server-error" role="alert" aria-live="assertive">
                      <XCircle size={18} style={{ flexShrink: 0 }} />
                      <span>{serverMsg || 'Something went wrong. Please try again.'}</span>
                    </div>
                  )}

                  {/* ── Row: Name + Email ── */}
                  <div className="form-row">
                    <div className={fieldClass('name')}>
                      <label htmlFor="name">Full Name *</label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Alex Johnson"
                        value={form.name}
                        onChange={handleChange}
                        disabled={status === 'loading'}
                        aria-invalid={!!errors.name}
                        aria-describedby={errors.name ? 'name-error' : undefined}
                        autoComplete="name"
                      />
                      <span id="name-error" className="form-error-msg" role="alert">
                        <AlertCircle size={13} />
                        {errors.name}
                      </span>
                    </div>

                    <div className={fieldClass('email')}>
                      <label htmlFor="email">Email Address *</label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="alex@company.com"
                        value={form.email}
                        onChange={handleChange}
                        disabled={status === 'loading'}
                        aria-invalid={!!errors.email}
                        aria-describedby={errors.email ? 'email-error' : undefined}
                        autoComplete="email"
                      />
                      <span id="email-error" className="form-error-msg" role="alert">
                        <AlertCircle size={13} />
                        {errors.email}
                      </span>
                    </div>
                  </div>

                  {/* ── Company ── */}
                  <div className="form-group">
                    <label htmlFor="company">Company</label>
                    <input
                      id="company"
                      name="company"
                      type="text"
                      placeholder="Your company name"
                      value={form.company}
                      onChange={handleChange}
                      disabled={status === 'loading'}
                      autoComplete="organization"
                    />
                  </div>

                  {/* ── Service select with custom chevron ── */}
                  <div className="form-group">
                    <label htmlFor="service">Service of Interest</label>
                    <div className="select-wrapper">
                      <select
                        id="service"
                        name="service"
                        value={form.service}
                        onChange={handleChange}
                        disabled={status === 'loading'}
                        style={{
                          color: form.service ? 'var(--text-bright)' : 'var(--text-muted)',
                          WebkitTextFillColor: form.service
                            ? 'var(--text-bright)'
                            : 'var(--text-muted)',
                        }}
                      >
                        <option value="">Select a service...</option>
                        {SERVICES.map((s) => (
                          <option key={s.value} value={s.value}>{s.label}</option>
                        ))}
                      </select>
                      <span className="select-chevron" aria-hidden="true">
                        <ChevronDown size={18} strokeWidth={2.2} />
                      </span>
                    </div>
                  </div>

                  {/* ── Message (auto-expanding textarea) ── */}
                  <div className={fieldClass('message')}>
                    <label htmlFor="message">Tell Us About Your Project *</label>
                    <textarea
                      id="message"
                      name="message"
                      ref={textareaRef}
                      rows="5"
                      placeholder="Describe your project, goals, and any timeline or budget constraints..."
                      value={form.message}
                      onInput={handleTextareaInput}
                      onChange={handleChange}
                      disabled={status === 'loading'}
                      aria-invalid={!!errors.message}
                      aria-describedby={errors.message ? 'message-error' : undefined}
                    />
                    <span id="message-error" className="form-error-msg" role="alert">
                      <AlertCircle size={13} />
                      {errors.message}
                    </span>
                  </div>

                  {/* ── Submit button ── */}
                  <button
                    type="submit"
                    className="form-submit"
                    id="contact-submit"
                    disabled={status === 'loading'}
                    aria-busy={status === 'loading'}
                    style={{ opacity: status === 'loading' ? 0.8 : 1 }}
                  >
                    {status === 'loading' ? (
                      <>
                        <Loader2
                          size={18}
                          style={{ animation: 'spin 0.9s linear infinite' }}
                          aria-hidden="true"
                        />
                        Sending…
                      </>
                    ) : (
                      <>
                        Send Message
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                          stroke="currentColor" strokeWidth="2" aria-hidden="true">
                          <path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z" />
                        </svg>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
