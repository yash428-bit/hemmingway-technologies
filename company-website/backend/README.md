# Hemmingway Technologies — Mailer Backend

A lightweight **Express + Nodemailer** server that handles contact form submissions from the frontend and delivers:

1. **A styled HTML notification email** → your business inbox (`manishmandia1576@gmail.com`)
2. **An auto-reply confirmation** → the sender's email address

---

## Quick Start

### 1. Install dependencies
```bash
cd backend
npm install
```

### 2. Configure environment
```bash
cp .env.example .env
```

Open `.env` and fill in:

| Variable | Description |
|---|---|
| `GMAIL_USER` | Your Gmail address e.g. `manishmandia1576@gmail.com` |
| `GMAIL_APP_PASSWORD` | 16-character Gmail App Password (**not** your real password) |
| `RECIPIENT_EMAIL` | Where form submissions are delivered (defaults to `GMAIL_USER`) |
| `PORT` | Server port (default `5000`) |
| `CORS_ORIGIN` | Frontend URL — `http://localhost:5173` for dev, your production domain for prod |

### 3. Getting a Gmail App Password
> You must have **2-Step Verification** enabled on your Google Account.

1. Go to → [https://myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
2. Select **"Mail"** and your device → click **Generate**
3. Copy the **16-character code** (no spaces) into `GMAIL_APP_PASSWORD` in your `.env`

### 4. Start the server

**Development** (with auto-restart on file changes):
```bash
npm run dev
```

**Production:**
```bash
npm start
```

The server will log:
```
✅  SMTP connection verified — ready to send mail
🚀  Mailer backend running at http://localhost:5000
    POST http://localhost:5000/api/send
    GET  http://localhost:5000/api/health
```

---

## API

### `POST /api/send`

Accepts JSON body:

```json
{
  "name":    "Alex Johnson",
  "email":   "alex@company.com",
  "company": "Acme Corp",
  "service": "ai",
  "message": "We need an ML pipeline..."
}
```

**Responses:**

| Status | Body |
|---|---|
| `200` | `{ "success": true, "message": "Email sent successfully." }` |
| `422` | `{ "success": false, "errors": { "name": "...", ... } }` |
| `500` | `{ "success": false, "message": "Failed to send email..." }` |

### `GET /api/health`
Returns `{ "status": "ok", "timestamp": "..." }` — useful for uptime monitoring.

---

## Deployment

You can deploy this backend independently on:

- **Railway** → `railway up`
- **Render** → connect your repo, set `backend/` as root dir
- **Fly.io** → `fly launch` in the `backend/` folder
- **VPS** → `npm start` behind nginx / PM2

After deploying, set the `VITE_API_URL` environment variable in the **frontend** to your backend's public URL so `Contact.jsx` sends requests to the right place.

---

## File Structure

```
backend/
├── mailer.js        ← Express server + Nodemailer logic
├── package.json
├── .env.example     ← Copy to .env and fill in credentials
├── .gitignore       ← Keeps .env and node_modules out of git
└── README.md
```
