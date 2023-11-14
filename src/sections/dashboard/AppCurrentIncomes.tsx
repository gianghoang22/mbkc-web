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

interface Option {
  label: string;
  value: number;
  image: string;
  center: string;
}

function AppCurrentIncomes({ title, subheader, chartData, ...other }: AppCurrentIncomesProps) {
  const { translate } = useLocales();

  const { stores } = useAppSelector((state) => state.store);

  const [store, setStore] = useState<Option | null>(null);
  const [searchDateFrom, setSearchDateFrom] = useState<Date | null>(null);
  const [searchDateTo, setSearchDateTo] = useState<Date | null>(null);

  console.log('store', store);

  const handleChangeSearchDateFrom = (date: Date | null) => {
    setSearchDateFrom(date);
  };

  const handleChangeSearchDateTo = (date: Date | null) => {
    setSearchDateTo(date);
  };

  const storeOptions = stores
    .filter((store) => store.status !== Status.BE_CONFIRMING && store.status !== Status.REJECTED)
    .map((store) => ({
      label: store.name,
      value: store.storeId,
      center: store.kitchenCenter.name,
      image: store.logo,
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
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <CardHeader title={title} subheader={subheader} />

        <Stack direction="row" alignItems="center" gap={2} pt={3} pr={3}>
          <Stack width={250}>
            <Autocomplete
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
              onChange={(event: any, newValue: Option | null) => setStore(newValue)}
            />
          </Stack>

          <DatePicker
            slotProps={{ textField: { size: 'small' }, actionBar: { actions: ['clear'] } }}
            label={translate('table.fromDate')}
            value={searchDateFrom}
            format="DD/MM/YYYY"
            disableFuture
            onChange={(newValue: Date | null) => handleChangeSearchDateFrom(newValue)}
            sx={{ width: 160 }}
          />

          <DatePicker
            slotProps={{ textField: { size: 'small' }, actionBar: { actions: ['clear'] } }}
            label={translate('table.toDate')}
            value={searchDateTo}
            format="DD/MM/YYYY"
            disableFuture
            onChange={(newValue: Date | null) => handleChangeSearchDateTo(newValue)}
            sx={{ width: 160 }}
          />
        </Stack>
      </Stack>

      <Box sx={{ mx: 3 }} dir="ltr">
        <ReactApexChart type="area" series={[{ data: chartSeries }]} options={chartOptions} height={364} />
      </Box>
    </Card>
  );
}

export default AppCurrentIncomes;
