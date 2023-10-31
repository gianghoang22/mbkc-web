/* eslint-disable react/prop-types */
import { FormControl, FormHelperText } from '@mui/material';
import { TimeClock } from '@mui/x-date-pickers/TimeClock';
import dayjs from 'dayjs';
import { Controller, useFormContext } from 'react-hook-form';

interface TimePickerFieldProps {
  name: string;
  label: string;
  fullWidth?: boolean;
  rules?: Record<string, unknown>;
  disabled?: boolean;
  className?: string | null;
  required?: boolean;
  helperText?: string;
  defaultValue?: string;
}

const TimePickerField = ({
  name,
  label,
  fullWidth = false,
  rules = {},
  defaultValue = '',
  disabled = false,
  className = null,
  helperText,
  ...props
}: TimePickerFieldProps) => {
  const { control, setValue } = useFormContext();

  return (
    <Controller
      name={name}
      rules={rules}
      control={control}
      defaultValue={defaultValue}
      render={({ field, fieldState }) => (
        <FormControl error={false} className={className || undefined} fullWidth={fullWidth}>
          <TimeClock
            {...field}
            value={dayjs(field.value)}
            onChange={(newValue) => {
              field.onChange(newValue);
              setValue(name, newValue);
            }}
            {...props}
          />
          <FormHelperText sx={{ color: 'red' }}>{fieldState.error && fieldState.error.message}</FormHelperText>
        </FormControl>
      )}
    />
  );
};

export default TimePickerField;
