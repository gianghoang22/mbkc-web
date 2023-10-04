import { useState } from 'react';

//
import { StyledRoot, StyledSearch } from '../styles';
import { CATEGORY_TYPE_OPTIONS, CategoryType } from '@types';
import { InputField, SelectField } from 'components';
import { useLocales } from 'hooks';
import { Language } from 'common/enum';
import { PRODUCT_SIZE_OPTIONS, PRODUCT_TYPE_OPTIONS, ProductSizeEnum, ProductToCreate, ProductTypeEnum } from '@types';

// mui
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { IconButton, InputAdornment, Stack, Tooltip } from '@mui/material';
import ReplayIcon from '@mui/icons-material/Replay';
// ----------------------------------------------------------------------

interface OrderTableToolbarProps {
  onFilterName: (event: React.ChangeEvent<HTMLInputElement>) => void;
  filterName: string;
}

function OrderTableToolbar(props: OrderTableToolbarProps) {
  const { filterName, onFilterName } = props;
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const { translate, currentLang } = useLocales();

  return (
    <StyledRoot>
      <Stack direction="row" alignItems="center" gap={2}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
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
        </LocalizationProvider>

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
