import { useEffect, useState } from 'react';

export default function useMlaLayer() {
  const [landData, setLandData] = useState(null);
  const [coastalData, setCoastalData] = useState(null);
  const [loadingMla, setLoadingMla] = useState(true);
  const [errorMla, setErrorMla] = useState(false);

  useEffect(() => {
    setLoadingMla(true);

    Promise.all([
      fetch('/mla/mlaLandOnly.geojson').then((response) => response.json()),
      fetch('/mla/mlaStateCostalWater.geojson').then((response) =>
        response.json()
      ),
    ])
      .then(([dataland, datacoastal]) => {
        setLandData(dataland);
        setCoastalData(datacoastal);
        setLoadingMla(false);
      })
      .catch(() => {
        setErrorMla(true);
        setLoadingMla(false);
      });
  }, []);
  return { landData, coastalData, loadingMla, errorMla, setLoadingMla };
}
