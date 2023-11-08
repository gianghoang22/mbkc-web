/* eslint-disable react-hooks/exhaustive-deps */
import dayjs from 'dayjs';
import moment from 'moment';
import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
// @mui
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import DeviceHubIcon from '@mui/icons-material/DeviceHub';
import { Box, Button, Grid, Stack } from '@mui/material';
// redux
import { useAppDispatch, useAppSelector } from 'redux/configStore';
import { getSystemConfiguration, updateSystemConfiguration } from 'redux/configuration/configurationsSlice';
// section
import {
  ConfigurationMoneyExchangeToKitchenCenter,
  ConfigurationMoneyExchangeToStore,
  ConfigurationTimeBot,
} from 'sections/configurations';
//
import { Params } from 'common/@types';
import { Configuration, ConfigurationToUpdate } from 'common/models';
import { Color } from 'common/enums';
import { CollapseCard, LoadingScreen, Page } from 'components';
import { useLocales } from 'hooks';
import { PATH_ADMIN_APP } from 'routes/paths';
import { convertStrToTime } from 'utils';

function ConfigurationsPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { translate } = useLocales();
  const { pathname } = useLocation();

  const { configuration, isLoading } = useAppSelector((state) => state.configuration);

  const configurationForm = useForm<ConfigurationToUpdate>({
    defaultValues: {
      scrawlingOrderStartTime: new Date(),
      scrawlingOrderEndTime: new Date(),
      scrawlingMoneyExchangeToKitchenCenter: new Date(),
      scrawlingMoneyExchangeToStore: new Date(),
    },
  });

  const { handleSubmit, reset, setValue } = configurationForm;

  useEffect(() => {
    if (configuration !== null) {
      setValue('scrawlingOrderStartTime', convertStrToTime(configuration?.scrawlingOrderStartTime));
      setValue('scrawlingOrderEndTime', convertStrToTime(configuration?.scrawlingOrderEndTime));
      setValue(
        'scrawlingMoneyExchangeToKitchenCenter',
        convertStrToTime(configuration?.scrawlingMoneyExchangeToKitchenCenter)
      );
      setValue('scrawlingMoneyExchangeToStore', convertStrToTime(configuration?.scrawlingMoneyExchangeToStore));
    }
  }, [configuration]);

  useEffect(() => {
    dispatch<any>(getSystemConfiguration(navigate));
  }, []);

  const onSubmit = async (values: ConfigurationToUpdate) => {
    const data = { ...values };
    console.log('data updated', data);

    const params: Params<Omit<Configuration, 'id'>> = {
      data: {
        scrawlingOrderStartTime: moment(dayjs(data.scrawlingOrderStartTime).toDate()).format('HH:mm:ss'),
        scrawlingOrderEndTime: moment(dayjs(data.scrawlingOrderEndTime).toDate()).format('HH:mm:ss'),
        scrawlingMoneyExchangeToKitchenCenter: moment(
          dayjs(data.scrawlingMoneyExchangeToKitchenCenter).toDate()
        ).format('HH:mm:ss'),
        scrawlingMoneyExchangeToStore: moment(dayjs(data.scrawlingMoneyExchangeToStore).toDate()).format('HH:mm:ss'),
      },
      navigate,
    };

    console.log('params updated', params);

    dispatch(updateSystemConfiguration(params));
  };

  return (
    <>
      {isLoading && (
        <Box sx={{ position: 'fixed', zIndex: 1300, top: 0, bottom: 0, left: 0, right: 0 }}>
          <LoadingScreen />
        </Box>
      )}

      <Page
        containerWidth="xl"
        pathname={pathname}
        title={translate('model.capitalizeOne.systemConfigurations')}
        navigateDashboard={PATH_ADMIN_APP.root}
      >
        <FormProvider {...configurationForm}>
          <Stack direction="column" justifyContent="space-between" minHeight="60vh">
            <Grid container spacing={4}>
              {/* System's BOT */}
              <Grid item sm={12} md={6}>
                <CollapseCard
                  title={translate('page.title.mbkcTime')}
                  content={translate('page.content.mbkcTime')}
                  icon={<DeviceHubIcon sx={{ fontSize: '24px', color: (theme) => theme.palette.text.secondary }} />}
                >
                  <ConfigurationTimeBot />
                </CollapseCard>
              </Grid>

              <Grid item sm={12} md={6}>
                <Stack direction="column" gap={4} width="100%">
                  {/* scrawlingMoneyExchangeToKitchenCenter */}
                  <CollapseCard
                    title={translate('page.title.timeMoneyExchange')}
                    content={translate('page.content.moneyToKC')}
                    icon={
                      <CurrencyExchangeIcon sx={{ fontSize: '24px', color: (theme) => theme.palette.text.secondary }} />
                    }
                  >
                    <ConfigurationMoneyExchangeToKitchenCenter />
                  </CollapseCard>

                  {/* scrawlingMoneyExchangeToStore */}
                  <CollapseCard
                    title={translate('page.title.timeMoneyExchange')}
                    content={translate('page.content.moneyToStore')}
                    icon={
                      <CurrencyExchangeIcon sx={{ fontSize: '24px', color: (theme) => theme.palette.text.secondary }} />
                    }
                  >
                    <ConfigurationMoneyExchangeToStore />
                  </CollapseCard>
                </Stack>
              </Grid>
            </Grid>

            <Stack direction="row" justifyContent="right" sx={{ mt: 8 }} gap={2}>
              <Button
                variant="contained"
                color="inherit"
                disabled={isLoading}
                onClick={() => {
                  reset({
                    scrawlingOrderStartTime: convertStrToTime(configuration?.scrawlingOrderStartTime),
                    scrawlingOrderEndTime: convertStrToTime(configuration?.scrawlingOrderEndTime),
                    scrawlingMoneyExchangeToKitchenCenter: convertStrToTime(
                      configuration?.scrawlingMoneyExchangeToKitchenCenter
                    ),
                    scrawlingMoneyExchangeToStore: convertStrToTime(configuration?.scrawlingMoneyExchangeToStore),
                  });
                }}
              >
                {translate('button.reset')}
              </Button>
              <Button
                disabled={isLoading}
                variant="contained"
                color={Color.WARNING}
                type="submit"
                onClick={handleSubmit(onSubmit)}
              >
                {translate('button.update')}
              </Button>
            </Stack>
          </Stack>
        </FormProvider>
      </Page>
    </>
  );
}

export default ConfigurationsPage;
