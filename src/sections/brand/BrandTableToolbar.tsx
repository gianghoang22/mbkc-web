import ReplayIcon from '@mui/icons-material/Replay';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { Language } from 'common/enum';

import { IconButton, InputAdornment, Tooltip, Stack, TextField, MenuItem } from '@mui/material';
//
import { useLocales } from 'hooks';
import { StyledRoot, StyledSearch } from '../styles';
import React, { Dispatch, SetStateAction } from 'react';

// ----------------------------------------------------------------------

interface StoreTableToolbarProps {
  onFilterName: (event: React.ChangeEvent<HTMLInputElement>) => void;
  filterName: string;
  status: string;
  setStatus: Dispatch<SetStateAction<string>>;
}

function StoreTableToolbar({ filterName, onFilterName, setStatus, status }: StoreTableToolbarProps) {
  const { translate, currentLang } = useLocales();

  return (
    <StyledRoot>
      <Stack direction="row" gap={2}>
        <Stack width={170}>
          <TextField
            label={translate(
              'page.form.nameExchange',
              currentLang.value === Language.ENGLISH
                ? {
                    model: translate('table.status'),
                    name: translate('table.lowercase.type'),
                  }
                : {
                    model: translate('page.form.name'),
                    name: translate('table.lowercase.status'),
                  }
            )}
            select
            size="small"
            value={status}
            onChange={(event) => setStatus(event.target.value)}
            fullWidth
          >
            <MenuItem value="">None</MenuItem>
            <MenuItem value="Active">Active</MenuItem>
            <MenuItem value="Inactive">Inactive</MenuItem>
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
        <IconButton>
          <ReplayIcon />
        </IconButton>
      </Tooltip>
    </StyledRoot>
  );
}

export default StoreTableToolbar;
