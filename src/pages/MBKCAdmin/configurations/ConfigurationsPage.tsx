import { useLocation } from 'react-router-dom';
// @mui
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Card, Divider, Grid, Paper, Typography, Box, AccordionSummary, Stack } from '@mui/material';
//
import { Page } from 'components';
import { useLocales } from 'hooks';
import { PATH_ADMIN_APP } from 'routes/paths';
import { useState } from 'react';
import { Accordion, AccordionDetails } from './styles';

function ConfigurationsPage() {
  const { translate } = useLocales();
  const { pathname } = useLocation();

  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <>
      <Page
        pathname={pathname}
        title={translate('model.capitalizeOne.systemConfigurations')}
        navigateDashboard={PATH_ADMIN_APP.root}
      >
        <Grid container spacing={4}>
          <Grid item sm={12} md={6}>
            <Card sx={{ p: 2 }}>
              <Paper>
                <Stack direction="column" gap={2}>
                  <Typography variant="h6" sx={{ color: (theme) => theme.palette.secondary.darker }}>
                    Thời gian vận hành
                  </Typography>

                  <Divider />

                  <Box>
                    <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                      >
                        <Typography sx={{ width: '33%', flexShrink: 0 }}>General settings</Typography>
                        <Typography sx={{ color: 'text.secondary' }}>I am an accordion</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Typography>
                          Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat. Aliquam eget maximus est,
                          id dignissim quam.
                        </Typography>
                      </AccordionDetails>
                    </Accordion>
                  </Box>
                </Stack>
              </Paper>
            </Card>
          </Grid>
          <Grid item sm={12} md={6}>
            <Card sx={{ p: 2 }}>
              <Paper>
                <Typography variant="h6" sx={{ color: (theme) => theme.palette.secondary.darker }}>
                  Thời gian giao dịch
                </Typography>

                <Divider />

                <Box>
                  <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1bh-content"
                      id="panel1bh-header"
                    >
                      <Typography sx={{ width: '33%', flexShrink: 0 }}>General settings</Typography>
                      <Typography sx={{ color: 'text.secondary' }}>I am an accordion</Typography>
                      <Typography sx={{ color: 'text.secondary' }}>I am an accordion</Typography>
                      <Typography sx={{ color: 'text.secondary' }}>I am an accordion</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>
                        Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat. Aliquam eget maximus est,
                        id dignissim quam.
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                </Box>
              </Paper>
            </Card>
          </Grid>
        </Grid>
      </Page>
    </>
  );
}

export default ConfigurationsPage;
