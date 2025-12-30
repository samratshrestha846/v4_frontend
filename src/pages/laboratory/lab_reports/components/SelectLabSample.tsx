/* eslint-disable no-unused-vars */
import React, { ChangeEvent } from 'react';
import useLabSamplesDropdown from '../../../../hooks/dropdown/useLabSamplesDropdown';
import CustomLoader from '../../../../components/CustomLoader';
import ErrorMessage from '../../../../components/ErrorMessage';
import useLabSampleTypesDropdown from '../../../../hooks/dropdown/useLabSampleTypesDropdown';
import LabSampleSelectList from './LabSampleSelectList';
import LabSampleResultsFilter from './LabSampleResultsFilter';
import { LabReport } from '../../../../types/lab/labReport';
import { LabSample } from '../../../../types/lab/labSampleList';
import { LabelNumericValue } from '../../../../types/common';

type Props = {
  showModal: boolean;
  handleChangeOnLabSampleSelect: (e: ChangeEvent<HTMLInputElement>) => void;
  selectedLabSamples?: LabSample[];
  labReportDetail?: LabReport;
  loading: boolean;
  propertiesOptions?: LabelNumericValue[];
};

const SelectLabSample: React.FC<Props> = ({
  showModal,
  handleChangeOnLabSampleSelect,
  selectedLabSamples,
  labReportDetail,
  loading,
  propertiesOptions,
}) => {
  const {
    data,
    isFetching,
    isError,
    search,
    labSampleType,
    setLabSampleType,
    pageNumber,
    handlePageChange,
    handleSearchOnChange,
    site,
    setSite,
    property,
    setProperty,
    siteDropdownOptions,
    isFetchingSitesOptions,
    isErrorSitesOptions,
  } = useLabSamplesDropdown(showModal, labReportDetail?.id);

  const {
    data: labSampleTypesOptions,
    isFetching: isFetchingLabSampleTypesOptions,
    isError: isErrorLabSampleTypesOptions,
  } = useLabSampleTypesDropdown();

  if (isError || isErrorLabSampleTypesOptions || isErrorSitesOptions) {
    return <ErrorMessage />;
  }

  return (
    <>
      <LabSampleResultsFilter
        labSampleTypesOptions={labSampleTypesOptions}
        propertiesOptions={propertiesOptions}
        siteDropdownOptions={siteDropdownOptions}
        labSampleType={labSampleType}
        setLabSampleType={setLabSampleType}
        search={search}
        handleSearchOnChange={handleSearchOnChange}
        site={site}
        setSite={setSite}
        property={property}
        setProperty={setProperty}
      />
      {loading && <CustomLoader />}
      {isFetching ||
      isFetchingLabSampleTypesOptions ||
      isFetchingSitesOptions ? (
        <CustomLoader />
      ) : (
        <LabSampleSelectList
          data={data}
          handleChangeOnLabSampleSelect={handleChangeOnLabSampleSelect}
          selectedLabSamples={selectedLabSamples}
          pageNumber={pageNumber}
          handlePageChange={handlePageChange}
        />
      )}
    </>
  );
};

export default SelectLabSample;
