import React from 'react';
import { Badge } from 'react-bootstrap';
import { TableColumn } from '@uhub/types/common';
import { CeresTagObservation } from '../../../types/ceresTag/ceresTag';
import {
  ACTIVITIES,
  ACTIVITY_1,
  ACTIVITY_2,
  ACTIVITY_3,
  ACTIVITY_4,
  ACTIVITY_5,
  ACTIVITY_6,
  ACTIVITY_7,
} from '../../../constants/ceresTagConstants';
import { formattedTime } from '../../../helpers';
import CustomDataTable from '../../../components/CustomDataTable';

type Props = {
  observations: CeresTagObservation[];
};

const ObservationsTableOld: React.FC<Props> = ({ observations }) => {
  const getActivityByNumber = (activityNumber: string) => {
    switch (activityNumber) {
      case ACTIVITY_1:
        return (
          <Badge className="badge-dark-lighten">
            {ACTIVITIES[activityNumber]}
          </Badge>
        );
      case ACTIVITY_2:
        return (
          <Badge className="badge-warning-lighten">
            {ACTIVITIES[activityNumber]}
          </Badge>
        );
      case ACTIVITY_3:
        return (
          <Badge className="badge-success-lighten">
            {ACTIVITIES[activityNumber]}
          </Badge>
        );
      case ACTIVITY_4:
        return (
          <Badge className="badge-success-lighten">
            {ACTIVITIES[activityNumber]}
          </Badge>
        );
      case ACTIVITY_5:
        return (
          <Badge className="badge-danger-lighten">
            {ACTIVITIES[activityNumber]}
          </Badge>
        );
      case ACTIVITY_6:
        return (
          <Badge className="badge-danger-lighten">
            {ACTIVITIES[activityNumber]}
          </Badge>
        );
      case ACTIVITY_7:
        return (
          <Badge style={{ backgroundColor: '#E6533C' }}>
            {ACTIVITIES[activityNumber]}
          </Badge>
        );
      default:
        return '-';
    }
  };

  const coordinateFormatter = (row: CeresTagObservation) => {
    if (row.data.Latitude !== undefined && row.data.Longitude !== undefined) {
      return `${Number(row.data.Latitude).toFixed(6)}, ${Number(row.data.Longitude).toFixed(6)}`;
    }
    return '-';
  };

  const temperatureFormatter = (row: CeresTagObservation) => {
    return (
      <>
        {row.data.Temperature} <sup>o</sup>C
      </>
    );
  };

  const columns: TableColumn[] = [
    {
      dataField: 'observation_date',
      text: 'Time',
      formatter: (row: CeresTagObservation) =>
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
      dataField: 'data.Activity1',
      text: 'Recent Hour',
      formatter: (row: CeresTagObservation) =>
        getActivityByNumber(row.data.Activity1),
    },

    {
      dataField: 'data.Activity2',
      text: '1 Hr. Earlier',
      formatter: (row: CeresTagObservation) =>
        getActivityByNumber(row.data.Activity2),
    },
    {
      dataField: 'data.Activity3',
      text: '2 Hr. Earlier',
      formatter: (row: CeresTagObservation) =>
        getActivityByNumber(row.data.Activity3),
    },
    {
      dataField: 'data.Activity4',
      text: '3 Hr. Earlier',
      formatter: (row: CeresTagObservation) =>
        getActivityByNumber(row.data.Activity4),
    },
  ];

  return (
    <div className="table-responsive">
      <CustomDataTable columns={columns} data={observations} />
    </div>
  );
};

export default ObservationsTableOld;
