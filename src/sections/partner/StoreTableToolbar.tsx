import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import ReplayIcon from '@mui/icons-material/Replay';
import { IconButton, InputAdornment, Tooltip } from '@mui/material';
import { StyledRoot, StyledSearch } from '../styles';
import { useLocales } from 'hooks';

// ----------------------------------------------------------------------

interface StoreTableToolbarProps {
  onFilterName: (event: React.ChangeEvent<HTMLInputElement>) => void;
  filterName: string;
}

function StoreTableToolbar(props: StoreTableToolbarProps) {
  const { filterName, onFilterName } = props;
  const { translate } = useLocales();

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
        <IconButton>
          <ReplayIcon />
        </IconButton>
      </Tooltip>
    </StyledRoot>
  );
}

export default StoreTableToolbar;
