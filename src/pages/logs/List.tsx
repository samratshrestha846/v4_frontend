import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import PageTitle from '../../components/PageTitle';
import LogsFilter from './LogsFilter';
import LogsTable from './LogsTable';
import useFetchLogList from './hooks/useFetchLogList';
import Pagination from '../../components/Pagination';
import CustomLoader from '../../components/CustomLoader';
import useUserDropdownList from '../../hooks/dropdown/useUserDropdownList';
import { USER, SITE, DEVICE } from '../../constants/constants';
import useUdoseSitesDropdown from '../../hooks/dropdown/useUdoseSitesDropdown';
import useDevicesDropdown from '../../hooks/dropdown/useDevicesDropdown';
import ErrorMessage from '../../components/ErrorMessage';

const List: React.FC = () => {
  const [modelIdOptions, setModelIdOptions] = useState<any>([]);
  const {
    data: userOptions,
    isFetching: isFetchingUsers,
    isError: isUserFetchingError,
  } = useUserDropdownList();

  const {
    data,
    isFetching: isFetchingLog,
    isError: isLogFetchingError,
    handleSearch,
    search,
    modelType,
    setModelType,
    type,
    setType,
    modelId,
    setModelId,
    userId,
    setUserId,
    pageNumber,
    handlePageChange,
    setSearch,
  } = useFetchLogList();

  useEffect(() => {
    if (modelType === SITE) {
      setModelIdOptions(udoseSiteOptions);
    }
    if (modelType === DEVICE) {
      setModelIdOptions(deviceOptions);
    }
    if (modelType === USER) {
      setModelIdOptions(userOptions);
    }
  }, [modelType]);

  const {
    data: udoseSiteOptions,
    isFetching: isFetchingUdoseSites,
    isError: isSiteFetchingError,
  } = useUdoseSitesDropdown();

  const {
    data: deviceOptions,
    isFetching: isFetchingDevices,
    isError: isDeviceFetchingError,
  } = useDevicesDropdown({});

  if (
    isDeviceFetchingError ||
    isSiteFetchingError ||
    isLogFetchingError ||
    isUserFetchingError
  ) {
    return <ErrorMessage />;
  }

  if (isFetchingUdoseSites || isFetchingDevices || isFetchingUsers) {
    return <CustomLoader />;
  }

  return (
    <>
      <PageTitle
        breadCrumbItems={[{ label: 'Logs', path: '/logs', active: true }]}
        title="Activity Logs"
      />

      <Card>
        <Card.Body>
          <LogsFilter
            search={search}
            handleSearchOnChange={handleSearch}
            setSearch={setSearch}
            modelType={modelType}
            setModelType={setModelType}
            type={type}
            setType={setType}
            modelId={modelId}
            setModelId={setModelId}
            userId={userId}
            setUserId={setUserId}
            modelIdOptions={modelIdOptions}
            userOptions={userOptions}
          />

          {isFetchingLog ? (
            <CustomLoader />
          ) : (
            <>
              <LogsTable data={data!.body} />
              <Pagination
                data={data!.meta_data!.pagination}
                pageNumber={pageNumber}
                handlePageChange={handlePageChange}
              />
            </>
          )}
        </Card.Body>
      </Card>
    </>
  );
};

export default List;
