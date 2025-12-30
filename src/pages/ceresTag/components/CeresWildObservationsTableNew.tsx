import React from 'react';
import { CeresWildObservationNewData } from '../../../types/ceresTag/ceresTag';
import { formattedTime } from '../../../helpers';
import CustomDataTable from '../../../components/CustomDataTable';

type Props = {
  observations: CeresWildObservationNewData[];
};

const CeresWildObservationsTableNew: React.FC<Props> = ({ observations }) => {
  const temperatureFormatter = (row: CeresWildObservationNewData) => {
    return (
      <>
        {row.data.Temperature} <sup>o</sup>C
      </>
    );
  };

  const coordinateFormatter = (row: CeresWildObservationNewData) => {
    if (row.data.Latitude !== undefined && row.data.Longitude !== undefined) {
      return `${Number(row.data.Latitude).toFixed(6)}, ${Number(row.data.Longitude).toFixed(6)}`;
    }
    return '-';
  };

  const columns = [
    {
      dataField: 'observation_date',
      text: 'Time',
      formatter: (row: CeresWildObservationNewData) =>
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
      dataField: 'data.Activity_LatestHour',
      text: 'Latest Hour Activity',
    },

    {
      dataField: 'data.Activity_PreviousHour',
      text: '1 Hr. Earlier Activity',
    },
  ];

  return (
    <div className="table-responsive">
      <CustomDataTable columns={columns} data={observations} />
    </div>
  );
};

export default CeresWildObservationsTableNew;
