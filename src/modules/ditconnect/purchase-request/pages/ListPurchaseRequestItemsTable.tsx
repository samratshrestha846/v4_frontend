import React from 'react';
import { Table } from 'react-bootstrap';
import { PurchaseRequestItemResponse } from '../types/PurchaseRequest';

type Props = {
  items: PurchaseRequestItemResponse[];
  totalPrice: number;
};

const ListPurchaseRequestItemsTable: React.FC<Props> = ({
  items,
  totalPrice,
}) => {
  return (
    <>
      <h5 className="text-primary-color mt-0 mb-3">Purchase Request Items</h5>
      <div className="table-responsive table-no-min-height">
        <Table bordered size="sm">
          <thead className="thead-bg-light">
            <tr>
              <th className="text-start">Name</th>
              <th className="text-start">Unit</th>
              <th className="text-end">Quantity</th>
              <th className="text-end">Rate</th>
              <th className="text-end">Total</th>
            </tr>
          </thead>
          <tbody>
            {items?.map((item) => (
              <tr key={item.id}>
                <td className="text-start">{item.item_name}</td>
                <td className="text-start">{item.unit}</td>
                <td className="text-end">{item.qty}</td>
                <td className="text-end">${item.rate}</td>
                <td className="text-end">${item.total}</td>
              </tr>
            ))}
            <tr>
              <td className="text-end fw-bold" colSpan={4}>
                Grand Total
              </td>
              <td className="text-end fw-bold">${totalPrice}</td>
            </tr>
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default ListPurchaseRequestItemsTable;
