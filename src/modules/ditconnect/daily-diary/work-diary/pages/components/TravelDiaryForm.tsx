import React, { useEffect, useState } from 'react';
import { Row, Col, Form } from 'react-bootstrap';
import { Control, FieldErrors, UseFormRegister } from 'react-hook-form';
import JoditEditor from 'jodit-react';

import ReactSelect from '@uhub/components/ReactSelect';
import CustomDatePicker from '@uhub/components/CustomDatePicker';
import CustomLoader from '@uhub/components/CustomLoader';
import ErrorMessage from '@uhub/components/ErrorMessage';
import { LabelNumericValue } from '@uhub/types/common';
import { FormInput } from '@uhub/components';
import usePropertiesDropdown from '@uhub/hooks/dropdown/usePropertiesDropdown';

import { JODIT_TEXT_EDITOR_CONFIG } from '../../../../../../constants/editorConstants';
import useDropDown from '../../../../hooks/useDropDown';
import { WorkDiaryFormProps } from '../../types/WorkDiary';
import { FleetVehicleResponse } from '../../../../fleet-vehicle/types/FleetVehicle';
import {
  FLEET_VEHICLE_DROPDOWN,
  FLEET_VEHICLE_TYPE_OPTIONS_PLANE,
} from '../../../../fleet-vehicle/constants/constant';
import useReadLastOdometer from '../../../travel-diary/hooks/useReadLastOdometer';

