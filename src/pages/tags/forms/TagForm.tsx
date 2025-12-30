import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { Control, FieldErrors, UseFormRegister } from 'react-hook-form';
import ReactSelect from '../../../components/ReactSelect';
import { FormInput } from '../../../components';

import { Tag, TagFormfields } from '../../../types/tag';
import { LabelValueDropdown } from '../../../types/common';

type Props = {
  register: UseFormRegister<TagFormfields>;
  control: Control<TagFormfields>;
  errors: FieldErrors<TagFormfields>;
  tagTypeOptions: LabelValueDropdown[];
  tagDetail?: Tag;
};

const TagForm: React.FC<Props> = ({
  register,
  control,
  errors,
  tagTypeOptions,
  tagDetail,
}) => {
  return (
    <Row>
      <Col md={12} className="mb-2">
        <ReactSelect
          control={control}
          errors={errors}
          label="Type "
          name="type"
          options={tagTypeOptions}
          defaultSelected={tagTypeOptions?.find(
            (item) => item.value === tagDetail?.type
          )}
          isClearable
        />
      </Col>
      <Col md={12} className="mb-2">
        <FormInput
          label="Name"
          type="text"
          name="name"
          placeholder="name"
          register={register}
          control={control}
          errors={errors}
        />
      </Col>
    </Row>
  );
};

export default TagForm;
