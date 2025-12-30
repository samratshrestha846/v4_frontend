import React from 'react';
import { Button, Modal, Table, Form, Row, Col } from 'react-bootstrap';

import { shortDateFormat } from '@uhub/helpers';
import ReactSelect from '@uhub/components/ReactSelect';
import CustomLoader from '@uhub/components/CustomLoader';
import Select from 'react-select';
import BackendValidationMessage from '@uhub/components/BackendValidationMessage';
import useProductionFacilityCreateModal from '../hooks/useProductionFacilityCreateModal';

type Props = {
  showModal: boolean;
  toggleModal: () => void;
  product: any;
};

const ProductionFacilityCreateModal: React.FC<Props> = ({
  showModal,
  toggleModal,
  product,
}) => {
  const {
    control,
    handleSubmit,
    serverValidationError,
    setServerValidationError,
    watch,
    errors,
    locationOptions,
    productionLocations,
    isLoading,
    onSubmit,
    submitted,
    availableSupplements,
    isAvailableSupplementFetching,
    addProduction,
    setAddProduction,
    setTopLocationId,
    productionRequests,
    onClear,
  } = useProductionFacilityCreateModal({
    toggleModal,
    product,
  });
  return (
    <Modal show={showModal} onHide={toggleModal}>
      <Modal.Header closeButton>
        <Modal.Title>
          Check Availability for {product.supplement.group}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col md={12}>
            {isLoading ? <CustomLoader /> : null}

            <Form onSubmit={handleSubmit(onSubmit)}>
              {serverValidationError && (
                <BackendValidationMessage
                  setServerValidationError={setServerValidationError}
                />
              )}
              {productionRequests && productionRequests.data.length > 0 ? (
                <Table striped bordered hover size="sm">
                  <thead>
                    <tr>
                      <th>Qty</th>
                      <th>Status</th>
                      <th>Updated At</th>
                    </tr>
                  </thead>
                  <tbody>
                    {productionRequests.data.map((request) => (
                      <tr key={request.id}>
                        <td>{request.qty}</td>
                        <td>{request.status}</td>
                        <td>{shortDateFormat(request.updated_at)}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              ) : (
                <Row>
                  <Select
                    name="top_location_id"
                    label="Location"
                    options={locationOptions ?? []}
                    onChange={(e) => setTopLocationId(Number(e!.value))}
                    isClearable
                  />
                  {isAvailableSupplementFetching ? <CustomLoader /> : null}
                  {Array.isArray(availableSupplements) &&
                    availableSupplements.length > 0 && (
                      <Table striped bordered hover size="sm" className="mt-3">
                        <thead>
                          <tr>
                            <th>Name</th>
                            <th>Location</th>
                            <th>Qty</th>
                          </tr>
                        </thead>
                        <tbody>
                          {availableSupplements.map((supplement) => (
                            <tr key={supplement.id}>
                              <td>{supplement.name}</td>
                              <td>{supplement.location_name}</td>
                              <td>{supplement.total_current_qty}</td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    )}
                  <Col md={12} className="mt-2">
                    <Form.Group
                      className="d-flex align-items-center"
                      onClick={() => setAddProduction(!addProduction)}>
                      <input
                        type="checkbox"
                        checked={addProduction}
                        onChange={(e) => setAddProduction(e.target.checked)}
                        className="focus:ring-light-blue-500 focus:border-light-blue-500 rounded"
                      />
                      <Form.Label
                        htmlFor="addProductionCheckbox"
                        className="ms-2 text-sm fst-italic">
                        Do you want to create a production request?
                      </Form.Label>
                    </Form.Group>
                  </Col>

                  {addProduction && (
                    <>
                      <h6>Create Production Request</h6>
                      <div className="mt-2">
                        <ReactSelect
                          name="location_id"
                          label="Location"
                          errors={errors}
                          control={control}
                          options={productionLocations ?? []}
                          value={productionLocations?.find(
                            (item: any) => item.value === watch('location_id')
                          )}
                          isClearable
                        />
                      </div>
                    </>
                  )}
                </Row>
              )}
              <Row>
                <Col>
                  <div className="button-list float-end mt-2">
                    <Button
                      variant="outline-secondary"
                      onClick={() => {
                        onClear();
                        toggleModal();
                      }}>
                      Cancel
                    </Button>
                    {productionRequests &&
                      !productionRequests.data.length &&
                      addProduction && (
                        <Button
                          onClick={() => handleSubmit(onSubmit)}
                          variant="primary"
                          className="btn btn-secondary"
                          type="submit"
                          disabled={submitted}>
                          Create Request
                        </Button>
                      )}
                  </div>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
};

export default ProductionFacilityCreateModal;
