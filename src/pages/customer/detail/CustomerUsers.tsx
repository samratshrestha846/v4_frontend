import React from 'react';
import { Card, Table } from 'react-bootstrap';
import { User } from '../../../types/user/user';

type Props = {
  users: User[];
};
const CustomerUsers: React.FC<Props> = ({ users }) => {
  return (
    <Card>
      <Card.Body>
        <h4 className="header-title mt-1 mb-3">Users</h4>

        <Table
          responsive
          className="table table-sm table-centered mb-0 font-14">
          <thead className="table-light">
            <tr>
              <th>Name </th>
              <th>email</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user: User) => (
              <tr key={user.id}>
                <td>{`${user.first_name} ${user.last_name}`}</td>
                <td>{user.email}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};

export default CustomerUsers;
