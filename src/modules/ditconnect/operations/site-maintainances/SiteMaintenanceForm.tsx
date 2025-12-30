/* eslint-disable react/prop-types */
import React from 'react';
import { Row, Col, Form } from 'react-bootstrap';
import BackendValidationMessage from '@uhub/components/BackendValidationMessage';
import useUdoseSitesDropdown from '@uhub/hooks/dropdown/useUdoseSitesDropdown';
import CustomLoader from '@uhub/components/CustomLoader';
import ErrorMessage from '@uhub/components/ErrorMessage';
import useDevicesDropdown from '@uhub/hooks/dropdown/useDevicesDropdown';
import { FormInput } from '@uhub/components';
import ReactSelect from '@uhub/components/ReactSelect';
import CustomDatePicker from '@uhub/components/CustomDatePicker';
import CancelButton from '@uhub/components/Form/CancelButton';
import SubmitButton from '@uhub/components/Form/SubmitButton';
import { SiteMaintenanceFormProps } from './types/siteMaintenance';
import useSiteMaintenanceForm from './hooks/useSiteMaintenanceForm';

type Props = {
  defaultValues: SiteMaintenanceFormProps;
};
const SiteMaintenanceForm: React.FC<Props> = ({ defaultValues }) => {
  const {
    register,
    control,
    errors,
    handleSubmit,
    serverValidationError,
    setServerValidationError,
    submitted,
    navigateToList,
    onSubmit,
  } = useSiteMaintenanceForm(defaultValues);
  const {
    data: deviceOptions,
    isFetching: isFetchingDeviceOptions,
    isError: isErrorDeviceOptions,
  } = useDevicesDropdown({});
  const {
    data: siteOptions,
    isFetching: isFetchingSiteOptions,
    isError: isErrorSiteOptions,
  } = useUdoseSitesDropdown();

  if (isFetchingDeviceOptions || isFetchingSiteOptions) return <CustomLoader />;

  if (isErrorDeviceOptions || isErrorSiteOptions) return <ErrorMessage />;
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      {serverValidationError && (
        <BackendValidationMessage
          setServerValidationError={setServerValidationError}
        />
      )}
      <Row>
        <Col xl={6} lg={6} md={6} className="mb-3">
          <CustomDatePicker
            label="Date"
            name="date"
            defaultSelected={new Date()}
            maxDate={new Date()}
            control={control}
            errors={errors}
          />
        </Col>
      </Row>

      <Row>
        <Col xl={6} lg={6} md={6} className="mb-3">
          <ReactSelect
            name="site_id"
            label="Site"
            errors={errors}
            control={control}
            options={siteOptions ?? []}
            defaultSelected={siteOptions?.find(
              (item) => item.value === defaultValues?.site_id
            )}
          />
        </Col>
        <Col xl={6} lg={6} md={6} className="mb-3">
          <ReactSelect
            name="device_id"
            label="Device"
            errors={errors}
            control={control}
            options={deviceOptions}
            defaultSelected={deviceOptions?.find(
              (item: any) => item.value === defaultValues?.device_id
            )}
          />
        </Col>
      </Row>

      <Row>
        <Col xl={6} lg={6} md={6} className="mb-3">
          <FormInput
            label="Admin Notes"
            type="textarea"
            name="admin_notes"
            placeholder="Admin Notes"
            register={register}
            control={control}
            errors={errors}
          />
        </Col>

        <Col xl={6} lg={6} md={6} className="mb-3">
          <FormInput
            label="Customer Notes"
            type="textarea"
            name="customer_notes"
            placeholder="Customer Notes"
            register={register}
            control={control}
            errors={errors}
          />
        </Col>
      </Row>
      <Row>
        <Col xl={6} lg={6} md={6} className="mb-3">
          <FormInput
            label="Attachments"
            type="file"
            name="attachments"
            errors={errors}
            register={register}
            control={control}
            multiple
          />
        </Col>
        {defaultValues.site_id && (
          <Col sm={6} md={4} className="mb-2">
            <div className="mb-2">
              {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
              <label className="mb-1" aria-controls="">
                Attached files
              </label>
              <br />
              {defaultValues?.attachmentResponses &&
              defaultValues.attachmentResponses.length > 0 ? (
                defaultValues.attachmentResponses.map((attachment: any) => (
                  <div key={attachment.id}>
                    <a
                      href={attachment.file_url}
                      target="_blank"
                      rel="noreferrer">
                      <i className="bx bxs-file-pdf me-1" />
                      View File {attachment.id}
                    </a>
                  </div>
                ))
              ) : (
                <strong>No files</strong>
              )}
            </div>
          </Col>
        )}
      </Row>
      <Row className="">
        <Col>
          <div className="float-end button-list">
            <CancelButton redirectOnClick={navigateToList} />
            <SubmitButton disable={submitted} />
          </div>
        </Col>
      </Row>
    </Form>
  );
};

export default SiteMaintenanceForm;
