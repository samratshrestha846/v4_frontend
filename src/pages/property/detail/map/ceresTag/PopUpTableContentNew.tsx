import React from 'react';
import { Table } from 'react-bootstrap';
import { CeresTagNewObservationFeatureProperty } from '../../../../../types/ceresTag/ceresTag';

type Props = {
  data?: CeresTagNewObservationFeatureProperty;
};

const PopUpTableContentNew: React.FC<Props> = ({ data }) => {
  return (
    <Table className="table-striped table-sm table-responsive table-bordered mb-1">
      <thead>
        <tr>
          <th>Behaviour</th>
          <th>Duration (Min.)</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Grazing </td>
          <td>{data?.Grazing_Minutes ?? '-'}</td>
        </tr>
        <tr>
          <td>Resting & Ruminating </td>
          <td>{data?.['Resting/Ruminating_Minutes'] ?? '-'}</td>
        </tr>
        <tr>
          <td>Walking</td>
          <td>{data?.Walking_Minutes ?? '-'}</td>
        </tr>
        <tr>
          <td>Drinking & Others</td>
          <td>{data?.Other_Minutes ?? '-'}</td>
        </tr>
      </tbody>
    </Table>
  );
};

export default PopUpTableContentNew;
