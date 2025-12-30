import React from 'react';
import { useParams } from 'react-router-dom';
import PageTitle from '../../../components/PageTitle';
import PropertyAnalytics from './PropertyAnalytics';
import PropertyDetail from '../components/PropertyDetail';
import CustomLoader from '../../../components/CustomLoader';
import useAuth from '../../../hooks/useAuth';
import PropertyMap from './PropertyMap';
import ErrorMessage from '../../../components/ErrorMessage';
import PFIHerdSummary from './pastureFeedIntakeHerdSummary/PFIHerdSummary';
import useReadProperty from '../hooks/useReadProperty';

const ViewPropertyAnalytics: React.FC = () => {
  const { id } = useParams();
  const { isSuperAdmin, isAdmin, isManager } = useAuth();

  const {
    data: property,
    isFetching: isFetchingProperty,
    isError: isErrorProperty,
  } = useReadProperty(Number(id));

  const isAnalyticsDashboardEnabled = () => {
    if (isSuperAdmin || isAdmin || isManager) {
      return true;
    }
    return property?.customer?.settings?.show_dashboard;
  };

  if (isFetchingProperty) return <CustomLoader />;

  if (isErrorProperty) return <ErrorMessage />;

  return (
    <>
      <PageTitle
        breadCrumbItems={[
          { label: 'Properties', path: '/properties/list' },
          { label: 'Property Detail', path: '/properties/view', active: true },
        ]}
        title="Property Analytics"
      />

      {(isAnalyticsDashboardEnabled() && (
        <PropertyAnalytics property={property} />
      )) || <PropertyDetail property={property} />}

      {property && <PropertyMap property={property} />}

      <PFIHerdSummary />
    </>
  );
};

export default ViewPropertyAnalytics;
