import 'dotenv/config';
import express from 'express';
import session from 'express-session';
import cors from 'cors';
import passport from 'passport';
import { configurePassport } from './auth';

const app = express();
const PORT = process.env.PORT ?? 3000;
const FRONTEND_URL = process.env.FRONTEND_URL ?? 'http://localhost:5173';

app.use(
  cors({
    origin: FRONTEND_URL,
    credentials: true,
  })
);

app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET ?? 'dev-secret-change-me',
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    },
  })
);

configurePassport();

app.use(passport.initialize());
app.use(passport.session());

// Auth routes
app.get('/auth/github', passport.authenticate('github', { scope: ['user:email'] }));

app.get(
  '/auth/github/callback',
  passport.authenticate('github', { failureRedirect: `${FRONTEND_URL}?error=auth_failed` }),
  (_req, res) => {
    res.redirect(FRONTEND_URL);
  }
);

app.delete('/auth/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      res.status(500).json({ error: 'Logout failed' });
      return;
    }
    res.json({ success: true });
  });
});

// API routes
app.get('/api/me', (req, res) => {
  if (!req.isAuthenticated()) {
    res.status(401).json({ error: 'Not authenticated' });
    return;
  }
  res.json(req.user);
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
