import { Timeline } from "@mui/lab";
import { Box } from "@mui/material";
import { Talks, groupTalksByStartTime } from "../lib/data";
import { TalksTimelineGroup } from "./TalksTimelineGroup";

const groupedTalks = groupTalksByStartTime(Talks);

export const TalksTimeline = () => {
  return (
    <Box id="talks" sx={{ width: "100%", maxWidth: 800, px: 2, pb: 6 }}>
      <Timeline position="right" sx={{ px: 0 }}>
        {groupedTalks.map((group, index) => (
          <TalksTimelineGroup
            key={group[0].id} // Will be unique due to grouping of talks
            group={group}
            isLast={index === groupedTalks.length - 1}
          />
        ))}
      </Timeline>
    </Box>
  );
};
