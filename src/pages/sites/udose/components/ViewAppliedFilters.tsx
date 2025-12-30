import React from 'react';
import { Row, Col, ListGroup } from 'react-bootstrap';

type Props = {
  appliedFilters: any[];
};

const ViewAppliedFilters: React.FC<Props> = ({ appliedFilters }) => {
  return (
    <Row>
      <Col>
        <ListGroup horizontal className="mb-1 d-flex flex-wrap">
          <ListGroup.Item className="applied-filter-list-item">
            Applied Filters:
          </ListGroup.Item>
          {appliedFilters?.map((item) => (
            <ListGroup.Item
              key={item.key}
              className="applied-filter-list-item p-1">
              {item.filters.map(
                (filter: any) =>
                  filter.isSelected && (
                    <span key={filter.label} className="badge bg-success me-1">
                      {filter.label}
                    </span>
                  )
              )}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Col>
    </Row>
  );
};

export default ViewAppliedFilters;
