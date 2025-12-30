import React from 'react';
import { Row, Col, Form } from 'react-bootstrap';
import CancelButton from '@uhub/components/Form/CancelButton';
import SubmitButton from '@uhub/components/Form/SubmitButton';
import BackendValidationMessage from '@uhub/components/BackendValidationMessage';
import { FormInput } from '@uhub/components';
import ReactSelect from '@uhub/components/ReactSelect';
import { FileFormProps } from '../../types/Document';
import useFileForm from '../../hooks/File/useFileForm';

type Props = {
  defaultValues: FileFormProps;
  folderOptions: any[];
};
const FileForm: React.FC<Props> = ({ defaultValues, folderOptions }) => {
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
  } = useFileForm(defaultValues);
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      {serverValidationError && (
        <BackendValidationMessage
          setServerValidationError={setServerValidationError}
        />
      )}
      <Row>
        <Col xl={6} lg={6} md={6}>
          <ReactSelect
            label="Folder Name"
            name="folder_id"
            errors={errors}
            control={control}
            options={folderOptions ?? []}
            placeholder="Select"
            isClearable
            defaultSelected={folderOptions[0]}
            isDisabled
          />
        </Col>
        <Col xl={6} lg={6} md={6}>
          <FormInput
            label="Name"
            type="text"
            name="name"
            register={register}
            control={control}
            errors={errors}
            containerClass="mb-2"
          />
        </Col>
        {!defaultValues.name && (
          <Col xl={6} lg={6} md={6} className="mb-3">
            <FormInput
              label="File"
              type="file"
              name="file"
              errors={errors}
              register={register}
              control={control}
            />
          </Col>
        )}

        {defaultValues.name && (
          <Col xl={6} lg={6} md={6}>
            <div className="mb-2">
              <Form.Label className="mb-1">Attached File</Form.Label>
              <br />
              {defaultValues?.file_path ? (
                <a
                  href={defaultValues?.file_path}
                  target="_blank"
                  rel="noreferrer">
                  <i className="bx bxs-file-pdf me-1" />
                  View File
                </a>
              ) : (
                <strong>No file</strong>
              )}
            </div>
          </Col>
        )}
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

export default FileForm;
