import React from 'react';
import { Alert, Button, Card, Col, Form, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import useUpdateAlarm from './hooks/useUpdateAlarm';
import CustomLoader from '../../components/CustomLoader';
import ErrorMessage from '../../components/ErrorMessage';
import PageTitle from '../../components/PageTitle';
import { ALARM_EDIT, ALARM_LIST } from '../../constants/path';
import { prepareDynamicUrl } from '../../helpers';
import EditAlarmForm from './forms/EditAlarmForm';

const EditAlarm: React.FC = () => {
  const { id } = useParams();

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
    alarmDetail,
    isError,
    isFetching,
    setPotentialAction,
    editorRef,
  } = useUpdateAlarm(Number(id));

  if (isFetching) {
    return <CustomLoader />;
  }

  if (isError) {
    return <ErrorMessage />;
  }

  return (
    <>
      <PageTitle
        breadCrumbItems={[
          {
            label: 'Alarms',
            path: ALARM_LIST,
          },
          {
            label: 'Edit Alarm',
            path: prepareDynamicUrl(ALARM_EDIT, id),
            active: true,
          },
        ]}
        title="Edit Alarm"
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
                <EditAlarmForm
                  control={control}
                  errors={errors}
                  register={register}
                  alarmDetail={alarmDetail}
                  setPotentialAction={setPotentialAction}
                  editorRef={editorRef}
                />
                <div className="mb-2">
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
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default EditAlarm;
