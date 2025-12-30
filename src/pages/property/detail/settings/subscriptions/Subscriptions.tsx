import React from 'react';
import { Table } from 'react-bootstrap';
import { CustomerSubscription } from '../../../../../types/property/propertyList';

type Props = {
  subscriptions?: CustomerSubscription[];
};

const Subscriptions: React.FC<Props> = ({ subscriptions }) => {
  return (
    <Table responsive className="table-sm">
      <thead>
        <tr>
          <th>Supplement</th>
          <th className="text-end">Cost Per ltr.</th>
        </tr>
      </thead>
      <tbody>
        {subscriptions?.map((item) => (
          <tr key={item.id}>
            <td>{item?.supplement?.name}</td>
            <td className="text-end">{item?.cost_per_ltr}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default Subscriptions;
