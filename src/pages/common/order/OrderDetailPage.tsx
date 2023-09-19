import { useLocation } from 'react-router-dom';
//
import { Page } from 'components';
import { PATH_CASHIER_APP } from 'routes/paths';

function OrderDetailPage(props: any) {
  const { pathname } = useLocation();

  return (
    <>
      <Page title="List Order" pathname={pathname} navigateDashboard={PATH_CASHIER_APP.root}>
        <div>OrderDetailPage</div>{' '}
      </Page>
    </>
  );
}

export default OrderDetailPage;
