import React from 'react';
import { Card } from 'react-bootstrap';
import useListSupplementDeliveryNote from './hooks/useListSupplementDeliveryNote';
import CustomLoader from '../../../components/CustomLoader';
import ErrorMessage from '../../../components/ErrorMessage';
import SupplementDeliveryTable from './SupplementDeliveryTable';
import FilterSupplementDeliveryNote from './FilterSupplementDeliveryNote';

const ListSupplementDeliveryNotes: React.FC = () => {
  const {
    data,
    isFetching,
    isError,
    pageNumber,
    handlePageChange,
    performerId,
    setPerformerId,
    customerPropertyId,
    setCustomerPropertyId,
    duration,
    setDuration,
    sort,
    direction,
    handleTabeDataSorting,
  } = useListSupplementDeliveryNote();

  if (isError) {
    return <ErrorMessage />;
  }

  return (
    <Card>
      <Card.Body>
        <FilterSupplementDeliveryNote
          performerId={performerId}
          setPerformerId={setPerformerId}
          customerPropertyId={customerPropertyId}
          setCustomerPropertyId={setCustomerPropertyId}
          duration={duration}
          setDuration={setDuration}
        />
        {isFetching ? (
          <CustomLoader />
        ) : (
          <SupplementDeliveryTable
            data={data}
            pageNumber={pageNumber}
            handlePageChange={handlePageChange}
            sort={sort}
            direction={direction}
            handleTabeDataSorting={handleTabeDataSorting}
          />
        )}
      </Card.Body>
    </Card>
  );
};

export default ListSupplementDeliveryNotes;
