import passport from "passport";
import { Strategy as GitHubStrategy, Profile } from "passport-github2";
import type { VerifyFunction } from "passport-oauth2";
import type { User } from "@node-react-fullstack/shared";

export function configurePassport(): void {
  const clientID = process.env.GITHUB_CLIENT_ID;
  const clientSecret = process.env.GITHUB_CLIENT_SECRET;
  const backendPublicUrl =
    process.env.BACKEND_PUBLIC_URL ??
    `http://localhost:${process.env.PORT ?? 3000}`;

  if (!clientID || !clientSecret) {
    console.warn(
      "Warning: GITHUB_CLIENT_ID or GITHUB_CLIENT_SECRET is not set. " +
        "Copy packages/backend/.env.example to packages/backend/.env and fill in your GitHub OAuth app credentials.",
    );
  }

  passport.use(
    new GitHubStrategy(
      {
        clientID: clientID ?? "placeholder",
        clientSecret: clientSecret ?? "placeholder",
        callbackURL: `${backendPublicUrl}/auth/github/callback`,
      },
      (
        _accessToken: string,
        _refreshToken: string,
        profile: Profile,
        done: Parameters<VerifyFunction>[2],
      ) => {
        const user: User = {
          id: String(profile.id),
          login: profile.username ?? profile.displayName ?? "",
          displayName: profile.displayName ?? profile.username ?? "",
          avatarUrl: (profile.photos?.[0]?.value as string | undefined) ?? "",
        };
        return done(null, user);
      },
    ),
  );

  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((user: Express.User, done) => {
    done(null, user);
  });
}
