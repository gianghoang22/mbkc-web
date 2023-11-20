/* eslint-disable react-hooks/exhaustive-deps */
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
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
import { useAppDispatch, useAppSelector } from 'redux/configStore';
import { getAllProducts } from 'redux/product/productSlice';
// section
import { StoreTableRowDashboardSkeleton } from 'sections/store';
// interface
import { ListParams, ProductDashboardTable } from 'common/@types';
import { Color, Status } from 'common/enums';
//
import { CustomTableToolbar, EmptyTable, Label } from 'components';
import { useConfigHeadTable, useLocales } from 'hooks';
import { PATH_BRAND_APP } from 'routes/paths';

interface ListProductStatisticsProps {
  productDateFrom: Date | null;
  setProductDateFrom: Dispatch<SetStateAction<Date | null>>;
  productDateTo: Date | null;
  setProductDateTo: Dispatch<SetStateAction<Date | null>>;
}

function ListProductStatistics({
  productDateFrom,
  setProductDateFrom,
  productDateTo,
  setProductDateTo,
}: ListProductStatisticsProps) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { translate } = useLocales();
  const { productDashboardHeadCells } = useConfigHeadTable();

  const [selected, setSelected] = useState<readonly string[]>([]);
  const [showWarning, setShowWarning] = useState<boolean>(false);

  const handleChangeSearchDateFrom = (date: Date | null) => {
    setProductDateFrom(date);
  };

  const handleChangeSearchDateTo = (date: Date | null) => {
    setProductDateTo(date);
  };

  const {
    numberItems: totalProductItems,
    isLoading: isLoadingProduct,
    products,
  } = useAppSelector((state) => state.product);

  const params: ListParams = {
    optionParams: {
      itemsPerPage: 5,
      currentPage: 1,
    },
    navigate,
  };

  useEffect(() => {
    dispatch<any>(getAllProducts(params));
  }, []);

  const handleReloadData = () => {
    dispatch<any>(getAllProducts(params));
  };

  return (
    <Card>
      <CardHeader
        title={translate('page.title.productStatistics')}
        sx={{
          p: 2,
          px: 3,
          borderBottom: 1,
          borderColor: (theme) => theme.palette.grey[400],
        }}
      />
      <CustomTableToolbar<ProductDashboardTable>
        showWarning={showWarning}
        headCells={productDashboardHeadCells}
        searchDateFrom={productDateFrom}
        searchDateTo={productDateTo}
        selected={selected}
        setSelected={setSelected}
        handleChangeSearchDateFrom={handleChangeSearchDateFrom}
        handleChangeSearchDateTo={handleChangeSearchDateTo}
        handleReloadData={handleReloadData}
        haveSelectSearchDateFrom
        haveSelectSearchDateTo
      />
      <Box p={2}>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>{translate('table.no')}</TableCell>
                <TableCell>{translate('table.image')}</TableCell>
                <TableCell>{translate('table.name')}</TableCell>
                <TableCell>{translate('table.code')}</TableCell>
                <TableCell>{translate('table.quantity')}</TableCell>
                <TableCell>{translate('table.sellingPrice')}</TableCell>
                <TableCell>{translate('model.capitalizeOne.category')}</TableCell>
                <TableCell>{translate('table.type')}</TableCell>
                <TableCell>{translate('table.status')}</TableCell>
              </TableRow>
            </TableHead>

            {isLoadingProduct ? (
              <StoreTableRowDashboardSkeleton />
            ) : (
              <TableBody>
                {products.map((product, index) => (
                  <TableRow
                    key={index}
                    sx={{ cursor: 'pointer' }}
                    onClick={() => navigate(PATH_BRAND_APP.product.root + `/${product.productId}`)}
                  >
                    <TableCell width={60} align="center">
                      {index + 1}
                    </TableCell>
                    <TableCell width={100} align="left">
                      <Avatar src={product.image} alt="logo" />
                    </TableCell>

                    <TableCell align="left">{product.name}</TableCell>
                    <TableCell align="left">{product.code}</TableCell>
                    <TableCell align="left">5</TableCell>
                    <TableCell align="left">{product.sellingPrice}</TableCell>
                    <TableCell align="left">{product.categoryName}</TableCell>
                    <TableCell align="left">{product.type}</TableCell>

                    <TableCell align="left">
                      <Label
                        color={
                          product?.status === Status.ACTIVE
                            ? Color.SUCCESS
                            : product?.status === Status.INACTIVE
                            ? Color.WARNING
                            : Color.ERROR
                        }
                      >
                        {product?.status === Status.INACTIVE
                          ? translate('status.inactive')
                          : product?.status === Status.ACTIVE
                          ? translate('status.active')
                          : translate('status.deActive')}
                      </Label>
                    </TableCell>
                  </TableRow>
                ))}

                {products.length === 0 && <EmptyTable colNumber={6} model={translate('model.lowercase.store')} />}
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
              to={PATH_BRAND_APP.product.list}
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

export default ListProductStatistics;
