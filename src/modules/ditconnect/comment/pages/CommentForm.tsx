/* eslint-disable react/prop-types */
import React from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import { FormInput } from '@uhub/components';
import CancelButton from '@uhub/components/Form/CancelButton';
import BackendValidationMessage from '@uhub/components/BackendValidationMessage';
import { useUser } from '@uhub/hooks';
import { CommentFormProps } from '../types/Comment';
import useCommentForm from '../hooks/useCommentForm';

type Props = {
  defaultValues: CommentFormProps;
  toggle?: () => void;
  title?: string;
};

const CommentForm: React.FC<Props> = ({ defaultValues, toggle, title }) => {
  const {
    register,
    control,
    errors,
    handleSubmit,
    serverValidationError,
    setServerValidationError,
    submitted,
    onSubmit,
    watchedComment,
  } = useCommentForm(defaultValues);

  const { user: loggedInUser } = useUser();

  return (
    <Form onSubmit={handleSubmit(onSubmit)} className="mb-2">
      {serverValidationError && (
        <BackendValidationMessage
          setServerValidationError={setServerValidationError}
        />
      )}

      {title && <h6 className="font-14">{title}</h6>}

      <Row>
        <Col>
          <FormInput
            name="comment"
            type="textarea"
            register={register}
            control={control}
            errors={errors}
            placeholder={`${defaultValues?.id ? 'Edit' : ''} Comment as ${loggedInUser?.name ?? ''}`}
            containerClass="mb-2"
          />
          <div className="float-end button-list">
            {defaultValues?.id && (
              <CancelButton redirectOnClick={toggle || (() => {})} />
            )}
            <Button
              variant="secondary"
              size="sm"
              className="btn btn-secondary"
              type="submit"
              disabled={submitted || !watchedComment}>
              <i className="bx bx-send me-1" />
              {defaultValues?.id ? 'Save' : 'Post'}
            </Button>
          </div>
        </Col>
      </Row>
    </Form>
  );
};

export default CommentForm;
