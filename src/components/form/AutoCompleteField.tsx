import { Autocomplete, FormHelperText, TextField } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';

interface Option {
  label: string;
  value: number;
}

interface AutoCompleteFieldProps {
  name: string;
  label: string;
  options: readonly Option[];
  rules?: Record<string, any>;
  defaultValue?: string | string[];
  placeholder?: string;
  transformValue?: (value: any) => any;
  getOptionLabel: any;
  isOptionEqualToValue: any;
  multiple?: boolean;
  disabled?: boolean;
  type: string;
  size?: 'small' | 'medium';
}

const AutoCompleteField: React.FC<AutoCompleteFieldProps> = ({
  name,
  label,
  type,
  size = 'small',
  multiple,
  rules = {},
  defaultValue = '',
  placeholder = '',
  options,
  getOptionLabel,
  transformValue,
  isOptionEqualToValue,
  ...props
}) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={multiple ? [] : ''}
      rules={rules}
      render={({ field, fieldState }) => (
        <Autocomplete
          {...field}
          {...props}
          fullWidth
          size={size}
          options={options.map((option) => ({
            label: option.label,
            value: option.value,
            key: option.value.toString(), // Đảm bảo key là duy nhất
          }))}
          getOptionLabel={getOptionLabel}
          isOptionEqualToValue={isOptionEqualToValue}
          value={field.value ? field.value : multiple ? [] : null}
          // inputValue={field.value ? field.value : multiple ? [] : ''}
          onChange={(_: any, newValue) => {
            console.log(newValue);
            if (newValue === null || newValue === undefined) {
              newValue = '';
            }
            const updateValue = transformValue ? transformValue(newValue) : newValue;
            field.onChange(updateValue);
          }}
          renderInput={(params: any) => (
            <>
              <TextField
                {...params}
                {...props}
                variant="outlined"
                // error={Boolean(fieldState.error)}
                // helperText={fieldState.error?.message}
                label={label}
                placeholder={placeholder}
                disabled={props.disabled}
              />
              <FormHelperText sx={{ color: 'red', ml: 2 }}>
                {fieldState.error && fieldState.error.message}
              </FormHelperText>
            </>
          )}
          {...props}
        />
      )}
    />
  );
};

export default AutoCompleteField;
