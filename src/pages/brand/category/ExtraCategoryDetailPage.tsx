import { useLocation } from 'react-router-dom';
//
import { Page } from 'components';
import { PATH_BRAND_APP } from 'routes/paths';

function ExtraCategoryDetailPage() {
  const { pathname } = useLocation();

  return (
    <>
      <Page title="Extra Category Detail" pathname={pathname} navigateDashboard={PATH_BRAND_APP.root}>
        <div>Extra Category Detail</div>
      </Page>
    </>
  );
}

export default ExtraCategoryDetailPage;
