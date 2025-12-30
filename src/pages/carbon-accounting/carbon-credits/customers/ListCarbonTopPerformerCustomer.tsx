import React from 'react';
import { Card } from 'react-bootstrap';
import { TableColumn } from '../../../../types/common';
import ErrorMessage from '../../../../components/ErrorMessage';
import CustomDataTable from '../../../../components/CustomDataTable';
import Pagination from '../../../../components/Pagination';
import CustomLoader from '../../../../components/CustomLoader';
import useListCarbonTopPerformersCustomers from '../../hooks/useListCarbonTopPerformersCustomers';
import FilterCarbonTopPerformerCustomer from './FilterCarbonTopPerformerCustomer';
import { CarbonTopPerformerCustomer } from '../../../../types/carbon-accounting/carbonAccounting';
import CustomerTopGainerList from './CustomerTopGainerList';
import TrendAnalysis from '../../../../components/TrendAnalysis';
import CCEmissionUnit from '../../components/CCEmissionUnit';
import {
  DIGIT_AFTER_DECIMAL_IN_CARBON_CREDIT,
  DIGIT_AFTER_DECIMAL_IN_SUPPLEMENT_FEED,
  SUPPLEMENT_FEED_UNIT_ML,
} from '../../../../constants/constants';
import commaSeperatedNumber from '../../../../helpers/numberHelper';
import TruncateTextWithOverlayTooltip from '../../../../components/TruncateTextWithOverlayTooltip';

const ListCarbonTopPerformerCustomer: React.FC = () => {
  const {
    pageNumber,
    data,
    isFetching,
    isError,
    handlePageChange,
    duration,
    setDuration,
    sort,
    direction,
    handleTabeDataSorting,
  } = useListCarbonTopPerformersCustomers();

  const supplementFormatter = (row: CarbonTopPerformerCustomer) => {
    if (!row.supplements || row.supplements?.length === 0) {
      return <span>-</span>;
    }

    if (row.supplements?.length === 1) {
      return row.supplements?.map((item) => (
        <span key={item.name}>{item.name}</span>
      ));
    }

    return (
      <div className="d-flex justify-content-start align-items-center gap-1">
        {row.supplements?.map((item) => (
          <TruncateTextWithOverlayTooltip
            key={item.name}
            text={item.name}
            endIndex={6}
          />
        ))}
      </div>
    );
  };

  const afFormatter = (row: CarbonTopPerformerCustomer) => {
    return row?.supplement_feed_in_ml != null
      ? commaSeperatedNumber(
          Number(
            row.supplement_feed_in_ml.toFixed(
              DIGIT_AFTER_DECIMAL_IN_SUPPLEMENT_FEED
            )
          )
        )
      : '-';
  };

  const emissionFormatter = (row: CarbonTopPerformerCustomer) => {
    return (
      <div className="d-flex justify-content-start align-items-center gap-1">
        {row?.total_actual_emission != null
          ? Number(row.total_actual_emission).toFixed(
              DIGIT_AFTER_DECIMAL_IN_CARBON_CREDIT
            )
          : '-'}
        <TrendAnalysis
          trendAmount={
            Number(row.trendItem.total_actual_emission) > 0
              ? Math.round(
                  ((Number(row.total_actual_emission) -
                    Number(row.trendItem.total_actual_emission)) /
                    Number(row.trendItem.total_actual_emission)) *
                    100
                )
              : 0
          }
        />
      </div>
    );
  };

  const columns: TableColumn[] = [
    {
      dataField: 'customer.business_name',
      text: 'Customer',
    },
    {
      dataField: 'customer.customer_property_count',
      text: 'No. of Property',
      sortable: false,
    },

    {
      dataField: 'total_actual_emission',
      text: (
        <span>
          Carbon Abatement
          <CCEmissionUnit wrapperClass="fw-bold font-12 ms-half" />
        </span>
      ),
      formatter: emissionFormatter,
      sortable: false,
    },
    {
      dataField: 'supplements',
      text: 'Reduction Supplement',
      formatter: supplementFormatter,
    },
    {
      dataField: 'supplement_feed_in_ml',
      text: `Agolin Feed(${SUPPLEMENT_FEED_UNIT_ML})`,
      formatter: afFormatter,
    },
  ];

  if (isError) {
    return <ErrorMessage />;
  }

  return (
    <Card>
      <Card.Body>
        <FilterCarbonTopPerformerCustomer
          duration={duration}
          setDuration={setDuration}
        />

        {isFetching ? (
          <CustomLoader />
        ) : (
          <>
            {pageNumber === 0 && data!.body?.length > 0 && (
              <CustomerTopGainerList data={data!.body} />
            )}

            <CustomDataTable
              columns={columns}
              data={data!.body}
              sort={sort}
              direction={direction}
              handleTabeDataSorting={handleTabeDataSorting}
            />

            <Pagination
              data={data?.meta_data?.pagination}
              pageNumber={pageNumber}
              handlePageChange={handlePageChange}
            />
          </>
        )}
      </Card.Body>
    </Card>
  );
};

export default ListCarbonTopPerformerCustomer;
