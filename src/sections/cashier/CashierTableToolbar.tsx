import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import ReplayIcon from '@mui/icons-material/Replay';
import { IconButton, InputAdornment, Tooltip } from '@mui/material';
import { StyledRoot, StyledSearch } from '../styles';
import { useDebounce, usePagination } from 'hooks';
import { ListParams } from '@types';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getAllCashiers } from 'redux/cashier/cashierSlice';

// ----------------------------------------------------------------------

interface CashierTableToolbarProps {
  onFilterName: (event: React.ChangeEvent<HTMLInputElement>) => void;
  filterName: string;
}

function CashierTableToolbar(props: CashierTableToolbarProps) {
  const { filterName, onFilterName } = props;
  const { page, rowsPerPage } = usePagination();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const debounceValue = useDebounce(filterName, 500);

  const params: ListParams = useMemo(() => {
    return {
      optionParams: {
        searchValue: debounceValue,
        itemsPerPage: rowsPerPage,
        currentPage: page + 1,
      },
      navigate,
    };
  }, [page, rowsPerPage, debounceValue, navigate]);

  return (
    <StyledRoot>
      <StyledSearch
        size="small"
        value={filterName}
        onChange={onFilterName}
        placeholder="Search user..."
        startAdornment={
          <InputAdornment position="start">
            <SearchRoundedIcon sx={{ color: 'text.disabled', width: 20, height: 20 }} />
          </InputAdornment>
        }
      />

      <Tooltip title="Filter list">
        <IconButton onClick={() => dispatch<any>(getAllCashiers(params))}>
          <ReplayIcon />
        </IconButton>
      </Tooltip>
    </StyledRoot>
  );
}

export default CashierTableToolbar;
