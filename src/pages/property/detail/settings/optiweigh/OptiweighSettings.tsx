import React from 'react';
import {
  Card,
  ListGroup,
  Form,
  OverlayTrigger,
  Tooltip,
} from 'react-bootstrap';

import OptiweighSettingsForm from './OptiweighSettingsForm';
import useUpdateOptiweighSettings from './hooks/useUpdateOptiweighSettings';
import BackendValidationMessage from '../../../../../components/BackendValidationMessage';
import { Property } from '../../../../../types/property/propertyList';

type Props = {
  property?: Property;
  refetchProperty: () => void;
};

const OptiweighSettings: React.FC<Props> = ({
  property,
  refetchProperty,
}: Props) => {
  const {
    register,
    control,
    errors,
    handleSubmit,
    onSubmit,
    serverValidationError,
    setServerValidationError,
    isSettingsEditEnabled,
    setIsSettingsEditEnabled,
    handleEdit,
    submitted,
  } = useUpdateOptiweighSettings({ property, refetchProperty });

  return (
    <Card>
      <Card.Header
        as="h5"
        className="px-2 fw-meium text-primary-color d-flex justify-content-between">
        <span> Optiweigh </span>
        <OverlayTrigger
          placement="left"
          overlay={
            <Tooltip id="edit-settings">
              {isSettingsEditEnabled ? 'Cancel' : 'Edit Settings'}
            </Tooltip>
          }>
          <button
            type="button"
            className="btn-icon text-muted font-18 "
            onClick={handleEdit}>
            <i className={`bx ${isSettingsEditEnabled ? 'bx-x' : 'bx-edit'}`} />
          </button>
        </OverlayTrigger>
      </Card.Header>
      <Card.Body className="p-2">
        {serverValidationError && (
          <BackendValidationMessage
            setServerValidationError={setServerValidationError}
          />
        )}

        {isSettingsEditEnabled ? (
          <Form onSubmit={handleSubmit(onSubmit)}>
            <OptiweighSettingsForm
              register={register}
              control={control}
              errors={errors}
              property={property}
              setIsSettingsEditEnabled={setIsSettingsEditEnabled}
              submitted={submitted}
            />
          </Form>
        ) : (
          <ListGroup className="">
            <ListGroup.Item className="d-flex justify-content-between align-items-center border-0 p-1">
              <div className="d-flex gap-1 justify-content-between align-items-center">
                <h5 className="m-0 text-grey fw-normal">Enable</h5>
              </div>
              <span className="text-grey fw-bold">
                <OverlayTrigger
                  placement="left"
                  overlay={
                    <Tooltip id="edit-settings">
                      Click edit button to change the Settings
                    </Tooltip>
                  }>
                  <div className="custom-switch form-check form-switch">
                    <input
                      type="checkbox"
                      id="custom-switch"
                      className="form-check-input"
                      checked={
                        property?.settings?.optiweigh?.is_enable || false
                      }
                      readOnly
                    />
                  </div>
                </OverlayTrigger>
              </span>
            </ListGroup.Item>
            <ListGroup.Item className="d-flex justify-content-between align-items-center border-0 p-1">
              <div className="d-flex gap-1 justify-content-between align-items-center">
                <h5 className="m-0 text-grey fw-normal">Client ID</h5>
              </div>
              <span className="text-grey me-1">
                {property?.settings?.optiweigh?.client_id
                  ? property?.settings?.optiweigh?.client_id
                  : ' - '}
              </span>
            </ListGroup.Item>
          </ListGroup>
        )}
      </Card.Body>
    </Card>
  );
};

export default OptiweighSettings;
