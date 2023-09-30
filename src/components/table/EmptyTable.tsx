// @mui
import { Stack, TableCell, TableRow, Typography } from '@mui/material';
//
import { useLocales } from 'hooks';

function EmptyTable({ colNumber }: { colNumber: number }) {
  const { translate } = useLocales();
  return (
    <TableRow>
      <TableCell colSpan={colNumber + 2} height={365}>
        <Stack direction="column" alignItems="center" gap={2}>
          <img src="/assets/illustrations/illustration_empty_content.svg" alt="empty" />
          <Typography variant="h6">{translate('page.content.empty')}</Typography>
        </Stack>
      </TableCell>
    </TableRow>
  );
}

export default EmptyTable;
