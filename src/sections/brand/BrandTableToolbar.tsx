import ReplayIcon from '@mui/icons-material/Replay'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import { IconButton, InputAdornment, Tooltip } from '@mui/material'
//
import { useLocales } from 'hooks'
import { StyledRoot, StyledSearch } from '../styles'

// ----------------------------------------------------------------------

interface StoreTableToolbarProps {
  onFilterName: (event: React.ChangeEvent<HTMLInputElement>) => void
  filterName: string
}

function StoreTableToolbar({ filterName, onFilterName }: StoreTableToolbarProps) {
  const { translate } = useLocales()

  return (
    <StyledRoot>
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

      <Tooltip title={translate('button.reload')}>
        <IconButton>
          <ReplayIcon />
        </IconButton>
      </Tooltip>
    </StyledRoot>
  )
}

export default StoreTableToolbar
