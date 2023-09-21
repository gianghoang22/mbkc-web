import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import ReplayIcon from '@mui/icons-material/Replay';
import { IconButton, InputAdornment, Tooltip, Stack, Button } from '@mui/material';
import { StyledRoot, StyledSearch } from '../styles';

// ----------------------------------------------------------------------

interface CategoryTableToolbarProps {
  onFilterName: (event: React.ChangeEvent<HTMLInputElement>) => void;
  filterName: string;
  numSelected?: number;
  addAction?: boolean;
  onAction?: (title: any) => void;
}

function CategoryTableToolbar(props: CategoryTableToolbarProps) {
  const { filterName, onFilterName, onAction, addAction = false } = props;

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

      <Stack direction="row" alignItems="center" gap={2}>
        <Tooltip title="Reload">
          <IconButton>
            <ReplayIcon />
          </IconButton>
        </Tooltip>

        {addAction && (
          <Button variant="outlined" onClick={onAction}>
            Add categories
          </Button>
        )}
      </Stack>
    </StyledRoot>
  );
}

export default CategoryTableToolbar;
