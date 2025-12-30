/* eslint-disable react/prop-types */
import React, { useEffect, useMemo } from 'react';
import { Row, Col, Form } from 'react-bootstrap';
import JoditEditor from 'jodit-react';

import CancelButton from '@uhub/components/Form/CancelButton';
import SubmitButton from '@uhub/components/Form/SubmitButton';
import BackendValidationMessage from '@uhub/components/BackendValidationMessage';
import CustomDatePicker from '@uhub/components/CustomDatePicker';
import useLabSampleTypesDropdown from '@uhub/hooks/dropdown/useLabSampleTypesDropdown';
import CustomLoader from '@uhub/components/CustomLoader';
import ErrorMessage from '@uhub/components/ErrorMessage';
import ReactSelect from '@uhub/components/ReactSelect';
import { FormInput } from '@uhub/components';
import usePropertiesDropdown from '@uhub/hooks/dropdown/usePropertiesDropdown';
import useUdoseSitesDropdown from '@uhub/hooks/dropdown/useUdoseSitesDropdown';
import { LabelNumericValue } from '@uhub/types/common';
import { JODIT_TEXT_EDITOR_CONFIG } from '../../../../constants/editorConstants';
import {
  LAB_SAMPLE_TAKEN_FROM_OPTIONS,
  LAB_SAMPLE_TYPE_DUNG,
  LAB_SAMPLE_TYPE_PASTURE,
  LAB_SAMPLE_TYPE_WATER,
} from '../constants/constant';
import { LabSampleFormProps } from '../types/LabSample';
import useLabSampleForm from '../hooks/useLabSampleForm';
import HandleImage from './HandleImage';

type Props = {
  defaultValues: LabSampleFormProps;
};

