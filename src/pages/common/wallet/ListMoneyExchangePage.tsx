import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
// @mui
import { Box, Card, Paper, Table, TableBody, TableContainer, TablePagination } from '@mui/material';
//redux
import { useAppSelector } from 'redux/configStore';
// section
import { MoneyExchangeTableRow, MoneyExchangeTableRowSkeleton } from 'sections/moneyExchanges';
//
import { ListParams, MoneyExchangeTable, OptionSelect, OrderSort } from 'common/@types';
import { CommonTableHead, CustomTableToolbar, EmptyTable, Page } from 'components';
import { useConfigHeadTable, useLocales, usePagination } from 'hooks';
import { PATH_CASHIER_APP, PATH_KITCHEN_CENTER_APP } from 'routes/paths';
import { fDate } from 'utils';
import { useDispatch } from 'react-redux';
import { getAllMoneyExchange } from 'redux/wallet/walletSlice';
import { EXCHANGE_TYPE_OPTIONS, FILTER_STATUS_OPTIONS } from 'common/models';
import { Role } from 'common/enums';

function ListMoneyExchangePage() {
  const { pathname } = useLocation();
  const { translate } = useLocales();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { MoneyExchangeHeadCells } = useConfigHeadTable();
  const { page, setPage, rowsPerPage, handleChangePage, handleChangeRowsPerPage } = usePagination();

  const { moneyExchanges, isLoading, numberItems } = useAppSelector((state) => state.wallet);
  const { userAuth } = useAppSelector((state) => state.auth);

  const [order, setOrder] = useState<OrderSort>('asc');
  const [orderBy, setOrderBy] = useState<keyof MoneyExchangeTable>('amount');
  const [selected, setSelected] = useState<readonly string[]>([]);

  const [searchDateFrom, setSearchDateFrom] = useState<Date | null>(null);
  const [searchDateTo, setSearchDateTo] = useState<Date | null>(null);
  const [exchangeType, setExchangeType] = useState<OptionSelect | null>({ value: '', label: '', id: '' });
  const [filterStatus, setFilterStatus] = useState<OptionSelect | null>({ value: '', label: '', id: '' });

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof MoneyExchangeTable) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  // console.log(exchangeStatus, exchangeType);

  const handleChangeSearchDateFrom = (date: Date | null) => {
    setSearchDateFrom(date as Date);
  };

  const handleChangeSearchDateTo = (date: Date | null) => {
    setSearchDateTo(date as Date);
  };

  const handleChangeExchangeType = (newType: OptionSelect | null) => {
    setExchangeType(newType);
  };

  const handleChangeFilterStatus = (newStatus: OptionSelect | null) => {
    setFilterStatus(newStatus);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - numberItems) : 0;

  const params: ListParams = useMemo(() => {
    return {
      optionParams: {
        itemsPerPage: rowsPerPage,
        currentPage: page + 1,
        sortBy: `${orderBy}_${order}`,
        searchDateFrom: searchDateFrom === null ? '' : fDate(searchDateFrom as Date),
        searchDateTo: searchDateTo === null ? '' : fDate(searchDateTo as Date),
        status: filterStatus?.value,
        exchangeType: exchangeType?.value,
      },
      navigate,
    };
  }, [
    rowsPerPage,
    page,
    orderBy,
    order,
    searchDateFrom,
    searchDateTo,
    filterStatus?.value,
    exchangeType?.value,
    navigate,
  ]);

  useEffect(() => {
    dispatch<any>(getAllMoneyExchange(params));
  }, [dispatch, params]);

  const handleReloadData = () => {
    dispatch<any>(getAllMoneyExchange(params));
  };

  return (
    <>
      <Page
        title={translate('page.title.list', { model: translate('model.lowercase.moneyExchanges') })}
        pathname={pathname}
        navigateDashboard={
          userAuth?.roleName === Role.KITCHEN_CENTER_MANAGER ? PATH_KITCHEN_CENTER_APP.root : PATH_CASHIER_APP.root
        }
      >
        <Card>
          <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', mb: 2 }}>
              <CustomTableToolbar
                selected={selected}
                setSelected={setSelected}
                searchDateFrom={searchDateFrom}
                searchDateTo={searchDateTo}
                headCells={MoneyExchangeHeadCells}
                handleReloadData={handleReloadData}
                haveSelectSearchDateFrom
                haveSelectSearchDateTo
                haveFilterName={false}
                options={EXCHANGE_TYPE_OPTIONS}
                secondOptions={FILTER_STATUS_OPTIONS}
                haveSelectFilterStatus
                haveSelectExchangeType
                handleChangeFilterStatus={handleChangeFilterStatus}
                handleChangeExchangeType={handleChangeExchangeType}
                handleChangeSearchDateFrom={handleChangeSearchDateFrom}
                handleChangeSearchDateTo={handleChangeSearchDateTo}
                model={translate('model.lowercase.moneyExchanges')}
              />
              <TableContainer>
                <Table sx={{ minWidth: 800 }} aria-labelledby="tableTitle" size="medium">
                  <CommonTableHead<MoneyExchangeTable>
                    headCells={MoneyExchangeHeadCells}
                    order={order}
                    orderBy={orderBy}
                    onRequestSort={handleRequestSort}
                  />

                  {isLoading ? (
                    <MoneyExchangeTableRowSkeleton length={numberItems} />
                  ) : (
                    <TableBody>
                      {moneyExchanges.map((moneyExchange, index) => {
                        return (
                          <MoneyExchangeTableRow
                            key={index}
                            index={index}
                            page={page}
                            rowsPerPage={rowsPerPage}
                            moneyExchange={moneyExchange}
                          />
                        );
                      })}
                      {emptyRows > 0 ||
                        (moneyExchanges.length === 0 && (
                          <EmptyTable
                            colNumber={MoneyExchangeHeadCells.length + 2}
                            model={translate('model.lowercase.moneyExchanges')}
                          />
                        ))}
                    </TableBody>
                  )}
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
    </>
  );
}

export default ListMoneyExchangePage;
