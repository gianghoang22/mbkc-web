import { useState } from 'react';
// mui
import ReplayIcon from '@mui/icons-material/Replay';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { IconButton, InputAdornment, Stack, Tooltip } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
//
import { StyledRoot, StyledSearch } from '../styles';

interface OrderTableToolbarProps {
  onFilterName: (event: React.ChangeEvent<HTMLInputElement>) => void;
  filterName: string;
}

function OrderTableToolbar(props: OrderTableToolbarProps) {
  const { filterName, onFilterName } = props;
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  return (
    <StyledRoot>
      <Stack direction="row" alignItems="center" gap={2}>
        <DatePicker
          sx={{
            '.css-1hnu5ex-MuiInputBase-root-MuiOutlinedInput-root': {
              height: '41px',
            },
            '.css-1qcidu4-MuiFormLabel-root-MuiInputLabel-root': {
              top: -7,
            },
          }}
          value={selectedDate}
          onChange={(newDate) => setSelectedDate(newDate)}
          label="Order date"
        />

        <StyledSearch
          size="small"
          value={filterName}
          onChange={onFilterName}
          placeholder="Search order..."
          startAdornment={
            <InputAdornment position="start">
              <SearchRoundedIcon sx={{ color: 'text.disabled', width: 20, height: 20 }} />
            </InputAdornment>
          }
        />
      </Stack>

      <Tooltip title="Filter list">
        <IconButton>
          <ReplayIcon />
        </IconButton>
      </Tooltip>
    </StyledRoot>
  );
}

export default OrderTableToolbar;
