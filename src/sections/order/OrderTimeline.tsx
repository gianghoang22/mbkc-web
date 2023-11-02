import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  timelineItemClasses,
} from '@mui/lab';
import { Typography, Stack } from '@mui/material';
import { Color } from 'common/enum';

export default function OrderTimeline() {
  return (
    <Timeline
      sx={{
        [`& .${timelineItemClasses.root}:before`]: {
          flex: 0,
          padding: 0,
        },
        marginTop: 2,
      }}
    >
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>
          <Stack direction="column">
            <Typography variant="subtitle2" component="span">
              Order delivery successful
            </Typography>
            <Typography variant="caption">27 Oct 2023 10:01 AM</Typography>
          </Stack>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>
          <Stack direction="column">
            <Typography variant="subtitle2" component="span">
              Order is ready
            </Typography>
            <Typography variant="caption">27 Oct 2023 10:01 AM</Typography>
          </Stack>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot color={Color.PRIMARY} />
        </TimelineSeparator>
        <TimelineContent>
          <Stack direction="column">
            <Typography variant="subtitle2" component="span">
              Order being prepared
            </Typography>
            <Typography variant="caption">27 Oct 2023 10:01 AM</Typography>
          </Stack>
        </TimelineContent>
      </TimelineItem>
    </Timeline>
  );
}
