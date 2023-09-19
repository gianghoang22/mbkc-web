import { FC, ReactElement } from 'react';
// @mui
import {
  Button,
  ButtonProps,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogProps,
  DialogTitle,
} from '@mui/material';
//
import LoadingAsyncButton from 'components/LoadingAsyncButton/LoadingAsyncButton';
import { useLocales } from 'hooks';

type Props = {
  open: boolean;
  title: String | ReactElement;
  description?: String | ReactElement | null;
  // onDelete: () => Promise<any> | Function;
  onAction: () => void;
  onClose: (title: any) => void;
  confirmProps?: ButtonProps;
  cancelProps?: ButtonProps;
};

const ConfirmDialog: FC<Props & DialogProps> = ({
  open,
  title,
  description,
  onClose,
  onAction,
  cancelProps,
  confirmProps,
  ...props
}) => {
  const { translate } = useLocales();

  return (
    <Dialog
      fullWidth
      maxWidth="xs"
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      {...props}
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">{description}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button {...cancelProps} onClick={onClose} variant="text" color="secondary">
          {translate('common.cancel')}
        </Button>
        <LoadingAsyncButton {...confirmProps} onClick={onAction} color="error" variant="contained" autoFocus>
          {translate('common.confirm')}
        </LoadingAsyncButton>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
