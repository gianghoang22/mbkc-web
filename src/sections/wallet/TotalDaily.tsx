// @mui
import { Box, Card, Stack, Typography, alpha } from '@mui/material';
// section
import { StyledIcon } from 'sections/dashboard/AppWidgetSummary';
//
import { Color } from 'common/enums';

interface Props {
  title: string;
  date: string;
  icon: React.ReactNode;
  totalMoney: string;
  color: Color;
}

function TotalDaily({ date, icon, title, totalMoney, color }: Props) {
  return (
    <Card sx={{ p: 1, boxShadow: 'none', border: 1, borderColor: (theme) => theme.palette.grey[400] }}>
      <Box padding={2}>
        <Typography variant="subtitle1">{title}</Typography>
        <Typography variant="subtitle2" color={(theme) => theme.palette.grey[600]} mt={1}>
          {date}
        </Typography>

        <Stack direction="row" alignItems="center" justifyContent="left" mt={2}>
          <Stack>
            <StyledIcon
              sx={{
                color: (theme: any) => theme.palette[color].dark,
                backgroundImage: (theme: any) =>
                  `linear-gradient(135deg, ${alpha(theme.palette[color].dark, 0)} 0%, ${alpha(
                    theme.palette[color].dark,
                    0.24
                  )} 100%)`,
                width: 44,
                height: 44,
                marginBottom: 0,
                marginRight: 1,
              }}
            >
              {icon}
            </StyledIcon>
          </Stack>
          <Stack>
            <Typography variant="h4" color={(theme: any) => theme.palette[color].dark}>
              +{totalMoney} đ
            </Typography>
          </Stack>
        </Stack>
      </Box>
    </Card>
  );
}

export default TotalDaily;
