import React from 'react';
import { Button, Row, Col, Card, ListGroup } from 'react-bootstrap';
import PageTitle from '../../components/PageTitle';
import useMethaneReducerNutrientList from './hooks/useMethaneReducerNutrientList';
import useNonMethaneReducerNutrientList from './hooks/useNonMethaneReducerNutrientList';
import { capitalizeFirstLetter, convertToSlug } from '../../helpers';
import AddNutrientModal from './modal/AddNutrientModal';
import { can } from '../../helpers/checkPermission';
import {
  CREATE_SUPPLEMENT_NUTRIENT,
  DELETE_SUPPLEMENT_NUTRIENT,
  READ_SUPPLEMENT_NUTRIENT,
  UPDATE_SUPPLEMENT_NUTRIENT,
} from '../../constants/permissions';
import DeleteNutrientModal from './modal/DeleteNutrientModal';
import ErrorMessage from '../../components/ErrorMessage';
import CustomLoader from '../../components/CustomLoader';
import ActionDropdown from '../../components/ActionDropdown';
import { CustomDropdownMenuItem } from '../../types/common';
import EditNutrientForm from './forms/EditNutrientForm';

const SupplementNutrientList: React.FC = () => {
  const canCreateSupplementNutrient = can(CREATE_SUPPLEMENT_NUTRIENT);
  const canReadSupplementNutrient = can(READ_SUPPLEMENT_NUTRIENT);

  const {
    data: nonMethaneReducerNutrient,
    refetch: nonMethaneRefetch,
    isError: isErrorNonMethaneReducerNutrient,
    isFetching: isFetchingNonMethaneReducerNutrient,
  } = useNonMethaneReducerNutrientList();

  const {
    data: methaneReducerNutrient,
    toggleModal,
    showModal,
    refetch: methaneRefetch,
    isFetching: isFetchingMethaneReducerNutrientList,
    isError: isErrorMethaneReducerNutrientList,
  } = useMethaneReducerNutrientList();

  const menuItems = (id: number): CustomDropdownMenuItem[] => {
    return [
      {
        label: 'Edit',
        icon: 'bx bx-edit',
        permission: UPDATE_SUPPLEMENT_NUTRIENT,
        actionKey: 'Edit Supplement Nutrient',
        modalContent: (
          <EditNutrientForm
            nutrientId={id}
            methaneRefetch={methaneRefetch}
            nonMethaneRefetch={nonMethaneRefetch}
          />
        ),
      },
      {
        label: 'Delete',
        icon: 'bx bx-trash',
        permission: DELETE_SUPPLEMENT_NUTRIENT,
        actionKey: 'Delete Supplement Nutrient',
        modalContent: (
          <DeleteNutrientModal
            nutrientId={id}
            methaneRefetch={methaneRefetch}
            nonMethaneRefetch={nonMethaneRefetch}
          />
        ),
      },
    ];
  };

  if (isErrorMethaneReducerNutrientList || isErrorNonMethaneReducerNutrient) {
    return <ErrorMessage />;
  }

  return (
    <>
      <PageTitle
        breadCrumbItems={[
          {
            label: 'Supplement Nutrients',
            path: '/supplement-nutrients/list',
            active: true,
          },
        ]}
        title="Supplement Nutrients"
      />

      {canReadSupplementNutrient && (
        <>
          <Row>
            <Col className="mb-2">
              {canCreateSupplementNutrient && (
                <div className="float-end ">
                  <Button
                    variant="secondary"
                    className="mb-1 btn btn-secondary btn-sm"
                    onClick={toggleModal}>
                    <i className="bx bx-plus me-1 font-18" /> Add Nutrient
                  </Button>
                </div>
              )}
            </Col>
          </Row>
          <Row>
            <Col sm={6}>
              <Card>
                <Card.Header as="h5" className="text-primary-color">
                  Standard Nutrients
                </Card.Header>
                <Card.Body>
                  {isFetchingNonMethaneReducerNutrient ? (
                    <CustomLoader />
                  ) : (
                    <ListGroup>
                      {nonMethaneReducerNutrient &&
                        nonMethaneReducerNutrient.map((item: any) => (
                          <ListGroup.Item
                            key={item.id}
                            className="d-flex justify-content-between align-items-center text-capitalize">
                            <div className="d-flex align-items-center gap-1">
                              <i
                                className={`mdi mdi-square text-${convertToSlug(
                                  item.name
                                )}`}
                              />
                              <p className="mb-0 text-capitalize">
                                {capitalizeFirstLetter(item.name)}
                              </p>
                            </div>
                            <div className="d-flex align-items-center font-18 ">
                              <ActionDropdown
                                icon="bx bx-dots-vertical-rounded"
                                iconColorClass="text-muted"
                                containerClass="custom-dropdown d-flex align-items-center justify-content-between text-white"
                                menuItems={menuItems(item.id)}
                              />
                            </div>
                          </ListGroup.Item>
                        ))}
                    </ListGroup>
                  )}
                </Card.Body>
              </Card>
            </Col>
            <Col sm={6}>
              <Card>
                <Card.Header as="h5" className="text-primary-color">
                  Methane Reducing Nutrients
                </Card.Header>
                <Card.Body>
                  {isFetchingMethaneReducerNutrientList ? (
                    <CustomLoader />
                  ) : (
                    <ListGroup>
                      {methaneReducerNutrient &&
                        methaneReducerNutrient.map((item: any) => (
                          <ListGroup.Item
                            key={item.id}
                            className="d-flex justify-content-between align-items-center text-capitalize">
                            <div className="d-flex align-items-center gap-1">
                              <i
                                className={`mdi mdi-square text-${convertToSlug(
                                  item.name
                                )}`}
                              />
                              <p className="mb-0 text-capitalize">
                                {`${capitalizeFirstLetter(item.name)} - ${
                                  item.methane_reduction_factor
                                }`}
                              </p>
                            </div>
                            <div className="d-flex align-items-center font-18 ">
                              <ActionDropdown
                                icon="bx bx-dots-vertical-rounded"
                                iconColorClass="text-muted"
                                containerClass="custom-dropdown d-flex align-items-center justify-content-between text-white"
                                menuItems={menuItems(item.id)}
                              />
                            </div>
                          </ListGroup.Item>
                        ))}
                    </ListGroup>
                  )}
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </>
      )}
      <AddNutrientModal
        toggleModal={toggleModal}
        showModal={showModal}
        methaneRefetch={methaneRefetch}
        nonMethaneRefetch={nonMethaneRefetch}
      />
    </>
  );
};

export default SupplementNutrientList;
