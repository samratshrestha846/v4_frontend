/* eslint-disable react/no-array-index-key */
/* eslint-disable no-unused-vars */
import React, { ReactNode, useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { Col, Row, Table } from 'react-bootstrap';

type ColumnHeaderProps = {
  columns: any[];
  expandColumn: any;
};

const ColumnHeader: React.FC<ColumnHeaderProps> = ({
  columns,
  expandColumn,
}) => {
  return (
    <thead>
      <tr className="b-secondary">
        {expandColumn && (
          <th key={expandColumn.dataField}> {expandColumn.text}</th>
        )}
        {columns?.map((column) => (
          <th key={column.dataField}> {column.text}</th>
        ))}
      </tr>
    </thead>
  );
};

type TableBodyProps = {
  columns: any[];
  data: any;
  expandRow?: (row: any) => ReactNode;
};

const TableBody: React.FC<TableBodyProps> = ({ columns, data, expandRow }) => {
  return (
    <tbody>
      {data?.map((row: any, index: number) => (
        <TableRow
          key={index}
          columns={columns}
          row={row}
          expandRow={expandRow}
        />
      ))}
    </tbody>
  );
};

type TableRowProps = {
  columns: any[];
  row: any;
  expandRow?: (row: any) => ReactNode;
};

const TableRow: React.FC<TableRowProps> = ({ columns, row, expandRow }) => {
  const [showExpandedRow, setShowExpandedRow] = useState(false);
  const [expandSign, setExpandSign] = useState('+');

  const handleRowClick = () => {
    if (!expandRow) return;
    setShowExpandedRow((prevExpandedRow) => !prevExpandedRow);
    setExpandSign((prevSign) => (prevSign === '+' ? '-' : '+'));
  };

  const getValue = (rowObject: any, path: string) => {
    const pathArray = path.split('.');
    let value = rowObject;
    pathArray.forEach((item) => {
      value = value[item];
    });
    return value;
  };

  return (
    <>
      <tr onClick={handleRowClick}>
        {expandRow && <td>{expandSign}</td>}
        {columns.map((col: any, index1: number) => (
          <td key={index1}>
            {col.formatter
              ? col.formatter(row, row)
              : getValue(row, col.dataField)}
          </td>
        ))}
      </tr>
      {expandRow && showExpandedRow && (
        <ExpandedRow expandRow={expandRow} row={row} columns={columns} />
      )}
    </>
  );
};

type ExpandedRowProps = {
  expandRow?: (row: any) => ReactNode;
  row: any;
  columns: any[];
};

const ExpandedRow: React.FC<ExpandedRowProps> = ({
  expandRow,
  row,
  columns,
}) => {
  return (
    <tr>
      <td className="reset-expansion-style" colSpan={columns.length + 1}>
        <div className="row-expand-slide-appear-done row-expand-slide-enter-done">
          <div className="row-expansion-style">
            {!!expandRow && expandRow(row)}
          </div>
        </div>
      </td>
    </tr>
  );
};

type TableWithPaginationProps = {
  columns: any[];
  data: any[];
  expandRow?: (row: any) => ReactNode;
};

const TableWithPagination: React.FC<TableWithPaginationProps> = ({
  columns,
  data,
  expandRow,
}) => {
  const [expandColumn, setExpandColumn] = useState<any[]>();

  // paginate the data
  const [pageNumber, setPageNumber] = useState(0);
  const [pageData, setPageData] = useState<any[]>([]);
  const [dataPerPage] = useState(10);
  const [pageCount, setPageCount] = useState(0);

  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const pagesVisited = pageNumber * dataPerPage;
    const displayData = data?.slice(pagesVisited, pagesVisited + dataPerPage);
    setPageData(displayData);
    setPageCount(Math.ceil(data.length / dataPerPage));
  }, [data, pageNumber, dataPerPage]);

  const handlePageChange = (selectedItem: { selected: number }) => {
    setPageNumber(selectedItem.selected);
  };

  useEffect(() => {
    if (expandRow) {
      setExpandColumn(columns);
    }
  }, [columns]);

  const handleSearchTerm = (searchText: string) => {
    setSearchTerm(searchText);
    setPageNumber(0);
    const filteredData = data.filter((row) => {
      return Object.keys(row).some(
        (key) =>
          row[key]?.toString().toLowerCase().includes(searchText.toLowerCase())
      );
    });
    setPageData(filteredData.slice(0, dataPerPage));
    setPageCount(Math.ceil(filteredData.length / dataPerPage));
  };

  return (
    <>
      <Row className="mb-1">
        <Col md={3}>
          <input
            type="text"
            placeholder="Search..."
            className="form-control"
            onChange={(event) => {
              handleSearchTerm(event.target.value);
            }}
          />
        </Col>
      </Row>
      <Table
        striped
        hover
        className="table table-bordered table-sm table-responsive">
        <ColumnHeader columns={columns} expandColumn={expandColumn} />
        <TableBody columns={columns} data={pageData} expandRow={expandRow} />
      </Table>
      <Row>
        <Col sm={4}>
          <p>
            {/* Showing from to total entries */}
            Showing {pageNumber * dataPerPage + 1} to{' '}
            {pageNumber * dataPerPage + pageData.length} of {data.length}{' '}
            entries
          </p>
        </Col>
        <Col sm={8}>
          <ReactPaginate
            pageCount={pageCount}
            onPageChange={handlePageChange}
            containerClassName="pagination"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            nextClassName="page-item"
            previousLinkClassName="page-link"
            nextLinkClassName="page-link"
            activeClassName="active"
            pageRangeDisplayed={5}
            marginPagesDisplayed={0}
          />
        </Col>
      </Row>
    </>
  );
};

export default TableWithPagination;
