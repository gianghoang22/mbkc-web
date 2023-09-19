// @mui
import { Box, TableCell, TableHead, TableRow, TableSortLabel } from '@mui/material';
import { visuallyHidden } from '@mui/utils';
import { OrderSort, ProductCateHeadCell, ProductCategoryTable } from '@types';

// ----------------------------------------------------------------------

interface CategoryTableHeadProps {
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof ProductCategoryTable) => void;
  order: OrderSort;
  orderBy: string;
  headCells: ProductCateHeadCell[];
}

function CategoryTableHead(props: CategoryTableHeadProps) {
  const { headCells, order, orderBy, onRequestSort } = props;

  const createSortHandler = (property: keyof ProductCategoryTable) => (event: React.MouseEvent<unknown>) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell align="center">
          <TableSortLabel hideSortIcon>No</TableSortLabel>
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
        <TableCell></TableCell>
      </TableRow>
    </TableHead>
  );
}

export default CategoryTableHead;
