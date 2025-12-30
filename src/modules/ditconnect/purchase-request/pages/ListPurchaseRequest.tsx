import React from 'react';
import { Card } from 'react-bootstrap';
import PageTitle from '@uhub/components/PageTitle';
import { can } from '@uhub/helpers/checkPermission';
import { CustomDropdownMenuItem, DropdownFilterItem } from '@uhub/types/common';
import useUserDropDownByPlatform from '@uhub/hooks/dropdown/useUserDropDownByPlatform';
import Loader from '@uhub/components/Loader';
import ErrorMessage from '@uhub/components/ErrorMessage';
import useFetchList from '../../hooks/useFetchList';
import {
  PurchaseRequestListResponse,
  PurchaseRequestParams,
} from '../types/PurchaseRequest';
import {
  PURCHASE_REQUEST,
  CREATE_PURCHASE_REQUEST,
  PURCHASE_REQUEST_ADD,
  PURCHASE_REQUEST_LIST,
  PURCHASE_REQUEST_STATUS_OPTIONS,
  EXPORT_PURCHASE_REQUEST,
  EXPORT_PURCHASE_REQUEST_ENDPOPINT,
} from '../constants/constant';
import useUrlFilters from '../../hooks/useUrlFilters';
import PurchaseRequestTable from './PurchaseRequestTable';
import { FilterConfigItem } from '../../types/ditConnect';
import FilterSection from '../../components/FilterSection';
import { DIT_CONNECT_PLATFORM } from '../../constants/authKey';
import useFileExport from '../../hooks/useFileExport';

const ListPurchaseRequest: React.FC = () => {
  const title: string = 'Purchase Request';
  const canCreate = can(CREATE_PURCHASE_REQUEST);
  const [filters, setFilters] = useUrlFilters<PurchaseRequestParams>();

  const {
    data,
    isFetching: isFetchingPurchaseRequest,
    isError: isErrorPurchaseRequest,
  } = useFetchList<PurchaseRequestListResponse>(PURCHASE_REQUEST, filters);

  const {
    data: userOptions,
    isFetching: isFetchingUserOptions,
    isError: isErrorUserOptions,
  } = useUserDropDownByPlatform({
    platform: DIT_CONNECT_PLATFORM,
  });

  const { handleExport, isExporting } = useFileExport({
    filters,
    endpoint: EXPORT_PURCHASE_REQUEST_ENDPOPINT,
    downloadFileName: title,
  });

  const filterConfig: FilterConfigItem<PurchaseRequestParams>[] = [
    {
      filterType: 'Requested To',
      key: 'user_id',
      isMulti: false,
      dataOptions: userOptions ?? [],
    },
    {
      filterType: 'Status',
      key: 'status',
      isMulti: false,
      dataOptions: PURCHASE_REQUEST_STATUS_OPTIONS,
    },
    {
      filterType: 'Start Date',
      key: 'start_date',
      isDateField: true,
    },
    {
      filterType: 'End Date',
      key: 'end_date',
      isDateField: true,
    },
  ];

  const filterFields: DropdownFilterItem[] = filterConfig.map((f) => ({
    filterType: f.filterType,
    dataOptions: f?.dataOptions ?? [],
    isMulti: !!f?.isMulti,
    isDateField: !!f?.isDateField,
    data: filters[f.key],
    setFilterData: (val: any) =>
      setFilters({
        ...filters,
        [f.key]: val,
      }),
  }));

  const actionDropdownItems: CustomDropdownMenuItem[] = [
    {
      label: 'Export',
      icon: 'bx bx-export',
      actionMethod: handleExport,
      permission: EXPORT_PURCHASE_REQUEST,
    },
  ];

  const isFetching = isFetchingPurchaseRequest || isFetchingUserOptions;

  const isError = isErrorPurchaseRequest || isErrorUserOptions;

  if (isError) return <ErrorMessage />;

  return (
    <>
      <PageTitle
        breadCrumbItems={[
          {
            label: `${title} List`,
            path: PURCHASE_REQUEST_LIST,
            active: true,
          },
        ]}
        title={title}
      />

      {isExporting && <Loader />}

      <Card>
        <Card.Body>
          <FilterSection
            filterFields={filterFields}
            filters={filters}
            setFilters={setFilters}
            canCreate={canCreate}
            createPath={PURCHASE_REQUEST_ADD}
            title={title}
            actionDropdownItems={actionDropdownItems}
          />
          <PurchaseRequestTable
            isFetching={isFetching}
            data={data}
            filters={filters}
            setFilters={setFilters}
          />
        </Card.Body>
      </Card>
    </>
  );
};

export default ListPurchaseRequest;
