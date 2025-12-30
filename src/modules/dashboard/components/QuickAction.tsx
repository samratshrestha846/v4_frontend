import { WORK_DIARY_LIST } from '@project/ditconnect/daily-diary/work-diary/constants/constant';
import { SALES_ORDER_LIST } from '@project/ditconnect/sales-order/constants/constant';
import React from 'react';
import { Dropdown } from 'react-bootstrap';

const QuickAction = () => {
  return (
    <Dropdown
      drop="up"
      title="Quick Action"
      className="quick-action-menu mb-3 float-end">
      <Dropdown.Toggle variant="outline-secondary">
        <div className="p-0 m-0">
          Quick Action
          <i className="bx bx-chevron-down ms-1" />
        </div>
      </Dropdown.Toggle>
      <Dropdown.Menu align="end" style={{ zIndex: 1050 }}>
        <Dropdown.Item href={WORK_DIARY_LIST}>
          <i className="bx bxs-circle me-1 font-10" />
          <span>Daily Dairy</span>
        </Dropdown.Item>
        <Dropdown.Item href={SALES_ORDER_LIST}>
          <i className="bx bxs-circle me-1 font-10" />
          <span>Sales Order</span>
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default QuickAction;
