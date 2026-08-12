# UrbanCare — MERN home services booking site

A 5-service home-services booking site (Home Cleaning, Salon at Home, AC
Repair & Service, Plumbing, Electrician) inspired by Urban Company.

- **Client:** React (Vite) + Tailwind CSS v4 + React Router + Firebase Auth
- **Server:** Node + Express + MongoDB (Mongoose) + Firebase Admin (verifies login tokens)

```
urbancare/
  client/   → React frontend
  server/   → Express API + MongoDB models
```

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
