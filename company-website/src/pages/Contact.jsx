import { useState } from 'react';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    organization: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [formStatus, setFormStatus] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Placeholder for form submission
    setFormStatus('Thank you! We\'ll get back to you within 24 hours.');
    
    // Clear form
    setFormData({
      name: '',
      organization: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });

    // Clear status message after 5 seconds
    setTimeout(() => {
      setFormStatus('');
    }, 5000);
  };

  return (
    <div className="contact-page">
      {/* Hero Section */}
      <section className="contact-hero">
        <div className="container">
          <h1 className="slide-up">Let's Start a Conversation</h1>
          <p className="slide-up delay-1">
            Whether you have a specific project in mind or just want to explore 
            how we can help, we're here to listen.
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="contact-section">
        <div className="container">
          <div className="contact-content">
            {/* Contact Info */}
            <div className="contact-info slide-in-left">
              <div className="info-card card">
                <h2>Get in Touch</h2>
                <p>
                  We understand that your time is valuable. Reach out to us, 
                  and we'll respond promptly to discuss your needs.
                </p>

                <div className="contact-details">
                  <div className="contact-detail">
                    <div className="detail-icon">📧</div>
                    <div className="detail-content">
                      <h4>Email</h4>
                      <a href="mailto:info@hemmingwaytech.com">info@hemmingwaytech.com</a>
                      <a href="mailto:contact@hemmingwaytech.com">contact@hemmingwaytech.com</a>
                    </div>
                  </div>

                  <div className="contact-detail">
                    <div className="detail-icon">🕐</div>
                    <div className="detail-content">
                      <h4>Response Time</h4>
                      <p>Within 24 hours on business days</p>
                    </div>
                  </div>

                  <div className="contact-detail">
                    <div className="detail-icon">🤝</div>
                    <div className="detail-content">
                      <h4>Consultation</h4>
                      <p>Free initial consultation to discuss your needs</p>
                    </div>
                  </div>
                </div>

                <div className="info-note">
                  <h3>What to Expect</h3>
                  <ul>
                    <li>Prompt, professional response to your inquiry</li>
                    <li>In-depth discussion of your requirements</li>
                    <li>Clear timeline and next steps</li>
                    <li>No-obligation consultation</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="contact-form-wrapper slide-in-right">
              <form onSubmit={handleSubmit} className="contact-form card">
                <h2>Send Us a Message</h2>
                
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">Your Name *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="John Smith"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="organization">Organization *</label>
                    <input
                      type="text"
                      id="organization"
                      name="organization"
                      value={formData.organization}
                      onChange={handleChange}
                      required
                      placeholder="Your Company"
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="email">Email Address *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="john@company.com"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="phone">Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="subject">Subject *</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    placeholder="Project Inquiry"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="6"
                    placeholder="Tell us about your project, challenges, and requirements..."
                  ></textarea>
                </div>

                <button type="submit" className="btn btn-primary submit-btn">
                  Send Message
                </button>

                {formStatus && (
                  <div className="form-status success">
                    {formStatus}
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Why Contact Section */}
      <section className="why-contact-section">
        <div className="container">
          <div className="section-title">
            <h2>Why Work With Us</h2>
            <p>What makes Hemmingway Technologies different</p>
          </div>

          <div className="why-grid">
            <div className="why-card card scale-in delay-1">
              <div className="why-icon">🎯</div>
              <h3>Clear Communication</h3>
              <p>
                No jargon, no confusion. We explain technical concepts in 
                plain language and keep you informed at every step.
              </p>
            </div>

            <div className="why-card card scale-in delay-2">
              <div className="why-icon">⚡</div>
              <h3>Fast Response</h3>
              <p>
                We understand urgency in critical operations. You'll hear 
                back from us quickly, not in days or weeks.
              </p>
            </div>

            <div className="why-card card scale-in delay-3">
              <div className="why-icon">🤝</div>
              <h3>Honest Assessment</h3>
              <p>
                We'll tell you if we're the right fit for your project. 
                If we're not, we'll point you in the right direction.
              </p>
            </div>

            <div className="why-card card scale-in delay-4">
              <div className="why-icon">💡</div>
              <h3>Expert Guidance</h3>
              <p>
                Benefit from our experience across multiple industries and 
                projects. We bring insights that save time and money.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
