import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import ReplayIcon from '@mui/icons-material/Replay';
import { IconButton, InputAdornment, Tooltip } from '@mui/material';
import { StyledRoot, StyledSearch } from '../styles';

// ----------------------------------------------------------------------

interface ShipperPaymentTableToolbarProps {
  onFilterName: (event: React.ChangeEvent<HTMLInputElement>) => void;
  filterName: string;
}

function ShipperPaymentTableToolbar(props: ShipperPaymentTableToolbarProps) {
  const { filterName, onFilterName } = props;

  return (
    <StyledRoot>
      <StyledSearch
        size="small"
        value={filterName}
        onChange={onFilterName}
        placeholder="Search shipper payment..."
        startAdornment={
          <InputAdornment position="start">
            <SearchRoundedIcon sx={{ color: 'text.disabled', width: 20, height: 20 }} />
          </InputAdornment>
        }
      />

      <Tooltip title="Filter list">
        <IconButton>
          <ReplayIcon />
        </IconButton>
      </Tooltip>
    </StyledRoot>
  );
}

export default ShipperPaymentTableToolbar;
