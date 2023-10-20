import { useState } from 'react';
// mui
import TabsMui from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Label from 'components/label/Label';
import { Color } from 'common/enum';

function Tabs() {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <TabsMui value={value} onChange={handleChange} aria-label="tabs">
      <Tab
        icon={<Label color={value === 0 ? Color.PRIMARY : Color.DEFAULT}>20</Label>}
        label="All"
        iconPosition="end"
      />
      <Tab
        icon={<Label color={value === 1 ? Color.PRIMARY : Color.DEFAULT}>20</Label>}
        iconPosition="end"
        label="Ready"
      />
      <Tab
        icon={<Label color={value === 2 ? Color.PRIMARY : Color.DEFAULT}>20</Label>}
        iconPosition="end"
        label="Be preparing"
      />
      <Tab
        icon={<Label color={value === 3 ? Color.PRIMARY : Color.DEFAULT}>20</Label>}
        iconPosition="end"
        label="Waiting for goods"
      />
      <Tab
        icon={<Label color={value === 4 ? Color.PRIMARY : Color.DEFAULT}>20</Label>}
        iconPosition="end"
        label="Done"
      />
      <Tab
        icon={<Label color={value === 5 ? Color.PRIMARY : Color.DEFAULT}>20</Label>}
        iconPosition="end"
        label="Canceled"
      />
    </TabsMui>
  );
}

export default Tabs;
