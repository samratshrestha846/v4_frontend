import React from 'react';
import { Card, Row, Col, Button, Form, Alert } from 'react-bootstrap';

import PageTitle from '../../components/PageTitle';
import AddNewsForm from './forms/AddNewsForm';
import useCreateNews from './hooks/useCreateNews';
import { NEWS_PUBLISH_OPTIONS } from '../../constants/statusOptions';

const AddNews = () => {
  const {
    register,
    control,
    errors,
    handleSubmit,
    onSubmit,
    serverValidationError,
    setServerValidationError,
    navigateToNewsList,
    submitted,
    setFileUploaded,
  } = useCreateNews();
  return (
    <>
      <PageTitle
        breadCrumbItems={[
          {
            label: 'News',
            path: '/news/list',
          },
          {
            label: 'Add News',
            path: '/news/add',
            active: true,
          },
        ]}
        title="Add News"
      />
      <div>
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
              <AddNewsForm
                register={register}
                control={control}
                errors={errors}
                setFileUploaded={setFileUploaded}
                newsStatusOptions={NEWS_PUBLISH_OPTIONS}
              />
              <Row className="">
                <Col>
                  <div className="float-end button-list">
                    <Button
                      variant="outline"
                      className="btn btn-ghost"
                      onClick={navigateToNewsList}>
                      <i className="bx bx-x me-1" />
                      Cancel
                    </Button>
                    <Button
                      variant="secondary"
                      className="btn btn-secondary"
                      type="submit"
                      disabled={submitted}>
                      <i className="bx bx-save me-1" />
                      Save
                    </Button>
                  </div>
                </Col>
              </Row>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </>
  );
};

export default AddNews;
