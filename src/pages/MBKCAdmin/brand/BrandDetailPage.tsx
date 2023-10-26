import { CommonTableHead, ConfirmDialog, EmptyTable, Label, Page, Popover, SearchNotFound } from 'components';
import React, { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { PATH_ADMIN_APP } from 'routes/paths';
//mui
import DescriptionIcon from '@mui/icons-material/Description';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import {
  Avatar,
  Box,
  Button,
  Card,
  Grid,
  Paper,
  Stack,
  Table,
  TableBody,
  TableContainer,
  TablePagination,
  Typography,
} from '@mui/material';
//
import { ListParams, OrderSort, StoreTable } from '@types';
import { Color, Language, PopoverType, Status } from 'common/enum';
import { useConfigHeadTable, useDebounce, useLocales, useModal, usePagination, usePopover } from 'hooks';
import { getBrandDetail, setBrandToNull, setEditBrand } from 'redux/brand/brandSlice';
import { useAppDispatch, useAppSelector } from 'redux/configStore';
import { setRoutesToBack } from 'redux/routes/routesSlice';
import { getAllStores } from 'redux/store/storeSlice';
import { StoreTableRow, StoreTableRowSkeleton, StoreTableToolbar } from 'sections/store';
import { getComparator, stableSort } from 'utils';
import BrandDetailPageSkeleton from './BrandDetailPageSkeleton';

function BrandDetailPage() {
  const { id: brandId } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { translate, currentLang } = useLocales();
  const { pathname } = useLocation();
  const { storeHeadCells } = useConfigHeadTable();
  const { handleOpen: handleOpenModal, isOpen: isOpenModal } = useModal();
  const { open: openPopover, handleOpenMenu, handleCloseMenu } = usePopover();
  const { page, setPage, rowsPerPage, handleChangePage, handleChangeRowsPerPage } = usePagination();

  const { brand, isLoading } = useAppSelector((state) => state.brand);
  const { stores, numberItems, isLoading: isLoadingStores } = useAppSelector((state) => state.store);

  const [order, setOrder] = useState<OrderSort>('asc');
  const [orderBy, setOrderBy] = useState<keyof StoreTable>('name');
  const [filterName, setFilterName] = useState<string>('');
  const [storeStatus, setStoreStatus] = useState<string>('');

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof StoreTable) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleFilterByName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - numberItems) : 0;

  const visibleRows = useMemo(() => stableSort(stores, getComparator(order, orderBy)), [order, orderBy, stores]);
  const isNotFound = !visibleRows.length && !!filterName;

  const handleDelete = () => {
    console.log('Deleting');
  };

  const debounceValue = useDebounce(filterName, 500);

  const params: ListParams = useMemo(() => {
    return {
      optionParams: {
        itemsPerPage: rowsPerPage,
        currentPage: page + 1,
        searchValue: debounceValue,
        idBrand: brandId,
      },
      navigate,
    };
  }, [page, rowsPerPage, debounceValue, brandId, navigate]);

  const paramsDetails = useMemo(() => {
    return {
      brandId,
      navigate,
    };
  }, [brandId, navigate]);

  useEffect(() => {
    dispatch<any>(getBrandDetail(paramsDetails));
    dispatch<any>(getAllStores(params));

    // return () => {
    //   dispatch(setBrandToNull());
    // };
  }, [params, dispatch, paramsDetails]);

  return (
    <>
      <Page
        title={translate('page.title.detail', {
          model:
            currentLang.value === Language.ENGLISH
              ? translate('model.capitalize.brand')
              : translate('model.lowercase.brand'),
        })}
        actions={() => [
          <Button
            color="inherit"
            onClick={handleOpenMenu}
            endIcon={<KeyboardArrowDownIcon />}
            style={{
              backgroundColor: '#000',
              color: '#fff',
            }}
            sx={{
              '.css-1dat9h6-MuiButtonBase-root-MuiButton-root:hover': {
                backgroundColor: 'rgba(145, 158, 171, 0.08)',
              },
            }}
          >
            {translate('button.menuAction')}
          </Button>,
        ]}
        pathname={pathname}
        navigateDashboard={PATH_ADMIN_APP.root}
      >
        <Stack spacing={5} mb={10} width="65%">
          <Card>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{
                px: 3,
                py: 1.5,
                borderBottom: 1,
                borderColor: 'divider',
              }}
            >
              <Stack direction="row" alignItems="center" gap={0.5}>
                <Typography variant="h6">{translate('page.content.generalInformation')}</Typography>
              </Stack>
            </Stack>
            {isLoading ? (
              <BrandDetailPageSkeleton />
            ) : (
              <Stack sx={{ px: 3.5, py: 3 }}>
                <Grid container columnSpacing={2}>
                  <Grid item md={3} sm={12}>
                    <Stack width="100%" alignItems="center">
                      <Avatar src={brand?.logo} alt={brand?.name} sx={{ width: 150, height: 150 }} />
                    </Stack>
                  </Grid>
                  <Grid item md={9} sm={12}>
                    <Stack width="100%" alignItems="start" gap={1}>
                      <Typography variant="h5">{brand?.name}</Typography>

                      <Stack width="100%" direction="row" alignItems="center" justifyContent="space-between" gap={0.5}>
                        <Typography variant="subtitle1">{translate('table.status')}:</Typography>
                        <Label color={(brand?.status === Status.INACTIVE && Color.ERROR) || Color.SUCCESS}>
                          {brand?.status === Status.INACTIVE
                            ? translate('status.inactive')
                            : translate('status.active')}
                        </Label>
                      </Stack>
                      <Stack direction="row" alignItems="center" justifyContent="space-between" gap={0.5}>
                        <Typography variant="subtitle1">{translate('table.address')}:</Typography>
                        <Typography variant="body1">{brand?.address}</Typography>
                      </Stack>
                    </Stack>
                  </Grid>
                </Grid>
              </Stack>
            )}
          </Card>
        </Stack>

        <Card>
          <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', mb: 2 }}>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                px={3}
                py={2}
                sx={{ borderBottom: 1, borderColor: 'divider' }}
              >
                <Typography variant="h6">
                  {translate('page.title.list', { model: translate('model.lowercase.store') })}
                </Typography>
              </Stack>

              <StoreTableToolbar
                haveSelectStatus
                filterName={filterName}
                onFilterName={handleFilterByName}
                status={storeStatus}
                setStatus={setStoreStatus}
              />
              <TableContainer>
                <Table sx={{ minWidth: 800 }} aria-labelledby="tableTitle" size="medium">
                  <CommonTableHead<StoreTable>
                    hideBrand={true}
                    headCells={storeHeadCells}
                    order={order}
                    orderBy={orderBy}
                    onRequestSort={handleRequestSort}
                  />
                  {isLoadingStores ? (
                    <StoreTableRowSkeleton showEmail length={visibleRows.length} haveKitchenCenter />
                  ) : (
                    <TableBody>
                      {visibleRows.map((store, index) => {
                        return (
                          <StoreTableRow
                            key={store.storeId}
                            index={index}
                            store={store}
                            setPage={setPage}
                            page={page + 1}
                            rowsPerPage={rowsPerPage}
                            length={visibleRows.length}
                            haveKitchenCenter
                            showEmail
                          />
                        );
                      })}
                      {emptyRows > 0 ||
                        (stores.length === 0 && !filterName && (
                          <EmptyTable
                            colNumber={storeHeadCells.length + 2}
                            model={translate('model.lowercase.store')}
                          />
                        ))}
                    </TableBody>
                  )}

                  {isNotFound && <SearchNotFound colNumber={storeHeadCells.length + 2} searchQuery={filterName} />}
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={numberItems}
                page={page}
                rowsPerPage={rowsPerPage}
                labelRowsPerPage={translate('table.rowsPerPage')}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Paper>
          </Box>
        </Card>
      </Page>

      <Popover
        type={PopoverType.ALL}
        open={openPopover}
        handleCloseMenu={handleCloseMenu}
        onDelete={handleOpenModal}
        onEdit={() => {
          navigate(PATH_ADMIN_APP.brand.newBrand);
          dispatch(setRoutesToBack(pathname));
          dispatch(setEditBrand(brand));
        }}
      />

      {isOpenModal && (
        <ConfirmDialog
          open={isOpenModal}
          onClose={handleOpenModal}
          onAction={handleDelete}
          title={translate('dialog.confirmDeleteTitle', { model: translate('model.lowercase.brand') })}
          description={translate('dialog.confirmDeleteContent', { model: translate('model.lowercase.brand') })}
        />
      )}
    </>
  );
}

export default BrandDetailPage;
