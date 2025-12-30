import React from 'react';
import { Table } from 'react-bootstrap';
import { CeresTagObservationFeatureProperty } from '../../../../../types/ceresTag/ceresTag';
import { ACTIVITIES } from '../../../../../constants/ceresTagConstants';

type Props = {
  data?: CeresTagObservationFeatureProperty;
};

const PopUpTableContent: React.FC<Props> = ({ data }) => {
  return (
    <Table className="table-striped table-sm table-responsive table-bordered mb-1">
      <thead>
        <tr>
          <th>Activity</th>
          <th>Duration</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Recent Hr</td>
          {data?.Activity1 ? (
            <td>{ACTIVITIES[data.Activity1 as string]}</td>
          ) : (
            <td>-</td>
          )}
        </tr>
        <tr>
          <td>1 Hr. Earlier</td>
          {data?.Activity2 ? (
            <td>{ACTIVITIES[data.Activity2 as string]}</td>
          ) : (
            <td>-</td>
          )}
        </tr>
        <tr>
          <td>2 Hr. Earlier</td>
          {data?.Activity3 ? (
            <td>{ACTIVITIES[data.Activity3 as string]}</td>
          ) : (
            <td>-</td>
          )}
        </tr>
        <tr>
          <td>3 Hr. Earlier</td>
          {data?.Activity4 ? (
            <td>{ACTIVITIES[data.Activity4 as string]}</td>
          ) : (
            <td>-</td>
          )}
        </tr>
      </tbody>
    </Table>
  );
};

export default PopUpTableContent;
