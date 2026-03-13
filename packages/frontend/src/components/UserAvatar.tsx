import { Avatar, Box, Typography } from "@mui/material";
import type { User } from "@node-react-fullstack/shared";

interface UserAvatarProps {
  user: User;
}

export const UserAvatar = ({ user }: UserAvatarProps) => (
  <Box display="flex" flexDirection="column" alignItems="center">
    <Avatar
      src={user.avatarUrl}
      alt={user.login}
      sx={{
        width: 96,
        height: 96,
        mb: 1.5,
        border: "3px solid rgba(255,255,255,0.3)",
        boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
      }}
    />
    <Typography variant="h6" fontWeight={600} color="#fff">
      {user.displayName || user.login}
    </Typography>
    <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.55)" }}>
      @{user.login}
    </Typography>
  </Box>
);
