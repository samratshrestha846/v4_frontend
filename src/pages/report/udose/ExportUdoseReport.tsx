import React from 'react';
import { Card, Form } from 'react-bootstrap';
import ReportFilter from './ReportFilter';
import useExportUdoseReport from './hooks/useExportUdoseReport';
import Loader from '../../../components/Loader';
import ErrorMessage from '../../../components/ErrorMessage';

const ExportUdoseReport: React.FC = () => {
  const {
    isGenerating,
    register,
    control,
    errors,
    handleSubmit,
    reportColumns,
    onSubmit,
    propagateOnCustomerChange,
    propagateOnPropertyChange,
    customersDropdown,
    isFetchingCustomersDropdown,
    sitesOptions,
    isFetchingPropertiesDropdown,
    isFetchingSitesDropdown,
    propertiesOptions,
    serviceTypesOptions,
    isFetchingServiceTypesOptions,
    supplementsOptions,
    isFetchingSupplementsOptions,
    isErrorCustomersDropdown,
    isErrorPropertiesDropdown,
    isErrorServiceTypesOptions,
    isErrorSitesDropdown,
    isErrorSupplementsOptions,
  } = useExportUdoseReport();

  if (
    isErrorCustomersDropdown ||
    isErrorPropertiesDropdown ||
    isErrorServiceTypesOptions ||
    isErrorSitesDropdown ||
    isErrorSupplementsOptions
  ) {
    return <ErrorMessage />;
  }

  return (
    <>
      {(isFetchingCustomersDropdown ||
        isFetchingPropertiesDropdown ||
        isFetchingSitesDropdown ||
        isFetchingSupplementsOptions ||
        isFetchingServiceTypesOptions ||
        isGenerating) && <Loader />}

      <Card>
        <Card.Header as="h5" className="text-primary-color">
          uDose Report
        </Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <ReportFilter
              register={register}
              control={control}
              errors={errors}
              reportColumns={reportColumns}
              customersDropdown={customersDropdown ?? []}
              propertiesOptions={propertiesOptions ?? []}
              sitesOptions={sitesOptions ?? []}
              supplementsOptions={supplementsOptions ?? []}
              serviceTypesOptions={serviceTypesOptions ?? []}
              propagateOnCustomerChange={propagateOnCustomerChange}
              propagateOnPropertyChange={propagateOnPropertyChange}
            />
          </Form>
        </Card.Body>
      </Card>
    </>
  );
};

export default ExportUdoseReport;
