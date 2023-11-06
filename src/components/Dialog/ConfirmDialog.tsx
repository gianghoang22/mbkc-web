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
  Typography,
} from '@mui/material';
//
import LoadingAsyncButton from 'components/LoadingAsyncButton/LoadingAsyncButton';
import { useLocales } from 'hooks';
import { Color } from 'common/enum';

type Props = {
  open: boolean;
  isOrder?: boolean;
  model?: String;
  subModel?: string;
  color?: Color;
  title: String | ReactElement;
  description?: String | ReactElement | null;
  // onDelete: () => Promise<any> | Function;
  onAction?: () => void;
  onClose: (title: any) => void;
  confirmProps?: ButtonProps;
  cancelProps?: ButtonProps;
};

const ConfirmDialog: FC<Props & DialogProps> = ({
  open,
  title,
  isOrder,
  model,
  subModel,
  description,
  onClose,
  onAction,
  cancelProps,
  confirmProps,
  color = Color.ERROR,
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
      <DialogTitle id="alert-dialog-title">
        <Typography variant="h5">{title}</Typography>
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          <Typography>
            {description}{' '}
            {isOrder ? (
              <Typography component="span" variant="subtitle1">
                {model}
                <Typography component="span"> {subModel}</Typography>
              </Typography>
            ) : (
              <Typography component="span" variant="subtitle1">
                {model}
              </Typography>
            )}
            ?
          </Typography>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button {...cancelProps} onClick={onClose} variant="text" color="secondary">
          {translate('button.cancel')}
        </Button>
        {onAction && (
          <LoadingAsyncButton
            {...confirmProps}
            onClick={() => {
              onAction();
              onClose('Close');
            }}
            color={color}
            variant="contained"
            autoFocus
          >
            {translate('button.confirm')}
          </LoadingAsyncButton>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
