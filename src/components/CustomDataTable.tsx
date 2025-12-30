/* eslint-disable no-unused-vars */
import React, { ReactNode, useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import classNames from 'classnames';
import SortButton from './SortButton';
import { TableColumn } from '../types/common';
import NoDataAvailable from './NoDataAvailable';

type CustomDataTableProps = {
  columns: TableColumn[];
  data: any[];
  handleTabeDataSorting?: (dataField: string) => void;
  sort?: string;
  direction?: string;
  expandRow?: (row: any) => ReactNode;
  tableClassName?: string;
  noDataMessage?: string | null;
  isSmall?: boolean;
  wrapperClassName?: string;
};

type ColumnHeaderProps = {
  columns: TableColumn[];
  handleTabeDataSorting?: (dataField: string) => void;
  sort?: string;
  direction?: string;
  expandColumn?: any;
};

type TableBodyProps = {
  columns: TableColumn[];
  data: any[];
  expandRow?: (row: any) => ReactNode;
  noDataMessage?: string | null;
};

type TableRowProps = {
  columns: TableColumn[];
  row: any;
  expandRow?: (row: any) => ReactNode;
};

const ColumnHeader = ({
  columns,
  handleTabeDataSorting,
  sort,
  direction,
  expandColumn,
}: ColumnHeaderProps) => {
  return (
    <thead className="thead-bg-light">
      <tr>
        {expandColumn && (
          <th key={expandColumn.dataField}> {expandColumn.text}</th>
        )}
        {columns?.map((column) =>
          column.sortable ? (
            <th
              className="sort-head-column"
              key={column.dataField}
              onClick={() =>
                handleTabeDataSorting &&
                handleTabeDataSorting(column?.dataField)
              }>
              <div className="d-flex justify-content-between align-items-center gap-1">
                <span>{column.text}</span>
                <SortButton
                  sort={sort}
                  direction={direction}
                  dataField={column.dataField}
                />
              </div>
            </th>
          ) : (
            <th key={column.dataField}> {column.text}</th>
          )
        )}
      </tr>
    </thead>
  );
};

const TableBody = ({
  columns,
  data,
  expandRow,
  noDataMessage,
}: TableBodyProps) => {
  return (
    <tbody>
      {data?.length > 0 ? (
        data?.map((row: any, key: number) => (
          <TableRow
            key={row.id || key}
            columns={columns}
            row={row}
            expandRow={expandRow}
          />
        ))
      ) : (
        <tr>
          <td colSpan={columns.length}>
            <NoDataAvailable message={noDataMessage} />
          </td>
        </tr>
      )}
    </tbody>
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

const CustomDataTable: React.FC<CustomDataTableProps> = ({
  columns,
  data,
  handleTabeDataSorting,
  sort,
  direction,
  expandRow,
  tableClassName,
  noDataMessage,
  isSmall,
  wrapperClassName,
}) => {
  const [expandColumn, setExpandColumn] = useState<any[]>();

  const expandColumnFormatter = () => {
    return (
      <div className="text-center">
        <i className="fa fa-plus-circle" />
      </div>
    );
  };

  useEffect(() => {
    if (expandRow) {
      setExpandColumn([
        ...columns,
        {
          dataField: 'expand',
          text: 'Expand',
          formatter: expandColumnFormatter,
        },
      ]);
    }
  }, [columns]);

  return (
    <div className={classNames('table-responsive', wrapperClassName ?? '')}>
      <Table
        hover
        className={tableClassName || 'table'}
        size={isSmall ? 'sm' : undefined}>
        <ColumnHeader
          columns={columns}
          handleTabeDataSorting={handleTabeDataSorting}
          sort={sort}
          direction={direction}
          expandColumn={expandColumn}
        />

        <TableBody
          columns={columns}
          data={data}
          expandRow={expandRow}
          noDataMessage={noDataMessage}
        />
      </Table>
    </div>
  );
};

export default CustomDataTable;

const TableRow: React.FC<TableRowProps> = ({ columns, row, expandRow }) => {
  const [showExpandedRow, setShowExpandedRow] = useState(false);
  const [expandSign, setExpandSign] = useState('+');

  const handleRowClick = () => {
    if (!expandRow) return;
    setShowExpandedRow((prevExpandedRow) => !prevExpandedRow);
    setExpandSign((prevSign) => (prevSign === '+' ? '-' : '+'));
  };

  const getValue = (rowObj: any, columnField: string) => {
    const pathArray = columnField.split('.');
    if (pathArray.length === 0) return rowObj[columnField];
    let value = rowObj;
    pathArray.forEach((item) => {
      if (value[item]) {
        value = value[item];
      } else {
        value = '-';
      }
    });
    return value;
  };

  const getTooltipValue = (col: any) => {
    const value = col.formatter
      ? col.formatter(row, row)
      : getValue(row, col.dataField);

    if (typeof value === 'string' || typeof value === 'number') {
      return String(value);
    }
    return null;
  };

  return (
    <>
      <tr onClick={handleRowClick}>
        {expandRow && <td>{expandSign}</td>}
        {columns.map((col) => (
          <td
            key={col.dataField}
            className={getTooltipValue(col) != null ? 'text-truncate-td' : ''}
            data-tooltip={(() => {
              getTooltipValue(col);
            })()}
            ref={(el) => {
              if (el) {
                // Display tooltip only when scroll width is greater than client width
                const isOverflowing = el.scrollWidth > el.clientWidth;
                const tooltipValue = getTooltipValue(col);
                if (isOverflowing && tooltipValue) {
                  el.setAttribute('data-tooltip', tooltipValue);
                } else {
                  el.removeAttribute('data-tooltip');
                }
              }
            }}>
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
