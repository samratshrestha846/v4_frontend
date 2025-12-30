import { useEffect, useState } from 'react';
import { BingMapData, SiteWithLocation } from '../../../../types/siteMap';
import { UDOSE_VIEW } from '../../../../constants/path';
import icon from '../../../../assets/images/icon.png';
import { prepareDynamicUrl } from '../../../../helpers';

export default function usePreparePushPinInjfo(data?: SiteWithLocation[]) {
  const [pushPinInfo, setPushPinInfo] = useState<BingMapData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const preparePushPinInfo = (dataRecord: any) => {
    const infoList: BingMapData[] = [];
    dataRecord.forEach((element: any) => {
      if (element.location?.latitude && element.location?.longitude) {
        infoList.push({
          center: {
            latitude: Number(element.location.latitude),
            longitude: Number(element.location.longitude),
          },
          metadata: { title: element.name },
          infoboxHtml: `<div className="customInfobox"><div className="text-gray"><a style="color:white;" href="${prepareDynamicUrl(
            UDOSE_VIEW,
            element.id
          )}" target="_blank"> ${element.name} </a></div></div>`,
          options: { icon },
        });
      }
    });
    setPushPinInfo(infoList);
    setLoading(false);
  };

  useEffect(() => {
    if (data) {
      preparePushPinInfo(data);
    }
  }, [data]);

  return { loading, pushPinInfo };
}
