/* eslint-disable react/prop-types */
import React from 'react';
import { Row, Col, Form } from 'react-bootstrap';
import { Control, FieldErrors, UseFormRegister } from 'react-hook-form';
import { FormInput } from '../../../../components';
import ReactSelect from '../../../../components/ReactSelect';

import { UdoseFormFields } from '../../../../types/udose/udoseList';
import { ConfigurationSetting } from '../../../../types/udose/configurationSettings';

type Props = {
  register: UseFormRegister<UdoseFormFields>;
  errors: FieldErrors<UdoseFormFields>;
  control: Control<UdoseFormFields>;
  configurationSettings: ConfigurationSetting[];
  fields: any[];
};

const UdoseSiteSettingAddForm: React.FC<Props> = ({
  control,
  register,
  errors,
  configurationSettings,
  fields,
}) => {
  return (
    <>
      <h5 className="mt-0 mb-2 text-uppercase p-2 b-secondary">
        <i className="mdi mdi-file-table-box-multiple-outline me-2" />
        Site Settings
      </h5>
      <Row className="mb-1">
        {fields?.map((item, index) => (
          <Col sm={6} md={4} key={item.key} className="mb-2">
            <FormInput
              type="hidden"
              name={`site_settings[${index}][key]`}
              defaultValue={item.key}
              register={register}
              errors={errors}
              control={control}
            />
            {configurationSettings?.[index].options ? (
              <>
                <ReactSelect
                  label={configurationSettings?.[index].name}
                  errors={errors}
                  control={control}
                  name={`site_settings[${index}][value]`}
                  options={
                    configurationSettings?.[index]?.options?.map((option) => ({
                      label: option.toString(),
                      value: option.toString(),
                    })) ?? []
                  }
                  isClearable
                />

                {errors && errors.site_settings?.[index]?.value ? (
                  <Form.Control.Feedback type="invalid" className="d-block">
                    {errors.site_settings?.[index]?.value?.message}
                  </Form.Control.Feedback>
                ) : null}
              </>
            ) : (
              <>
                <FormInput
                  label={configurationSettings?.[index].name}
                  type="text"
                  name={`site_settings[${index}][value]`}
                  placeholder={`Enter ${configurationSettings?.[index].name}`}
                  register={register}
                  errors={errors}
                  control={control}
                />
                {errors && errors.site_settings?.[index]?.value ? (
                  <Form.Control.Feedback type="invalid" className="d-block">
                    {errors.site_settings?.[index]?.value?.message}
                  </Form.Control.Feedback>
                ) : null}
              </>
            )}
          </Col>
        ))}
      </Row>
    </>
  );
};

export default UdoseSiteSettingAddForm;
