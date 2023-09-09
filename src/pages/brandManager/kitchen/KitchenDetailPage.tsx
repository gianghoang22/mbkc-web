import { RoutesPageKey } from 'common/enum';
import { Breadcrumbs, Helmet } from 'components';
import { useLocation } from 'react-router-dom';

function KitchenDetailPage() {
  const { pathname } = useLocation();
  return (
    <>
      <Helmet title="Dashboard | Kitchen Detail" />
      <Breadcrumbs model="Kitchen" pathname={pathname} navigateDashboard={RoutesPageKey.BRAND_DASHBOARD} />
      <p>Kitchen Detail</p>
    </>
  );
}

export default KitchenDetailPage;
