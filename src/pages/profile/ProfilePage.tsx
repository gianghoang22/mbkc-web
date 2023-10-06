/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Card } from '@mui/material';
import { Role } from 'common/enum';
import { Page } from 'components';
import { useLocales } from 'hooks';
import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getUserInformation } from 'redux/auth/authSlice';
import { useAppDispatch, useAppSelector } from 'redux/configStore';
import { PATH_ADMIN_APP, PATH_BRAND_APP, PATH_CASHIER_APP, PATH_KITCHEN_CENTER_APP } from 'routes/paths';
import { UpdatePasswordModal } from 'sections/auth';

function ProfilePage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { translate } = useLocales();
  const { pathname } = useLocation();

  const { userAuth, userInfo } = useAppSelector((state) => state.auth);

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleClose = (event: {}, reason: 'backdropClick' | 'escapeKeyDown') => {
    if (reason === 'backdropClick') {
      console.log(reason);
    } else {
      setIsOpen(false);
    }
  };

  const paramsInfo = useMemo(() => {
    return {
      accountId: userAuth?.accountId,
      navigate,
    };
  }, [userAuth?.accountId]);

  useEffect(() => {
    if (userAuth.isConfirmed) {
      dispatch(getUserInformation(paramsInfo));
    } else {
      handleOpen();
    }
  }, [paramsInfo]);

  return (
    <>
      <Page
        pathname={pathname}
        title={translate('model.capitalizeOne.accountInformation')}
        navigateDashboard={
          userAuth?.roleName === Role.KITCHEN_CENTER_MANAGER
            ? PATH_KITCHEN_CENTER_APP.root
            : userAuth?.roleName === Role.BRAND_MANAGER
            ? PATH_BRAND_APP.root
            : userAuth?.roleName === Role.CASHIER
            ? PATH_CASHIER_APP.root
            : PATH_ADMIN_APP.root
        }
      >
        <Card>
          <Box></Box>
        </Card>
      </Page>

      {isOpen && <UpdatePasswordModal isOpen={isOpen} handleOpen={handleOpen} handleClose={handleClose} />}
    </>
  );
}

export default ProfilePage;
