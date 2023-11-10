// @mui
import HistoryIcon from '@mui/icons-material/History';
import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineOppositeContent,
  TimelineSeparator,
  timelineOppositeContentClasses,
} from '@mui/lab';
import { Box, Card, Paper, Stack, Typography } from '@mui/material';
// redux
import { useAppSelector } from 'redux/configStore';
// interface
import { Color, PartnerOrderStatus, SystemStatus } from 'common/enums';
import { OrderHistory } from 'common/models';
//
import { Label } from 'components';
import { useLocales } from 'hooks';
import { fDateTime } from 'utils';

export default function OrderTimeline() {
  const { translate } = useLocales();

  const { order, isLoading } = useAppSelector((state) => state.order);

  const orderHistories: OrderHistory[] = order?.orderHistories as OrderHistory[];

  return (
    <Card>
      <Box width="100%" pb={2}>
        <Paper sx={{ width: '100%' }}>
          <Stack
            gap={1}
            direction="row"
            alignItems="center"
            sx={{
              px: 3,
              py: 2,
              mb: 2,
              borderBottom: 1,
              borderColor: 'divider',
            }}
          >
            <HistoryIcon />
            <Typography variant="subtitle1">{translate('model.capitalizeOne.orderHistories')}</Typography>
          </Stack>

          <Timeline
            sx={{
              [`& .${timelineOppositeContentClasses.root}`]: {
                flex: 0.3,
              },
            }}
          >
            {orderHistories &&
              orderHistories.map((orderHistory, index) => {
                const isLast = index === orderHistories.length - 1;

                return (
                  <TimelineItem key={orderHistory.orderHistoryId}>
                    <TimelineOppositeContent color="text.secondary">
                      {fDateTime(orderHistory.createdDate)}
                    </TimelineOppositeContent>
                    <TimelineSeparator>
                      <TimelineDot />
                      {!isLast && <TimelineConnector />}
                    </TimelineSeparator>
                    <TimelineContent>
                      <Stack direction="column" gap={2}>
                        <Stack direction="row" alignItems="center" gap={1}>
                          <Typography variant="subtitle2" component="span">
                            {translate('table.partnerOrderStatus')}
                          </Typography>
                          <Label
                            color={
                              orderHistory?.partnerOrderStatus === PartnerOrderStatus.COMPLETED
                                ? Color.SUCCESS
                                : orderHistory?.partnerOrderStatus === PartnerOrderStatus.CANCELLED
                                ? Color.ERROR
                                : Color.INFO
                            }
                          >
                            {orderHistory?.partnerOrderStatus === PartnerOrderStatus.READY
                              ? translate('status.ready')
                              : orderHistory?.partnerOrderStatus === PartnerOrderStatus.UPCOMING
                              ? translate('status.upcoming')
                              : orderHistory?.partnerOrderStatus === PartnerOrderStatus.PREPARING
                              ? translate('status.preparing')
                              : orderHistory?.partnerOrderStatus === PartnerOrderStatus.COMPLETED
                              ? translate('status.completed')
                              : translate('status.cancelled')}
                          </Label>
                        </Stack>
                        <Stack direction="row" alignItems="center" gap={1}>
                          <Typography variant="subtitle2" component="span">
                            {translate('table.systemStatus')}
                          </Typography>
                          <Label
                            color={
                              orderHistory?.systemStatus === SystemStatus.COMPLETED
                                ? Color.SUCCESS
                                : orderHistory?.systemStatus === SystemStatus.CANCELLED
                                ? Color.ERROR
                                : Color.PRIMARY
                            }
                          >
                            {orderHistory?.systemStatus === SystemStatus.IN_STORE
                              ? translate('status.inStore')
                              : orderHistory?.systemStatus === SystemStatus.READY_DELIVERY
                              ? translate('status.readyDelivery')
                              : orderHistory?.systemStatus === SystemStatus.COMPLETED
                              ? translate('status.completed')
                              : translate('status.cancelled')}
                          </Label>
                        </Stack>
                      </Stack>
                    </TimelineContent>
                  </TimelineItem>
                );
              })}
          </Timeline>
        </Paper>
      </Box>
    </Card>
  );
}