const LabSampleForm: React.FC<Props> = ({ defaultValues }) => {
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
    setValue,
    watchedSampleType,
    watchedPropertyID,
  } = useLabSampleForm(defaultValues);

  const {
    data: sampleTypeOptions,
    isFetching: isFetchingSampleTypesOptions,
    isError: isErrorSampleTypesOptions,
  } = useLabSampleTypesDropdown();

  const {
    data: propertiesOptions,
    isFetching: isFetchingPropertiesOptions,
    isError: isErrorPropertiesOptions,
  } = usePropertiesDropdown();

  const { data: sitesOptions, isError: isErrorSitesOptions } =
    useUdoseSitesDropdown(Number(watchedPropertyID));

  const sampleTypeName = useMemo(() => {
    return sampleTypeOptions?.find(
      (item: LabelNumericValue) => item.value === watchedSampleType
    )?.label;
  }, [sampleTypeOptions, watchedSampleType]);

  useEffect(() => {
    if (sampleTypeName === LAB_SAMPLE_TYPE_WATER) {
      setValue('plant_species', null);
      setValue('dung_freshness_score', null);
      setValue('faecal_score', null);

      setValue('sample_taken_from', defaultValues?.sample_taken_from ?? null);
      setValue('ph_value', defaultValues.ph_value ?? null);
    }
    if (sampleTypeName === LAB_SAMPLE_TYPE_PASTURE) {
      setValue('dung_freshness_score', null);
      setValue('faecal_score', null);
      setValue('sample_taken_from', null);
      setValue('ph_value', null);

      setValue('plant_species', defaultValues?.plant_species ?? null);
    }
    if (sampleTypeName === LAB_SAMPLE_TYPE_DUNG) {
      setValue('plant_species', null);
      setValue(
        'dung_freshness_score',
        defaultValues?.dung_freshness_score ?? null
      );
      setValue('faecal_score', defaultValues?.faecal_score ?? null);
      setValue('sample_taken_from', null);
      setValue('ph_value', null);
    }
  }, [sampleTypeName]);

  const isFetching =
    isFetchingPropertiesOptions || isFetchingSampleTypesOptions;

  const isError =
    isErrorSitesOptions ||
    isErrorPropertiesOptions ||
    isErrorSitesOptions ||
    isErrorSampleTypesOptions;

  if (isFetching) return <CustomLoader />;

  if (isError) return <ErrorMessage />;

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      {serverValidationError && (
        <BackendValidationMessage
          setServerValidationError={setServerValidationError}
        />
      )}

      <Row>
        {defaultValues?.sample_id && (
          <Col xl={4} lg={4} md={4}>
            <FormInput
              label="Sample ID"
              type="number"
              name="sample_id"
              placeholder="Sample ID"
              register={register}
              control={control}
              errors={errors}
              containerClass="mb-2"
            />
          </Col>
        )}
        <Col xl={4} lg={4} md={4}>
          <div className="mb-2">
            <CustomDatePicker
              dateFormat="dd/MM/yyyy hh:mm aa"
              label="Collected At"
              name="collected_at"
              control={control}
              errors={errors}
              defaultSelected={undefined}
              maxDate={new Date()}
              showTimeSelect
              placeholder="DD/MM/YYYY AM/PM"
              isClearable
            />
          </div>
        </Col>

        <Col sm={6} lg={4} md={4}>
          <div className="mb-2">
            <ReactSelect
              label="Sample Type"
              name="sample_type_id"
              errors={errors}
              control={control}
              options={sampleTypeOptions ?? []}
              placeholder="Select"
              isClearable
              defaultSelected={sampleTypeOptions?.find(
                (item: any) => item.value === defaultValues?.sample_type_id
              )}
            />
          </div>
        </Col>

        {sampleTypeOptions?.find(
          (item: any) => item.value === watchedSampleType
        )?.label === LAB_SAMPLE_TYPE_WATER && (
          <>
            <Col sm={6} lg={4} md={4}>
              <div className="mb-2">
                <ReactSelect
                  label="Sample Taken From"
                  name="sample_taken_from"
                  errors={errors}
                  control={control}
                  options={LAB_SAMPLE_TAKEN_FROM_OPTIONS ?? []}
                  placeholder="Select"
                  isClearable
                  defaultSelected={LAB_SAMPLE_TAKEN_FROM_OPTIONS?.find(
                    (item: any) =>
                      item.value === defaultValues?.sample_taken_from
                  )}
                />
              </div>
            </Col>

            <Col sm={6} lg={4} md={4}>
              <FormInput
                label="PH Value"
                type="number"
                name="ph_value"
                register={register}
                control={control}
                errors={errors}
                containerClass="mb-2"
                step="0.1"
              />
            </Col>
          </>
        )}

        {sampleTypeOptions?.find(
          (item: any) => item.value === watchedSampleType
        )?.label === LAB_SAMPLE_TYPE_DUNG && (
          <>
            <Col sm={6} lg={4} md={4}>
              <FormInput
                label="Dung Freshness Score"
                type="number"
                name="dung_freshness_score"
                register={register}
                control={control}
                errors={errors}
                containerClass="mb-2"
                step="0.1"
              />
            </Col>

            <Col sm={6} lg={4} md={4}>
              <FormInput
                label="Faecal Score"
                type="number"
                name="faecal_score"
                register={register}
                control={control}
                errors={errors}
                containerClass="mb-2"
                step="0.1"
              />
            </Col>
          </>
        )}

        {sampleTypeOptions?.find(
          (item: any) => item.value === watchedSampleType
        )?.label === LAB_SAMPLE_TYPE_PASTURE && (
          <Col sm={6} lg={4} md={4}>
            <FormInput
              label="Plant Specs"
              type="text"
              name="plant_species"
              register={register}
              control={control}
              errors={errors}
              containerClass="mb-2"
            />
          </Col>
        )}

        <Col sm={6} lg={4} md={4}>
          <Form.Label>Is new tablespoon collection method used ?</Form.Label>
          <FormInput
            label="Yes"
            type="checkbox"
            name="used_tablespoon_collection"
            register={register}
            control={control}
            errors={errors}
            containerClass="mb-2"
          />
        </Col>

        <Col sm={6} lg={4} md={4}>
          <div className="mb-2">
            <ReactSelect
              label="Property"
              name="customer_property_id"
              errors={errors}
              control={control}
              options={propertiesOptions ?? []}
              placeholder="Select"
              isClearable
              defaultSelected={propertiesOptions?.find(
                (item: any) =>
                  item.value === defaultValues?.customer_property_id
              )}
            />
          </div>
        </Col>

        <Col sm={6} lg={4} md={4}>
          <div className="mb-2">
            <ReactSelect
              label="Site"
              name="site_id"
              errors={errors}
              control={control}
              options={sitesOptions ?? []}
              placeholder="Select"
              isClearable
              defaultSelected={sitesOptions?.find(
                (item: any) => item.value === defaultValues?.site_id
              )}
            />
          </div>
        </Col>

        {/* Paddock as other_site */}
        <Col sm={6} lg={4} md={4}>
          <FormInput
            label="Paddock"
            type="text"
            name="other_site"
            register={register}
            control={control}
            errors={errors}
            containerClass="mb-2"
          />
        </Col>
        <Col sm={6} lg={4} md={4}>
          <FormInput
            label="Device Serial Number"
            type="text"
            name="device_serial_number"
            register={register}
            control={control}
            errors={errors}
            containerClass="mb-2"
          />
        </Col>
        <Col sm={6} lg={4} md={4}>
          <FormInput
            label="Animal Specs"
            type="text"
            name="animal_specs"
            register={register}
            control={control}
            errors={errors}
            containerClass="mb-2"
          />
        </Col>

        <Col sm={6} lg={4} md={4}>
          <FormInput
            label="Live Weight & BCs"
            type="text"
            name="animal_bcs"
            register={register}
            control={control}
            errors={errors}
            containerClass="mb-2"
          />
        </Col>

        <Col sm={6} lg={4} md={4}>
          <FormInput
            label="No. of Cattle"
            type="number"
            name="number_of_cattle"
            register={register}
            control={control}
            errors={errors}
            containerClass="mb-2"
          />
        </Col>

        <Col sm={6} lg={4} md={4}>
          <FormInput
            label="Latitude"
            type="text"
            name="latitude"
            register={register}
            control={control}
            errors={errors}
            containerClass="mb-2"
          />
        </Col>

        <Col sm={6} lg={4} md={4}>
          <FormInput
            label="Longitude"
            type="text"
            name="longitude"
            register={register}
            control={control}
            errors={errors}
            containerClass="mb-2"
          />
        </Col>
        {defaultValues?.id && (
          <Col xl={4} lg={4} md={4}>
            <div className="mb-2">
              <CustomDatePicker
                dateFormat="dd/MM/yyyy hh:mm aa"
                label="Received At"
                name="received_datetime"
                control={control}
                errors={errors}
                defaultSelected={undefined}
                maxDate={new Date()}
                showTimeSelect
                placeholder="DD/MM/YYYY AM/PM"
                isClearable
              />
            </div>
          </Col>
        )}

        <Col sm={6} lg={4} md={4}>
          <FormInput
            label="Images"
            type="file"
            name="images"
            register={register}
            control={control}
            errors={errors}
            containerClass="mb-2"
            multiple
          />
        </Col>

        {defaultValues?.uploadedImages &&
          defaultValues?.uploadedImages?.length > 0 && (
            <Col md={12}>
              <Form.Label>Uploaded Images</Form.Label>
              <HandleImage images={defaultValues.uploadedImages ?? []} />
            </Col>
          )}

        <Col md={12}>
          <Form.Label>Notes </Form.Label>
          <div className="mb-2">
            <JoditEditor
              config={JODIT_TEXT_EDITOR_CONFIG}
              value={defaultValues?.notes ?? ''}
              onChange={(value) => {
                setValue('notes', value ?? '');
              }}
            />
          </div>
        </Col>
      </Row>

      <Row className="">
        <Col>
          <div className="float-end button-list mt-2">
            <CancelButton redirectOnClick={navigateToList} />
            <SubmitButton disable={submitted} />
          </div>
        </Col>
      </Row>
    </Form>
  );
};

export default LabSampleForm;
