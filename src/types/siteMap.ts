type SiteWithLocationQueryParams = {
  type: string;
  search?: string;
};

type SiteWithLocation = {
  id: number;
  name: string;
  site_number: number;
  location: {
    latitude: number;
    longitude: number;
  };
};

type BingMapData = {
  center: {
    latitude: number;
    longitude: number;
  };
  metadata: {
    title?: string;
  };
  infoboxHtml: string;
  options: {
    icon: string;
  };
};

export type { SiteWithLocation, SiteWithLocationQueryParams, BingMapData };
