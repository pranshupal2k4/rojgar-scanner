# Rojgar Scanner — RojgarScanner.in

India ka Sarkari Naukri portal — ek hi jagah sab kuch.

**Team:** Pranshu Pal | Yogendra Lal Yadav | Surjeet Singh | Sumit Kumar | Vinay Rajput | Anand  
**Guide:** Mr. Sanjay Shahi Sir | Krishna Institute Of Technology, Kanpur

---

## Local Machine Pe Run Kaise Karein

### Step 1 — Node.js install karo
https://nodejs.org se v18+ download karo.

### Step 2 — Backend start karo
```bash
cd backend
npm install
node server.js
```
Backend http://localhost:5000 pe chalega.

### Step 3 — Frontend start karo (alag terminal mein)
```bash
cd backend/frontend
npm install
npm run dev
```
Website http://localhost:5173 pe khulegi.

### Step 4 — Admin panel
http://localhost:5173/admin pe jao, jobs add/edit/delete karo.

---

## Project Structure

```
backend/
├── server.js          ← Express REST API (5 endpoints)
├── package.json
├── jobs.json          ← Database (saare jobs yahan store hote hain)
├── .gitignore
└── frontend/
    ├── src/
    │   ├── api.js              ← Central API URL config
    │   ├── App.jsx             ← Homepage + Navbar
    │   ├── Home.jsx
    │   ├── Layout.jsx
    │   ├── style.css
    │   └── pages/
    │       ├── Admin.jsx       ← Job add/edit/delete
    │       ├── JobDetail.jsx   ← Single job page
    │       ├── JobsPage.jsx    ← All jobs listing
    │       ├── ContactUs.jsx
    │       └── PrivacyPolicy.jsx
    ├── vite.config.mts         ← Dev proxy config
    └── package.json
```

---

## API Endpoints

| Method | Route              | Description           |
|--------|--------------------|-----------------------|
| GET    | /api/jobs          | Saare jobs fetch karo |
| GET    | /api/jobs/:id      | Ek job ki detail      |
| POST   | /api/jobs          | Naya job add karo     |
| PUT    | /api/jobs/:id      | Job update karo       |
| DELETE | /api/jobs/:id      | Job delete karo       |

---

## Production Hosting

### Backend — Render.com (Free)
1. render.com pe account banao
2. New → Web Service → GitHub repo connect karo
3. Root Directory: `backend`
4. Build Command: `npm install`
5. Start Command: `node server.js`
6. Deploy karo → URL milegi (e.g. https://rojgar-backend.onrender.com)

### Frontend — Vercel (Free)
1. vercel.com pe account banao
2. New Project → GitHub repo import karo
3. Root Directory: `backend/frontend`
4. Environment Variable add karo:
   - Key: `VITE_API_URL`
   - Value: `https://rojgar-backend.onrender.com`  (apna Render URL)
5. Deploy karo

---

## GitHub Pe Upload Kaise Karein

```bash
# 1. Git init
git init

# 2. Sab files add karo
git add .

# 3. Pehla commit
git commit -m "Initial commit - Rojgar Scanner Final Year Project"

# 4. GitHub pe naya repo banao: github.com/new
# 5. Remote add karo (apna username daalo)
git remote add origin https://github.com/YOUR_USERNAME/rojgar-scanner.git

# 6. Push karo
git branch -M main
git push -u origin main
```
