import { useEffect, useState } from "react";

/**
 * Detects whether the page was redirected back from a failed GitHub OAuth flow.
 *
 * After a failed GitHub login, the backend redirects to the frontend with
 * `?error=auth_failed` in the query string. This hook reads that parameter
 * on mount and exposes it as a boolean state.
 *
 * @returns `authError` — `true` if the URL contains `?error=auth_failed`, otherwise `false`.
 */
export const useGithubAuthStatus = () => {
  const [authError, setAuthError] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("error") === "auth_failed") {
      console.error("GitHub authentication failed.");
      setAuthError(true);
    }
  }, []);

  return { authError };
};
