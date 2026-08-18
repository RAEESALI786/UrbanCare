# UrbanCare — MERN home services booking site

A home-services booking platform (Home Cleaning, Salon at Home, AC Repair &
Service, Plumbing, Electrician, Home Painting, plus promo products) inspired
by Urban Company — with a customer site, a separate professional portal, and
a shared backend.

- **client:** React (Vite) + Tailwind CSS v4 + React Router + Firebase Auth — the customer-facing site
- **pro-client:** React (Vite) + Tailwind CSS v4 + React Router + Firebase Auth — the professional portal (registration, city/category-filtered orders)
- **server:** Node + Express + MongoDB (Mongoose) + Firebase Admin + Gemini API — shared backend for both frontends

```
urbancare/
  client/      → customer-facing React frontend
  pro-client/  → professional portal React frontend
  server/      → Express API + MongoDB models (shared by both)
```

## How the professional portal works

Professionals register on **pro-client** with a phone number, city, and one
service category (e.g. "Plumbing"). When a customer books a service on the
main site, the backend saves the **city** they were browsing in. The pro
portal's dashboard only shows orders where `booking.city === professional.city`
AND `booking.serviceSlug === professional.category` — so a plumber in Pune
never sees an electrician job in Mumbai. Accepting an order assigns it to
that professional so no one else can take it.

## 1. Create a Firebase project (for login)

1. Go to https://console.firebase.google.com → **Add project**.
2. In the project, go to **Build → Authentication → Get started**, and enable
   the **Email/Password** and **Google** sign-in providers.
3. Go to **Project settings → General → Your apps → Add app → Web**, register
   the app, and copy the `firebaseConfig` values. These go into
   `client/.env` (see below).
4. Go to **Project settings → Service accounts → Generate new private key**.
   This downloads a JSON file — you'll use three values from it
   (`project_id`, `client_email`, `private_key`) in `server/.env`.

## 2. Set up MongoDB

Use a local MongoDB (`mongod` running on `27017`) or a free
[MongoDB Atlas](https://www.mongodb.com/atlas) cluster. Either way you need a
connection string for `server/.env`.

## 3. Configure and run the server

```bash
cd server
cp .env.example .env
# edit .env: paste MONGODB_URI and the three FIREBASE_* values
npm install
npm run seed   # inserts the 5 services into MongoDB (run once)
npm run dev    # starts the API on http://localhost:5000
```

The private key from the Firebase JSON file contains literal `\n` sequences —
paste it into `.env` exactly as it appears in the JSON (in quotes), the app
converts those back into real newlines automatically.

## 4. Configure and run the client

```bash
cd client
cp .env.example .env
# edit .env: paste the firebaseConfig values from step 1
npm install
npm run dev    # starts the site on http://localhost:5173
```

Open http://localhost:5173 — you should see the site, be able to sign up /
log in, and book one of the 5 services (bookings are saved to MongoDB and
show up under "My bookings").

## 5. Configure and run the professional portal

```bash
cd pro-client
cp .env.example .env
# edit .env: same Firebase config as client/.env, and VITE_API_URL pointing
# at the same backend
npm install
npm run dev    # starts the pro portal, usually on http://localhost:5174
```

In `server/.env`, also set `PRO_CLIENT_URL=http://localhost:5174` (or
whatever port Vite gives pro-client) so the backend's CORS allows requests
from it — restart the backend after adding this.

Open the pro portal, register as a professional (pick a city and category),
then in a separate browser/incognito window book that same service in the
customer app while set to the same city — the order should appear on the
professional's dashboard.

## 6. Set up the chat assistant (optional)

The chat bubble in the bottom-right corner is powered by Google's Gemini
API (free tier, no card required):

1. Go to https://aistudio.google.com and click **Get API key**.
2. Add it to `server/.env` as `GEMINI_API_KEY=...`.
3. Restart the backend (`npm run dev` in `server/`).

The assistant can answer questions about services, quote a painting job,
and create real bookings for logged-in users — it has tools for all three,
defined in `server/services/assistantTools.js`.

## Notes

- Prices, durations and copy are placeholder/demo content — edit
  `client/src/lib/services.js` and `server/seed.js` (keep both in sync) to
  change them.
- Booking price is currently just informational text sent by the client;
  there's no real payment integration.
- If `client/.env` is missing Firebase keys, the login/signup pages show a
  friendly "Firebase isn't configured yet" message instead of crashing.
- For production you'd deploy `server/` (e.g. Render, Railway) and `client/`
  (e.g. Vercel, Netlify), point `VITE_API_URL` at the deployed API, and add
  the deployed client's URL to `CLIENT_URL` in the server's environment and
  to Firebase's **Authorized domains** list.
