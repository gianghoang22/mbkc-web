/* eslint-disable react-hooks/exhaustive-deps */
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
//
import ReplayIcon from '@mui/icons-material/Replay';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { IconButton, InputAdornment, Tooltip } from '@mui/material';
// redux
import { useAppDispatch } from 'redux/configStore';
import { getAllProducts } from 'redux/product/productSlice';

import { ListParams } from '@types';
import { useDebounce, useLocales, usePagination } from 'hooks';
import { StyledRoot, StyledSearch } from 'sections/styles';

// ----------------------------------------------------------------------

interface ProductTableToolbarProps {
  onFilterName: (event: React.ChangeEvent<HTMLInputElement>) => void;
  filterName: string;
}

function ProductTableToolbar(props: ProductTableToolbarProps) {
  const { filterName, onFilterName } = props;

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
        placeholder={translate('page.title.search', { model: translate('model.lowercase.product') })}
        startAdornment={
          <InputAdornment position="start">
            <SearchRoundedIcon sx={{ color: 'text.disabled', width: 20, height: 20 }} />
          </InputAdornment>
        }
      />

      <Tooltip title={translate('button.reload')}>
        <IconButton onClick={() => dispatch<any>(getAllProducts(params))}>
          <ReplayIcon />
        </IconButton>
      </Tooltip>
    </StyledRoot>
  );
}

export default ProductTableToolbar;
