import { Box, Typography } from "@mui/material";
import type { Talk, Speaker } from "@node-react-fullstack/shared";

type Props = {
  talk: Talk;
  speaker?: Speaker;
};

export const TalkCard = ({ talk, speaker }: Props) => {
  return (
    <Box
      sx={{
        p: 2,
        borderRadius: 2,
        bgcolor: "rgba(255,255,255,0.06)",
        border: "1px solid rgba(255,255,255,0.1)",
        backdropFilter: "blur(8px)",
      }}
    >
      <Typography variant="subtitle1" fontWeight={700} sx={{ color: "#fff" }}>
        {talk.title}
      </Typography>
      <Typography
        variant="body2"
        sx={{ color: "rgba(255,255,255,0.55)", mt: 0.5 }}
      >
        {talk.room.name}
        {speaker ? ` · ${speaker.name}` : " · Unknown Speaker"}
      </Typography>
      <Typography
        variant="body2"
        sx={{ color: "rgba(255,255,255,0.75)", mt: 1 }}
      >
        {talk.description}
      </Typography>
    </Box>
  );
};
