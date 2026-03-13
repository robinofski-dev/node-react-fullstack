import { Box, Typography } from "@mui/material";

export const DashboardHeader = () => {
  return (
    <Box
      component="header"
      sx={{
        color: "#fff",
        py: { xs: 4, md: 6 },
        textAlign: "center",
        width: "100%",
      }}
    >
      <Typography
        variant="h3"
        component="h1"
        fontWeight={700}
        letterSpacing={1}
        sx={{ position: "relative" }}
      >
        Willkommen!
      </Typography>
      <Typography
        variant="subtitle1"
        sx={{
          mt: 1,
          color: "rgba(255,255,255,0.65)",
          letterSpacing: 3,
          textTransform: "uppercase",
          fontSize: "0.8rem",
          position: "relative",
        }}
      >
        Berlin Banker Summit 2026
      </Typography>
    </Box>
  );
};
