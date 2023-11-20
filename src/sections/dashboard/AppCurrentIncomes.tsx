/* eslint-disable react-hooks/exhaustive-deps */
import { Dispatch, SetStateAction, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
// @mui
import { Autocomplete, Box, Card, CardHeader, Stack, TextField } from '@mui/material';
// redux
import { useAppSelector } from 'redux/configStore';
//
import { Status } from 'common/enums';
import { useChart } from 'components/chart';
import { useLocales } from 'hooks';
import { fCurrencyVN } from 'utils';

interface AppCurrentIncomesProps {
  title: string;
  subheader: string;
  chartLabels: string[];
  chartData: any[];
  store: { label: string; value: number } | null;
  setStore: Dispatch<SetStateAction<{ label: string; value: number } | null>>;
}

function AppCurrentIncomes({ title, subheader, chartLabels, chartData, store, setStore }: AppCurrentIncomesProps) {
  const { translate } = useLocales();

  const { stores, isLoading } = useAppSelector((state) => state.store);

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

  useEffect(() => {
    setStore(storeOptions[0]);
  }, [stores.length]);

  const chartOptions = useChart({
    fill: { type: chartData.map((i) => i.fill) },
    labels: chartLabels,
    xaxis: { type: 'datetime' },
    tooltip: {
      shared: true,
      intersect: false,
      x: {
        format: 'dd/MM/yy',
      },
      y: {
        formatter: (y: any) => {
          if (typeof y !== 'undefined') {
            return `${fCurrencyVN(y)} đ`;
          }
          return y;
        },
      },
    },
  });

  return (
    <Card>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <CardHeader title={title} subheader={subheader} />

        <Stack direction="row" alignItems="center" gap={2} pt={3} pr={3}>
          <Stack width={300}>
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
        </Stack>
      </Stack>

      <Box sx={{ mx: 3, mt: 3 }} dir="ltr">
        <ReactApexChart type="area" series={chartData} options={chartOptions} height={364} />
      </Box>
    </Card>
  );
}

export default AppCurrentIncomes;
