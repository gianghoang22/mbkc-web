/* eslint-disable react-hooks/exhaustive-deps */
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import ReplayIcon from '@mui/icons-material/Replay';
import { IconButton, InputAdornment, Tooltip } from '@mui/material';
import { StyledRoot, StyledSearch } from '../styles';
import { useDebounce, useLocales, usePagination } from 'hooks';
import { ListParams } from '@types';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from 'redux/configStore';
import { getAllStores } from 'redux/store/storeSlice';

// ----------------------------------------------------------------------

interface StoreTableToolbarProps {
  onFilterName: (event: React.ChangeEvent<HTMLInputElement>) => void;
  filterName: string;
}

function StoreTableToolbar({ filterName, onFilterName }: StoreTableToolbarProps) {
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
        placeholder={translate('page.title.search', { model: translate('model.lowercase.store') })}
        startAdornment={
          <InputAdornment position="start">
            <SearchRoundedIcon sx={{ color: 'text.disabled', width: 20, height: 20 }} />
          </InputAdornment>
        }
      />

      <Tooltip title={translate('button.reload')}>
        <IconButton onClick={() => dispatch<any>(getAllStores(params))}>
          <ReplayIcon />
        </IconButton>
      </Tooltip>
    </StyledRoot>
  );
}

export default StoreTableToolbar;
