/* eslint-disable no-unused-vars */
import React from 'react';
import { Row, Col } from 'react-bootstrap';
import ReactPaginate from 'react-paginate';
import Select from 'react-select';
import classNames from 'classnames';
import {
  PAGINATION_MARGIN_PAGES_DISPLAYED,
  PAGINATION_PAGE_RANGE_DISPLAYED,
  PAGINATION_PER_PAGE_OPTIONS,
} from '../constants/constants';
import { PaginationPerPageOptions } from '../types/common';

type Data = {
  from: number;
  to: number;
  total: number;
  last_page: number;
};

type Props = {
  data?: Data;
  pageNumber: number;
  handlePageChange: (selectedItem: { selected: number }) => void;
  showPerPageDropdown?: boolean;
  perPage?: number;
  showPerPageLabel?: boolean;
  handlePerPageChange?: (selected: any) => void;
  customPerPageOptions?: PaginationPerPageOptions[];
  hidePageDetails?: boolean;
};

const Pagination: React.FC<Props> = ({
  data,
  pageNumber,
  handlePageChange,
  showPerPageDropdown,
  perPage,
  showPerPageLabel,
  handlePerPageChange,
  customPerPageOptions,
  hidePageDetails,
}) => {
  if (data?.total === 0) {
    return null;
  }

  return (
    <Row>
      <Col>
        <div className="d-flex justify-content-start align-items-center flex-wrap gap-2 my-3">
          {showPerPageDropdown && (
            <div className="d-flex align-items-center gap-2 flex-nowrap">
              {showPerPageLabel && <span>Per Page</span>}
              <div className="pagination-show-per-page">
                <Select
                  options={customPerPageOptions || PAGINATION_PER_PAGE_OPTIONS}
                  menuPlacement="top"
                  defaultValue={(
                    customPerPageOptions || PAGINATION_PER_PAGE_OPTIONS
                  )?.find((item) => item.value === perPage)}
                  onChange={handlePerPageChange}
                  isSearchable={false}
                />
              </div>
            </div>
          )}
          <div
            className={classNames(
              'd-flex align-items-center flex-wrap flex-grow-1 gap-2',
              hidePageDetails
                ? 'justify-content-end'
                : 'justify-content-between'
            )}>
            {!hidePageDetails && (
              <p className="m-0">
                {`Showing ${data?.from ?? 0} to ${data?.to ?? 0} of ${data?.total ?? 0} entries`}
              </p>
            )}

            <ReactPaginate
              pageCount={data?.total !== 0 ? data?.last_page ?? 1 : 0}
              onPageChange={handlePageChange}
              forcePage={pageNumber}
              containerClassName="pagination m-0"
              pageClassName="page-item"
              pageLinkClassName="page-link"
              previousClassName="page-item"
              nextClassName={classNames(
                'page-item',
                data?.total === 0 ? 'disabled' : ''
              )}
              previousLinkClassName="page-link"
              nextLinkClassName="page-link"
              activeClassName="active"
              pageRangeDisplayed={PAGINATION_PAGE_RANGE_DISPLAYED}
              marginPagesDisplayed={PAGINATION_MARGIN_PAGES_DISPLAYED}
              nextLabel={<i className="bx bx-chevron-right" />}
              previousLabel={<i className="bx bx-chevron-left" />}
            />
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default Pagination;
