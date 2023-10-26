import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// @mui
import ReplayIcon from '@mui/icons-material/Replay';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { IconButton, InputAdornment, Tooltip } from '@mui/material';
// redux
import { getAllKitchenCenters } from 'redux/kitchenCenter/kitchenCenterSlice';
//
import { ListParams } from '@types';
import { useLocales, usePagination } from 'hooks';
import { StyledRoot, StyledSearch } from '../styles';

// ----------------------------------------------------------------------

interface KitchenCenterTableToolbarProps {
  onFilterName: (event: React.ChangeEvent<HTMLInputElement>) => void;
  filterName: string;
}

function KitchenCenterTableToolbar({ filterName, onFilterName }: KitchenCenterTableToolbarProps) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { translate } = useLocales();
  const { page, rowsPerPage } = usePagination();

  const params: ListParams = useMemo(() => {
    return {
      optionParams: {
        itemsPerPage: rowsPerPage,
        currentPage: page + 1,
        keySearchName: filterName,
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
        placeholder={translate('page.title.search', { model: translate('model.lowercase.kitchenCenter') })}
        startAdornment={
          <InputAdornment position="start">
            <SearchRoundedIcon sx={{ color: 'text.disabled', width: 20, height: 20 }} />
          </InputAdornment>
        }
      />

      <Tooltip title="Filter list">
        <IconButton onClick={() => dispatch<any>(getAllKitchenCenters(params))}>
          <ReplayIcon />
        </IconButton>
      </Tooltip>
    </StyledRoot>
  );
}

export default KitchenCenterTableToolbar;
