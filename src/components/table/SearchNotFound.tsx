import { TableBody, TableCell, TableRow } from '@mui/material';
import { Paper, PaperProps, Typography } from '@mui/material';

// ----------------------------------------------------------------------

interface SearchNotFoundProps extends PaperProps {
  searchQuery?: string;
  colNumber: number;
}

function SearchNotFound({ searchQuery = '', colNumber, ...other }: SearchNotFoundProps) {
  return (
    <TableBody>
      <TableRow>
        <TableCell align="center" colSpan={colNumber} sx={{ py: 3 }}>
          <Paper
            sx={{
              textAlign: 'center',
            }}
            {...other}
          >
            <Typography variant="h6" paragraph>
              Not found
            </Typography>

            <Typography variant="body2">
              No results found for &nbsp;
              <strong>&quot;{searchQuery}&quot;</strong>.
              <br /> Try checking for typos or using complete words.
            </Typography>
          </Paper>
        </TableCell>
      </TableRow>
    </TableBody>
  );
}

export default SearchNotFound;
