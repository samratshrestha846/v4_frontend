import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import siteActivity from '../../../../../../helpers/api/udose/siteActivity';
import {
  ActivityTypeProperty,
  SiteActivity,
  SiteActivityFilterParams,
} from '../../../../../../types/udose/siteActivity';
import {
  ACTIVITY_TYPE_FETCHED_MESSAGE_PACKET,
  ACTIVITY_TYPE_STARTED,
  ACTIVITY_TYPE_STOPPED,
  ACTIVITY_TYPE_UPDATED_LOCATION,
  ACTIVITY_TYPE_UPDATED_SETTING,
} from '../../../../../../constants/statusOptions';

export default function useFetchSiteActivityList() {
  const { id } = useParams();
  const [pageNumber, setPageNumber] = useState(0);

  const getSiteActivities = () => {
    const params: SiteActivityFilterParams = {
      page: pageNumber + 1,
      site_id: id,
    };
    return siteActivity.getSiteActivities(params);
  };

  const { data, isFetching, isError, refetch } = useQuery({
    refetchOnWindowFocus: false,
    queryFn: getSiteActivities,
    queryKey: ['site-activities', pageNumber],
    enabled: !!id,
  });

  const handlePageChange = (e: any): void => {
    setPageNumber(e.selected);
  };

  const handleOnClick = async () => {
    refetch();
  };
  const activityPropertyBytype = (activity: SiteActivity) => {
    let typeProperty: ActivityTypeProperty = {
      colorVariant: '',
      message: '',
      icon: '',
    };
    switch (activity.type) {
      case ACTIVITY_TYPE_STARTED:
        typeProperty = {
          colorVariant: 'success',
          message: 'started the doser',
          icon: 'mdi mdi-restart',
        };
        break;

      case ACTIVITY_TYPE_STOPPED:
        typeProperty = {
          colorVariant: 'danger',
          message: 'stopped the doser',
          icon: 'mdi mdi-stop-circle-outline',
        };
        break;

      case ACTIVITY_TYPE_UPDATED_SETTING:
        typeProperty = {
          colorVariant: 'warning',
          message: 'updated settings of the doser',
          icon: 'mdi mdi-cog-outline',
        };
        break;
      case ACTIVITY_TYPE_UPDATED_LOCATION:
        typeProperty = {
          colorVariant: 'info',
          message: 'fetched location of the doser',
          icon: 'mdi mdi-map-marker',
        };
        break;

      case ACTIVITY_TYPE_FETCHED_MESSAGE_PACKET:
        typeProperty = {
          colorVariant: 'info',
          message:
            'fetched message packet (settings, 24 hourly) from the doser',
          icon: 'mdi mdi-message-text-outline',
        };
        break;

      default:
        typeProperty = {
          colorVariant: 'warning',
          message: `${activity.type} of the doser`,
          icon: 'mdi mdi-message-text-outline',
        };
        break;
    }
    return typeProperty;
  };

  return {
    pageNumber,
    isError,
    data,
    isFetching,
    handlePageChange,
    handleOnClick,
    activityPropertyBytype,
  };
}
