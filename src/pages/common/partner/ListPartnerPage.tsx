/* eslint-disable react-hooks/exhaustive-deps */
import React, { ReactNode, useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
// @mui
import { Box, Button, Card, Paper, Table, TableBody, TableContainer, TablePagination } from '@mui/material';
// @mui icon
import AddRoundedIcon from '@mui/icons-material/AddRounded';
// redux
import { useAppDispatch, useAppSelector } from 'redux/configStore';
import { getAllPartners, setAddPartner } from 'redux/partner/partnerSlice';
// section
import { CreatePartnerModal, PartnerTableRow, PartnerTableRowSkeleton, PartnerTableToolbar } from 'sections/partner';
//
import { ListParams, OrderSort, OrderSortBy, PartnerTable } from '@types';
import { Role } from 'common/enum';
import { CommonTableHead, EmptyTable, Page, SearchNotFound } from 'components';
import { useConfigHeadTable, useDebounce, useLocales, useModal, usePagination } from 'hooks';
import { PATH_ADMIN_APP, PATH_BRAND_APP } from 'routes/paths';

function ListPartnerPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { translate } = useLocales();
  const { pathname } = useLocation();
  const { handleOpen, isOpen } = useModal();
  const { partnerHeadCells } = useConfigHeadTable();
  const { page, setPage, rowsPerPage, handleChangePage, handleChangeRowsPerPage } = usePagination();

  const { userAuth } = useAppSelector((state) => state.auth);
  const { partners, isLoading, numberItems } = useAppSelector((state) => state.partner);

  const [order, setOrder] = useState<OrderSort>('asc');
  const [orderBy, setOrderBy] = useState<keyof PartnerTable>(OrderSortBy.NAME);
  const [filterName, setFilterName] = useState<string>('');

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof PartnerTable) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleFilterByName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - partners.length) : 0;

  const isNotFound = !partners.length && !!filterName;

  const debounceValue = useDebounce(filterName, 500);

  const params: ListParams = useMemo(() => {
    return {
      optionParams: {
        itemsPerPage: rowsPerPage,
        currentPage: page + 1,
        keySearchName: debounceValue,
        keySortName: orderBy === OrderSortBy.NAME ? order : '',
        keySortStatus: orderBy === OrderSortBy.STATUS ? order : '',
      },
      navigate,
    };
  }, [page, rowsPerPage, debounceValue, orderBy, order]);

  useEffect(() => {
    dispatch(getAllPartners(params));
  }, [params]);

  return (
    <>
      <Page
        pathname={pathname}
        title={translate('page.title.list', { model: translate('model.lowercase.partners') })}
        navigateDashboard={userAuth?.roleName === Role.BRAND_MANAGER ? PATH_BRAND_APP.root : PATH_ADMIN_APP.root}
        actions={() => {
          const listAction: ReactNode[] =
            userAuth?.roleName === Role.MBKC_ADMIN
              ? [
                  <Button
                    variant="contained"
                    onClick={() => {
                      handleOpen('create partner');
                      dispatch(setAddPartner());
                    }}
                    startIcon={<AddRoundedIcon />}
                  >
                    {translate('button.add', { model: translate('model.lowercase.partner') })}
                  </Button>,
                ]
              : [];
          return listAction;
        }}
      >
        <Card>
          <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', mb: 2 }}>
              <PartnerTableToolbar filterName={filterName} onFilterName={handleFilterByName} />
              <TableContainer>
                <Table sx={{ minWidth: 800 }} aria-labelledby="tableTitle" size="medium">
                  <CommonTableHead<PartnerTable>
                    showAction={userAuth?.roleName === Role.MBKC_ADMIN}
                    headCells={partnerHeadCells}
                    order={order}
                    orderBy={orderBy}
                    onRequestSort={handleRequestSort}
                  />
                  {isLoading ? (
                    <PartnerTableRowSkeleton length={partners.length} />
                  ) : (
                    <TableBody>
                      {partners.map((partner, index) => {
                        return (
                          <PartnerTableRow
                            showAction={userAuth?.roleName === Role.MBKC_ADMIN}
                            key={partner.partnerId}
                            index={index}
                            partner={partner}
                            lengthPartners={partners.length}
                            setPage={setPage}
                          />
                        );
                      })}
                      {emptyRows > 0 ||
                        (partners.length === 0 && !filterName && (
                          <EmptyTable
                            colNumber={partnerHeadCells.length + 2}
                            model={translate('model.lowercase.partner')}
                          />
                        ))}
                    </TableBody>
                  )}
                  {isNotFound && <SearchNotFound colNumber={partnerHeadCells.length + 2} searchQuery={filterName} />}
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={numberItems}
                rowsPerPage={rowsPerPage}
                labelRowsPerPage={translate('table.rowsPerPage')}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Paper>
          </Box>
        </Card>
      </Page>

      {isOpen && <CreatePartnerModal page={page} rowsPerPage={rowsPerPage} isOpen={isOpen} handleOpen={handleOpen} />}
    </>
  );
}

export default ListPartnerPage;
