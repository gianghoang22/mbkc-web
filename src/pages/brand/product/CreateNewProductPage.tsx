import { useLocation } from 'react-router-dom';
//
import { Page } from 'components';
import { PATH_BRAND_APP } from 'routes/paths';

function CreateNewProductPage(props: any) {
  const { pathname } = useLocation();

  return (
    <>
      <Page title="Create Product" pathname={pathname} navigateDashboard={PATH_BRAND_APP.root}>
        <div>CreateNewProductPage</div>
      </Page>
    </>
  );
}

export default CreateNewProductPage;
