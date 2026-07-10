# Hemmingway Technologies — Mailer Backend

A lightweight **Express + Resend** server that handles contact form submissions from the frontend and delivers:

1. **A styled HTML notification email** → your business inbox
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
| `RESEND_API_KEY` | API key from [resend.com/api-keys](https://resend.com/api-keys) |
| `FROM_EMAIL` | Sending address — must be on a domain verified in Resend, or `onboarding@resend.dev` for testing |
| `RECIPIENT_EMAIL` | Where form submissions are delivered |
| `PORT` | Server port (default `5000`) |
| `CORS_ORIGIN` | Frontend URL — `http://localhost:5173` for dev, your production domain for prod |

### 3. Getting a Resend API key + verified domain

1. Sign up at [resend.com](https://resend.com)
2. Go to **API Keys** → create a new key → paste into `RESEND_API_KEY`
3. Go to **Domains** → add your domain (e.g. `hemmingwaytech.com`) → add the DNS records Resend gives you (SPF/DKIM) at your registrar
4. Once verified, set `FROM_EMAIL` to an address on that domain (e.g. `hello@hemmingwaytech.com`)

Until your domain is verified, you can test with `FROM_EMAIL=onboarding@resend.dev` — but Resend restricts that address to only send to the email you signed up with.

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
✅  Resend client ready — sending from onboarding@resend.dev
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
├── mailer.js        ← Express server + Resend logic
├── package.json
├── .env.example     ← Copy to .env and fill in credentials
├── .gitignore       ← Keeps .env and node_modules out of git
└── README.md
```
