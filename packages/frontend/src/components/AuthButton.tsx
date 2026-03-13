import { Button } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import { useCurrentUser, useLogout } from "../hooks/api/useCurrentUser";

export const AuthButton = () => {
  const { user } = useCurrentUser();
  const logout = useLogout();

  if (user) {
    return (
      <Button
        variant="outlined"
        color="error"
        onClick={logout}
        sx={{
          borderColor: "rgba(255,100,100,0.6)",
          color: "rgba(255,120,120,0.9)",
        }}
      >
        Sign out
      </Button>
    );
  }

  return (
    <Button
      variant="contained"
      component="a"
      href="/auth/github"
      startIcon={<GitHubIcon />}
      sx={{
        bgcolor: "#fff",
        color: "#1a1a2e",
        fontWeight: 700,
        "&:hover": { bgcolor: "rgba(255,255,255,0.85)" },
      }}
    >
      Login with GitHub
    </Button>
  );
};
