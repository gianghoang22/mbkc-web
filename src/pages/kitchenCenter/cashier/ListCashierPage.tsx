import { useLocation } from 'react-router-dom';
//
import { Page } from 'components';
import { PATH_KITCHEN_CENTER_APP } from 'routes/paths';

function ListCashierPage(props: any) {
  const { pathname } = useLocation();

  return (
    <>
      <Page title="List Cashier" pathname={pathname} navigateDashboard={PATH_KITCHEN_CENTER_APP.root}>
        <div>List Cashier</div>
      </Page>
    </>
  );
}

export default ListCashierPage;
