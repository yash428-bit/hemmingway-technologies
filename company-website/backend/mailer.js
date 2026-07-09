/**
 * mailer.js — Hemmingway Technologies Contact Form Backend
 * ─────────────────────────────────────────────────────────
 * Stack : Express + Resend (https://resend.com)
 * Route : POST /api/send
 *
 * Usage:
 *   1.  cd backend
 *   2.  cp .env.example .env          ← fill in RESEND_API_KEY + FROM_EMAIL + RECIPIENT_EMAIL
 *   3.  npm install
 *   4.  npm run dev   (nodemon)  OR  npm start  (node)
 */

'use strict';

require('dotenv').config();
const express  = require('express');
const cors     = require('cors');
const { Resend } = require('resend');

// ── Config ────────────────────────────────────────────────────────────────────
const PORT           = process.env.PORT           || 5000;
const RESEND_API_KEY = process.env.RESEND_API_KEY;
const FROM_EMAIL     = process.env.FROM_EMAIL     || 'onboarding@resend.dev';
const RECIPIENT      = process.env.RECIPIENT_EMAIL;
const CORS_ORIGIN    = process.env.CORS_ORIGIN    || 'http://localhost:5173';

// Set MAIL_ENABLED=false in .env to hard-disable sending (spam protection).
const mailEnabled = process.env.MAIL_ENABLED !== 'false';

// Fail fast if credentials are missing or still placeholder
if (!RESEND_API_KEY || RESEND_API_KEY.startsWith('re_xxxx')) {
  console.error(
    '\n❌  Invalid or missing RESEND_API_KEY!\n' +
    '    Open backend/.env and replace the placeholder with your real Resend API key.\n' +
    '    Get one at: https://resend.com/api-keys\n'
  );
  process.exit(1);
}

if (!RECIPIENT) {
  console.error(
    '\n❌  Missing RECIPIENT_EMAIL!\n' +
    '    Please set RECIPIENT_EMAIL in your .env file.\n'
  );
  process.exit(1);
}

// ── Resend client ─────────────────────────────────────────────────────────────
const resend = new Resend(RESEND_API_KEY);

// ── App setup ─────────────────────────────────────────────────────────────────
const app = express();

app.use(
  cors({
    origin: [CORS_ORIGIN, 'http://localhost:5173', 'http://localhost:4173'],
    methods: ['POST', 'OPTIONS'],
  })
);

app.use(express.json({ limit: '50kb' }));

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
  // ── Kill-switch guard ────────────────────────────────────────────────────
  if (!mailEnabled) {
    console.warn('🛑  Mail sending is disabled. Request blocked.');
    return res.status(503).json({
      success: false,
      disabled: true,
      message: 'Mail sending is currently disabled. Please try again later.',
    });
  }

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

    // ── Auto-reply HTML sent to the sender ───────────────────────────────────
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

    // ── Send both emails concurrently via Resend ─────────────────────────────
    const [adminResult, replyResult] = await Promise.all([
      // 1️⃣  Notification to the business inbox
      resend.emails.send({
        from:     `Hemmingway Technologies Website <${FROM_EMAIL}>`,
        to:       [RECIPIENT],
        reply_to: safeEmail,
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
      resend.emails.send({
        from:    `Hemmingway Technologies <${FROM_EMAIL}>`,
        to:      [safeEmail],
        subject: `We've received your message, ${safeName.split(' ')[0]}! 👋`,
        html:    htmlAutoReply,
        text:
          `Hi ${safeName},\n\n` +
          `Thank you for contacting Hemmingway Technologies.\n` +
          `We'll get back to you within one business day.\n\n` +
          `— The Hemmingway Technologies Team`,
      }),
    ]);

    // Check for Resend-level errors
    if (adminResult.error) {
      console.error('❌  Resend admin email error:', adminResult.error);
      throw new Error(adminResult.error.message || 'Failed to send admin notification.');
    }
    if (replyResult.error) {
      // Non-fatal — auto-reply failure shouldn't block success
      console.warn('⚠️  Resend auto-reply error:', replyResult.error);
    }

    console.log(
      `✉️  Mail sent via Resend → ${RECIPIENT} | reply-to: ${safeEmail} | ` +
      `adminId: ${adminResult.data?.id} | replyId: ${replyResult.data?.id} | ${new Date().toISOString()}`
    );

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
