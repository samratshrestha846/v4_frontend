import React from 'react';
import { Card } from 'react-bootstrap';
import { TableColumn } from '../../../../types/common';
import ErrorMessage from '../../../../components/ErrorMessage';
import CustomDataTable from '../../../../components/CustomDataTable';
import Pagination from '../../../../components/Pagination';
import CustomLoader from '../../../../components/CustomLoader';
import useListCarbonTopPerformersSites from '../../hooks/useListCarbonTopPerformersSites';
import FilterCarbonTopPerformerSites from './FilterCarbonTopPerformerSites';
import ActiveInactiveStatus from '../../../../components/ActiveInactiveStatus';
import {
  DIGIT_AFTER_DECIMAL_IN_SUPPLEMENT_FEED,
  DIGIT_AFTER_DECIMAL_IN_CARBON_CREDIT,
  STATUS_ACTIVE,
  SUPPLEMENT_FEED_UNIT_ML,
} from '../../../../constants/constants';
import { CarbonTopPerformerSites } from '../../../../types/carbon-accounting/carbonAccounting';
import useCustomersDropdown from '../../../../hooks/dropdown/useCustomersDropdown';
import usePropertiesDropdown from '../../../../hooks/dropdown/usePropertiesDropdown';
import SitesTopGainerList from './SitesTopGainerList';
import TrendAnalysis from '../../../../components/TrendAnalysis';
import CCEmissionUnit from '../../components/CCEmissionUnit';
import commaSeperatedNumber from '../../../../helpers/numberHelper';
import TruncateTextWithOverlayTooltip from '../../../../components/TruncateTextWithOverlayTooltip';

const ListCarbonTopPerformerSites: React.FC = () => {
  const {
    pageNumber,
    data,
    isFetching,
    isError,
    handlePageChange,
    duration,
    setDuration,
    customer,
    setCustomer,
    property,
    setProperty,
    sort,
    direction,
    handleTabeDataSorting,
  } = useListCarbonTopPerformersSites();

  const {
    customersDropdown: customersOptions,
    isFetchingCustomersDropdown: isFetchingCustomersOptions,
    isErrorCustomersDropdown: isErrorCustomersOptions,
  } = useCustomersDropdown();

  const {
    data: propertiesOptions,
    isError: isErrorPropertiesOptions,
    isFetching: isFetchingPropertiesOptions,
  } = usePropertiesDropdown(true, customer);

  const supplementFormatter = (row: CarbonTopPerformerSites) => {
    if (!row.supplements || row.supplements.length === 0) {
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

  const formatStatus = (row: any) => {
    return row?.site.status != null ? (
      <ActiveInactiveStatus isActive={row?.site.status === STATUS_ACTIVE} />
    ) : (
      '-'
    );
  };

  const afFormatter = (row: any) => {
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

  const emissionFormatter = (row: any) => {
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
      dataField: 'site.name',
      text: 'Site',
    },
    { dataField: 'site.customer_property.name', text: 'Property' },
    {
      dataField: 'site.customer_property.customer.business_name',
      text: 'Customer',
    },
    {
      dataField: 'total_actual_emission',
      text: (
        <span>
          Carbon Abatement
          <CCEmissionUnit wrapperClass="fw-bold font-14 ms-half" />
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
      sortable: false,
    },
    {
      dataField: 'site.status',
      text: 'Status',
      formatter: formatStatus,
      sortable: false,
    },
  ];

  if (isError) {
    return <ErrorMessage />;
  }

  return (
    <Card>
      <Card.Body>
        <FilterCarbonTopPerformerSites
          duration={duration}
          setDuration={setDuration}
          customer={customer}
          setCustomer={setCustomer}
          property={property}
          setProperty={setProperty}
          customersOptions={customersOptions}
          propertiesOptions={propertiesOptions}
          isFetchingCustomersOptions={isFetchingCustomersOptions}
          isFetchingPropertiesOptions={isFetchingPropertiesOptions}
          isErrorCustomersOptions={isErrorCustomersOptions}
          isErrorPropertiesOptions={isErrorPropertiesOptions}
        />
        {isFetching ? (
          <CustomLoader />
        ) : (
          <>
            {pageNumber === 0 && data!.body?.length > 0 && (
              <SitesTopGainerList data={data!.body} />
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

export default ListCarbonTopPerformerSites;
