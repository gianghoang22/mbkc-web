/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
// @mui
import CloseIcon from '@mui/icons-material/Close';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Divider,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableContainer,
  TablePagination,
  Typography,
} from '@mui/material';
// redux
import { addExtraCategory, getAllCategories } from 'redux/category/categorySlice';
import { useAppDispatch, useAppSelector } from 'redux/configStore';
// section
import ExtraToCategoryRow from './ExtraToCategoryRow';
import ExtraToCategoryRowSkeleton from './ExtraToCategoryRowSkeleton';
import CategoryTableToolbar from './CategoryTableToolbar';
//
import { AddExtraCategory, CategoryTable, CategoryType, ListParams, OrderSort, Params } from '@types';
import { Language } from 'common/enum';
import { CommonTableHead, EmptyTable, SearchNotFound } from 'components';
import { useConfigHeadTable, useDebounce, useLocales, usePagination } from 'hooks';
import { getComparator, stableSort } from 'utils';

interface AddExtraToCategoryModalProps {
  isOpen: boolean;
  handleOpen: (title: any) => void;
}

function AddExtraToCategoryModal({ isOpen, handleOpen }: AddExtraToCategoryModalProps) {
  const { id: categoryId } = useParams();

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { translate, currentLang } = useLocales();
  const { categoryHeadCells } = useConfigHeadTable();
  const { page, setPage, rowsPerPage, handleChangePage, handleChangeRowsPerPage } = usePagination();

  const { categories, isLoading, numberItems } = useAppSelector((state) => state.category);

  const [order, setOrder] = useState<OrderSort>('asc');
  const [orderBy, setOrderBy] = useState<keyof CategoryTable>('name');
  const [selected, setSelected] = useState<readonly number[]>([]);
  const [filterName, setFilterName] = useState<string>('');

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof CategoryTable) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleFilterByName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = categories.map((n) => n.categoryId);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, categoryId: number) => {
    const selectedIndex = selected.indexOf(categoryId);
    let newSelected: readonly number[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, categoryId);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }

    setSelected(newSelected);
  };

  const isSelected = (categoryId: number) => selected.indexOf(categoryId) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - categories.length) : 0;

  const visibleRows = useMemo(
    () => stableSort(categories, getComparator(order, orderBy)),
    [order, orderBy, categories]
  );

  const isNotFound = !visibleRows.length && !!filterName;

  const debounceValue = useDebounce(filterName, 500);

  const params: ListParams = useMemo(() => {
    return {
      optionParams: {
        type: CategoryType.EXTRA,
        pageSize: rowsPerPage,
        pageNumber: page + 1,
        keySearchName: debounceValue,
      },
      navigate,
    };
  }, [page, rowsPerPage, debounceValue]);

  useEffect(() => {
    dispatch<any>(getAllCategories(params));
  }, [params]);

  const handleAddExtraCategory = () => {
    const params: Params<AddExtraCategory> = {
      data: { extraCategoryIds: [...selected] },
      idParams: { categoryId: Number(categoryId) },
      navigate,
    };
    dispatch<any>(addExtraCategory(params));
  };

  return (
    <>
      {isOpen && (
        <Dialog maxWidth="md" fullWidth open={isOpen} onClose={handleOpen}>
          <DialogContent sx={{ pb: 0 }}>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
              <Typography variant="h4">{translate('page.content.extraInCategory')}</Typography>

              <IconButton onClick={handleOpen}>
                <CloseIcon />
              </IconButton>
            </Stack>

            <Divider sx={{ mt: 1.5 }} />

            <Box sx={{ width: '100%' }}>
              <Paper sx={{ width: '100%', mb: 2 }}>
                <CategoryTableToolbar filterName={filterName} onFilterName={handleFilterByName} />
                <TableContainer>
                  <Table sx={{ minWidth: 800 }} aria-labelledby="tableTitle" size="medium">
                    <CommonTableHead<CategoryTable>
                      checkbox
                      numSelected={selected.length}
                      rowCount={categories.length}
                      headCells={categoryHeadCells}
                      order={order}
                      orderBy={orderBy}
                      onRequestSort={handleRequestSort}
                      onSelectAllClick={handleSelectAllClick}
                    />
                    {isLoading ? (
                      <ExtraToCategoryRowSkeleton length={visibleRows.length} />
                    ) : (
                      <TableBody>
                        {visibleRows.map((category, index) => {
                          const isItemSelected = isSelected(category.categoryId);

                          return (
                            <ExtraToCategoryRow
                              key={category.categoryId}
                              showAction
                              checkbox
                              index={index}
                              category={category}
                              handleClick={handleClick}
                              isItemSelected={isItemSelected}
                              categoryType={CategoryType.EXTRA}
                            />
                          );
                        })}
                        {emptyRows > 0 ||
                          (categories.length === 0 && !filterName && (
                            <EmptyTable
                              colNumber={categoryHeadCells.length}
                              model={translate('model.lowercase.extraCategory')}
                            />
                          ))}
                      </TableBody>
                    )}
                    {isNotFound && <SearchNotFound colNumber={categoryHeadCells.length} searchQuery={filterName} />}
                  </Table>
                </TableContainer>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  component="div"
                  count={numberItems}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </Paper>
            </Box>
          </DialogContent>
          <DialogActions>
            <Stack direction="row" alignItems="center" justifyContent="space-between" width="100%" px={2}>
              {selected.length > 0 && (
                <Typography variant="subtitle1">
                  {currentLang.value === Language.ENGLISH
                    ? `${selected.length + ' ' + translate('page.content.selected')}`
                    : `${translate('page.content.selected') + ' ' + selected.length}`}
                </Typography>
              )}

              <Stack direction="row" gap={2} ml="auto">
                <Button onClick={handleOpen} variant="text" color="secondary">
                  {translate('button.cancel')}
                </Button>
                <Button
                  onClick={() => {
                    handleOpen('addExtra');
                    handleAddExtraCategory();
                  }}
                  variant="contained"
                  autoFocus
                >
                  {translate('button.addMore')}
                </Button>
              </Stack>
            </Stack>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
}

export default AddExtraToCategoryModal;
