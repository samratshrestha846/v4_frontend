import React from 'react';
import BingMapsReact from 'bingmaps-react';
import usePreparePushPinInfo from '../pages/sites/siteMaps/hooks/usePreparePushPinInfo';
import CustomLoader from './CustomLoader';
import { SiteWithLocation } from '../types/siteMap';
import config from '../config';

type Props = {
  data?: SiteWithLocation[];
};

const BingMap: React.FC<Props> = ({ data }) => {
  const { loading, pushPinInfo } = usePreparePushPinInfo(data);

  return loading ? (
    <CustomLoader />
  ) : (
    <BingMapsReact
      bingMapsKey={config.BING_MAPS_KEY}
      height="60vh"
      mapOptions={{
        navigationBarMode: 'square',
      }}
      width="100%"
      viewOptions={{
        center: { latitude: -25.86944, longitude: 135.04453 },
        zoom: 5,
        mapTypeId: 'aerial',
      }}
      pushPinsWithInfoboxes={pushPinInfo}
    />
  );
};

export default BingMap;
