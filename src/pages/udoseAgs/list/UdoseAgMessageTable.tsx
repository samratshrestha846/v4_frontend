/* eslint-disable no-unused-vars */
import React from 'react';
import { Card } from 'react-bootstrap';
import CustomDataTable from '../../../components/CustomDataTable';
import { formattedDatetime } from '../../../helpers';
import Pagination from '../../../components/Pagination';
import { UDoseAgDailyMessage } from '../../../types/udoseAgs/udoseAgs';
import CustomLoader from '../../../components/CustomLoader';

type Props = {
  data: any;
  pageNumber: number;
  isFetchingMessage: boolean;
  handlePageChange: (e: any) => void;
};

const UdoseAgMessageTable: React.FC<Props> = ({
  data,
  pageNumber,
  handlePageChange,
  isFetchingMessage,
}) => {
  const columns = [
    {
      text: 'Message Date',
      dataField: 'message_date',
      formatter: (row: UDoseAgDailyMessage) =>
        row.message_date ? formattedDatetime(row.message_date) : '-',
    },

    {
      text: 'Location',
      dataField: 'location',
      formatter: (row: UDoseAgDailyMessage) => {
        const latitude = row.latitude ? Number(row.latitude).toFixed(4) : '-';
        const longitude = row.longitude
          ? Number(row.longitude).toFixed(4)
          : '-';
        return latitude && longitude ? `${latitude}, ${longitude}` : '-';
      },
    },
    {
      text: 'Lowest Battery Voltage',
      dataField: 'lowest_battery_voltage',
    },
    {
      text: 'Highest Battery Voltage',
      dataField: 'highest_battery_voltage',
    },
    {
      text: 'Uptime Percent',
      dataField: 'uptime_percent',
    },
  ];

  return (
    <Card>
      <Card.Body>
        {isFetchingMessage ? (
          <CustomLoader />
        ) : (
          <>
            <CustomDataTable columns={columns} data={data!.data} />

            <Pagination
              data={data.meta_data?.pagination}
              pageNumber={pageNumber}
              handlePageChange={handlePageChange}
            />
          </>
        )}
      </Card.Body>
    </Card>
  );
};

export default UdoseAgMessageTable;
