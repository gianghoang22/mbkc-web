import { Button } from '@mui/material';
import { Color } from 'common/enum';
import { Logo } from 'components';
import Label from 'components/label/Label';

function LoginPage(props: any) {
  return (
    <div>
      LoginPage
      <Button variant="contained" color="primary">
        Button
      </Button>
      <Logo />
      <Label color={Color.SUCCESS}>Active</Label>
    </div>
  );
}

export default LoginPage;
