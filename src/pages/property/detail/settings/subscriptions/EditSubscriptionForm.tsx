/* eslint-disable no-unused-vars */
import React, { Dispatch, SetStateAction } from 'react';
import {
  Control,
  FieldErrors,
  FieldValues,
  UseFormRegister,
} from 'react-hook-form';
import { Row, Col, Button, Table } from 'react-bootstrap';
import { FormInput } from '../../../../../components';
import ReactSelect from '../../../../../components/ReactSelect';
import { LabelNumericValue } from '../../../../../types/common';

type Props = {
  register: UseFormRegister<FieldValues>;
  control: Control<FieldValues>;
  errors: FieldErrors<FieldValues>;
  supplementOptions?: LabelNumericValue[];
  propagateOnSupplementChange: (selected: any) => void;
  subscriptions?: LabelNumericValue[];
  defaultOptions?: LabelNumericValue[];
  setIsSubscriptionEditEnabled: Dispatch<SetStateAction<boolean>>;
  submitted: boolean;
};

const EditSubscriptionForm: React.FC<Props> = ({
  register,
  control,
  errors,
  supplementOptions,
  propagateOnSupplementChange,
  subscriptions,
  defaultOptions,
  setIsSubscriptionEditEnabled,
  submitted,
}) => {
  return (
    <>
      <Row>
        <Col md={12} className="react-select-form mb-3">
          <ReactSelect
            label="Supplement"
            name="supplement_id"
            errors={errors}
            control={control}
            options={supplementOptions || []}
            propagateOnChange={(e) => propagateOnSupplementChange(e)}
            isMultiple
            defaultSelected={defaultOptions}
            closeMenuOnSelect={false}
          />
        </Col>
      </Row>
      {subscriptions && subscriptions?.length > 0 && (
        <Table className="table-sm">
          <thead>
            <tr>
              <th>Supplement</th>
              <th>Cost Per Ltr.</th>
            </tr>
          </thead>
          <tbody>
            {subscriptions?.map((subscription) => (
              <tr key={subscription.value}>
                <td>
                  <strong>{subscription.label}</strong>
                </td>
                <td>
                  <FormInput
                    register={register}
                    control={control}
                    errors={errors}
                    name={`cost_per_ltr_${subscription.value}`}
                    type="text"
                    placeholder="0.00"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      <Row className="">
        <Col>
          <div className="float-end button-list">
            <Button
              variant="outline"
              className=" btn btn-ghost btn-sm"
              onClick={() => setIsSubscriptionEditEnabled(false)}>
              <i className="bx bx-x me-1" />
              Cancel
            </Button>
            <Button
              variant="secondary"
              className="btn btn-secondary btn-sm"
              type="submit"
              disabled={submitted}>
              <i className="bx bx-save me-1" />
              Save
            </Button>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default EditSubscriptionForm;
