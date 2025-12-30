import React from 'react';
import { Form, Row, Col, Button, Alert } from 'react-bootstrap';

import FormInput from '../../../components/FormInput';
import ReactSelect from '../../../components/ReactSelect';
import CustomLoader from '../../../components/CustomLoader';
import {
  ROLE_ADMIN,
  ROLE_MANAGER,
  ROLE_STATION_MANAGER,
} from '../../../constants/constants';

import useCreateProperty from '../hooks/useCreateProperty';
import useRegionsDropdown from '../../../hooks/dropdown/useRegionsDropdown';
import useCustomersDropdown from '../../../hooks/dropdown/useCustomersDropdown';
import useUsersDropdown from '../../../hooks/dropdown/useUsersDropdown';
import ErrorMessage from '../../../components/ErrorMessage';
import useUsersDropdownByRole from '../../../hooks/dropdown/useUserDropdownByRole';
import { STATUS_OPTIONS } from '../../../constants/statusOptions';

type Props = {
  toggleModal: () => void;
  refetch: () => void;
};

const PropertyAddForm: React.FC<Props> = ({ toggleModal, refetch }) => {
  const {
    register,
    control,
    errors,
    handleSubmit,
    onSubmit,
    serverValidationError,
    setServerValidationError,
    submitted,
  } = useCreateProperty({ refetch, toggleModal });

  const { regionsDropdown, isFetchingRegionsDropdown, isErrorRegionsDropdown } =
    useRegionsDropdown();

  const {
    customersDropdown,
    isFetchingCustomersDropdown,
    isErrorCustomersDropdown,
  } = useCustomersDropdown();

  const {
    isFetchingUsersDropdown,
    propagateOnCustomerChange,
    stationManagerOptions,
  } = useUsersDropdown({
    filterParam: {
      role: ROLE_STATION_MANAGER,
    },
    isBlankInitially: true,
  });

  const {
    data: territoryManagersOptions,
    isFetching: isFetchingTerritoryManagersOptions,
    isError: isErrorTerritoryManagersOptions,
  } = useUsersDropdownByRole({
    type: 'dropdown',
    roles: [ROLE_ADMIN, ROLE_MANAGER],
  });

  if (
    isFetchingRegionsDropdown ||
    isFetchingCustomersDropdown ||
    isFetchingUsersDropdown ||
    isFetchingTerritoryManagersOptions
  ) {
    return <CustomLoader />;
  }

  if (
    isErrorRegionsDropdown ||
    isErrorCustomersDropdown ||
    isErrorTerritoryManagersOptions
  ) {
    return <ErrorMessage />;
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      {serverValidationError && (
        <Alert
          variant="danger"
          onClose={() => setServerValidationError(false)}
          dismissible>
          <strong>Validation Failed - </strong> Please fix validation errors and
          try again
        </Alert>
      )}
      <Row>
        <Col className="mb-2">
          <FormInput
            label="Property Name"
            type="text"
            name="name"
            placeholder="Enter Property Name"
            errors={errors}
            register={register}
            control={control}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <div className="mb-2">
            <ReactSelect
              label="Region"
              name="region_id"
              errors={errors}
              control={control}
              options={regionsDropdown}
            />
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <div className="mb-2">
            <ReactSelect
              label="Customer"
              name="customer_id"
              errors={errors}
              control={control}
              options={customersDropdown}
              propagateOnChange={propagateOnCustomerChange}
            />
          </div>
        </Col>
      </Row>

      <Row>
        <Col>
          <div className="mb-2">
            <ReactSelect
              errors={errors}
              control={control}
              label="Station Manager(s)"
              name="customer_property_managers"
              options={stationManagerOptions}
              isMultiple
            />
          </div>
        </Col>
      </Row>

      <Row>
        <Col>
          <div className="mb-2">
            <ReactSelect
              errors={errors}
              control={control}
              label="Territory Manager(s)"
              name="territory_managers"
              options={territoryManagersOptions}
              isMultiple
            />
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <div className="mb-2">
            <ReactSelect
              errors={errors}
              control={control}
              label="Status"
              name="is_active"
              options={STATUS_OPTIONS}
            />
          </div>
        </Col>
      </Row>

      <Row>
        <Col>
          <div className="float-end button-list">
            <Button
              className="btn btn-ghost"
              variant="outline"
              onClick={toggleModal}>
              <i className="bx bx-x me-1" />
              Cancel
            </Button>
            <Button
              variant="secondary"
              className="btn btn-secondary"
              type="submit"
              disabled={submitted}>
              <i className="bx bx-save me-1" />
              Save
            </Button>
          </div>
        </Col>
      </Row>
    </Form>
  );
};

export default PropertyAddForm;
