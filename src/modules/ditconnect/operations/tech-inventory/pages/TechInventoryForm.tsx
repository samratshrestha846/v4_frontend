import { FormInput } from '@uhub/components';
import BackendValidationMessage from '@uhub/components/BackendValidationMessage';
import CustomLoader from '@uhub/components/CustomLoader';
import ErrorMessage from '@uhub/components/ErrorMessage';
import CancelButton from '@uhub/components/Form/CancelButton';
import SubmitButton from '@uhub/components/Form/SubmitButton';
import ReactSelect from '@uhub/components/ReactSelect';
import classNames from 'classnames';
import React from 'react';
import { Alert, Button, Col, Form, Row, Table } from 'react-bootstrap';
import InventoryItemCountList from '../components/InventoryItemCountList';
import useTechInventoryForm from '../hooks/useTechInventoryForm';
import {
  EMPTY_LOCATION_FORM,
  inventoryItemTypeOptions,
  TechInventoryFormProps,
} from '../types/TechInventory';
import useDitConnectLocationDropDown from '../../../hooks/useDitConnectLocationDropDown';

type Props = {
  defaultValues: TechInventoryFormProps;
};
const TechInventoryForm: React.FC<Props> = ({ defaultValues }) => {
  const { locationOptions, isFetchingLocationOptions, isErrorLocationOptions } =
    useDitConnectLocationDropDown();
  const {
    isEdit,
    isLoading,
    register,
    control,
    errors,
    handleSubmit,
    serverValidationError,
    setServerValidationError,
    submitted,
    navigateToList,
    onSubmit,
    selectedRecord,
    locationField,
    addLocations,
    removeLocations,
    watch,
    // handleLocationChange,
  } = useTechInventoryForm(defaultValues);

  if (isFetchingLocationOptions || isLoading) return <CustomLoader />;

  if (isErrorLocationOptions) return <ErrorMessage />;
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      {serverValidationError && (
        <BackendValidationMessage
          setServerValidationError={setServerValidationError}
        />
      )}
      <Row>
        <Col xl={6} lg={6} md={6} className="mb-3">
          <FormInput
            label="SKU"
            type="text"
            name="sku"
            placeholder="SKU"
            register={register}
            control={control}
            errors={errors}
          />
        </Col>
        <Col xl={6} lg={6} md={6} className="mb-3">
          <FormInput
            label="Name"
            type="text"
            name="name"
            placeholder="Name"
            register={register}
            control={control}
            errors={errors}
          />
        </Col>
      </Row>
      <Row>
        <Col xl={6} lg={6} md={6} className="mb-3">
          <ReactSelect
            name="type"
            label="Type"
            errors={errors}
            control={control}
            options={inventoryItemTypeOptions ?? []}
            defaultSelected={inventoryItemTypeOptions?.find(
              (item) => item.value === defaultValues?.type
            )}
            value={inventoryItemTypeOptions?.find(
              (item) => item.value === watch('type')
            )}
          />
        </Col>
        <Col sm={6} md={6}>
          <Form.Label>Is Udose Item</Form.Label>
          <FormInput
            name="is_udose_item"
            errors={errors}
            control={control}
            register={register}
            type="checkbox"
            containerClass="mb-3"
          />
        </Col>
      </Row>
      <Col xl={12} lg={12} md={12} className="mb-1">
        <Alert className={classNames('fade m-0 custom-alert alert-bg-skyblue')}>
          <div className="d-flex justify-content-start gap-1 communication-message-alert-wrapper">
            <i className={classNames('font-18 bx bx-info-circle text-info')} />

            <div className="d-flex flex-column justify-content-start flex-grow-1">
              <p className="mb-0 font-10 text-secondary-color communication-message-alert pe-3">
                {selectedRecord || isEdit
                  ? 'The items related to above SKU are in following locations:'
                  : 'No Inventory Items found related to above SKU'}
              </p>
            </div>
          </div>
        </Alert>
      </Col>
      <InventoryItemCountList selectedRecord={selectedRecord} />
      <Row>
        <Col xl={12} lg={12} md={12} className="mb-3">
          <Table className="table-sm">
            <thead>
              <tr>
                <th>Location</th>
                <th>Qty.</th>
              </tr>
            </thead>
            <tbody>
              {locationField?.map((location, index) => (
                <tr key={index}>
                  <td width={70}>
                    <ReactSelect
                      key={`locations[${index}].location_id`}
                      name={`locations[${index}].location_id`}
                      errors={errors}
                      control={control}
                      options={locationOptions ?? []}
                      value={locationOptions?.find(
                        (option) => location.location_id === option.value
                      )}
                      defaultSelected={
                        location.location_id &&
                        locationOptions?.find(
                          (option) => location.location_id === option.value
                        )
                      }
                      isClearable
                    />
                  </td>
                  <td width={20}>
                    <FormInput
                      key={`locations[${index}].qty`}
                      register={register}
                      control={control}
                      errors={errors}
                      name={`locations[${index}].qty`}
                      type="number"
                      placeholder="0.00"
                      step="0.01"
                    />
                  </td>
                  <td width={10}>
                    <Button
                      onClick={() => removeLocations(index)}
                      variant="danger"
                      className="btn btn-danger">
                      Remove
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          <Button
            className="float-right"
            onClick={() => addLocations(EMPTY_LOCATION_FORM)}>
            Add
          </Button>
        </Col>
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

export default TechInventoryForm;
