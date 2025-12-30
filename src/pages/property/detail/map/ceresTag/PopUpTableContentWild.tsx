import React from 'react';
import { Table } from 'react-bootstrap';
import { CeresTagWildObservationFeatureProperty } from '../../../../../types/ceresTag/ceresTag';

type Props = {
  data?: CeresTagWildObservationFeatureProperty;
};

const PopUpTableContentWild: React.FC<Props> = ({ data }) => {
  return (
    <Table className="table-striped table-sm table-responsive table-bordered mb-1">
      <thead>
        <tr>
          <th>Activity</th>
          <th>Intensity</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Latest Hour</td>
          <td>{data?.Activity_LatestHour ?? '-'}</td>
        </tr>

        <tr>
          <td>1 Hr. Earlier Activity</td>
          <td>{data?.Activity_PreviousHour ?? '-'}</td>
        </tr>
      </tbody>
    </Table>
  );
};

export default PopUpTableContentWild;
