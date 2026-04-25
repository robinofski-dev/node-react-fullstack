import { Box } from "@mui/material";
import { DashboardHeader } from "../components/DashboardHeader";
import { DashboardCta } from "../components/DashboardCta";
import { TalksTimeline } from "../components/TalksTimeline";

const DashboardPage = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      flexDirection="column"
      alignItems="center"
      minHeight="100vh"
      sx={{
        background:
          "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
        "&::before": {
          content: '""',
          position: "fixed",
          inset: 0,
          background:
            "radial-gradient(ellipse at 70% 50%, rgba(99,179,237,0.15) 0%, transparent 70%)",
          pointerEvents: "none",
        },
      }}
    >
      <DashboardHeader />
      <DashboardCta />
      <TalksTimeline />
    </Box>
  );
};

export default DashboardPage;
