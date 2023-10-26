/* eslint-disable react-hooks/exhaustive-deps */
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import ReplayIcon from '@mui/icons-material/Replay';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { Button, IconButton, InputAdornment, Stack, Tooltip } from '@mui/material';
// redux
import { getAllCategories } from 'redux/category/categorySlice';
import { useAppDispatch } from 'redux/configStore';
//
import { ListParams } from '@types';
import { useDebounce, useLocales, usePagination } from 'hooks';
import { StyledRoot, StyledSearch } from '../styles';

// ----------------------------------------------------------------------

interface CategoryTableToolbarProps {
  onFilterName: (event: React.ChangeEvent<HTMLInputElement>) => void;
  filterName: string;
  numSelected?: number;
  addAction?: boolean;
  onAction?: (title: any) => void;
}

function CategoryTableToolbar(props: CategoryTableToolbarProps) {
  const { filterName, onFilterName, onAction, addAction = false } = props;

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { translate } = useLocales();
  const { page, rowsPerPage } = usePagination();

  const debounceValue = useDebounce(filterName, 500);

  const params: ListParams = useMemo(() => {
    return {
      optionParams: {
        itemsPerPage: rowsPerPage,
        currentPage: page + 1,
        searchValue: debounceValue,
      },
      navigate,
    };
  }, [page, rowsPerPage, debounceValue]);

  return (
    <StyledRoot>
      <StyledSearch
        size="small"
        value={filterName}
        onChange={onFilterName}
        placeholder={translate('page.title.search', { model: translate('model.lowercase.category') })}
        startAdornment={
          <InputAdornment position="start">
            <SearchRoundedIcon sx={{ color: 'text.disabled', width: 20, height: 20 }} />
          </InputAdornment>
        }
      />

      <Stack direction="row" alignItems="center" gap={2}>
        <Tooltip title={translate('button.reload')}>
          <IconButton onClick={() => dispatch<any>(getAllCategories(params))}>
            <ReplayIcon />
          </IconButton>
        </Tooltip>

        {addAction && (
          <Button variant="outlined" onClick={onAction}>
            {translate('button.add', { model: translate('model.lowercase.categories') })}
          </Button>
        )}
      </Stack>
    </StyledRoot>
  );
}

export default CategoryTableToolbar;
