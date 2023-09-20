import { useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
// @mui
import {
  Box,
  Button,
  Card,
  Container,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  Typography,
} from '@mui/material';

//@mui Icons
import AddIcon from '@mui/icons-material/Add';

//
import { KitchenCenter, KitchenCenterHeadCell, KitchenCentersTable, OrderSort } from '@types';
import { Breadcrumbs, Helmet } from 'components';
import { useAppDispatch, useAppSelector } from 'redux/configStore';
import { PATH_ADMIN_APP } from 'routes/paths';
import { KitchenCenterTableHead, KitchenCenterTableRow, KitchenCenterTableToolbar } from 'sections/kitchenCenter';
import { getComparator, stableSort } from 'utils';
import { getKitchenCenterDetail } from 'redux/kitchenCenter/kitchenCenterSlice';

const headCells: KitchenCenterHeadCell[] = [
  {
    id: 'title',
    numeric: false,
    disablePadding: false,
    label: 'Kitchen Center',
  },
  {
    id: 'address',
    numeric: false,
    disablePadding: false,
    label: 'Address',
  },
  {
    id: 'numberOfKitchens',
    numeric: false,
    disablePadding: false,
    label: 'Number of Kitchen',
    // align: 'center',
  },
  {
    id: 'status',
    numeric: false,
    disablePadding: false,
    label: 'Status',
  },
];

function ListKitchenCenterPage(props: any) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [order, setOrder] = useState<OrderSort>('asc');
  const [orderBy, setOrderBy] = useState<keyof KitchenCentersTable>('title');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [filterName, setFilterName] = useState<string>('');

  const { kitchenCenters } = useAppSelector((state) => state.kitchenCenter);

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof KitchenCentersTable) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleNavigateDetail = (kitchenCenter: KitchenCenter, kitchenCenterId: number) => {
    navigate(PATH_ADMIN_APP.kitchenCenter.root + `/detail/${kitchenCenterId}`);
    dispatch(getKitchenCenterDetail(kitchenCenter));
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - kitchenCenters.length) : 0;

  const visibleRows = useMemo(
    () =>
      stableSort(kitchenCenters, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [order, orderBy, page, rowsPerPage, kitchenCenters]
  );

  const isNotFound = !visibleRows.length && !!filterName;

  return (
    <>
      <Helmet title="List Brand Page | MBKC Food" />

      <Container>
        <Stack>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="h4">List Of Kitchen Centers</Typography>

            <Button variant="contained" onClick={() => navigate(PATH_ADMIN_APP.kitchenCenter.newKitchenCenter)}>
              <AddIcon />
              <Typography marginLeft={1} fontWeight={600}>
                Create new Kitchen Center
              </Typography>
            </Button>
          </Stack>
          <Breadcrumbs pathname={pathname} navigateDashboard={PATH_ADMIN_APP.root} />
        </Stack>

        <Card sx={{ marginTop: 2 }}>
          <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', mb: 2 }}>
              <KitchenCenterTableToolbar filterName={filterName} onFilterName={handleFilterByName} />
              <TableContainer>
                <Table sx={{ minWidth: 800 }} aria-labelledby="tableTitle" size="medium">
                  <KitchenCenterTableHead
                    headCells={headCells}
                    order={order}
                    orderBy={orderBy}
                    onRequestSort={handleRequestSort}
                  />
                  <TableBody>
                    {visibleRows.map((kitchenCenter, index) => {
                      return (
                        <KitchenCenterTableRow
                          index={index}
                          kitchenCenter={kitchenCenter}
                          handleNavigateDetail={handleNavigateDetail}
                        />
                      );
                    })}
                    {emptyRows > 0 && (
                      <TableRow
                        style={{
                          height: 53 * emptyRows,
                        }}
                      >
                        <TableCell colSpan={6} />
                      </TableRow>
                    )}
                  </TableBody>
                  {isNotFound && (
                    <TableBody>
                      <TableRow>
                        <TableCell align="center" colSpan={9} sx={{ py: 3 }}>
                          <Paper
                            sx={{
                              textAlign: 'center',
                            }}
                          >
                            <Typography variant="h6" paragraph>
                              Not found
                            </Typography>

                            <Typography variant="body2">
                              No results found for &nbsp;
                              <strong>&quot;{filterName}&quot;</strong>.
                              <br /> Try checking for typos or using complete words.
                            </Typography>
                          </Paper>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  )}
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={kitchenCenters.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Paper>
          </Box>
        </Card>
      </Container>
    </>
  );
}

ListKitchenCenterPage.propTypes = {};

export default ListKitchenCenterPage;
