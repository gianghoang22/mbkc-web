import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui icon
import ReplayIcon from '@mui/icons-material/Replay';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
// @mui
import { IconButton, InputAdornment, Stack, Tooltip } from '@mui/material';
// redux
import { getAllBrands } from 'redux/brand/brandSlice';
import { useAppDispatch } from 'redux/configStore';
//
import { ListParams } from '@types';
import { useLocales, usePagination } from 'hooks';
import { StyledRoot, StyledSearch } from '../styles';

interface BrandTableToolbarProps {
  filterName: string;
  onFilterName: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function BrandTableToolbar({ filterName, onFilterName }: BrandTableToolbarProps) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { translate } = useLocales();
  const { page, rowsPerPage } = usePagination();

  const params: ListParams = useMemo(() => {
    return {
      optionParams: {
        keySearchName: filterName,
        currentPage: page + 1,
        itemsPerPage: rowsPerPage,
      },
      navigate,
    };
  }, [page, rowsPerPage, navigate, filterName]);

  return (
    <StyledRoot>
      <Stack direction="row" gap={2}>
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

export default BrandTableToolbar;
