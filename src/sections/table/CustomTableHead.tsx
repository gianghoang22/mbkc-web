// @mui
import { Box, TableCell, TableHead, TableRow, TableSortLabel } from '@mui/material';
import { visuallyHidden } from '@mui/utils';
import { Data, HeadCell, OrderSort } from '@types';

// ----------------------------------------------------------------------

interface CustomTableHeadProps {
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void;
  order: OrderSort;
  orderBy: string;
  headCells: HeadCell[];
}

function CustomTableHead(props: CustomTableHeadProps) {
  const { headCells, order, orderBy, onRequestSort } = props;

  const createSortHandler = (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
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
      </TableRow>
    </TableHead>
  );
}

export default CustomTableHead;
