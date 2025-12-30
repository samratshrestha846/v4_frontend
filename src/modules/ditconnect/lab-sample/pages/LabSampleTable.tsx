/* eslint-disable no-unused-vars */
import React from 'react';
import CustomLoader from '@uhub/components/CustomLoader';
import CustomDataTable from '@uhub/components/CustomDataTable';
import Pagination from '@uhub/components/Pagination';
import { formattedDatetime, prepareDynamicUrl } from '@uhub/helpers';
import {
  CustomDropdownMenuItem,
  ListTableProps,
  TableColumn,
} from '@uhub/types/common';
import ActionDropdown from '@uhub/components/ActionDropdown';
import IconLabelStatus from '@uhub/components/IconLabelStatus';
import { can } from '@uhub/helpers/checkPermission';

import { LabSampleListResponse, LabSampleResponse } from '../types/LabSample';
import {
  APPROVE_LAB_SAMPLE,
  DELETE_LAB_SAMPLE,
  LAB_SAMPLE,
  LAB_SAMPLE_EDIT,
  LAB_SAMPLE_STATUS_APPROVED,
  LAB_SAMPLE_STATUS_CREATED,
  LAB_SAMPLE_VIEW,
  UPDATE_LAB_SAMPLE,
} from '../constants/constant';
import DeleteModal from '../../components/DeleteModal';

import ApproveLabSample from './ApproveLabSample';

const LabSampleTable: React.FC<ListTableProps<LabSampleListResponse>> = ({
  isFetching,
  data,
  filters,
  setFilters,
}) => {
  const canApprove = can(APPROVE_LAB_SAMPLE);

  const actionColumnFormatter = (row: LabSampleResponse) => {
    const menuItems: CustomDropdownMenuItem[] = [
      {
        label: 'View',
        icon: 'bx bx-show',
        url: prepareDynamicUrl(LAB_SAMPLE_VIEW, row.id),
        permission: UPDATE_LAB_SAMPLE,
      },
      {
        label: 'Edit',
        icon: 'bx bx-edit',
        url: prepareDynamicUrl(LAB_SAMPLE_EDIT, row.id),
        permission: UPDATE_LAB_SAMPLE,
      },
      {
        label: 'Delete',
        icon: 'bx bx-trash',
        actionKey: 'Delete Lab Sample',
        modalContent: (
          <DeleteModal
            title={`Sample ID - ${row.sample_id}`}
            endpoint={`${LAB_SAMPLE}/${row.id}`}
            refetchKey={LAB_SAMPLE}
            toggleModal={() => {}}
          />
        ),
        permission: DELETE_LAB_SAMPLE,
      },
    ];

    if (row.status === LAB_SAMPLE_STATUS_CREATED && canApprove) {
      menuItems.push({
        label: 'Approve',
        icon: 'bx bx-check',
        actionKey: 'Approve Lab Sample',
        modalContent: (
          <ApproveLabSample labSample={row} toggleModal={() => {}} />
        ),
        permission: APPROVE_LAB_SAMPLE,
      });
    }

    return (
      <ActionDropdown
        icon="bx bx-dots-vertical-rounded"
        containerClass="custom-dropdown"
        menuItems={menuItems}
      />
    );
  };

  const statusColumnFormatter = (row: LabSampleResponse) => {
    return (
      <IconLabelStatus
        label={row.status}
        iconTextClass={
          row.status === LAB_SAMPLE_STATUS_APPROVED
            ? 'text-success'
            : 'text-light-gray'
        }
      />
    );
  };

  const columns: TableColumn[] = [
    {
      dataField: 'sample_id',
      text: 'Sample ID',
    },
    {
      dataField: 'sample_type',
      text: 'Sample Type',
    },
    {
      dataField: 'collected_at',
      text: 'Collected At',
      formatter: (row: LabSampleResponse) =>
        row.collected_at ? formattedDatetime(row.collected_at) : '-',
    },
    {
      dataField: 'sample_taken_by.name',
      text: 'Sample Taken By',
    },
    {
      dataField: 'customer_property',
      text: 'Property',
    },
    {
      dataField: 'site_name',
      text: 'Site',
    },
    {
      dataField: 'device_serial_number',
      text: 'Device Serial No.',
    },
    {
      dataField: 'status',
      text: 'Status',
      formatter: statusColumnFormatter,
    },
    {
      dataField: 'action',
      text: '',
      formatter: actionColumnFormatter,
    },
  ];

  const handlePageChange = (selectedItem: any) => {
    setFilters((prev: any) => ({
      ...prev,
      page: selectedItem.selected + 1,
    }));
  };

  if (isFetching) return <CustomLoader />;

  return (
    <>
      <CustomDataTable columns={columns} data={data!.data} />
      <Pagination
        data={data!.meta_data!.pagination}
        pageNumber={Number(filters.page ?? 1) - 1}
        handlePageChange={handlePageChange}
      />
    </>
  );
};

export default LabSampleTable;
