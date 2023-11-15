import { useState } from 'react';
import ReactApexChart from 'react-apexcharts';
// @mui
import { Autocomplete, Box, Card, CardHeader, Stack, TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
//
import { fNumber } from 'utils';
import { useChart } from 'components/chart';
import { useLocales } from 'hooks';
import { useAppSelector } from 'redux/configStore';
import { Status } from 'common/enums';

interface AppCurrentIncomesProps {
  title: string;
  subheader: string;
  chartData: any[];
}

function AppCurrentIncomes({ title, subheader, chartData, ...other }: AppCurrentIncomesProps) {
  const { translate } = useLocales();

  const { stores, isLoading } = useAppSelector((state) => state.store);

  const [store, setStore] = useState<{ label: string; value: number } | null>(null);
  const [searchDateFrom, setSearchDateFrom] = useState<Date | null>(null);
  const [searchDateTo, setSearchDateTo] = useState<Date | null>(null);

  const storeOptions = stores
    .filter((store) => store.status !== Status.BE_CONFIRMING && store.status !== Status.REJECTED)
    .map((store) => ({
      label: store.name,
      value: store.storeId,
    }));

  const getOpObjStore = (option: any) => {
    if (!option) return option;
    if (!option.value) return storeOptions.find((opt) => opt.value === option);
    return option;
  };

  const chartLabels = chartData.map((i) => i.label);

  const chartSeries = chartData.map((i) => i.value);

  const chartOptions = useChart({
    tooltip: {
      marker: { show: true },
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
    stroke: {
      curve: 'smooth',
    },
    xaxis: {
      categories: chartLabels,
    },
  });

  return (
    <Card {...other}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <CardHeader title={title} subheader={subheader} />

        <Stack direction="row" alignItems="center" gap={2} pt={3} pr={3}>
          <Stack width={250}>
            <Autocomplete
              disabled={isLoading}
              fullWidth
              size="small"
              options={storeOptions}
              getOptionLabel={(option) => {
                return getOpObjStore(option).label;
              }}
              renderInput={(params) => (
                <TextField {...params} label={translate('table.systemStatus')} InputLabelProps={{}} />
              )}
              value={store}
              onChange={(event: any, newValue: { label: string; value: number } | null) => setStore(newValue)}
            />
          </Stack>

          <DatePicker
            slotProps={{ textField: { size: 'small' }, actionBar: { actions: ['clear'] } }}
            label={translate('table.fromDate')}
            value={searchDateFrom}
            format="DD/MM/YYYY"
            disableFuture
            onChange={(newValue: Date | null) => setSearchDateFrom(newValue)}
            sx={{ width: 170 }}
          />

          <DatePicker
            slotProps={{ textField: { size: 'small' }, actionBar: { actions: ['clear'] } }}
            label={translate('table.toDate')}
            value={searchDateTo}
            format="DD/MM/YYYY"
            disableFuture
            onChange={(newValue: Date | null) => setSearchDateTo(newValue)}
            sx={{ width: 170 }}
          />
        </Stack>
      </Stack>

      <Box sx={{ mx: 3, mt: 3 }} dir="ltr">
        <ReactApexChart type="area" series={[{ data: chartSeries }]} options={chartOptions} height={364} />
      </Box>
    </Card>
  );
}

export default AppCurrentIncomes;
