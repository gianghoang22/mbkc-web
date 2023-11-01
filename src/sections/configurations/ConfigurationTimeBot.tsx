import dayjs from 'dayjs';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
// @mui
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { Box, FormControlLabel, InputAdornment, Stack, Switch, TextField, Typography, Button } from '@mui/material';
import { DemoItem } from '@mui/x-date-pickers/internals/demo';
import { TimeView } from '@mui/x-date-pickers';
//
import { TimePickerField } from 'components';
import { useLocales } from 'hooks';

function ConfigurationTimeBot() {
  const { translate } = useLocales();

  const [checked, setChecked] = useState(false);
  const [startTime, setStartTime] = useState<string>('');
  const [endTime, setEndTime] = useState<string>('');
  const [viewStart, setViewStart] = useState<TimeView>('hours');
  const [viewEnd, setViewEnd] = useState<TimeView>('hours');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  const { watch } = useFormContext();

  const scrawlingOrderStartTime = watch('scrawlingOrderStartTime');
  const scrawlingOrderEndTime = watch('scrawlingOrderEndTime');

  useEffect(() => {
    setStartTime(moment(dayjs(scrawlingOrderStartTime).toDate()).format('HH:mm:ss'));
  }, [scrawlingOrderStartTime]);

  useEffect(() => {
    setEndTime(moment(dayjs(scrawlingOrderEndTime).toDate()).format('HH:mm:ss'));
  }, [scrawlingOrderEndTime]);

  return (
    <Box>
      <Stack mb={2}>
        <FormControlLabel
          control={<Switch checked={checked} onChange={handleChange} inputProps={{ 'aria-label': 'controlled' }} />}
          label={translate('page.content.switchToConfiguration')}
          labelPlacement="start"
        />
      </Stack>

      <Box sx={{ display: { sm: 'none', md: 'block' } }}>
        <Stack direction="row" gap={2}>
          <TextField
            fullWidth
            InputProps={{
              readOnly: true,
              endAdornment: (
                <InputAdornment position="end">
                  <AccessTimeIcon />
                </InputAdornment>
              ),
            }}
            label={translate('table.start')}
            value={startTime}
            defaultValue={moment(dayjs(scrawlingOrderStartTime).toDate()).format('HH:mm:ss')}
            sx={{
              '.css-1j5h0bl-MuiInputBase-root-MuiOutlinedInput-root': {
                pr: '5px',
              },
            }}
          />

          <TextField
            fullWidth
            InputProps={{
              readOnly: true,
              endAdornment: (
                <InputAdornment position="end">
                  <AccessTimeIcon />
                </InputAdornment>
              ),
            }}
            label={translate('table.finish')}
            value={endTime}
            defaultValue={moment(dayjs(scrawlingOrderEndTime).toDate()).format('HH:mm:ss')}
            sx={{
              '.css-1j5h0bl-MuiInputBase-root-MuiOutlinedInput-root': {
                pr: '5px',
              },
            }}
          />
        </Stack>

        <Stack direction="row" justifyContent="space-between" mt={4}>
          <DemoItem
            label={
              <Stack direction="column" alignItems="left" justifyContent="left">
                <Typography variant="body2">{translate('page.content.selectTimeStart')}</Typography>
                <Box>
                  <Button variant="outlined" size="small" onClick={() => setViewStart('hours')} disabled={!checked}>
                    {translate('button.editHours')}
                  </Button>
                </Box>
              </Stack>
            }
          >
            <TimePickerField
              name="scrawlingOrderStartTime"
              ampm={false}
              disabled={!checked}
              setView={setViewStart}
              view={viewStart}
            />
          </DemoItem>
          <DemoItem
            label={
              <Stack direction="column" alignItems="left" justifyContent="left">
                <Typography variant="body2">{translate('page.content.selectTimeEnd')}</Typography>
                <Box>
                  <Button variant="outlined" size="small" onClick={() => setViewEnd('hours')} disabled={!checked}>
                    {translate('button.editHours')}
                  </Button>
                </Box>
              </Stack>
            }
          >
            <TimePickerField
              name="scrawlingOrderEndTime"
              ampm={false}
              disabled={!checked}
              setView={setViewEnd}
              view={viewEnd}
            />
          </DemoItem>
        </Stack>
      </Box>

      <Box sx={{ display: { sm: 'block', md: 'none' } }}>
        <Stack direction="row" gap={2} width="100%">
          <Stack direction="column" alignItems="center" gap={4} width="100%">
            <TextField
              fullWidth
              InputProps={{
                readOnly: true,
                endAdornment: (
                  <InputAdornment position="end">
                    <AccessTimeIcon />
                  </InputAdornment>
                ),
              }}
              label={translate('table.start')}
              value={startTime}
              defaultValue={moment(dayjs(scrawlingOrderStartTime).toDate()).format('HH:mm:ss')}
              sx={{
                '.css-1j5h0bl-MuiInputBase-root-MuiOutlinedInput-root': {
                  pr: '5px',
                },
              }}
            />
            <DemoItem
              label={
                <Stack direction="column" alignItems="left" justifyContent="left">
                  <Typography variant="body2">{translate('page.content.selectTimeStart')}</Typography>
                  <Box>
                    <Button variant="outlined" size="small" onClick={() => setViewStart('hours')} disabled={!checked}>
                      {translate('button.editHours')}
                    </Button>
                  </Box>
                </Stack>
              }
            >
              <TimePickerField
                name="scrawlingOrderStartTime"
                ampm={false}
                disabled={!checked}
                setView={setViewStart}
                view={viewStart}
              />
            </DemoItem>
          </Stack>

          <Stack direction="column" alignItems="center" gap={4} width="100%">
            <TextField
              fullWidth
              InputProps={{
                readOnly: true,
                endAdornment: (
                  <InputAdornment position="end">
                    <AccessTimeIcon />
                  </InputAdornment>
                ),
              }}
              label={translate('table.finish')}
              value={endTime}
              defaultValue={moment(dayjs(scrawlingOrderEndTime).toDate()).format('HH:mm:ss')}
              sx={{
                '.css-1j5h0bl-MuiInputBase-root-MuiOutlinedInput-root': {
                  pr: '5px',
                },
              }}
            />
            <DemoItem
              label={
                <Stack direction="column" alignItems="left" justifyContent="left">
                  <Typography variant="body2">{translate('page.content.selectTimeEnd')}</Typography>
                  <Box>
                    <Button variant="outlined" size="small" onClick={() => setViewEnd('hours')} disabled={!checked}>
                      {translate('button.editHours')}
                    </Button>
                  </Box>
                </Stack>
              }
            >
              <TimePickerField
                name="scrawlingOrderEndTime"
                ampm={false}
                disabled={!checked}
                setView={setViewEnd}
                view={viewEnd}
              />
            </DemoItem>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
}

export default ConfigurationTimeBot;
