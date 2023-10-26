import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// @mui
import ReplayIcon from '@mui/icons-material/Replay';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { IconButton, InputAdornment, Tooltip } from '@mui/material';
// redux
import { getAllBankingAccounts } from 'redux/bankingAccount/bankingAccountSlice';
//
import { ListParams } from '@types';
import { usePagination } from 'hooks';
import { StyledRoot, StyledSearch } from '../styles';

// ----------------------------------------------------------------------

interface BankingAccountTableToolbarProps {
  onFilterName: (event: React.ChangeEvent<HTMLInputElement>) => void;
  filterName: string;
}

function BankingAccountTableToolbar(props: BankingAccountTableToolbarProps) {
  const { filterName, onFilterName } = props;
  const { page, rowsPerPage } = usePagination();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const params: ListParams = useMemo(() => {
    return {
      optionParams: {
        itemsPerPage: rowsPerPage,
        currentPage: page + 1,
        searchValue: filterName,
      },
      navigate,
    };
  }, [page, rowsPerPage, filterName, navigate]);

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
        <IconButton onClick={() => dispatch<any>(getAllBankingAccounts(params))}>
          <ReplayIcon />
        </IconButton>
      </Tooltip>
    </StyledRoot>
  );
}

export default BankingAccountTableToolbar;
