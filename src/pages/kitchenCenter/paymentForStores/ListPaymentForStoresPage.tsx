import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
// @mui
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { Box, Button, Card, Paper, Table, TableBody, TableContainer, TablePagination } from '@mui/material';
//redux
import { useAppDispatch, useAppSelector } from 'redux/configStore';
import { getAllMoneyExchange } from 'redux/wallet/walletSlice';
// section
import {
  MoneyExchangeTableRow,
  MoneyExchangeTableRowSkeleton,
  MoneyExchangeTableToolbar,
} from 'sections/moneyExchanges';
import { CreatePaymentForStoreModal } from 'sections/paymentForStores';
// interface
import { ListParams, MoneyExchangeTable, OrderSort } from 'common/@types';
import { ExchangeType } from 'common/enums';
//
import { CommonTableHead, EmptyTable, Page, SearchNotFound } from 'components';
import { useConfigHeadTable, useLocales, useModal, usePagination } from 'hooks';
import { PATH_KITCHEN_CENTER_APP } from 'routes/paths';
import { fDate } from 'utils';

function ListOfPaymentForStoresPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { pathname } = useLocation();
  const { translate } = useLocales();

  const { MoneyExchangeHeadCells } = useConfigHeadTable();
  const { handleOpen, isOpen } = useModal();
  const { page, setPage, rowsPerPage, handleChangePage, handleChangeRowsPerPage } = usePagination();

  const { moneyExchanges, numberItems, isLoading } = useAppSelector((state) => state.wallet);

  const [order, setOrder] = useState<OrderSort>('asc');
  const [orderBy, setOrderBy] = useState<keyof MoneyExchangeTable>('amount');
  const [filterName, setFilterName] = useState<string>('');

  const [searchDateFrom, setSearchDateFrom] = useState<Date | null>(null);
  const [searchDateTo, setSearchDateTo] = useState<Date | null>(null);
  const [exchangeStatus, setExchangeStatus] = useState('');

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof MoneyExchangeTable) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleFilterByName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPage(0);
    setFilterName(event.target.value.trimStart());
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - numberItems) : 0;

  const isNotFound = !numberItems && !!filterName;

  const params: ListParams = useMemo(() => {
    return {
      optionParams: {
        itemsPerPage: rowsPerPage,
        currentPage: page + 1,
        sortBy: `${orderBy}_${order}`,
        searchDateFrom: searchDateFrom === null ? '' : fDate(searchDateFrom as Date),
        searchDateTo: searchDateTo === null ? '' : fDate(searchDateTo as Date),
        status: exchangeStatus,
        exchangeType: ExchangeType.WITHDRAW,
      },
      navigate,
    };
  }, [rowsPerPage, page, orderBy, order, searchDateFrom, searchDateTo, exchangeStatus, navigate]);

  useEffect(() => {
    dispatch<any>(getAllMoneyExchange(params));
  }, [dispatch, params]);

  return (
    <>
      <Page
        title={translate('page.title.list', { model: translate('model.lowercase.paymentForStores') })}
        pathname={pathname}
        navigateDashboard={PATH_KITCHEN_CENTER_APP.root}
        actions={() => [
          <Button
            variant="contained"
            startIcon={<AddRoundedIcon />}
            onClick={() => {
              handleOpen();
            }}
          >
            {translate('button.add', { model: translate('model.lowercase.paymentForStore') })}
          </Button>,
        ]}
      >
        <Card>
          <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', mb: 2 }}>
              <MoneyExchangeTableToolbar filterName={filterName} onFilterName={handleFilterByName} />
              <TableContainer>
                <Table sx={{ minWidth: 800 }} aria-labelledby="tableTitle" size="medium">
                  <CommonTableHead<MoneyExchangeTable>
                    headCells={MoneyExchangeHeadCells}
                    order={order}
                    orderBy={orderBy}
                    onRequestSort={handleRequestSort}
                  />

                  {isLoading ? (
                    <MoneyExchangeTableRowSkeleton />
                  ) : (
                    <TableBody>
                      {moneyExchanges.map((moneyExchange, index) => {
                        return <MoneyExchangeTableRow key={index} index={index} moneyExchange={moneyExchange} />;
                      })}
                      {emptyRows > 0 ||
                        (moneyExchanges.length === 0 && !filterName && (
                          <EmptyTable
                            colNumber={MoneyExchangeHeadCells.length + 2}
                            model={translate('model.lowercase.paymentForStores')}
                          />
                        ))}
                    </TableBody>
                  )}

                  {isNotFound && (
                    <SearchNotFound colNumber={MoneyExchangeHeadCells.length + 2} searchQuery={filterName} />
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

      {isOpen && (
        <CreatePaymentForStoreModal isOpen={isOpen} handleOpen={handleOpen} page={page} rowsPerPage={rowsPerPage} />
      )}
    </>
  );
}

export default ListOfPaymentForStoresPage;
