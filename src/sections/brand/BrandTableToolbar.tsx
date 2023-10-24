import ReplayIcon from '@mui/icons-material/Replay';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';

import { IconButton, InputAdornment, MenuItem, Stack, TextField, Tooltip } from '@mui/material';
//
import { ListParams } from '@types';
import { useLocales, usePagination } from 'hooks';
import React, { Dispatch, SetStateAction, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllBrands } from 'redux/brand/brandSlice';
import { useAppDispatch } from 'redux/configStore';
import { StyledRoot, StyledSearch } from '../styles';

// ----------------------------------------------------------------------

interface StoreTableToolbarProps {
  onFilterName: (event: React.ChangeEvent<HTMLInputElement>) => void;
  filterName: string;
  status: string;
  setStatus: Dispatch<SetStateAction<string>>;
}

function StoreTableToolbar({ filterName, onFilterName, setStatus, status }: StoreTableToolbarProps) {
  const { translate } = useLocales();
  const { page, rowsPerPage } = usePagination();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const params: ListParams = useMemo(() => {
    return {
      optionParams: {
        keySearchName: filterName,
        keyStatusFilter: status,
        currentPage: page + 1,
        itemsPerPage: rowsPerPage,
      },
      navigate,
    };
  }, [page, rowsPerPage, navigate, status, filterName]);

  return (
    <StyledRoot>
      <Stack direction="row" gap={2}>
        <Stack width={170}>
          <TextField
            label={translate('table.status')}
            select
            size="small"
            value={status}
            onChange={(event) => setStatus(event.target.value)}
            fullWidth
          >
            <MenuItem value="">None</MenuItem>
            <MenuItem value="Active">{translate('status.active')}</MenuItem>
            <MenuItem value="Inactive">{translate('status.inactive')}</MenuItem>
          </TextField>
        </Stack>
        <Stack>
          <StyledSearch
            size="small"
            value={filterName}
            onChange={onFilterName}
            placeholder={translate('page.title.search', { model: translate('model.lowercase.brand') })}
            startAdornment={
              <InputAdornment position="start">
                <SearchRoundedIcon sx={{ color: 'text.disabled', width: 20, height: 20 }} />
              </InputAdornment>
            }
          />
        </Stack>
      </Stack>

      <Tooltip title={translate('button.reload')}>
        <IconButton onClick={() => dispatch(getAllBrands(params))}>
          <ReplayIcon />
        </IconButton>
      </Tooltip>
    </StyledRoot>
  );
}

export default StoreTableToolbar;
