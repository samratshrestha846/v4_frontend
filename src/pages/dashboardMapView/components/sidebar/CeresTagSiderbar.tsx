import React, { SetStateAction } from 'react';
import { GeoJsonTypes } from 'geojson';
import CeresTag from '../../../property/detail/map/ceresTag/CeresTag';
import useCeresTagDropdown from '../../../../hooks/dropdown/useCeresTagDropdown';
import CustomLoader from '../../../../components/CustomLoader';
import ErrorMessage from '../../../../components/ErrorMessage';

type Props = {
  propertyId: number;
  ceresTagData: GeoJsonTypes;
  times: string[];
  timeSliderValue: number | null;
  setTimeSliderValue: React.Dispatch<SetStateAction<number>>;
  ceresTagId: number | null;
  setCeresTagId: React.Dispatch<SetStateAction<number | null>>;
  setAsOfFrom: React.Dispatch<SetStateAction<string | null>>;
  setAsOfTo: React.Dispatch<SetStateAction<string | null>>;
  isFetchingCeresTag: boolean;
  isErrorCeresTag: boolean;
  displaySelectedDate: string;
};

const CeresTagSiderbar: React.FC<Props> = ({
  propertyId,
  ceresTagData,
  times,
  timeSliderValue,
  setTimeSliderValue,
  ceresTagId,
  setCeresTagId,
  setAsOfFrom,
  setAsOfTo,
  isFetchingCeresTag,
  isErrorCeresTag,
  displaySelectedDate,
}) => {
  const {
    data: ceresTagsOptions,
    isFetching: isFetchingCeresTagsOptions,
    isError: isErrorCeresTagsOptions,
  } = useCeresTagDropdown(String(propertyId));

  if (isFetchingCeresTag || isFetchingCeresTagsOptions) {
    return <CustomLoader />;
  }

  if (isErrorCeresTag || isErrorCeresTagsOptions) {
    return <ErrorMessage />;
  }

  return (
    <div>
      <CeresTag
        times={times}
        timeSliderValue={timeSliderValue}
        setTimeSliderValue={setTimeSliderValue}
        ceresTagId={ceresTagId}
        setCeresTagId={setCeresTagId}
        setAsOfFrom={setAsOfFrom}
        setAsOfTo={setAsOfTo}
        ceresTagsOptions={ceresTagsOptions}
        ceresTagData={ceresTagData}
        isFetchingCeresTag={isFetchingCeresTag}
        isErrorCeresTag={isErrorCeresTag}
        displaySelectedDate={displaySelectedDate}
      />
    </div>
  );
};

export default CeresTagSiderbar;
