/**
 * mailer.js — Hemmingway Technologies Contact Form Backend
 * ─────────────────────────────────────────────────────────
 * Stack : Express + Nodemailer (Gmail / OAuth2-ready)
 * Route : POST /api/send
 *
 * Usage:
 *   1.  cd backend
 *   2.  cp .env.example .env          ← fill in GMAIL_USER + GMAIL_APP_PASSWORD
 *   3.  npm install
 *   4.  npm run dev   (nodemon)  OR  npm start  (node)
 */

'use strict';

require('dotenv').config();
const express    = require('express');
const nodemailer = require('nodemailer');
const cors       = require('cors');

// ── Config ────────────────────────────────────────────────────────────────────
const PORT           = process.env.PORT           || 5000;
const GMAIL_USER     = process.env.GMAIL_USER;
const GMAIL_PASS     = process.env.GMAIL_APP_PASSWORD;
const RECIPIENT      = process.env.RECIPIENT_EMAIL || GMAIL_USER;
const CORS_ORIGIN    = process.env.CORS_ORIGIN    || 'http://localhost:5173';

// Fail fast if credentials are missing
if (!GMAIL_USER || !GMAIL_PASS) {
  console.error(
    '\n❌  Missing credentials!\n' +
    '    Please copy .env.example → .env and fill in GMAIL_USER + GMAIL_APP_PASSWORD.\n'
  );
  process.exit(1);
}

// ── App setup ─────────────────────────────────────────────────────────────────
const app = express();

app.use(
  cors({
    origin: [CORS_ORIGIN, 'http://localhost:5173', 'http://localhost:4173'],
    methods: ['POST', 'OPTIONS'],
  })
);

app.use(express.json({ limit: '50kb' }));

// ── Nodemailer transporter ────────────────────────────────────────────────────
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: GMAIL_USER,
    pass: GMAIL_PASS,   // 16-char Gmail App Password (NOT your real password)
  },
});

// Verify SMTP connection on startup
transporter.verify((err) => {
  if (err) {
    console.error('❌  SMTP connection failed:', err.message);
    console.error('    Check your GMAIL_USER and GMAIL_APP_PASSWORD in .env');
  } else {
    console.log('✅  SMTP connection verified — ready to send mail');
  }
});

// ── Helper: sanitise user input (strip HTML tags) ────────────────────────────
const sanitise = (str = '') => String(str).replace(/<[^>]*>/g, '').trim().slice(0, 2000);

// ── Field labels for display ──────────────────────────────────────────────────
const SERVICE_LABELS = {
  custom:   'Custom Software Development',
  ai:       'AI & Machine Learning',
  cloud:    'Cloud Architecture',
  security: 'Cybersecurity',
  mobile:   'Mobile & Web Apps',
  api:      'API & Integrations',
  other:    'Other / Not Sure Yet',
};

