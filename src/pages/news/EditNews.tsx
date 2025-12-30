import React from 'react';
import { Card, Row, Col, Button, Form, Alert } from 'react-bootstrap';
import PageTitle from '../../components/PageTitle';
import EditNewsForm from './forms/EditNewsForm';
import useUpdateNews from './hooks/useUpdateNews';
import CustomLoader from '../../components/CustomLoader';
import ErrorMessage from '../../components/ErrorMessage';
import { prepareDynamicUrl } from '../../helpers';
import { NEWS_EDIT, NEWS_LIST } from '../../constants/path';
import { NEWS_PUBLISH_OPTIONS } from '../../constants/statusOptions';

const EditNews = () => {
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
    newsDetail,
    isFetching,
    isError,
  } = useUpdateNews();

  if (isFetching) return <CustomLoader />;

  if (isError) return <ErrorMessage />;

  return (
    <>
      <PageTitle
        breadCrumbItems={[
          {
            label: 'News',
            path: NEWS_LIST,
          },
          {
            label: 'Edit News',
            path: prepareDynamicUrl(NEWS_EDIT, newsDetail?.id),
            active: true,
          },
        ]}
        title="News List"
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
              <EditNewsForm
                register={register}
                control={control}
                errors={errors}
                setFileUploaded={setFileUploaded}
                statusOptions={NEWS_PUBLISH_OPTIONS}
                news={newsDetail}
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

export default EditNews;
