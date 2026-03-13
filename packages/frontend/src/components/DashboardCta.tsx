import { Box, Button, CircularProgress } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useCurrentUser } from "../hooks/api/useCurrentUser";
import { AuthButton } from "./AuthButton";
import { UserAvatar } from "./UserAvatar";

export const DashboardCta = () => {
  const { user, isPending } = useCurrentUser();

  if (isPending) {
    return (
      <Box display="flex" justifyContent="center" py={6}>
        <CircularProgress sx={{ color: "rgba(255,255,255,0.7)" }} />
      </Box>
    );
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      py={6}
      px={3}
    >
      {user && (
        <Box mb={4}>
          <UserAvatar user={user} />
        </Box>
      )}

      <Box display="flex" gap={2} flexWrap="wrap" justifyContent="center">
        <AuthButton />

        <Button
          variant="outlined"
          endIcon={<KeyboardArrowDownIcon />}
          onClick={() =>
            document
              .getElementById("talks")
              ?.scrollIntoView({ behavior: "smooth" })
          }
          sx={{
            borderColor: "rgba(255,255,255,0.35)",
            color: "rgba(255,255,255,0.85)",
            "&:hover": {
              borderColor: "rgba(255,255,255,0.7)",
              bgcolor: "rgba(255,255,255,0.06)",
            },
          }}
        >
          View Talks
        </Button>
      </Box>
    </Box>
  );
};
