import { useLocation } from 'react-router-dom';
//
import { Page } from 'components';
import { PATH_KITCHEN_CENTER_APP } from 'routes/paths';

function ListBankingAccountPage() {
  const { pathname } = useLocation();

  return (
    <>
      <Page title="List Banking Account" pathname={pathname} navigateDashboard={PATH_KITCHEN_CENTER_APP.root}>
        <div>ListBankingAccountPage</div>
      </Page>
    </>
  );
}

export default ListBankingAccountPage;
