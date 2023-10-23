// @mui
import {
  Box,
  Card,
  Divider,
  Grid,
  IconButton,
  Paper,
  Skeleton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  Typography,
  TableRow,
} from '@mui/material';
import { ProductTable, ProductTypeEnum } from '@types';
import { CommonTableHead } from 'components';
import { useConfigHeadTable, useLocales, usePagination, useResponsive } from 'hooks';
import { useAppSelector } from 'redux/configStore';

function ProductDetailPageSkeleton() {
  const { translate } = useLocales();
  const mdUp = useResponsive('up', 'lg', 'lg');
  const { productHeadCells } = useConfigHeadTable();
  const { page, rowsPerPage, handleChangePage, handleChangeRowsPerPage } = usePagination();

  const { productType } = useAppSelector((state) => state.product);

  return (
    <>
      <Grid container columnSpacing={5} rowSpacing={5}>
        <Grid item xs={12} sm={4} md={4}>
          <Stack width="100%" alignItems="center" justifyContent="center">
            <Skeleton
              variant="rounded"
              width={!mdUp ? 241 : 358}
              height={!mdUp ? 241 : 358}
              sx={{ borderRadius: '16px' }}
            />
          </Stack>
        </Grid>
        <Grid item xs={12} sm={8} md={8}>
          <Stack gap={2}>
            <Stack gap={1} mb={2}>
              <Box mb={1}>
                <Skeleton variant="rounded" width={180} height={25} />
              </Box>
              <Skeleton variant="rounded" width={300} height={38} />
              <Box width="100%">
                <Skeleton />
                <Skeleton />
                <Skeleton />
              </Box>
            </Stack>

            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Skeleton width={80} />
              <Skeleton variant="rounded" width={120} height={24} />
            </Stack>

            <Divider />

            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Skeleton width={80} />
              <Skeleton variant="rounded" width={120} height={24} />
            </Stack>

            <Divider />
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Skeleton width={120} />
              <Skeleton width={150} />
            </Stack>

            {productType !== ProductTypeEnum.PARENT && (
              <>
                <Divider />
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Skeleton width={120} />
                  <Skeleton width={150} />
                </Stack>
                <Divider />
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Skeleton width={120} />
                  <Skeleton width={150} />
                </Stack>
                <Divider />
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Skeleton width={120} />
                  <Skeleton width={150} />
                </Stack>
                <Divider />
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Skeleton width={120} />
                  <Skeleton width={150} />
                </Stack>
              </>
            )}
          </Stack>
        </Grid>
      </Grid>

      {productType === ProductTypeEnum.PARENT && (
        <Card sx={{ mt: 7 }}>
          <Stack direction="row" alignItems="center" justifyContent="space-between" px={3} py={2}>
            <Typography variant="h6">{translate('page.content.productInPartner')}</Typography>
          </Stack>

          <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', mb: 2 }}>
              <TableContainer>
                <Table sx={{ minWidth: 800 }} aria-labelledby="tableTitle" size="medium">
                  <CommonTableHead<ProductTable>
                    hideCategory
                    hideType
                    showAction
                    headCells={productHeadCells}
                    onRequestSort={() => {}}
                  />

                  <TableBody>
                    {Array.from({ length: 3 }).map((productChild, index) => {
                      return (
                        <TableRow key={index} hover tabIndex={-1} sx={{ cursor: 'pointer', height: '72.89px' }}>
                          <TableCell width={60} align="center">
                            <Stack direction="row" alignItems="center" justifyContent="center">
                              <Skeleton width={20} />
                            </Stack>
                          </TableCell>
                          <TableCell component="th" padding="none" align="center" width={80}>
                            <Skeleton variant="circular" width={40} height={40} />
                          </TableCell>
                          <TableCell component="th" scope="row" padding="none" width={160}>
                            <Skeleton />
                          </TableCell>
                          <TableCell align="left" width={152}>
                            <Skeleton />
                          </TableCell>
                          <TableCell align="left" width={125}>
                            <Skeleton />
                          </TableCell>
                          <TableCell align="left" width={110}>
                            <Skeleton />
                          </TableCell>
                          <TableCell align="left" width={117}>
                            <Skeleton />
                          </TableCell>
                          <TableCell align="left" width={110}>
                            <Skeleton />
                          </TableCell>
                          <TableCell align="left">
                            <Skeleton variant="rounded" width={120} height={24} />
                          </TableCell>
                          <TableCell align="right">
                            <Stack direction="row" alignItems="center" justifyContent="right">
                              <Skeleton variant="rounded" width={30} height={14} />
                              <IconButton color="inherit">
                                <Skeleton variant="circular" width={28} height={28} />
                              </IconButton>
                            </Stack>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={5}
                page={page}
                rowsPerPage={rowsPerPage}
                labelRowsPerPage={translate('table.rowsPerPage')}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Paper>
          </Box>
        </Card>
      )}

      <Stack direction="row" justifyContent="right" mt={10}>
        <Skeleton variant="rounded" width={79} height={36} />
      </Stack>
    </>
  );
}

export default ProductDetailPageSkeleton;
