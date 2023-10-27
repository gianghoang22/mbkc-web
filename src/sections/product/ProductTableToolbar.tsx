/* eslint-disable react-hooks/exhaustive-deps */
import { Dispatch, SetStateAction, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
//
import ReplayIcon from '@mui/icons-material/Replay';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { IconButton, InputAdornment, Stack, TextField, Tooltip } from '@mui/material';
// redux
import { useAppDispatch } from 'redux/configStore';
import { getAllProducts } from 'redux/product/productSlice';
// section
import { StyledRoot, StyledSearch } from 'sections/styles';
//
import { ListParams, OptionSelect, PRODUCT_TYPE_OPTIONS, ProductTypeEnum } from '@types';
import { useDebounce, useLocales, usePagination } from 'hooks';
import { Autocomplete } from '@mui/material';

interface ProductTableToolbarProps {
  onFilterName: (event: React.ChangeEvent<HTMLInputElement>) => void;
  filterName: string;
  haveSelectProductType?: boolean;
  productType: OptionSelect | null;
  setProductType: Dispatch<SetStateAction<OptionSelect | null>>;
}

function ProductTableToolbar(props: ProductTableToolbarProps) {
  const { filterName, onFilterName, haveSelectProductType, productType, setProductType } = props;

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { translate } = useLocales();
  const { page, rowsPerPage } = usePagination();

  const debounceValue = useDebounce(filterName, 500);

  const params: ListParams = useMemo(() => {
    return {
      optionParams: {
        searchValue: debounceValue,
        currentPage: page + 1,
        itemsPerPage: rowsPerPage,
        productType: productType?.value,
      },
      navigate,
    };
  }, [page, rowsPerPage, debounceValue]);

  return (
    <StyledRoot>
      <Stack direction="row" gap={2}>
        {haveSelectProductType && (
          <Stack width={250}>
            <Autocomplete
              fullWidth
              size="small"
              options={PRODUCT_TYPE_OPTIONS.slice(0, 3)}
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
          placeholder={translate('page.title.search', { model: translate('model.lowercase.product') })}
          startAdornment={
            <InputAdornment position="start">
              <SearchRoundedIcon sx={{ color: 'text.disabled', width: 20, height: 20 }} />
            </InputAdornment>
          }
        />
      </Stack>

      <Tooltip title={translate('button.reload')}>
        <IconButton onClick={() => dispatch<any>(getAllProducts(params))}>
          <ReplayIcon />
        </IconButton>
      </Tooltip>
    </StyledRoot>
  );
}

export default ProductTableToolbar;
