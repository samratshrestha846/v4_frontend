/* eslint-disable react/prop-types */
import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { Control, FieldErrors, UseFormRegister } from 'react-hook-form';
import { FormInput } from '../../../../components';
import ReactSelect from '../../../../components/ReactSelect';
import OPTIONS from '../../../../constants/statusOptions';
import {
  STATUS_ACTIVE,
  STATUS_TEST_SITE,
} from '../../../../constants/constants';

import { UbotFormFields, UbotSite } from '../../../../types/ubot';
import {
  LabelNumericValue,
  LabelValueDropdown,
} from '../../../../types/common';

type Props = {
  register: UseFormRegister<UbotFormFields>;
  errors: FieldErrors<UbotFormFields>;
  control: Control<UbotFormFields>;
  devicesOptions: LabelNumericValue[];
  serviceTypesOptions: LabelValueDropdown[];
  ubotData?: UbotSite;
};

const UbotEditForm: React.FC<Props> = ({
  register,
  errors,
  control,
  devicesOptions,
  serviceTypesOptions,
  ubotData,
}) => {
  return (
    <>
      <h5 className="mt-0 mb-2 text-uppercase p-2 b-secondary">
        <i className="mdi mdi-file-table-box-multiple-outline me-1" /> Site
        Details
      </h5>
      <Row className="mb-1">
        <Col sm={6} md={4} className="mb-2">
          <FormInput
            label="Site Name"
            type="text"
            name="name"
            placeholder="Enter Site Name"
            register={register}
            key="name"
            errors={errors}
            control={control}
          />
        </Col>
        <Col sm={6} md={4} className="react-select-form mb-2">
          {ubotData?.status === STATUS_TEST_SITE ? (
            <ReactSelect
              errors={errors}
              control={control}
              label="Status"
              name="status"
              options={OPTIONS.filter(
                (item) => item.value === STATUS_TEST_SITE
              )}
              defaultSelected={OPTIONS.find(
                (item) => item.value === ubotData?.status
              )}
              isDisabled
            />
          ) : (
            <ReactSelect
              errors={errors}
              control={control}
              label="Status"
              name="status"
              options={OPTIONS.filter(
                (item) => item.value !== STATUS_TEST_SITE
              )}
              defaultSelected={OPTIONS.find(
                (item) =>
                  item.value === ubotData?.status ||
                  item.value === STATUS_ACTIVE
              )}
            />
          )}
        </Col>
        {devicesOptions && ubotData && (
          <Col sm={6} md={4} className="react-select-form mb-2">
            <ReactSelect
              label="Device"
              errors={errors}
              control={control}
              name="device_id"
              options={devicesOptions}
              defaultSelected={devicesOptions.find(
                (item) => item.value === ubotData?.device_id
              )}
            />
          </Col>
        )}

        <Col sm={6} md={4} className="react-select-form mb-2">
          <ReactSelect
            name="credit_type"
            label="Service Type"
            errors={errors}
            control={control}
            options={serviceTypesOptions}
            defaultSelected={serviceTypesOptions?.find(
              (item) => item.value === ubotData?.credit_type
            )}
          />
        </Col>
      </Row>
    </>
  );
};

export default UbotEditForm;
