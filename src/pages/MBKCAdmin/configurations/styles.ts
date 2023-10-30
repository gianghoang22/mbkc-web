import { Accordion as MuiAccordion, AccordionDetails as MuiAccordionDetails } from '@mui/material';
import { styled } from '@mui/material/styles';

export const Accordion = styled(MuiAccordion)(({ theme }) => ({
  border: `1px solid #000`,
  backgroundColor: '#ff6500',
  marginBottom: '20px',
  borderRadius: '10px',
  transition: '0.4s all linear',

  '&:before': {
    display: 'none',
  },
}));

export const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
  borderBottom: '1px solid rgba(0, 0, 0, .125)',
  borderBottomLeftRadius: '10px',
  borderBottomRightRadius: '10px',
  backgroundColor: '#000',
}));
