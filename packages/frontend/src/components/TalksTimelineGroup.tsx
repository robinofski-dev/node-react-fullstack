import {
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineOppositeContent,
} from "@mui/lab";
import { Box, Typography } from "@mui/material";
import type { Talk } from "@node-react-fullstack/shared";
import { Speakers } from "../lib/data";
import { TalkCard } from "./TalkCard";

type Props = {
  group: Talk[];
  isLast: boolean;
};

const formatTime = (iso: string) =>
  new Date(iso).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

export const TalksTimelineGroup = ({ group, isLast }: Props) => {
  const startTime = formatTime(group[0].startDate);
  const endTime = formatTime(group[0].endDate);

  return (
    <TimelineItem>
      <TimelineOppositeContent
        sx={{ flex: 0.22, pt: "14px", pr: 2 }}
        variant="body2"
      >
        <Typography
          variant="body2"
          fontWeight={600}
          sx={{ color: "rgba(255,255,255,0.9)", whiteSpace: "nowrap" }}
        >
          {startTime}
        </Typography>
        <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.45)" }}>
          - {endTime}
        </Typography>
      </TimelineOppositeContent>
      <TimelineSeparator>
        <TimelineDot
          sx={{ bgcolor: "#63b3ed", boxShadow: "0 0 8px rgba(99,179,237,0.6)" }}
        />
        {!isLast && (
          <TimelineConnector sx={{ bgcolor: "rgba(255,255,255,0.15)" }} />
        )}
      </TimelineSeparator>
      <TimelineContent sx={{ pb: 3, pt: "10px" }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
          {group.map((talk) => {
            const speaker = Speakers.find((s) =>
              talk.speakerIds.includes(s.id),
            );
            return <TalkCard key={talk.id} talk={talk} speaker={speaker} />;
          })}
        </Box>
      </TimelineContent>
    </TimelineItem>
  );
};
