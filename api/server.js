// ============================================================
// Portfolio Backend — Node.js / Express
// Run: npm install && node server.js
// Set env vars: EMAIL_USER, EMAIL_PASS (Gmail App Password)
// ============================================================
const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const { body, validationResult } = require('express-validator');
const nodemailer = require('nodemailer');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

// ── Middleware ──────────────────────────────────────────────
app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// Serve Li-Fi media assets at /media/lifi/
app.use('/media/lifi', express.static(path.join(__dirname, '../Li-Fi')));

// Rate limiter: max 5 contact form submissions per 15 min per IP
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { error: 'Too many requests. Please try again later.' }
});

// ── Email transporter (Gmail) ───────────────────────────────
// Replace with your Gmail + App Password, or use any SMTP service
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'dixitjain9455@gmail.com',
    pass: process.env.EMAIL_PASS || 'YOUR_APP_PASSWORD_HERE'
  }
});

// ── Routes ──────────────────────────────────────────────────

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Dikshit Portfolio API running 🚀' });
});

// Contact form endpoint
app.post(
  '/api/contact',
  contactLimiter,
  [
    body('name').trim().isLength({ min: 2, max: 80 }).escape()
      .withMessage('Name must be 2–80 characters.'),
    body('email').isEmail().normalizeEmail()
      .withMessage('Please enter a valid email.'),
    body('company').optional().trim().isLength({ max: 100 }).escape(),
    body('message').trim().isLength({ min: 10, max: 2000 }).escape()
      .withMessage('Message must be 10–2000 characters.')
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const { name, email, company, message } = req.body;
    const timestamp = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

    const mailOptions = {
      from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
      to: 'dixitjain9455@gmail.com',
      replyTo: email,
      subject: `🔔 New Portfolio Message from ${name}`,
      html: `
        <div style="font-family:monospace;background:#0a0e17;color:#e8edf5;padding:32px;border-radius:12px;max-width:600px">
          <h2 style="color:#00d4ff;border-bottom:1px solid rgba(0,212,255,0.2);padding-bottom:12px">
            New Message — Dikshit Maloo Portfolio
          </h2>
          <table style="width:100%;border-collapse:collapse;margin-top:16px">
            <tr><td style="color:#6b7a99;padding:8px 0;width:100px">From</td><td style="color:#fff">${name}</td></tr>
            <tr><td style="color:#6b7a99;padding:8px 0">Email</td><td style="color:#00d4ff"><a href="mailto:${email}" style="color:#00d4ff">${email}</a></td></tr>
            ${company ? `<tr><td style="color:#6b7a99;padding:8px 0">Company</td><td style="color:#fff">${company}</td></tr>` : ''}
            <tr><td style="color:#6b7a99;padding:8px 0">Time</td><td style="color:#fff">${timestamp} IST</td></tr>
          </table>
          <div style="margin-top:24px;background:rgba(0,212,255,0.05);border:1px solid rgba(0,212,255,0.15);border-radius:8px;padding:16px">
            <p style="color:#6b7a99;font-size:12px;margin:0 0 8px">MESSAGE</p>
            <p style="color:#e8edf5;line-height:1.7;margin:0">${message.replace(/\n/g, '<br>')}</p>
          </div>
          <p style="color:#6b7a99;font-size:11px;margin-top:24px">Sent via Portfolio Contact Form · dikshitmaloo.dev</p>
        </div>
      `
    };

    try {
      // In development without real creds, log instead
      if (process.env.EMAIL_PASS) {
        await transporter.sendMail(mailOptions);
      } else {
        console.log('\n📬 Contact Form Submission:');
        console.log({ name, email, company, message, timestamp });
      }
      res.json({ success: true, message: 'Message sent successfully!' });
    } catch (err) {
      console.error('Email error:', err.message);
      res.status(500).json({ error: 'Failed to send message. Please try emailing directly.' });
    }
  }
);

// Resume download tracking (optional analytics)
app.post('/api/track/resume-download', (req, res) => {
  console.log(`📄 Resume downloaded at ${new Date().toISOString()}`);
  res.json({ success: true });
});

// Serve frontend for any other route
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.listen(PORT, () => {
  console.log(`\n⚡ Dikshit's Portfolio API running on http://localhost:${PORT}`);
  console.log(`📬 Contact endpoint: POST http://localhost:${PORT}/api/contact\n`);
});
