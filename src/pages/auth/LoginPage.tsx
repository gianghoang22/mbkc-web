import { Button } from '@mui/material';
import { Color } from 'common/enum';
import { Logo } from 'components';
import Label from 'components/label/Label';
import { useNavigate } from 'react-router-dom';

function LoginPage(props: any) {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/dashboard/list-kitchen');
  };

  return (
    <div>
      LoginPage
      <Button variant="contained" color="primary" onClick={handleLogin}>
        Button
      </Button>
      <Logo />
      <Label color={Color.SUCCESS}>Active</Label>
    </div>
  );
}

export default LoginPage;
