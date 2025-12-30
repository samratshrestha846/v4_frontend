import { SITE_LOCATIONS, SITES } from '../../constants/apiUrls';
import Location, {
  SiteLocationFilterParams,
} from '../../types/location/locationList';
import {
  SiteWithLocation,
  SiteWithLocationQueryParams,
} from '../../types/siteMap';
import { APICore } from './apiCore';

function apiSiteLocation() {
  const apiCore = new APICore();

  return {
    fetchSitesWithLocation: async (
      params: SiteWithLocationQueryParams
    ): Promise<SiteWithLocation[]> => {
      const response = await apiCore.get(SITES, params);
      return response.data.body;
    },

    getSiteLocations: async (
      params: SiteLocationFilterParams
    ): Promise<Location[]> => {
      const response = await apiCore.get(SITE_LOCATIONS, params);
      return response.data.body;
    },
  };
}

export default apiSiteLocation();
