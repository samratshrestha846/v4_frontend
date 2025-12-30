/* eslint-disable react/prop-types */
import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { Control, FieldErrors, UseFormRegister } from 'react-hook-form';
import { FormInput } from '../../../../components';
import ReactSelect from '../../../../components/ReactSelect';
import CustomDatePicker from '../../../../components/CustomDatePicker';
import BORE_OPTIONS from '../../../../constants/boreTypes';
import OPTIONS from '../../../../constants/statusOptions';
import { STATUS_TEST_SITE } from '../../../../constants/constants';
import { Udose, UdoseFormFields } from '../../../../types/udose/udoseList';
import {
  LabelNumericValue,
  LabelValueDropdown,
} from '../../../../types/common';

type Props = {
  register: UseFormRegister<UdoseFormFields>;
  errors: FieldErrors<UdoseFormFields>;
  control: Control<UdoseFormFields>;
  devicesOptions: LabelNumericValue[];
  serviceTypesOptions: LabelValueDropdown[];
  udoseData?: Udose;
};

const UdoseEditForm: React.FC<Props> = ({
  register,
  errors,
  control,
  devicesOptions,
  serviceTypesOptions,
  udoseData,
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
          {udoseData?.status === STATUS_TEST_SITE ? (
            <ReactSelect
              errors={errors}
              control={control}
              label="Status"
              name="status"
              options={OPTIONS.filter(
                (item) => item.value === STATUS_TEST_SITE
              )}
              defaultSelected={OPTIONS.find(
                (item) => item.value === udoseData?.status
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
                (item) => item.value === udoseData?.status
              )}
            />
          )}
        </Col>
        <Col sm={6} md={4} className="react-select-form mb-2">
          <ReactSelect
            label="Device"
            errors={errors}
            control={control}
            name="device_id"
            options={devicesOptions}
            defaultSelected={devicesOptions?.find(
              (item) => item.value === udoseData?.device?.id
            )}
            isClearable
          />
        </Col>
        {udoseData?.status !== STATUS_TEST_SITE && (
          <>
            <Col sm={6} md={4} className="react-select-form mb-2">
              <ReactSelect
                name="credit_type"
                label="Service Type"
                errors={errors}
                control={control}
                options={serviceTypesOptions}
                defaultSelected={serviceTypesOptions?.find(
                  (item) => item.value === udoseData?.credit_type
                )}
                isClearable
              />
            </Col>
            <Col sm={6} md={4} className="react-select-form mb-2">
              <CustomDatePicker
                label="Credit Until"
                name="credit_until"
                control={control}
                errors={errors}
                defaultSelected={
                  udoseData?.credit_until
                    ? new Date(udoseData.credit_until)
                    : undefined
                }
                minDate={new Date()}
              />
            </Col>
            <Col sm={6} md={4} className="react-select-form mb-2">
              <ReactSelect
                name="bore_type"
                label="Bore Type"
                errors={errors}
                control={control}
                options={BORE_OPTIONS}
                defaultSelected={BORE_OPTIONS.find(
                  (item) => item.value === udoseData?.bore_type
                )}
              />
            </Col>
            <Col sm={6} md={4} className="mb-2">
              <FormInput
                label="Cage Number"
                type="text"
                name="cage_serial_number"
                placeholder="Enter Cage Number"
                register={register}
                key="cage_serial_number"
                errors={errors}
                control={control}
              />
            </Col>
            <Col sm={6} md={4} className="mb-2">
              <FormInput
                label="Trailer Number"
                type="text"
                name="trailer_no"
                placeholder="Enter Trailer Number"
                register={register}
                key="trailer_no"
                errors={errors}
                control={control}
              />
            </Col>
          </>
        )}
      </Row>
    </>
  );
};

export default UdoseEditForm;
