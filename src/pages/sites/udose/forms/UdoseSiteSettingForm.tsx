/* eslint-disable react/prop-types */
import React from 'react';
import { Row, Col, Form } from 'react-bootstrap';
import { Control, FieldErrors, UseFormRegister } from 'react-hook-form';
import ReactSelect from '../../../../components/ReactSelect';
import { FormInput } from '../../../../components';

import {
  SiteSetting,
  UdoseFormFields,
} from '../../../../types/udose/udoseList';
import { ConfigurationSetting } from '../../../../types/udose/configurationSettings';

type Props = {
  register: UseFormRegister<UdoseFormFields>;
  errors: FieldErrors<UdoseFormFields>;
  control: Control<UdoseFormFields>;
  configurationSettings?: ConfigurationSetting[];
  siteSettings?: SiteSetting[];
  fields?: any[];
};

const UdoseSiteSettingForm: React.FC<Props> = ({
  register,
  control,
  errors,
  configurationSettings,
  siteSettings,
  fields,
}) => {
  const isOptionsNonEmptyArray = (key: string) => {
    const optionsValue = configurationSettings?.find(
      (item) => item.key === key
    )?.options;
    return optionsValue && optionsValue?.length > 0;
  };

  return (
    <>
      <h5 className="mt-0 mb-2 text-uppercase p-2 b-secondary">
        <i className="mdi mdi-file-table-box-multiple-outline me-2" />
        Site Settings
      </h5>
      <Row className="mb-1">
        {configurationSettings &&
          fields?.map((item, index) => (
            <Col sm={6} md={4} key={item.key} className="mb-2">
              <FormInput
                type="hidden"
                name={`site_settings[${index}][key]`}
                defaultValue={item.key}
                register={register}
                errors={errors}
                control={control}
              />
              {isOptionsNonEmptyArray(item.key) ? (
                <ReactSelect
                  label={configurationSettings?.[index]?.name}
                  errors={errors}
                  control={control}
                  name={`site_settings[${index}][value]`}
                  options={
                    configurationSettings?.[index]?.options?.map((option) => ({
                      label: option,
                      value: option,
                    })) ?? []
                  }
                  defaultSelected={siteSettings
                    ?.map((setting) => {
                      if (setting.key === item.key) {
                        return {
                          label: setting.value,
                          value: setting.value,
                        };
                      }
                      return null;
                    })
                    .map((element) => element)}
                  isClearable
                />
              ) : (
                <FormInput
                  label={configurationSettings?.[index]?.name}
                  type="text"
                  name={`site_settings[${index}][value]`}
                  placeholder={`Enter ${configurationSettings?.[index]?.name}`}
                  register={register}
                  errors={errors}
                  control={control}
                  defaultValue={
                    siteSettings?.find((siteItem) => siteItem.key === item.key)
                      ?.value
                  }
                />
              )}
              {errors && errors.site_settings?.[index] ? (
                <Form.Control.Feedback type="invalid" className="d-block">
                  {errors.site_settings?.[index]?.message}
                </Form.Control.Feedback>
              ) : null}
            </Col>
          ))}
      </Row>
    </>
  );
};

export default UdoseSiteSettingForm;