type Props = {
  defaultValues: WorkDiaryFormProps;
  register: UseFormRegister<WorkDiaryFormProps>;
  control: Control<WorkDiaryFormProps>;
  errors: FieldErrors<WorkDiaryFormProps>;
  setValue: any;
};
const TravelDiaryForm: React.FC<Props> = ({
  defaultValues,
  register,
  control,
  errors,
  setValue,
}) => {
  const [nonFlyingVehicleId, setNonFlyingVehicleId] = useState<number>();
  const [isVehicleTypePlane, setIsVehicleTypePlane] = useState(false);
  const transform = (
    vehiclesData: FleetVehicleResponse[]
  ): LabelNumericValue[] => {
    return vehiclesData?.map((item) => ({
      value: item?.id,
      label: `${item?.type} - ${item?.reg_number}`,
    }));
  };

  const {
    data: vehicleOptions,
    isFetching: isFetchingVehicleOptions,
    isError: isErrorVehicleOptions,
  } = useDropDown<LabelNumericValue[]>(FLEET_VEHICLE_DROPDOWN, transform);

  const {
    data: propertyOptions,
    isFetching: isFetchingPropertyOptions,
    isError: isErrorPropertyOptions,
  } = usePropertiesDropdown();

  // fetch last odometer reading by vehicle ID
  const { data: odometerReading } = useReadLastOdometer(
    nonFlyingVehicleId ? String(nonFlyingVehicleId) : undefined
  );
  useEffect(() => {
    if (odometerReading) {
      setValue(
        'travel_diaries.start_odometer_reading',
        odometerReading.end_odometer_reading
      );
    }
  }, [odometerReading]);

  const propagateOnVehicleChange = (selected: LabelNumericValue) => {
    const vehicletype: string = selected?.label?.split('-')?.[0].trim();
    setIsVehicleTypePlane(vehicletype === FLEET_VEHICLE_TYPE_OPTIONS_PLANE);

    if (selected) {
      if (vehicletype === FLEET_VEHICLE_TYPE_OPTIONS_PLANE) {
        setValue('travel_diaries.start_odometer_reading', 0);
        setValue('travel_diaries.end_odometer_reading', 0);
        setValue('travel_diaries.total_kms', 0);
        setValue('travel_diaries.personal_kms', 0);
        setValue('travel_diaries.work_kms', 0);
        setValue('travel_diaries.rnd_distance', 0);
        setValue('travel_diaries.non_rnd_distance', 0);
        setValue('travel_diaries.public_road_distance', 0);
        setValue('travel_diaries.private_road_distance', 0);

        // reset non flying vehicle id
        setNonFlyingVehicleId(undefined);
      } else {
        // set non flying vehicle id
        setNonFlyingVehicleId(selected.value);
        setValue('travel_diaries.non_rnd_flying_hours', 0);
        setValue('travel_diaries.rnd_flying_hours', 0);
        setValue('travel_diaries.total_flying_hours', 0);
      }
    } else {
      setValue('travel_diaries.start_odometer_reading', 0);
      setValue('travel_diaries.end_odometer_reading', 0);
      setValue('travel_diaries.total_kms', 0);
      setValue('travel_diaries.personal_kms', 0);
      setValue('travel_diaries.work_kms', 0);
      setValue('travel_diaries.rnd_distance', 0);
      setValue('travel_diaries.non_rnd_distance', 0);
      setValue('travel_diaries.public_road_distance', 0);
      setValue('travel_diaries.private_road_distance', 0);
      setValue('travel_diaries.non_rnd_flying_hours', 0);
      setValue('travel_diaries.rnd_flying_hours', 0);
      setValue('travel_diaries.total_flying_hours', 0);
    }
  };

  const isFetching = isFetchingVehicleOptions || isFetchingPropertyOptions;

  const isError = isErrorVehicleOptions || isErrorPropertyOptions;

  if (isFetching) return <CustomLoader />;

  if (isError) return <ErrorMessage />;

  return (
    <>
      <h5 className="my-3 text-uppercase text-soft-gray">Travel Diary</h5>
      <Row>
        <Col sm={6} lg={4} md={4}>
          <div className="mb-2">
            <ReactSelect
              label="Vehicle"
              name="travel_diaries[vehicle_id]"
              errors={errors}
              control={control}
              options={(vehicleOptions as LabelNumericValue[]) ?? []}
              placeholder="Select"
              isClearable
              defaultSelected={(vehicleOptions as LabelNumericValue[])?.find(
                (item) =>
                  item.value === defaultValues?.travel_diaries?.vehicle_id
              )}
              propagateOnChange={propagateOnVehicleChange}
            />
            {errors && errors?.travel_diaries?.vehicle_id ? (
              <Form.Control.Feedback type="invalid" className="d-block">
                {errors.travel_diaries?.vehicle_id?.message}
              </Form.Control.Feedback>
            ) : null}
          </div>
        </Col>

        <Col sm={6} lg={4} md={4}>
          <div className="mb-2">
            <ReactSelect
              label="Property"
              name="travel_diaries[customer_property_id]"
              errors={errors}
              control={control}
              options={propertyOptions ?? []}
              placeholder="Select"
              isClearable
              defaultSelected={propertyOptions?.find(
                (item: any) =>
                  item.value ===
                  defaultValues?.travel_diaries?.customer_property_id
              )}
            />
          </div>
        </Col>
        <h5 className="my-2 text-primary-color">Time Records</h5>
        <Col xl={4} lg={4} md={4}>
          <div className="mb-2">
            <CustomDatePicker
              label="Start Time"
              name="travel_diaries[start_time]"
              control={control}
              errors={errors}
              defaultSelected={undefined}
              maxDate={new Date()}
              showTimeSelect
              showTimeSelectOnly
              dateFormat="p"
              placeholder="HH:MM AM/PM"
            />
          </div>
          {errors && errors?.travel_diaries?.start_time ? (
            <Form.Control.Feedback type="invalid" className="d-block">
              {errors.travel_diaries?.start_time?.message}
            </Form.Control.Feedback>
          ) : null}
        </Col>
        <Col xl={4} lg={4} md={4}>
          <div className="mb-2">
            <CustomDatePicker
              label="End Time"
              name="travel_diaries[end_time]"
              control={control}
              errors={errors}
              defaultSelected={undefined}
              maxDate={new Date()}
              showTimeSelect
              showTimeSelectOnly
              dateFormat="p"
              placeholder="HH:MM AM/PM"
            />
            {errors && errors?.travel_diaries?.end_time ? (
              <Form.Control.Feedback type="invalid" className="d-block">
                {errors.travel_diaries?.end_time?.message}
              </Form.Control.Feedback>
            ) : null}
          </div>
        </Col>
      </Row>

      {isVehicleTypePlane ? (
        <Row>
          <Col sm={6} lg={4} md={4}>
            <FormInput
              label="Total Flying Hours"
              type="number"
              name="travel_diaries[total_flying_hours]"
              register={() => register('travel_diaries.total_flying_hours')}
              control={control}
              errors={errors}
              containerClass="mb-2"
            />
          </Col>
          <Col sm={6} lg={4} md={4}>
            <FormInput
              label="R&D Flying Hours"
              type="number"
              name="travel_diaries[rnd_flying_hours]"
              register={() => register('travel_diaries.rnd_flying_hours')}
              control={control}
              errors={errors}
              containerClass="mb-2"
            />
          </Col>
          <Col sm={6} lg={4} md={4}>
            <FormInput
              label="Non-R&D Flying Hours"
              type="number"
              name="travel_diaries[non_rnd_flying_hours]"
              register={() => register('travel_diaries.non_rnd_flying_hours')}
              control={control}
              errors={errors}
              containerClass="mb-2"
              readOnly
            />
          </Col>
        </Row>
      ) : (
        <Row>
          <h5 className="my-2 text-primary-color">Odometer Readings</h5>
          <Col sm={6} lg={4} md={4}>
            <FormInput
              label="Start Odometer Reading"
              type="number"
              name="travel_diaries[start_odometer_reading]"
              register={() => register('travel_diaries.start_odometer_reading')}
              control={control}
              errors={errors}
              containerClass="mb-2"
              className={
                errors?.travel_diaries?.start_odometer_reading
                  ? 'is-invalid'
                  : ''
              }
            />
            {errors && errors?.travel_diaries?.start_odometer_reading ? (
              <Form.Control.Feedback type="invalid" className="d-block">
                {errors.travel_diaries?.start_odometer_reading?.message}
              </Form.Control.Feedback>
            ) : null}
          </Col>
          <Col sm={6} lg={4} md={4}>
            <FormInput
              label="End Odometer Reading"
              type="number"
              name="travel_diaries[end_odometer_reading]"
              register={() => register('travel_diaries.end_odometer_reading')}
              control={control}
              errors={errors}
              containerClass="mb-2"
              className={
                errors?.travel_diaries?.end_odometer_reading ? 'is-invalid' : ''
              }
            />
            {errors && errors?.travel_diaries?.end_odometer_reading ? (
              <Form.Control.Feedback type="invalid" className="d-block">
                {errors.travel_diaries?.end_odometer_reading?.message}
              </Form.Control.Feedback>
            ) : null}
          </Col>
          <Col sm={6} lg={4} md={4}>
            <FormInput
              label="Total Distance (Km)"
              type="number"
              name="travel_diaries[total_kms]"
              register={() => register('travel_diaries.total_kms')}
              control={control}
              errors={errors}
              containerClass="mb-2"
              readOnly
              className={
                errors?.travel_diaries?.end_odometer_reading ? 'is-invalid' : ''
              }
            />
            {errors && errors?.travel_diaries?.total_kms ? (
              <Form.Control.Feedback type="invalid" className="d-block">
                {errors.travel_diaries?.total_kms?.message}
              </Form.Control.Feedback>
            ) : null}
          </Col>
          <h5 className="my-2 text-primary-color">Travel Types</h5>
          <Col sm={6} lg={4} md={4}>
            <FormInput
              label="Personal Work (Km)"
              type="number"
              name="travel_diaries[personal_kms]"
              register={() => register('travel_diaries.personal_kms')}
              control={control}
              errors={errors}
              containerClass="mb-2"
              className={
                errors?.travel_diaries?.personal_kms ? 'is-invalid' : ''
              }
            />
            {errors && errors?.travel_diaries?.personal_kms ? (
              <Form.Control.Feedback type="invalid" className="d-block">
                {errors.travel_diaries?.personal_kms?.message}
              </Form.Control.Feedback>
            ) : null}
          </Col>
          <Col sm={6} lg={4} md={4}>
            <FormInput
              label="Office Work (Km)"
              type="number"
              name="travel_diaries[work_kms]"
              register={register}
              control={control}
              errors={errors}
              containerClass="mb-2"
              readOnly
              className={errors?.travel_diaries?.work_kms ? 'is-invalid' : ''}
            />
            {errors && errors?.travel_diaries?.work_kms ? (
              <Form.Control.Feedback type="invalid" className="d-block">
                {errors.travel_diaries?.work_kms?.message}
              </Form.Control.Feedback>
            ) : null}
          </Col>
          <h5 className="my-2 text-primary-color">Distance Types</h5>
          <Col sm={6} lg={4} md={4}>
            <FormInput
              label="R&D Distance (Km)"
              type="number"
              name="travel_diaries[rnd_distance]"
              register={() => register('travel_diaries.rnd_distance')}
              control={control}
              errors={errors}
              containerClass="mb-2"
              className={
                errors?.travel_diaries?.rnd_distance ? 'is-invalid' : ''
              }
            />
            {errors && errors?.travel_diaries?.rnd_distance ? (
              <Form.Control.Feedback type="invalid" className="d-block">
                {errors.travel_diaries?.rnd_distance?.message}
              </Form.Control.Feedback>
            ) : null}
          </Col>
          <Col sm={6} lg={4} md={4}>
            <FormInput
              label="Non-R&D Distance (Km)"
              type="number"
              name="travel_diaries[non_rnd_distance]"
              register={register}
              control={control}
              errors={errors}
              containerClass="mb-2"
              readOnly
              className={
                errors?.travel_diaries?.non_rnd_distance ? 'is-invalid' : ''
              }
            />
            {errors && errors?.travel_diaries?.non_rnd_distance ? (
              <Form.Control.Feedback type="invalid" className="d-block">
                {errors.travel_diaries?.non_rnd_distance?.message}
              </Form.Control.Feedback>
            ) : null}
          </Col>
          <h5 className="my-2 text-primary-color">Road Types</h5>
          <Col sm={6} lg={4} md={4}>
            <FormInput
              label="Public Road Distance (Km)"
              type="number"
              name="travel_diaries[public_road_distance]"
              register={() => register('travel_diaries.public_road_distance')}
              control={control}
              errors={errors}
              containerClass="mb-2"
              className={
                errors?.travel_diaries?.public_road_distance ? 'is-invalid' : ''
              }
            />
            {errors && errors?.travel_diaries?.public_road_distance ? (
              <Form.Control.Feedback type="invalid" className="d-block">
                {errors.travel_diaries?.public_road_distance?.message}
              </Form.Control.Feedback>
            ) : null}
          </Col>
          <Col sm={6} lg={4} md={4}>
            <FormInput
              label="Private Road Distance (Km)"
              type="number"
              name="travel_diaries[private_road_distance]"
              register={register}
              control={control}
              errors={errors}
              containerClass="mb-2"
              readOnly
              className={
                errors?.travel_diaries?.private_road_distance
                  ? 'is-invalid'
                  : ''
              }
            />
            {errors && errors?.travel_diaries?.private_road_distance ? (
              <Form.Control.Feedback type="invalid" className="d-block">
                {errors.travel_diaries?.private_road_distance?.message}
              </Form.Control.Feedback>
            ) : null}
          </Col>
        </Row>
      )}

      <Row>
        <Col md={12}>
          <Form.Label>Notes </Form.Label>
          <div className="mb-2">
            <JoditEditor
              config={JODIT_TEXT_EDITOR_CONFIG}
              value={defaultValues?.travel_diaries?.notes ?? ''}
              onChange={(value) => {
                setValue('travel_diaries.notes', value ?? '', {
                  shouldValidate: true,
                });
              }}
            />
          </div>
        </Col>
      </Row>
    </>
  );
};

export default TravelDiaryForm;
