import { FC } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
// @mui
import { Box, FormHelperText, Typography } from '@mui/material';
//
import UploadAvatar from '../upload/UploadAvatar';

interface UploadImageFieldProps {
  name: string;
  label: string;
  defaultValue?: any;
  isEditing: boolean;
}

const UploadImageField: FC<UploadImageFieldProps> = ({ name, label, defaultValue = '', isEditing, ...others }) => {
  const { control } = useFormContext();

  return (
    <Controller
      defaultValue={defaultValue}
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <Box sx={{ mb: 5, width: 'fit-content' }} {...others}>
          <UploadAvatar
            caption={
              <Typography
                variant="caption"
                sx={{
                  mt: 2,
                  mx: 'auto',
                  display: 'block',
                  textAlign: 'center',
                  color: 'text.secondary',
                }}
              >
                {label}
              </Typography>
            }
            error={Boolean(fieldState.error)}
            value={field.value}
            onChange={field.onChange}
            isEditing={isEditing}
            file={null}
          />
          <FormHelperText error sx={{ px: 2, textAlign: 'center' }}>
            {fieldState.error && fieldState.error.message}
          </FormHelperText>
        </Box>
      )}
    />
  );
};

export default UploadImageField;
