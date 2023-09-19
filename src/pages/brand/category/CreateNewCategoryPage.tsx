import { useLocation } from 'react-router-dom';
//
import { Page } from 'components';
import { PATH_BRAND_APP } from 'routes/paths';

function CreateNewCategoryPage() {
  const { pathname } = useLocation();

  return (
    <Page title="Create New Category" pathname={pathname} navigateDashboard={PATH_BRAND_APP.root}>
      <div>CreateNewCategoryPage</div>
    </Page>
  );
}

export default CreateNewCategoryPage;
