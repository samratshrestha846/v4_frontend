import React from 'react';
import { Card, Table } from 'react-bootstrap';
import { Property } from '../../../types/property/propertyList';

type Props = {
  properties: Property[];
};

const Properties: React.FC<Props> = ({ properties }) => {
  return (
    <Card>
      <Card.Body>
        <h4 className="header-title mt-1 mb-3">Properties</h4>

        <Table
          responsive
          className="table table-sm table-centered mb-0 font-14">
          <thead className="table-light">
            <tr>
              <th>Name </th>
              <th>Region</th>
            </tr>
          </thead>
          <tbody>
            {properties?.map((property: any) => (
              <tr key={property.id}>
                <td>{property?.name}</td>
                <td>{`${property?.region?.name} - ${property?.region?.state}`}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};

export default Properties;
