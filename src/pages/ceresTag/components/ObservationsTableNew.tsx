import React from 'react';
import { CeresTagObservationNewData } from '../../../types/ceresTag/ceresTag';
import { formattedTime } from '../../../helpers';
import CustomDataTable from '../../../components/CustomDataTable';

type Props = {
  observations: CeresTagObservationNewData[];
};

const ObservationsTableNew: React.FC<Props> = ({ observations }) => {
  const coordinateFormatter = (row: CeresTagObservationNewData) => {
    if (row.data.Latitude !== undefined && row.data.Longitude !== undefined) {
      return `${Number(row.data.Latitude).toFixed(6)}, ${Number(row.data.Longitude).toFixed(6)}`;
    }
    return '-';
  };

  const temperatureFormatter = (row: CeresTagObservationNewData) => {
    return (
      <>
        {row.data.Temperature} <sup>o</sup>C
      </>
    );
  };

  const columns = [
    {
      dataField: 'observation_date',
      text: 'Time',
      formatter: (row: CeresTagObservationNewData) =>
        row.observation_date ? formattedTime(row.observation_date) : '-',
    },
    {
      dataField: 'data.Temperature',
      text: 'Device Temperature',
      formatter: temperatureFormatter,
    },
    {
      dataField: 'data',
      text: 'Coordinate',
      formatter: coordinateFormatter,
    },
    {
      dataField: 'data.Grazing_Minutes',
      text: 'Grazing (Min.)',
    },
    {
      dataField: `data['Resting/Ruminating_Minutes']`,
      text: 'Resting & Ruminating (Min.)',
    },
    {
      dataField: 'data.Walking_Minutes',
      text: 'Walking (Min.)',
    },
    {
      dataField: 'data.Other_Minutes',
      text: 'Drinking & Others (Min.)',
    },
  ];

  return (
    <div className="table-responsive">
      <CustomDataTable columns={columns} data={observations} />
    </div>
  );
};

export default ObservationsTableNew;
