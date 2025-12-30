/* eslint-disable react/prop-types */
import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { Control, FieldErrors, UseFormRegister } from 'react-hook-form';

import { FormInput } from '../../../../../../../components';
import ReactSelect from '../../../../../../../components/ReactSelect';
import {
  SITE_FOLLOWUP_ACTION_REQUIRED_OPTIONS,
  UDOSE_SITE_FOLLOWUP_STATUS_OPTIONS,
} from '../../../../../../../constants/constants';
import CustomDatePicker from '../../../../../../../components/CustomDatePicker';
import {
  SiteFollowup,
  SiteFollowUpFormValues,
} from '../../../../../../../types/udose/siteFollowup';

type Props = {
  register: UseFormRegister<SiteFollowUpFormValues>;
  errors: FieldErrors<SiteFollowUpFormValues>;
  control: Control<SiteFollowUpFormValues>;
  siteFollowupDetail: SiteFollowup | undefined;
};

const EditSiteFollowupForm: React.FC<Props> = ({
  register,
  errors,
  control,
  siteFollowupDetail,
}) => {
  return (
    <Row className="mb-1">
      <Col sm={6} md={6}>
        <div className="mb-2">
          <ReactSelect
            errors={errors}
            control={control}
            label="Action Required"
            name="site_class"
            options={SITE_FOLLOWUP_ACTION_REQUIRED_OPTIONS}
            defaultSelected={SITE_FOLLOWUP_ACTION_REQUIRED_OPTIONS?.find(
              (item) => item.value === siteFollowupDetail?.site_class
            )}
            isClearable
          />
        </div>
      </Col>

      <Col sm={6} md={6}>
        <div className="mb-2">
          <CustomDatePicker
            label="Action Required By"
            name="last_fill_detected"
            control={control}
            errors={errors}
            defaultSelected={undefined}
            isClearable
          />
        </div>
      </Col>

      <Col sm={12} md={12}>
        <FormInput
          label="Task Note"
          type="textarea"
          name="general_note"
          placeholder="Task Note"
          register={register}
          errors={errors}
          control={control}
          containerClass="mb-2"
        />
      </Col>

      <Col sm={12} md={12}>
        <FormInput
          label="Scheduling Note"
          type="textarea"
          name="raingauze_note"
          placeholder="Scheduling Note"
          register={register}
          errors={errors}
          control={control}
          containerClass="mb-2"
        />
      </Col>

      <Col sm={12} md={12}>
        <FormInput
          label="Result"
          type="textarea"
          name="review_note"
          placeholder="Result"
          register={register}
          errors={errors}
          control={control}
          containerClass="mb-2"
        />
      </Col>

      <Col sm={6} md={6}>
        <div className="mb-2">
          <ReactSelect
            errors={errors}
            control={control}
            label="Status"
            name="status"
            options={UDOSE_SITE_FOLLOWUP_STATUS_OPTIONS}
            defaultSelected={UDOSE_SITE_FOLLOWUP_STATUS_OPTIONS?.find(
              (item) => item.value === siteFollowupDetail?.status
            )}
            isClearable
          />
        </div>
      </Col>

      <Col sm={6} md={6}>
        <FormInput
          label="Runout Days"
          type="number"
          name="runout_days_calculated"
          placeholder="Runout days"
          register={register}
          errors={errors}
          control={control}
          containerClass="mb-2"
        />
      </Col>
    </Row>
  );
};

export default EditSiteFollowupForm;
