import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
// @mui
import { Box, Button, Card, Paper, Table, TableBody, TableContainer, TablePagination } from '@mui/material';
// @mui icon
import AddRoundedIcon from '@mui/icons-material/AddRounded';
//
import { BankingAccount, ListParams, OrderSort } from '@types';
import { CommonTableHead, EmptyTable, Page, SearchNotFound } from 'components';
import { useConfigHeadTable, useLocales, usePagination } from 'hooks';
import { getAllBankingAccounts, setAddBankingAccount } from 'redux/bankingAccount/bankingAccountSlice';
import { useAppDispatch, useAppSelector } from 'redux/configStore';
import { PATH_KITCHEN_CENTER_APP } from 'routes/paths';
import {
  BankingAccountTableRow,
  BankingAccountTableRowSkeleton,
  BankingAccountTableToolbar,
} from 'sections/bankingAccount';
import { getComparator, stableSort } from 'utils';

function ListBankingAccountPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { translate } = useLocales();
  const { bankingAccountHeadCells } = useConfigHeadTable();
  const { page, setPage, rowsPerPage, handleChangePage, handleChangeRowsPerPage } = usePagination();

  const { bankingAccounts, isLoading } = useAppSelector((state) => state.bankingAccount);

  const [order, setOrder] = useState<OrderSort>('asc');
  const [orderBy, setOrderBy] = useState<keyof BankingAccount>('name');
  const [filterName, setFilterName] = useState<string>('');

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof BankingAccount) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleFilterByName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - bankingAccounts.length) : 0;

  const visibleRows = useMemo(
    () =>
      stableSort(bankingAccounts, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [order, orderBy, page, rowsPerPage, bankingAccounts]
  );

  const isNotFound = !visibleRows.length && !!filterName;

  const params: ListParams = useMemo(() => {
    return {
      optionParams: {
        itemsPerPage: rowsPerPage,
        currentPage: page + 1,
        searchValue: filterName,
      },
      navigate,
    };
  }, [page, rowsPerPage, filterName, navigate]);

  useEffect(() => {
    dispatch(getAllBankingAccounts(params));
  }, [dispatch, navigate, params]);

  return (
    <>
      <Page
        title={translate('page.title.list', { model: translate('model.lowercase.bankingAccount') })}
        pathname={pathname}
        navigateDashboard={PATH_KITCHEN_CENTER_APP.root}
        actions={() => [
          <Button
            variant="contained"
            startIcon={<AddRoundedIcon />}
            onClick={() => {
              navigate(PATH_KITCHEN_CENTER_APP.bankingAccount.newBankingAccount);
              dispatch(setAddBankingAccount());
            }}
          >
            {translate('button.add', { model: translate('model.lowercase.bankingAccount') })}
          </Button>,
        ]}
      >
        <Card>
          <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', mb: 2 }}>
              <BankingAccountTableToolbar filterName={filterName} onFilterName={handleFilterByName} />
              <TableContainer>
                <Table sx={{ minWidth: 800 }} aria-labelledby="tableTitle" size="medium">
                  <CommonTableHead<BankingAccount>
                    showAction
                    headCells={bankingAccountHeadCells}
                    order={order}
                    orderBy={orderBy}
                    onRequestSort={handleRequestSort}
                  />
                  {isLoading ? (
                    <BankingAccountTableRowSkeleton length={visibleRows.length} />
                  ) : (
                    <TableBody>
                      {visibleRows.map((bankingAccount, index) => {
                        return (
                          <BankingAccountTableRow
                            key={bankingAccount.bankingAccountId}
                            index={index}
                            page={page + 1}
                            rowsPerPage={rowsPerPage}
                            bankingAccount={bankingAccount}
                          />
                        );
                      })}
                      {emptyRows > 0 ||
                        (bankingAccounts.length === 0 && !filterName && (
                          <EmptyTable
                            colNumber={bankingAccountHeadCells.length + 2}
                            model={translate('model.lowercase.bankingAccount')}
                          />
                        ))}
                    </TableBody>
                  )}
                  {isNotFound && (
                    <SearchNotFound colNumber={bankingAccountHeadCells.length + 2} searchQuery={filterName} />
                  )}
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={bankingAccounts.length}
                rowsPerPage={rowsPerPage}
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

export default ListBankingAccountPage;
