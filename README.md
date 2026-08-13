# UrbanCare — MERN home services booking site

home-services booking site (Home Cleaning, Salon at Home, AC
Repair & Service, Plumbing, Electrician) inspired by Urban Company.

- **Client:** React (Vite) + Tailwind CSS v4 + React Router + Firebase Auth
- **Server:** Node + Express + MongoDB (Mongoose) + Firebase Admin (verifies login tokens)

```
urbancare/
  client/   → React frontend
  server/   → Express API + MongoDB models
```




## 3. Configure and run the server

```bash
cd server
cp .env.example .env
# edit .env: paste MONGODB_URI and the three FIREBASE_* values
npm install
npm run seed   # inserts the 5 services into MongoDB (run once)
npm run dev    # starts the API on http://localhost:5000
```

## 4. Configure and run the client

```bash
cd client
cp .env.example .env
# edit .env: paste the firebaseConfig values from step 1
npm install
npm run dev    # starts the site on http://localhost:5173
```

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


qureshiraeesali9292_db_user      7GGwpJ2IBq9u7YkL

mongodb+srv://qureshiraeesali9292_db_user:7GGwpJ2IBq9u7YkL@cluster0.use3sao.mongodb.net/?appName=Cluster0