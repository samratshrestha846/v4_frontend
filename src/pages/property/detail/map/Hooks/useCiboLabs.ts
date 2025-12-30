import { useState } from 'react';
import useMapCiboLabFeature from '../../../detail/hooks/useMapCiboLabFeature';
import useSiteLocations from '../../../detail/hooks/useSiteLocations';

export default function useCiboLabs() {
  const [ciboLabsActive, setCiboLabsActive] = useState<boolean>(false);

  const { data: siteLocations } = useSiteLocations();

  // Styling CiboLabs layer
  const ciboLabsStyle = {
    fillColor: 'green',
    color: 'white',
    weight: 2, // Outline Weight
  };

  const {
    geoJsonData: ciboLabsData,
    isFetchingCiboLabs,
    setIsFetchingCiboLabs,
  } = useMapCiboLabFeature(siteLocations);

  return {
    ciboLabsActive,
    setCiboLabsActive,
    ciboLabsStyle,
    ciboLabsData,
    isFetchingCiboLabs,
    setIsFetchingCiboLabs,
  };
}
