import React from 'react';
import { Alert, Button, Card, Col, Form, Row } from 'react-bootstrap';
import useCreateAlarm from './hooks/useCreateAlarm';
import PageTitle from '../../components/PageTitle';
import { ALARM_ADD, ALARM_LIST } from '../../constants/path';
import CreateAlarmForm from './forms/createAlarmForm';

const CreateAlarm: React.FC = () => {
  const {
    register,
    control,
    errors,
    handleSubmit,
    onSubmit,
    serverValidationError,
    setServerValidationError,
    navigateToAlarmList,
    submitted,
    potentialAction,
    setPotentialAction,
    editorRef,
  } = useCreateAlarm();

  return (
    <>
      <PageTitle
        breadCrumbItems={[
          {
            label: 'Alarms',
            path: ALARM_LIST,
          },
          {
            label: 'Add Alarm',
            path: ALARM_ADD,
            active: true,
          },
        ]}
        title="Add Alarm"
      />
      <Row>
        <Col md={12} xs={12}>
          {serverValidationError && (
            <Alert
              variant="danger"
              onClose={() => setServerValidationError(false)}
              dismissible>
              <strong>Validation Failed - </strong> Please fix validation errors
              and try again
            </Alert>
          )}

          <Card>
            <Card.Body>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <CreateAlarmForm
                  control={control}
                  errors={errors}
                  register={register}
                  potentialAction={potentialAction}
                  setPotentialAction={setPotentialAction}
                  editorRef={editorRef}
                />
                <Row xs="auto" className="float-end">
                  <Col>
                    <div className="button-list">
                      <Button
                        variant="outline"
                        className="btn btn-ghost"
                        onClick={navigateToAlarmList}>
                        <i className="bx bx-x " /> Cancel
                      </Button>

                      <Button
                        variant="secondary"
                        type="submit"
                        className="btn btn-secondary"
                        disabled={submitted}>
                        <i className="bx bx-save " /> Save
                      </Button>
                    </div>
                  </Col>
                </Row>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default CreateAlarm;
