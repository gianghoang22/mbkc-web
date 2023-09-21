/* eslint-disable react/prop-types */
import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material';
import { CategoryType } from '@types';
import { FC } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

interface Option {
  label: string;
  value: CategoryType;
  id: string;
}

interface SelectFieldProps {
  name: string;
  label: string;
  options?: Option[];
  children?: React.ReactNode;
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
  rules?: Record<string, unknown>;
  disabled?: boolean;
  className?: string | null;
  multiple?: boolean;
  required?: boolean;
  helperText?: string;
}

const SelectField: FC<SelectFieldProps> = ({
  name,
  label,
  options = [],
  children = null,
  size = 'small',
  fullWidth = false,
  rules = {},
  disabled = false,
  className = null,
  multiple = false,
  helperText,
  ...props
}) => {
  const { control } = useFormContext();

  return (
    <Controller
      render={({ field, fieldState }) => (
        <FormControl
          className={className || undefined}
          fullWidth={fullWidth}
          size={size === 'small' ? 'small' : size === 'medium' ? 'medium' : undefined}
          disabled={disabled}
          required={props.required}
        >
          <InputLabel htmlFor={name}>{label}</InputLabel>
          <Select multiple={multiple} id={name} label={label} {...field} {...props} value={field.value || []}>
            {children ??
              options?.map(({ label, value, id }) => (
                <MenuItem value={value} key={`${id}`}>
                  {label}
                </MenuItem>
              ))}
            {!children && !options?.length && (
              <MenuItem value="" disabled key={`${name}-select-empty`}>
                Empty
              </MenuItem>
            )}
          </Select>
          <FormHelperText sx={{ color: 'red' }}>{fieldState.error && fieldState.error.message}</FormHelperText>
        </FormControl>
      )}
      name={name}
      control={control}
      defaultValue={multiple ? [] : ''}
      rules={rules}
    />
  );
};

export default SelectField;
