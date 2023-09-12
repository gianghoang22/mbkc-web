import React from 'react';
import PropTypes from 'prop-types';
import { Breadcrumbs, Helmet } from 'components';
import { Button, Container, Stack, Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { RoutesPageKey } from 'common/enum';

function CreateKitchenCenterPage(props: any) {
  const { pathname } = useLocation();

  return (
    <>
      <Helmet title="Create Kitchen Center Page | MBKC Food" />
      <Container>
        <Stack>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="h4">Create new Kitchen Center</Typography>
          </Stack>
          <Breadcrumbs model="Kitchen Centers" pathname={pathname} navigateDashboard={RoutesPageKey.ADMIN_DASHBOARD} />
        </Stack>
      </Container>
    </>
  );
}

CreateKitchenCenterPage.propTypes = {};

export default CreateKitchenCenterPage;
