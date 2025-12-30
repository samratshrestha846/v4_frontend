/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/prop-types */
import React, { ChangeEvent } from 'react';
import {
  LabSample,
  LabSampleListResponse,
} from '../../../../types/lab/labSampleList';
import { shortDateFormat } from '../../../../helpers';
import CustomDataTable from '../../../../components/CustomDataTable';
import Pagination from '../../../../components/Pagination';

type Props = {
  data?: LabSampleListResponse;
  handleChangeOnLabSampleSelect: (e: ChangeEvent<HTMLInputElement>) => void;
  selectedLabSamples?: LabSample[];
  pageNumber: number;
  handlePageChange: (e: any) => void;
};

const LabSampleSelectList: React.FC<Props> = ({
  data,
  handleChangeOnLabSampleSelect,
  selectedLabSamples,
  pageNumber,
  handlePageChange,
}) => {
  const selectColumnFormatter = (row: LabSample) => {
    return (
      <input
        type="checkbox"
        className="form-check-input"
        value={row.id}
        onChange={handleChangeOnLabSampleSelect}
        defaultChecked={selectedLabSamples
          ?.map((item) => item.id)
          .includes(row.id)}
      />
    );
  };

  const columns = [
    {
      dataField: '',
      text: 'Select',
      formatter: selectColumnFormatter,
    },
    {
      dataField: 'sample_id',
      text: 'Sample ID',
    },
    {
      dataField: 'customer',
      text: 'Customer',
      formatter: (row: LabSample) =>
        row.customer_property?.customer?.business_name ?? '-',
    },
    {
      dataField: 'customer_property',
      text: 'Property',
      formatter: (row: LabSample) => row.customer_property?.name ?? '-',
    },
    {
      dataField: 'lab_sample_type.name',
      text: 'Sample Type',
    },
    {
      dataField: 'site.name',
      text: 'Site',
    },
    {
      dataField: 'collected_datetime',
      text: 'Collected At',
      formatter: (row: any) => {
        return shortDateFormat(row.collected_datetime);
      },
    },
  ];
  return (
    <>
      <CustomDataTable columns={columns} data={data!.body} />
      <Pagination
        data={data!.meta_data!.pagination}
        pageNumber={pageNumber}
        handlePageChange={handlePageChange}
      />
    </>
  );
};

export default LabSampleSelectList;