// ── POST /api/send ────────────────────────────────────────────────────────────
app.post('/api/send', async (req, res) => {
  try {
    const { name, email, company, service, message } = req.body ?? {};

    // ── Server-side validation ──────────────────────────────────────────────
    const errors = {};
    if (!name?.trim())    errors.name    = 'Full name is required.';
    if (!email?.trim())   errors.email   = 'Email address is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
                          errors.email   = 'Invalid email address.';
    if (!message?.trim()) errors.message = 'Project description is required.';

    if (Object.keys(errors).length > 0) {
      return res.status(422).json({ success: false, errors });
    }

    // ── Sanitise ────────────────────────────────────────────────────────────
    const safeName    = sanitise(name);
    const safeEmail   = sanitise(email);
    const safeCompany = sanitise(company) || 'N/A';
    const safeService = SERVICE_LABELS[sanitise(service)] || sanitise(service) || 'N/A';
    const safeMessage = sanitise(message);

    // ── HTML email body sent to the business ────────────────────────────────
    const htmlToAdmin = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <style>
    body { font-family: 'Segoe UI', Arial, sans-serif; background: #04040a; color: #e0e0f0; margin: 0; padding: 0; }
    .wrapper { max-width: 620px; margin: 40px auto; background: #0c0c1a; border: 1px solid rgba(99,103,241,0.25); border-radius: 16px; overflow: hidden; }
    .header { background: linear-gradient(135deg, #6367f1, #a78bfa); padding: 32px 40px; }
    .header h1 { margin: 0; font-size: 22px; color: #fff; }
    .header p  { margin: 6px 0 0; font-size: 13px; color: rgba(255,255,255,0.75); }
    .body   { padding: 36px 40px; }
    .field  { margin-bottom: 24px; }
    .label  { font-size: 11px; font-weight: 700; letter-spacing: 1.2px; text-transform: uppercase; color: #6367f1; margin-bottom: 6px; }
    .value  { font-size: 15px; color: #e0e0f0; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-radius: 10px; padding: 12px 16px; line-height: 1.6; white-space: pre-wrap; word-break: break-word; }
    .footer { padding: 20px 40px; border-top: 1px solid rgba(255,255,255,0.06); font-size: 12px; color: #5a5a78; }
    a { color: #6367f1; }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="header">
      <h1>📩 New Contact Form Submission</h1>
      <p>Received from hemmingway-technologies.com</p>
    </div>
    <div class="body">
      <div class="field">
        <div class="label">Full Name</div>
        <div class="value">${safeName}</div>
      </div>
      <div class="field">
        <div class="label">Email Address</div>
        <div class="value"><a href="mailto:${safeEmail}">${safeEmail}</a></div>
      </div>
      <div class="field">
        <div class="label">Company</div>
        <div class="value">${safeCompany}</div>
      </div>
      <div class="field">
        <div class="label">Service of Interest</div>
        <div class="value">${safeService}</div>
      </div>
      <div class="field">
        <div class="label">Project Description</div>
        <div class="value">${safeMessage}</div>
      </div>
    </div>
    <div class="footer">
      Sent automatically by the Hemmingway Technologies contact form •
      <a href="mailto:${safeEmail}">Reply to ${safeName}</a>
    </div>
  </div>
</body>
</html>`.trim();

    // ── Plain-text auto-reply sent to the sender ─────────────────────────────
    const htmlAutoReply = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <style>
    body { font-family: 'Segoe UI', Arial, sans-serif; background: #04040a; color: #e0e0f0; margin: 0; padding: 0; }
    .wrapper { max-width: 580px; margin: 40px auto; background: #0c0c1a; border: 1px solid rgba(99,103,241,0.25); border-radius: 16px; overflow: hidden; }
    .header { background: linear-gradient(135deg, #6367f1, #a78bfa); padding: 32px 40px; text-align: center; }
    .header h1 { margin: 0; font-size: 24px; color: #fff; }
    .body   { padding: 36px 40px; line-height: 1.8; font-size: 15px; color: #c0c0d8; }
    .body strong { color: #fff; }
    .highlight { background: rgba(99,103,241,0.1); border: 1px solid rgba(99,103,241,0.25); border-radius: 10px; padding: 16px 20px; margin: 24px 0; font-size: 14px; }
    .footer { padding: 20px 40px; border-top: 1px solid rgba(255,255,255,0.06); font-size: 12px; color: #5a5a78; text-align: center; }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="header">
      <h1>✅ We've got your message!</h1>
    </div>
    <div class="body">
      <p>Hi <strong>${safeName}</strong>,</p>
      <p>Thank you for reaching out to <strong>Hemmingway Technologies</strong>. We've received your enquiry and one of our team members will be in touch within <strong>one business day</strong>.</p>
      <div class="highlight">
        <strong>Your enquiry summary:</strong><br/>
        Service: ${safeService}<br/>
        Submitted: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST
      </div>
      <p>In the meantime, feel free to explore our work or follow us on LinkedIn.</p>
      <p>— The Hemmingway Technologies Team</p>
    </div>
    <div class="footer">Hemmingway Technologies · RZ F1/380, Mahavir Enclave, New Delhi</div>
  </div>
</body>
</html>`.trim();

    // ── Send both emails concurrently ───────────────────────────────────────
    await Promise.all([
      // 1️⃣  Notification to the business inbox
      transporter.sendMail({
        from:     `"Hemmingway Technologies Website" <${GMAIL_USER}>`,
        to:       RECIPIENT,
        replyTo:  safeEmail,
        subject:  `📩 New Enquiry from ${safeName}${safeCompany !== 'N/A' ? ` · ${safeCompany}` : ''}`,
        html:     htmlToAdmin,
        text:
          `New contact form submission\n\n` +
          `Name:    ${safeName}\n` +
          `Email:   ${safeEmail}\n` +
          `Company: ${safeCompany}\n` +
          `Service: ${safeService}\n\n` +
          `Message:\n${safeMessage}`,
      }),

      // 2️⃣  Auto-reply confirmation to the sender
      transporter.sendMail({
        from:    `"Hemmingway Technologies" <${GMAIL_USER}>`,
        to:      safeEmail,
        subject: `We've received your message, ${safeName.split(' ')[0]}! 👋`,
        html:    htmlAutoReply,
        text:
          `Hi ${safeName},\n\n` +
          `Thank you for contacting Hemmingway Technologies.\n` +
          `We'll get back to you within one business day.\n\n` +
          `— The Hemmingway Technologies Team`,
      }),
    ]);

    console.log(`✉️  Mail sent → ${RECIPIENT} | reply-to: ${safeEmail} | ${new Date().toISOString()}`);
    return res.status(200).json({ success: true, message: 'Email sent successfully.' });

  } catch (err) {
    console.error('❌  Failed to send email:', err);
    return res.status(500).json({
      success: false,
      message: 'Failed to send email. Please try again later.',
    });
  }
});

// ── Health check ──────────────────────────────────────────────────────────────
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// ── 404 catch-all ─────────────────────────────────────────────────────────────
app.use((_req, res) => res.status(404).json({ error: 'Not found' }));

// ── Start ─────────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n🚀  Mailer backend running at http://localhost:${PORT}`);
  console.log(`    POST http://localhost:${PORT}/api/send`);
  console.log(`    GET  http://localhost:${PORT}/api/health\n`);
});
