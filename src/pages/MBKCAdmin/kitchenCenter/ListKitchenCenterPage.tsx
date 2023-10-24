import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
// @mui
import { Box, Button, Card, Paper, Table, TableBody, TableContainer, TablePagination } from '@mui/material';
//@mui Icons
import AddRoundedIcon from '@mui/icons-material/AddRounded';
// redux
import { useAppDispatch, useAppSelector } from 'redux/configStore';
import { getAllKitchenCenters, setAddKitchenCenter } from 'redux/kitchenCenter/kitchenCenterSlice';
import { setRoutesToBack } from 'redux/routes/routesSlice';
//
import { KitchenCenterTable, ListParams, OrderSort } from '@types';
import { CommonTableHead, EmptyTable, Page, SearchNotFound } from 'components';
import { useConfigHeadTable, useDebounce, useLocales, usePagination } from 'hooks';
import { PATH_ADMIN_APP } from 'routes/paths';
import {
  KitchenCenterTableRow,
  KitchenCenterTableRowSkeleton,
  KitchenCenterTableToolbar,
} from 'sections/kitchenCenter';
import { getComparator, stableSort } from 'utils';

function ListKitchenCenterPage(props: any) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();
  const { translate } = useLocales();
  const { kitchenCenterHeadCells } = useConfigHeadTable();
  const { page, setPage, rowsPerPage, handleChangePage, handleChangeRowsPerPage } = usePagination();

  const [order, setOrder] = useState<OrderSort>('asc');
  const [orderBy, setOrderBy] = useState<keyof KitchenCenterTable>('name');
  const [filterName, setFilterName] = useState<string>('');

  const { kitchenCenters, isLoading, numberItems } = useAppSelector((state) => state.kitchenCenter);

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof KitchenCenterTable) => {
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

  const visibleRows = useMemo(
    () => stableSort(kitchenCenters, getComparator(order, orderBy)),
    [order, orderBy, kitchenCenters]
  );

  const isNotFound = !visibleRows.length && !!filterName;

  const debounceValue = useDebounce(filterName, 500);

  const params: ListParams = useMemo(() => {
    return {
      optionParams: {
        itemsPerPage: rowsPerPage,
        currentPage: page + 1,
        keySearchName: debounceValue,
      },
      navigate,
    };
  }, [page, rowsPerPage, debounceValue, navigate]);

  useEffect(() => {
    dispatch(getAllKitchenCenters(params));
  }, [dispatch, navigate, params]);

  return (
    <>
      <Page
        title={translate('page.title.list', { model: translate('model.lowercase.kitchenCenters') })}
        pathname={pathname}
        navigateDashboard={PATH_ADMIN_APP.root}
        actions={() => [
          <Button
            variant="contained"
            startIcon={<AddRoundedIcon />}
            onClick={() => {
              navigate(PATH_ADMIN_APP.kitchenCenter.newKitchenCenter);
              dispatch(setRoutesToBack(pathname));
              dispatch(setAddKitchenCenter());
            }}
          >
            {translate('button.add', { model: translate('model.lowercase.kitchenCenter') })}
          </Button>,
        ]}
      >
        <Card>
          <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', mb: 2 }}>
              <KitchenCenterTableToolbar filterName={filterName} onFilterName={handleFilterByName} />
              <TableContainer>
                <Table sx={{ minWidth: 800 }} aria-labelledby="tableTitle" size="medium">
                  <CommonTableHead<KitchenCenterTable>
                    headCells={kitchenCenterHeadCells}
                    order={order}
                    orderBy={orderBy}
                    onRequestSort={handleRequestSort}
                  />
                  {isLoading ? (
                    <KitchenCenterTableRowSkeleton length={visibleRows.length} />
                  ) : (
                    <TableBody>
                      {visibleRows.map((kitchenCenter, index) => {
                        return (
                          <KitchenCenterTableRow
                            key={kitchenCenter.kitchenCenterId}
                            index={index}
                            page={page}
                            rowsPerPage={rowsPerPage}
                            kitchenCenter={kitchenCenter}
                          />
                        );
                      })}
                      {emptyRows > 0 ||
                        (kitchenCenters.length === 0 && !filterName && (
                          <EmptyTable
                            colNumber={kitchenCenterHeadCells.length + 2}
                            model={translate('model.lowercase.kitchenCenter')}
                          />
                        ))}
                    </TableBody>
                  )}
                  {isNotFound && (
                    <SearchNotFound colNumber={kitchenCenterHeadCells.length + 2} searchQuery={filterName} />
                  )}
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={numberItems}
                rowsPerPage={rowsPerPage}
                page={page}
                labelRowsPerPage={translate('table.rowsPerPage')}
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

export default ListKitchenCenterPage;
