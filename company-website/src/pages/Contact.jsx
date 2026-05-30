import { useState } from 'react';
import { CheckCircle } from 'lucide-react';
import { useScrollReveal } from '../hooks/useAnimations';

export default function Contact() {
  useScrollReveal();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', company: '', service: '', message: '' });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
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
            {/* LEFT INFO */}
            <div>
              <h3 className="fade-up">We'd love to hear<br />from you</h3>
              <p className="fade-up" style={{ marginTop: '16px', transitionDelay: '0.1s' }}>
                Reach out through any of the channels below, or fill out the form and our team will respond within one business day.
              </p>

              <div style={{ marginTop: '48px' }}>
                {[
                  { icon: '📍', label: 'Headquarters', value: 'RZ F1/380 , Mahavir Enclave, New Delhi' },
                  { icon: '✉️', label: 'Email', value: 'hemmingway.tech@gmail.com' },
                  { icon: '📞', label: 'Phone', value: '+91 7011012021' },
                  { icon: '🕐', label: 'Hours', value: 'Mon–Fri, 9am–6pm GMT' },
                ].map((item, i) => (
                  <div key={i} className="contact-item fade-up" style={{ transitionDelay: `${0.15 + i * 0.1}s` }}>
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
                <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-bright)', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '1px' }}>Follow Us</div>
                <div style={{ display: 'flex', gap: '12px' }}>
                  {[
                    { icon: '𝕏', label: 'X/Twitter' },
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
                      onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--primary)'; e.currentTarget.style.color = 'var(--primary)'; }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text)'; }}
                    >
                      {s.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT FORM */}
            <div className="contact-form fade-up" style={{ transitionDelay: '0.2s' }}>
              {submitted ? (
                <div className="form-success show">
                  <div className="form-success-icon"><CheckCircle size={48} /></div>
                  <h3>Message Sent!</h3>
                  <p>Thanks {form.name}! We've received your message and will be in touch within one business day.</p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="btn-primary"
                    style={{ marginTop: '24px', display: 'inline-flex' }}
                  >
                    Send Another
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div style={{ marginBottom: '32px' }}>
                    <h3 style={{ fontSize: '22px', marginBottom: '8px' }}>Send us a message</h3>
                    <p style={{ color: 'var(--text)', fontSize: '14px' }}>We'll get back to you within 24 hours.</p>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="name">Full Name *</label>
                      <input id="name" name="name" type="text" placeholder="Alex Johnson" required value={form.name} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">Email Address *</label>
                      <input id="email" name="email" type="email" placeholder="alex@company.com" required value={form.email} onChange={handleChange} />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="company">Company</label>
                    <input id="company" name="company" type="text" placeholder="Your company name" value={form.company} onChange={handleChange} />
                  </div>

                  <div className="form-group">
                    <label htmlFor="service">Service of Interest</label>
                    <select id="service" name="service" value={form.service} onChange={handleChange}
                      style={{ background: 'rgba(255,255,255,0.04)', color: form.service ? 'var(--text-bright)' : 'var(--text-muted)' }}>
                      <option value="">Select a service...</option>
                      <option value="custom">Custom Software Development</option>
                      <option value="ai">AI & Machine Learning</option>
                      <option value="cloud">Cloud Architecture</option>
                      <option value="security">Cybersecurity</option>
                      <option value="mobile">Mobile & Web Apps</option>
                      <option value="api">API & Integrations</option>
                      <option value="other">Other / Not Sure Yet</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="message">Tell Us About Your Project *</label>
                    <textarea
                      id="message" name="message" rows="5"
                      placeholder="Describe your project, goals, and any timeline or budget constraints..."
                      required value={form.message} onChange={handleChange}
                    />
                  </div>

                  <button type="submit" className="form-submit" id="contact-submit">
                    Send Message
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z" />
                    </svg>
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
