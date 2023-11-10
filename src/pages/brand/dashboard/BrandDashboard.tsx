/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { Container, Grid, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
// @mui icon
import LanOutlinedIcon from '@mui/icons-material/LanOutlined';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import SummarizeIcon from '@mui/icons-material/Summarize';
import DinnerDiningIcon from '@mui/icons-material/DinnerDining';
// redux
import { getAllCategories, getAllExtraCategories } from 'redux/category/categorySlice';
import { useAppDispatch, useAppSelector } from 'redux/configStore';
import { getAllProducts } from 'redux/product/productSlice';
import { getBrandProfile } from 'redux/profile/profileSlice';
import { getAllStores } from 'redux/store/storeSlice';
// interface
import { ListParams } from 'common/@types';
import { Color } from 'common/enums';
import { CategoryType } from 'common/models';
//
import { Helmet } from 'components';
import { useLocales } from 'hooks';
import { AppCurrentIncomes, AppWidgetSummaryOutline } from 'sections/dashboard';

function BrandDashboard() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const theme = useTheme();

  const { translate } = useLocales();

  const { numberItems: totalStoreItems, isLoading: isLoadingStore } = useAppSelector((state) => state.store);
  const { numberItems: totalProductItems, isLoading: isLoadingProduct } = useAppSelector((state) => state.product);
  const {
    numberItems: totalCategoryItems,
    numberExtraItems,
    isLoading: isLoadingCategory,
  } = useAppSelector((state) => state.category);

  const params: ListParams = {
    optionParams: {
      itemsPerPage: 5,
      currentPage: 1,
    },
    navigate,
  };

  const paramCategories: ListParams = {
    optionParams: {
      type: CategoryType.NORMAL,
    },
    navigate,
  };

  const paramExtraCategories: ListParams = {
    optionParams: {
      type: CategoryType.EXTRA,
    },
    navigate,
  };

  useEffect(() => {
    dispatch<any>(getBrandProfile(navigate));
    dispatch<any>(getAllStores(params));
    dispatch<any>(getAllCategories(paramCategories));
    dispatch<any>(getAllExtraCategories(paramExtraCategories));
    dispatch<any>(getAllProducts(params));
  }, []);

  return (
    <>
      <Helmet title={translate('page.title.brandManagement')} />

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          {translate('common.welcome')}
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummaryOutline
              title={translate('page.dashboard.titleSummary', { model: translate('model.lowercase.stores') })}
              total={totalStoreItems}
              isLoading={isLoadingStore}
              icon={<RestaurantMenuIcon fontSize="large" />}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummaryOutline
              title={translate('page.dashboard.titleSummary', { model: translate('model.lowercase.normalCategories') })}
              total={totalCategoryItems}
              isLoading={isLoadingCategory}
              color={Color.INFO}
              icon={<SummarizeIcon fontSize="large" />}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummaryOutline
              title={translate('page.dashboard.titleSummary', { model: translate('model.lowercase.extraCategories') })}
              total={numberExtraItems}
              isLoading={isLoadingCategory}
              color={Color.WARNING}
              icon={<LanOutlinedIcon fontSize="large" />}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummaryOutline
              title={translate('page.dashboard.titleSummary', { model: translate('model.lowercase.products') })}
              total={totalProductItems}
              isLoading={isLoadingProduct}
              color={Color.SUCCESS}
              icon={<DinnerDiningIcon fontSize="large" />}
            />
          </Grid>
        </Grid>

        <Grid container spacing={3} mt={3}>
          <Grid item xs={12} sm={6} md={9}>
            <AppCurrentIncomes
              title="Môn thể thao được đặt nhiều"
              subheader="Môn thể thao được đặt nhiều"
              chartData={[
                { label: 'America', value: 4344 },
                { label: 'Asia', value: 5435 },
                { label: 'Europe', value: 1443 },
                { label: 'Africa', value: 4443 },
              ]}
              chartColors={[
                theme.palette.primary.main,
                theme.palette.info.main,
                theme.palette.warning.main,
                theme.palette.error.main,
              ]}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default BrandDashboard;
