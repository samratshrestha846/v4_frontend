import React from 'react';
import { Row, Col, Form } from 'react-bootstrap';
import CancelButton from '@uhub/components/Form/CancelButton';
import SubmitButton from '@uhub/components/Form/SubmitButton';
import BackendValidationMessage from '@uhub/components/BackendValidationMessage';
import CustomDatePicker from '@uhub/components/CustomDatePicker';
import { FormInput } from '@uhub/components';
import ReactSelect from '@uhub/components/ReactSelect';
import { MessageFormProps, messageTypeOptions } from '../types/Message';
import useMessageForm from '../hooks/useMessageForm';
import { STATUS_OPTIONS_STRING } from '../../constants/common';

type Props = {
  defaultValues: MessageFormProps;
};
const MessageForm: React.FC<Props> = ({ defaultValues }) => {
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
  } = useMessageForm(defaultValues);

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      {serverValidationError && (
        <BackendValidationMessage
          setServerValidationError={setServerValidationError}
        />
      )}
      <Row>
        <Col xl={6} lg={6} md={6}>
          <div className="mb-2">
            <ReactSelect
              label="Type"
              name="type"
              errors={errors}
              control={control}
              options={messageTypeOptions ?? []}
              placeholder="Select"
              isClearable
              defaultSelected={messageTypeOptions?.find(
                (item: any) => item.value === defaultValues?.type
              )}
            />
          </div>
        </Col>
        <Col xl={6} lg={6} md={6} className="mb-3">
          <FormInput
            label="Message"
            type="textarea"
            name="message"
            placeholder="Message"
            register={register}
            control={control}
            errors={errors}
          />
        </Col>
        <Col xl={6} lg={6} md={6} className="mb-3">
          <CustomDatePicker
            label="Publish Date"
            name="publish_date"
            defaultSelected={null}
            maxDate={new Date()}
            control={control}
            errors={errors}
          />
        </Col>

        <Col xl={6} lg={6} md={6}>
          <div className="mb-2">
            <ReactSelect
              label="Status"
              name="status"
              errors={errors}
              control={control}
              options={STATUS_OPTIONS_STRING ?? []}
              placeholder="Select"
              isClearable
              defaultSelected={STATUS_OPTIONS_STRING?.find(
                (item: any) => item.value === defaultValues?.status
              )}
            />
          </div>
        </Col>

        <Col xl={6} lg={6} md={6} className="mb-3">
          <CustomDatePicker
            label="Expires on"
            name="expires_on"
            defaultSelected={null}
            control={control}
            errors={errors}
          />
        </Col>
      </Row>

      <Row>
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

export default MessageForm;
