import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@mui/material';

function LoginPage(props: any) {
  return (
    <div>
      LoginPage{' '}
      <Button variant="contained" color="primary">
        Button
      </Button>
    </div>
  );
}

LoginPage.propTypes = {};

export default LoginPage;
