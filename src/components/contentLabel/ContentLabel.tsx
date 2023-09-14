import { Divider, Stack, Typography } from '@mui/material';
import { sentenceCase } from 'change-case';
import { Color } from 'common/enum';
import Label from '../label/Label';

interface ContentLabelProps {
  divider?: boolean;
  title: string;
  color: Color;
  content: string;
}

function ContentLabel({ divider = true, title, color, content }: ContentLabelProps) {
  return (
    <>
      {divider && <Divider />}
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="subtitle1">{title}</Typography>
        <Label color={color}>{sentenceCase(content)}</Label>
      </Stack>
    </>
  );
}

export default ContentLabel;
