import { useLocation } from 'react-router-dom';
//
import { Page } from 'components';
import { PATH_KITCHEN_CENTER_APP } from 'routes/paths';

function CreateCashierPage() {
  const { pathname } = useLocation();

  return (
    <>
      <Page title="Create Cashier" pathname={pathname} navigateDashboard={PATH_KITCHEN_CENTER_APP.root}>
        <div>Create Kitchen Center Cashier</div>
      </Page>
    </>
  );
}

export default CreateCashierPage;
