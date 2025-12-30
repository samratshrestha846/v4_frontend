/* eslint-disable no-unused-vars */
import React from 'react';
import { Badge, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { LabSample } from '../../../../types/lab/labSampleList';
import { shortDateFormat } from '../../../../helpers';
import CustomDataTable from '../../../../components/CustomDataTable';

type Props = {
  handleRemoveLabSample: (removedSampleId: number) => void;
  selectedLabSamples?: LabSample[];
};

const SelectedLabSampleList: React.FC<Props> = ({
  handleRemoveLabSample,
  selectedLabSamples,
}) => {
  const actionColumnFormatter = (row: LabSample) => {
    return (
      <button
        type="button"
        className="border-0 device-list-edit-action bg-transparent"
        onClick={() => handleRemoveLabSample(row.id)}>
        <OverlayTrigger
          placement="bottom"
          overlay={<Tooltip id="remove"> Remove </Tooltip>}>
          <i className="bx bx-trash text-danger" />
        </OverlayTrigger>
      </button>
    );
  };

  const columns = [
    {
      dataField: 'sample_id',
      text: 'Sample ID',
    },
    {
      dataField: 'lab_sample_type.name',
      text: 'Sample Type',
    },
    {
      dataField: 'paddock',
      text: 'Paddock',
    },
    {
      dataField: 'collected_datetime',
      text: 'Collected On',
      formatter: (row: any) => {
        return shortDateFormat(row.collected_datetime);
      },
    },
    {
      dataField: 'received_datetime',
      text: 'Received On',
      formatter: (row: any) => {
        return shortDateFormat(row.received_datetime);
      },
    },
    {
      dataField: 'analysed_on',
      text: 'Analysed On',
      formatter: (row: any) => {
        return shortDateFormat(row.analysed_on);
      },
    },
    {
      dataField: '',
      text: 'Action',
      formatter: actionColumnFormatter,
    },
  ];
  return (
    <>
      <h5 className="mt-0 mb-2 text-uppercase p-2 b-secondary mt-2">
        <i className="bx bxs-flask me-1" />
        Selected Lab{' '}
        {selectedLabSamples && selectedLabSamples?.length === 1
          ? 'Sample'
          : 'Samples'}
        {' - '}
        <Badge bg="primary">{selectedLabSamples?.length}</Badge>
      </h5>
      <CustomDataTable columns={columns} data={selectedLabSamples as any[]} />
    </>
  );
};

export default SelectedLabSampleList;
