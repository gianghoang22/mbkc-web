/* eslint-disable react-hooks/exhaustive-deps */
import { Dispatch, SetStateAction, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
// @mui
import ReplayIcon from '@mui/icons-material/Replay';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import SettingsIcon from '@mui/icons-material/Settings';
import {
  Autocomplete,
  Button,
  Checkbox,
  Divider,
  IconButton,
  InputAdornment,
  Popover as MUIPopover,
  MenuItem,
  Stack,
  TextField,
  Tooltip,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
//redux
import { useAppSelector } from 'redux/configStore';
//
import { HeadCell, OptionSelect, OrderSortBy, ProductTypeEnum } from '@types';
import { PartnerOrderStatus, Role, Status, SystemStatusToFilter } from 'common/enum';
import { useLocales, usePopover } from 'hooks';
import { PATH_ADMIN_APP, PATH_BRAND_APP } from 'routes/paths';
import { StyledRoot, StyledSearch } from './styles';

interface CustomTableToolbarProps<T> {
  headCells: HeadCell<T>[];
  filterName: string;
  onFilterName: (event: React.ChangeEvent<HTMLInputElement>) => void;
  selected: readonly string[];
  setSelected: Dispatch<SetStateAction<readonly string[]>>;
  haveSelectStatus?: boolean;
  haveSelectSystemStatus?: boolean;
  haveSelectPartnerOrderStatus?: boolean;
  options?: OptionSelect[];
  secondOptions?: OptionSelect[];
  status?: OptionSelect | null;
  haveSelectSearchDateFrom?: boolean;
  searchDateFrom?: Date | null;
  handleChangeSearchDateFrom?: (date: Date | null) => void;
  haveSelectSearchDateTo?: boolean;
  searchDateTo?: Date | null;
  handleChangeSearchDateTo?: (date: Date | null) => void;
  handleChangeStatus?: (option: OptionSelect | null) => void;
  handleChangeSystemStatus?: (option: OptionSelect | null) => void;
  handleChangePartnerOrderStatus?: (option: OptionSelect | null) => void;
  handleReloadData: () => void;
  model: string;
  addAction?: boolean;
  onAction?: () => void;
  haveSelectProductType?: boolean;
  productType?: OptionSelect | null;
  setProductType?: Dispatch<SetStateAction<OptionSelect | null>>;
}

function CustomTableToolbar<T>(props: CustomTableToolbarProps<T>) {
  const {
    headCells,
    filterName,
    onFilterName,
    selected,
    setSelected,
    options,
    secondOptions,
    status,
    searchDateFrom,
    searchDateTo,
    handleChangeSearchDateFrom,
    handleChangeSearchDateTo,
    handleChangeStatus,
    handleChangeSystemStatus,
    handleChangePartnerOrderStatus,
    haveSelectStatus,
    haveSelectSystemStatus,
    haveSelectPartnerOrderStatus,
    haveSelectSearchDateFrom,
    haveSelectSearchDateTo,
    handleReloadData,
    model,
    addAction,
    onAction,
    haveSelectProductType,
    productType,
    setProductType,
  } = props;

  const { id } = useParams();

  const { pathname } = useLocation();
  const { translate } = useLocales();
  const { open, handleOpenMenu, handleCloseMenu } = usePopover();

  const { userAuth } = useAppSelector((state) => state.auth);

  const selectedFilter = selected.filter(
    (cell) =>
      cell !== OrderSortBy.NAME &&
      cell !== OrderSortBy.STATUS &&
      cell !== OrderSortBy.FULL_NAME &&
      cell !== OrderSortBy.PRODUCT_NAME &&
      cell !== OrderSortBy.PRODUCT_CODE
  );
  const headCellFilter = headCells.filter(
    (cell) =>
      cell.id.toString() !== OrderSortBy.NAME &&
      cell.id.toString() !== OrderSortBy.FULL_NAME &&
      cell.id.toString() !== OrderSortBy.STATUS &&
      cell.id.toString() !== OrderSortBy.PRODUCT_NAME &&
      cell.id.toString() !== OrderSortBy.PRODUCT_CODE
  );

  useEffect(() => {
    const newSelected = headCells.map((n) =>
      userAuth?.roleName === Role.MBKC_ADMIN && pathname === PATH_ADMIN_APP.store.list
        ? n.id.toString() !== OrderSortBy.STORE_MANAGER_EMAIL
          ? n.id.toString()
          : ''
        : userAuth?.roleName === Role.BRAND_MANAGER && pathname === PATH_BRAND_APP.product.list
        ? n.id.toString() !== OrderSortBy.HISTORICAL_PRICE && n.id.toString() !== OrderSortBy.DISCOUNT_PRICE
          ? n.id.toString()
          : ''
        : userAuth?.roleName === Role.BRAND_MANAGER && pathname === `${PATH_BRAND_APP.category.root}/${id}`
        ? n.id.toString() !== OrderSortBy.HISTORICAL_PRICE && n.id.toString() !== OrderSortBy.DISCOUNT_PRICE
          ? n.id.toString()
          : ''
        : userAuth?.roleName === Role.BRAND_MANAGER && pathname === `${PATH_BRAND_APP.category.rootExtra}/${id}`
        ? n.id.toString() !== OrderSortBy.HISTORICAL_PRICE && n.id.toString() !== OrderSortBy.DISCOUNT_PRICE
          ? n.id.toString()
          : ''
        : userAuth?.roleName === Role.BRAND_MANAGER && pathname === PATH_BRAND_APP.storePartner.list
        ? n.id.toString() !== OrderSortBy.STATUS &&
          n.id.toString() !== OrderSortBy.LOGO &&
          n.id.toString() !== OrderSortBy.BRAND &&
          n.id.toString() !== OrderSortBy.STORE_MANAGER_EMAIL
          ? n.id.toString()
          : ''
        : n.id.toString()
    );
    setSelected([...newSelected]);
  }, []);

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = headCells.map((cell) => cell.id.toString());
      setSelected([...newSelected]);
      return;
    }
    setSelected([
      OrderSortBy.NAME,
      OrderSortBy.STATUS,
      OrderSortBy.PRODUCT_NAME,
      OrderSortBy.PRODUCT_CODE,
      OrderSortBy.FULL_NAME,
    ]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, id: string) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: readonly string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }

    setSelected(newSelected);
  };

  const isSelected = (id: string) => selected.indexOf(id) !== -1;

  return (
    <>
      <StyledRoot>
        <Stack direction="row" gap={2}>
          {handleChangeStatus && haveSelectStatus && (
            <Stack width={250}>
              <Autocomplete
                fullWidth
                size="small"
                options={options ? options : []}
                getOptionLabel={(option) =>
                  option.value === Status.ACTIVE
                    ? translate('status.active')
                    : option.value === Status.INACTIVE
                    ? translate('status.inactive')
                    : option.value === Status.BE_CONFIRMING
                    ? translate('status.beConfirming')
                    : option.value === Status.REJECTED
                    ? translate('status.reject')
                    : ''
                }
                renderInput={(params) => (
                  <TextField {...params} label={translate('table.status')} InputLabelProps={{}} />
                )}
                value={status}
                onChange={(event: any, newValue: OptionSelect | null) => handleChangeStatus(newValue)}
              />
            </Stack>
          )}

          {handleChangeSearchDateFrom && haveSelectSearchDateFrom && (
            <DatePicker
              slotProps={{ textField: { size: 'small' } }}
              label="From date"
              value={searchDateFrom}
              onChange={(newValue: Date | null) => handleChangeSearchDateFrom(newValue)}
            />
          )}

          {handleChangeSearchDateTo && haveSelectSearchDateTo && (
            <DatePicker
              slotProps={{ textField: { size: 'small' } }}
              label="To date"
              value={searchDateTo}
              onChange={(newValue: Date | null) => handleChangeSearchDateTo(newValue)}
            />
          )}

          {handleChangeSystemStatus && haveSelectSystemStatus && (
            <Stack width={250}>
              <Autocomplete
                fullWidth
                size="small"
                options={options ? options : []}
                getOptionLabel={(option) =>
                  option.value === SystemStatusToFilter.IN_STORE
                    ? translate('status.inStore')
                    : option.value === SystemStatusToFilter.READY_DELIVERY
                    ? translate('status.readyDelivery')
                    : option.value === SystemStatusToFilter.COMPLETED
                    ? translate('status.completed')
                    : option.value === SystemStatusToFilter.CANCELLED
                    ? translate('status.cancelled')
                    : ''
                }
                renderInput={(params) => (
                  <TextField {...params} label={translate('table.systemStatus')} InputLabelProps={{}} />
                )}
                value={status}
                onChange={(event: any, newValue: OptionSelect | null) => handleChangeSystemStatus(newValue)}
              />
            </Stack>
          )}

          {handleChangePartnerOrderStatus && haveSelectPartnerOrderStatus && (
            <Stack width={250}>
              <Autocomplete
                fullWidth
                size="small"
                options={secondOptions ? secondOptions : []}
                getOptionLabel={(option) =>
                  option.value === PartnerOrderStatus.PREPARING
                    ? translate('status.preparing')
                    : option.value === PartnerOrderStatus.READY
                    ? translate('status.ready')
                    : option.value === PartnerOrderStatus.UPCOMING
                    ? translate('status.upcoming')
                    : option.value === PartnerOrderStatus.COMPLETED
                    ? translate('status.completed')
                    : option.value === PartnerOrderStatus.CANCELLED
                    ? translate('status.cancelled')
                    : ''
                }
                renderInput={(params) => (
                  <TextField {...params} label={translate('table.partnerOrderStatus')} InputLabelProps={{}} />
                )}
                value={status}
                onChange={(event: any, newValue: OptionSelect | null) => handleChangePartnerOrderStatus(newValue)}
              />
            </Stack>
          )}

          {setProductType && haveSelectProductType && (
            <Stack width={250}>
              <Autocomplete
                fullWidth
                size="small"
                options={options ? options : []}
                getOptionLabel={(option) =>
                  option.value === ProductTypeEnum.PARENT
                    ? translate('productType.parent')
                    : option.value === ProductTypeEnum.CHILD
                    ? translate('productType.child')
                    : option.value === ProductTypeEnum.SINGLE
                    ? translate('productType.single')
                    : option.value === ProductTypeEnum.EXTRA
                    ? translate('productType.extra')
                    : ''
                }
                renderInput={(params) => <TextField {...params} label={translate('table.type')} InputLabelProps={{}} />}
                value={productType}
                onChange={(event: any, newValue: OptionSelect | null) => setProductType(newValue)}
              />
            </Stack>
          )}

          <StyledSearch
            size="small"
            value={filterName}
            onChange={onFilterName}
            placeholder={translate('page.title.search', { model: model })}
            startAdornment={
              <InputAdornment position="start">
                <SearchRoundedIcon sx={{ color: 'text.disabled', width: 20, height: 20 }} />
              </InputAdornment>
            }
          />
        </Stack>

        <Stack direction="row" gap={1}>
          <Tooltip title={translate('button.reload')}>
            <IconButton onClick={handleReloadData}>
              <ReplayIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title={translate('button.setting')}>
            <IconButton onClick={handleOpenMenu}>
              <SettingsIcon />
            </IconButton>
          </Tooltip>

          {addAction && (
            <Button variant="outlined" onClick={onAction}>
              {translate('button.add', { model: translate('model.lowercase.extraCategories') })}
            </Button>
          )}
        </Stack>
      </StyledRoot>

      <MUIPopover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        PaperProps={{
          sx: {
            p: 1,
            mt: 0.5,
            minWidth: 200,
            '& .MuiMenuItem-root': {
              px: 1,
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        <MenuItem>
          <Checkbox
            color="primary"
            indeterminate={selectedFilter.length > 0 && selectedFilter.length < headCellFilter.length}
            checked={headCellFilter.length > 0 && selectedFilter.length === headCellFilter.length}
            onChange={handleSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          />
          {translate('button.showColumns')}
        </MenuItem>
        <Divider />
        {headCells
          .filter(
            (cell) =>
              cell.id.toString() !== OrderSortBy.NAME &&
              cell.id.toString() !== OrderSortBy.FULL_NAME &&
              cell.id.toString() !== OrderSortBy.STATUS &&
              cell.id.toString() !== OrderSortBy.PRODUCT_NAME &&
              cell.id.toString() !== OrderSortBy.PRODUCT_CODE
          )
          .map((cell, index) => {
            const isItemSelected = isSelected(cell.id as string);
            return (
              <MenuItem key={cell.id as string}>
                <Checkbox
                  color="primary"
                  checked={isItemSelected}
                  inputProps={{
                    'aria-labelledby': `enhanced-table-checkbox-${index}`,
                  }}
                  onClick={(event) => handleClick(event, cell.id as string)}
                />
                {cell.label}
              </MenuItem>
            );
          })}
      </MUIPopover>
    </>
  );
}

export default CustomTableToolbar;
