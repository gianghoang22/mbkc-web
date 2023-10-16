import React from 'react';
import { Tabs, Tab } from '@mui/material';
import Label from 'components/label/Label';
import { Color } from 'common/enum';
import { CircularProgress } from '@mui/material';

interface Option<T> {
  label: string;
  value: T;
  id: string;
}

interface CustomTabsProps<T> {
  isLoading: boolean;
  length: number;
  value: string | number;
  handleChange: (event: React.SyntheticEvent, newValue: any) => void;
  options: Option<T>[];
}

function CustomTabs<T extends string | number>({
  value,
  handleChange,
  options,
  isLoading,
  length,
}: CustomTabsProps<T>) {
  return (
    <Tabs value={value} onChange={handleChange} sx={{ height: 50, borderBottom: 1, borderColor: 'divider' }}>
      {options.map((option) => (
        <Tab
          key={option.id}
          value={option.value}
          label={option.label}
          icon={
            value === option.value && isLoading ? (
              <CircularProgress size={15} sx={{ ml: 3 }} />
            ) : (
              <>
                {value === option.value ? (
                  <Label color={value === option.value ? Color.PRIMARY : Color.DEFAULT} sx={{ ml: 1 }}>
                    {length}
                  </Label>
                ) : (
                  <></>
                )}
              </>
            )
          }
          iconPosition="end"
          sx={{ height: 50, pl: 2, pr: value === option.value ? 1 : 2 }}
        />
      ))}
    </Tabs>
  );
}

export default CustomTabs;
