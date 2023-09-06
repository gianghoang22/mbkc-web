import { TextField, TextFieldProps } from '@mui/material';
import React, { ChangeEvent } from 'react';
import { Control, FieldValues, Path, useController } from 'react-hook-form';

export type InputFieldProps<T extends FieldValues> = TextFieldProps & {
  name: Path<T>;
  control: Control<T>;
};

function InputField<T extends FieldValues>({
  name,
  control,
  placeholder,
  onChange: externalOnChange,
  onBlur: externalOnBlur,
  ref: externalRef,
  value: externalValue,
  ...rest
}: InputFieldProps<T>) {
  const {
    field: { onChange, onBlur, value, ref },
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  return (
    <TextField
      sx={{
        width: '460px',
        height: '52px',
        '.css-n26ql7-MuiInputBase-input-MuiOutlinedInput-input': {
          padding: '15.5px 14px',
        },
        '.css-17t7cud-MuiInputBase-root-MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
          borderColor: '#000',
        },
      }}
      placeholder={placeholder}
      name={name}
      value={value}
      onChange={(event: ChangeEvent<HTMLInputElement>) => {
        onChange(event);
        externalOnChange?.(event);
      }}
      onBlur={onBlur}
      inputRef={ref}
      error={!!error}
      helperText={error?.message}
      {...rest}
    />
  );
}

export default InputField;
