import React from 'react';
import { Box, TableCell, TableHead, TableRow, TableSortLabel, Checkbox } from '@mui/material';
import { visuallyHidden } from '@mui/utils';
import { HeadCell, OrderSort } from '@types';

interface CommonTableHeadProps<T> {
  numSelected?: number;
  rowCount?: number;
  checkbox?: boolean;
  justInfo?: boolean;
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof T) => void;
  onSelectAllClick?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: OrderSort;
  orderBy: string;
  headCells: HeadCell<T>[];
}

function CommonTableHead<T>(props: CommonTableHeadProps<T>) {
  const {
    numSelected = 0,
    rowCount = 0,
    checkbox = false,
    justInfo = false,
    onSelectAllClick,
    headCells,
    order,
    orderBy,
    onRequestSort,
  } = props;

  const createSortHandler = (property: keyof T) => (event: React.MouseEvent<unknown>) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {checkbox ? (
          <TableCell padding="checkbox">
            <Checkbox
              color="primary"
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
              inputProps={{
                'aria-label': 'select all desserts',
              }}
            />
          </TableCell>
        ) : (
          <TableCell align="center">
            <TableSortLabel hideSortIcon>No</TableSortLabel>
          </TableCell>
        )}

        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id as string}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            {!headCell.hideSortIcon ? (
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
                hideSortIcon={headCell.hideSortIcon ? true : false}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </Box>
                ) : null}
              </TableSortLabel>
            ) : (
              <TableSortLabel hideSortIcon>{headCell.label}</TableSortLabel>
            )}
          </TableCell>
        ))}
        {!justInfo && <TableCell></TableCell>}
      </TableRow>
    </TableHead>
  );
}

export default CommonTableHead;
