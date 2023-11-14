/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
// @mui
import {
  Avatar,
  Box,
  Card,
  CardHeader,
  Link as MUILink,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
// @mui icon
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
// redux
import { useAppSelector } from 'redux/configStore';
import { getAllStores } from 'redux/store/storeSlice';
// section
import { StoreTableRowDashboardSkeleton } from 'sections/store';
// interface
import { ListParams } from 'common/@types';
import { Color, Language, Status } from 'common/enums';
//
import { EmptyTable, Label } from 'components';
import { useLocales } from 'hooks';
import { PATH_ADMIN_APP } from 'routes/paths';

interface ListNewStoresProps {
  pathname: string;
}

function ListNewStores({ pathname }: ListNewStoresProps) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  console.log(pathname);

  const { translate, currentLang } = useLocales();

  const { stores, isLoading: isLoadingStores } = useAppSelector((state) => state.store);

  const params: ListParams = {
    optionParams: {
      itemsPerPage: 5,
      currentPage: 1,
      status: pathname === PATH_ADMIN_APP.root ? Status.BE_CONFIRMING : '',
    },
    navigate,
  };

  useEffect(() => {
    dispatch<any>(getAllStores(params));
  }, []);

  return (
    <Card>
      <CardHeader
        title={
          pathname === PATH_ADMIN_APP.root
            ? translate('page.title.confirmationStore')
            : currentLang.value === Language.ENGLISH
            ? translate('page.title.new', { model: translate('model.lowercase.stores') })
            : translate('page.title.new', { model: translate('model.capitalizeOne.stores') })
        }
      />
      <Box p={2}>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>{translate('table.no')}</TableCell>
                <TableCell>Logo</TableCell>
                <TableCell>{translate('table.name')}</TableCell>
                <TableCell>{translate('table.kitchenCenter')}</TableCell>
                <TableCell>{translate('table.brand')}</TableCell>
                <TableCell>{translate('table.status')}</TableCell>
              </TableRow>
            </TableHead>

            {isLoadingStores ? (
              <StoreTableRowDashboardSkeleton length={5} />
            ) : (
              <TableBody>
                {stores.map((store, index) => (
                  <TableRow
                    key={index}
                    sx={{ cursor: 'pointer' }}
                    onClick={() => navigate(PATH_ADMIN_APP.store.root + `/${store.storeId}`)}
                  >
                    <TableCell width={60} align="center">
                      {index + 1}
                    </TableCell>
                    <TableCell width={80} align="left">
                      <Avatar src={store.logo} alt="logo" />
                    </TableCell>

                    <TableCell align="left">{store.name}</TableCell>
                    <TableCell align="left">{store.kitchenCenter.name}</TableCell>
                    <TableCell align="left">{store.brand.name}</TableCell>

                    <TableCell align="left">
                      <Label
                        color={
                          store?.status === Status.ACTIVE
                            ? Color.SUCCESS
                            : store?.status === Status.INACTIVE
                            ? Color.WARNING
                            : Color.ERROR
                        }
                      >
                        {store?.status === Status.INACTIVE
                          ? translate('status.inactive')
                          : store?.status === Status.ACTIVE
                          ? translate('status.active')
                          : translate('status.deActive')}
                      </Label>
                    </TableCell>
                  </TableRow>
                ))}

                {stores.length === 0 && <EmptyTable colNumber={6} model={translate('model.lowercase.store')} />}
              </TableBody>
            )}
          </Table>
          <Stack alignItems="end" mt={2}>
            <Link
              style={{
                display: 'flex',
                alignItems: 'center',
                textDecoration: 'none',
                color: '#000',
              }}
              to={PATH_ADMIN_APP.store.list}
            >
              <MUILink underline="hover" variant="subtitle2" color="#000">
                {translate('page.content.viewAll')}
              </MUILink>
              <KeyboardArrowRightIcon fontSize="small" />
            </Link>
          </Stack>
        </TableContainer>
      </Box>
    </Card>
  );
}

export default ListNewStores;
