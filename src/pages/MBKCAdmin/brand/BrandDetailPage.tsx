import { Label, Page } from 'components';
import useResponsive from 'hooks/useResponsive';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { PATH_ADMIN_APP } from 'routes/paths';

//mui
import { Avatar, Card, Grid, IconButton, Stack, Typography, Button, Dialog, DialogTitle } from '@mui/material';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { MenuItem, Popover as MUIPopover } from '@mui/material';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';

import { useAppSelector } from 'redux/configStore';
import { Color } from 'common/enum';
import { usePopover } from 'hooks';
import { DialogActions } from '@mui/material';

function BrandDetailPage(props: any) {
  const { pathname } = useLocation();
  const { brand } = useAppSelector((state) => state.brand);
  const { open: openPopover, handleOpenMenu, handleCloseMenu } = usePopover();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const menuActions = () => (
    <>
      <Button
        color="inherit"
        onClick={handleOpenMenu}
        style={{
          backgroundColor: '#000',
          color: '#fff',
          width: 140,
          height: 32,
        }}
        sx={{
          '.css-1dat9h6-MuiButtonBase-root-MuiButton-root:hover': {
            backgroundColor: 'rgba(145, 158, 171, 0.08)',
          },
        }}
      >
        <Typography>Menu Actions</Typography>
        <KeyboardArrowDownIcon />
      </Button>
      <MUIPopover
        open={Boolean(openPopover)}
        anchorEl={openPopover}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 1,
            width: 140,
            '& .MuiMenuItem-root': {
              px: 1,
              typography: 'body2',
            },
          },
        }}
      >
        <MenuItem sx={{ color: 'error.main' }}>
          <Button onClick={handleClickOpen}>
            <DeleteRoundedIcon fontSize="small" sx={{ mr: 2 }} />
            Delete
          </Button>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">Are you sure to delete this kitchen center?</DialogTitle>
            <DialogActions>
              <Button onClick={handleClose} style={{ color: '#2196F3' }}>
                Cancel
              </Button>
              <Button onClick={handleClose} autoFocus>
                Yes
              </Button>
            </DialogActions>
          </Dialog>
        </MenuItem>
      </MUIPopover>
    </>
  );

  return (
    <>
      <Page
        title="Brand Detail"
        actions={() => [menuActions()]}
        pathname={pathname}
        navigateDashboard={PATH_ADMIN_APP.root}
      >
        <Stack spacing={5} mb={7} width="100%">
          <Card>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              sx={(theme) => ({
                px: 3,
                py: 0.5,
                bgcolor: theme.palette.grey[200],
              })}
            >
              <Stack direction="row" alignItems="center" gap={0.5}>
                <Typography variant="h6">Brand information</Typography>
              </Stack>
              <IconButton onClick={() => navigate(PATH_ADMIN_APP.brand.editById)}>
                <EditRoundedIcon />
              </IconButton>
            </Stack>
            <Stack sx={{ px: 3, py: 3 }}>
              <Grid container columnSpacing={2} alignItems="center">
                <Grid item md={3} sm={12}>
                  <Stack width="100%" alignItems="center">
                    <Avatar src={brand?.brandImgUrl} alt={brand?.brandName} sx={{ width: 150, height: 150 }} />
                  </Stack>
                </Grid>
                <Grid item md={9} sm={12}>
                  <Stack gap={1}>
                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                      <Stack direction="row" alignItems="center" gap={0.5}>
                        <Typography variant="h5">{brand?.brandName}</Typography>
                      </Stack>
                      <Label color={(brand?.status === 'inactive' && Color.ERROR) || Color.SUCCESS}>
                        {brand?.status}
                      </Label>
                    </Stack>

                    <Stack direction="row" alignItems="center" justifyContent="space-between" gap={0.5}>
                      <Typography variant="subtitle1">Address:</Typography>
                      <Typography variant="body1">{brand?.address}</Typography>
                    </Stack>
                  </Stack>
                </Grid>
              </Grid>
            </Stack>
          </Card>

          {/* <Card>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              sx={(theme) => ({
                px: 3,
                py: 0.5,
                bgcolor: theme.palette.grey[200],
              })}
            >
              <Stack direction="row" alignItems="center" gap={0.5}>
                <Typography variant="h6">Brand manager information</Typography>
              </Stack>
              <IconButton>
                <EditRoundedIcon />
              </IconButton>
            </Stack>
            <Stack sx={{ px: 3, py: 3 }}>
              <Grid container columnSpacing={2}>
                <Grid item md={3} sm={12}>
                  <Stack width="100%" alignItems="center">
                    <Avatar src={brand?.brandImgUrl} alt={brand?.brandName} sx={{ width: 150, height: 150 }} />
                  </Stack>
                </Grid>
                <Grid item md={9} sm={12}>
                  <Stack gap={1}>
                    <Stack direction="row" alignItems="center" justifyContent="space-between" gap={0.5}>
                      <Typography variant="subtitle1">Email</Typography>
                      <Typography variant="body1">khaihung@gmail.com</Typography>
                    </Stack>

                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                      <Typography variant="subtitle1">Phone</Typography>
                      <Typography variant="body1">0123456789</Typography>
                    </Stack>

                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                      <Typography variant="subtitle1">Date of birth</Typography>
                      <Typography variant="body1">07 Jul 2022</Typography>
                    </Stack>

                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                      <Typography variant="subtitle1">Citizen number</Typography>
                      <Typography variant="body1">0123456789987456</Typography>
                    </Stack>

                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                      <Typography variant="subtitle1">Sex</Typography>
                      <Typography variant="body1">Male</Typography>
                    </Stack>
                  </Stack>
                </Grid>
              </Grid>
            </Stack>
          </Card> */}
        </Stack>
      </Page>
    </>
  );
}

export default BrandDetailPage;
