import React from 'react';
import { useLocation, useParams } from 'react-router-dom';

import { prepareDynamicUrl } from '../../../../../../helpers';
import PageTitle from '../../../../../../components/PageTitle';
import { UDOSE_LIST, UDOSE_VIEW } from '../../../../../../constants/path';
import ListServiceLogs from './ListServiceLogs';

const ListSiteServiceLogs: React.FC = () => {
  const { id: udoseSiteId } = useParams();

  const location = useLocation();

  // Create a URLSearchParams object to parse the query string
  const queryParams = new URLSearchParams(location.search);

  // Extract 'site_name' parameter from the query string
  const siteName = queryParams.get('site_name');

  return (
    <>
      <PageTitle
        breadCrumbItems={[
          { label: 'uDOSE Sites', path: UDOSE_LIST, active: false },
          {
            label: siteName ?? 'Site Detail',
            path: prepareDynamicUrl(UDOSE_VIEW, udoseSiteId),
            active: false,
          },
          { label: 'Site Service logs', path: '', active: true },
        ]}
        title="Site Service logs"
      />

      <ListServiceLogs />
    </>
  );
};

export default ListSiteServiceLogs;
