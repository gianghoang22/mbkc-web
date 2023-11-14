import ReactApexChart from 'react-apexcharts';
// @mui
import { Card, CardHeader, Box, Stack } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { SingleInputDateRangeField } from '@mui/x-date-pickers-pro/SingleInputDateRangeField';
// utils
import { fNumber } from 'utils';
// components
import { useChart } from 'components/chart';

interface AppCurrentIncomesProps {
  title: string;
  subheader: string;
  chartData: any[];
}

export default function AppCurrentIncomes({ title, subheader, chartData, ...other }: AppCurrentIncomesProps) {
  const theme = useTheme();

  const chartLabels = chartData.map((i) => i.label);

  const chartSeries = chartData.map((i) => i.value);

  const chartOptions = useChart({
    tooltip: {
      marker: { show: false },
      y: {
        formatter: (seriesName: any) => fNumber(seriesName),
        title: {
          formatter: () => '',
        },
      },
    },
    plotOptions: {
      bar: { barWidth: '30px', borderRadius: 2 },
    },
    xaxis: {
      categories: chartLabels,
    },
  });

  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />

      <Stack direction="row" justifyContent="space-between" alignItems="start">
        <Stack pt={3} pr={3}></Stack>
      </Stack>

      <Box sx={{ mx: 3 }} dir="ltr">
        <ReactApexChart type="area" series={[{ data: chartSeries }]} options={chartOptions} height={364} />
      </Box>
    </Card>
  );
}
