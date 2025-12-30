import { useEffect, useState } from 'react';
import axios from 'axios';
import config from '../../../../config';

const useMapCiboLabFeature = (siteLocations: any) => {
  const [geoJsonData, setGeoJsonData] = useState<any>();
  const [isFetchingCiboLabs, setIsFetchingCiboLabs] = useState<boolean>(false);
  const baseUrl = config.CIBOLAB_URL;

  const loadCiboLabLayer = (location: any) => {
    const url = `${baseUrl}/query_point?lat=${location.latitude}&lon=${location.longitude}&radius=8000`;
    return axios.get(url);
  };

  const fetchDataFromServer = () => {
    Promise.all(
      siteLocations?.map(async (location: any) => {
        const response = await loadCiboLabLayer(location);

        if (response.status === 200) {
          const resData: any = {
            location,
            data: response.data,
          };
          return resData;
        }
        return null;
      })
    ).then((response) => {
      setGeoJsonData(response);
    });
  };

  useEffect(() => {
    if (siteLocations?.length > 0) {
      setIsFetchingCiboLabs(true);
      fetchDataFromServer();
    }
  }, [siteLocations]);

  return {
    geoJsonData,
    isFetchingCiboLabs,
    setIsFetchingCiboLabs,
  };
};

export default useMapCiboLabFeature;
