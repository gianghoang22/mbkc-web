import { Status } from 'common/enum';
import { IconButton, Typography } from '@mui/material';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useLocales } from 'hooks';

function StatusWithIcon({ status }: { status: Status }) {
  const { translate } = useLocales();

  return (
    <IconButton
      style={{
        backgroundColor: `${status === 'Active' ? '#2E7D32' : '#D32F2F'}`,
        height: 32,
        borderRadius: 8,
        padding: 12,
      }}
    >
      <Typography
        style={{
          color: '#fff',
          marginRight: 6,
        }}
      >
        {status === 'Active' ? translate('status.active') : translate('status.inactive')}
      </Typography>
      {status === 'Active' ? (
        <LockOpenOutlinedIcon
          style={{
            color: '#fff',
          }}
        />
      ) : (
        <LockOutlinedIcon
          style={{
            color: '#fff',
          }}
        />
      )}
    </IconButton>
  );
}

export default StatusWithIcon;
