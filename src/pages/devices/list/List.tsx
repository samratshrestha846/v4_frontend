import React from 'react';
import { Card } from 'react-bootstrap';
import PageTitle from '../../../components/PageTitle';
import CustomLoader from '../../../components/CustomLoader';
import useFetchDeviceList from '../hooks/useFetchDeviceList';
import DeviceTable from './DeviceTable';
import useDeviceConfigurationsDropdown from '../../../hooks/dropdown/useDeviceConfigurationsDropdown';
import useStockTypesDropdown from '../../../hooks/dropdown/useStocktypesDropdown';
import useTagsDropdown from '../../../hooks/dropdown/useTagsDropdown';
import Loader from '../../../components/Loader';
import DeviceCount from '../components/DeviceCount';
import FilterDevice from '../components/FilterDevice';
import ErrorMessage from '../../../components/ErrorMessage';

const List: React.FC = () => {
  const {
    data,
    isFetching,
    isError,
    handleSearchOnChange,
    handlePageChange,
    setDeviceConfiguration,
    setStockType,
    setTelemetry,
    setTagIds,
    setAsOfDate,
    isToggled,
    setIsToggled,
    search,
    pageNumber,
    deviceConfiguration,
    stockType,
    telemetry,
    tagIds,
    asOfDate,
    handleExportReport,
    isFetchingReport,
    setSearch,
  } = useFetchDeviceList();

  const { data: configurationsOptions, isFetching: isFetchingConfigurations } =
    useDeviceConfigurationsDropdown();

  const { data: stockTypesOptions, isFetching: isFetchingStockTypesOptions } =
    useStockTypesDropdown();

  const { data: tagsOptions, isFetching: isFetchingTagsOptions } =
    useTagsDropdown();

  if (isError) return <ErrorMessage />;

  return (
    <>
      <PageTitle
        breadCrumbItems={[
          { label: 'Devices', path: '/' },
          { label: 'All Devices', path: '/devices/list', active: true },
        ]}
        title="Devices"
      />

      <DeviceCount />

      <Card>
        <Card.Body>
          <FilterDevice
            search={search}
            handleSearchOnChange={handleSearchOnChange}
            setDeviceConfiguration={setDeviceConfiguration}
            configurationsOptions={configurationsOptions}
            setStockType={setStockType}
            stockTypesOptions={stockTypesOptions}
            setTelemetry={setTelemetry}
            setTagIds={setTagIds}
            tagsOptions={tagsOptions}
            asOfDate={asOfDate}
            setAsOfDate={setAsOfDate}
            handleExportReport={handleExportReport}
            setIsToggled={setIsToggled}
            isToggled={isToggled}
            setSearch={setSearch}
            deviceConfiguration={deviceConfiguration}
            stockType={stockType}
            telemetry={telemetry}
            tagIds={tagIds}
          />

          {isFetchingReport && <Loader />}

          {isFetching ||
          isFetchingConfigurations ||
          isFetchingStockTypesOptions ||
          isFetchingTagsOptions ? (
            <CustomLoader />
          ) : (
            <DeviceTable
              data={data}
              pageNumber={pageNumber}
              handlePageChange={handlePageChange}
            />
          )}
        </Card.Body>
      </Card>
    </>
  );
};

export default List;
