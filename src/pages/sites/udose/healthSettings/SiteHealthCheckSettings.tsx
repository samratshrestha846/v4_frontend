import React from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import { useParams, useSearchParams } from 'react-router-dom';
import PageTitle from '../../../../components/PageTitle';
import useUpdateSiteHealthCheckSettings from './hooks/useUpdateSiteHealthCheckSettings';
import SiteHealthCheckSettingsForm from './forms/SiteHealthCheckSettingsForm';
import CustomLoader from '../../../../components/CustomLoader';
import ErrorMessage from '../../../../components/ErrorMessage';
import BackendValidationMessage from '../../../../components/BackendValidationMessage';
import { UDOSE_LIST, UDOSE_VIEW } from '../../../../constants/path';
import { prepareDynamicUrl } from '../../../../helpers';

const SiteHealthCheckSettings: React.FC = () => {
  const { id } = useParams();

  const [searchParams] = useSearchParams();
  const siteName = searchParams.get('siteName');

  const {
    register,
    control,
    handleSubmit,
    onSubmit,
    errors,
    serverValidationError,
    setServerValidationError,
    healthSettings,
    isSuccess,
    isFetching,
    isError,
    navigateToUdoseSiteView,
    setValue,
  } = useUpdateSiteHealthCheckSettings();

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
          { label: 'Dashboard', path: '/' },
          {
            label: 'uDoses',
            path: UDOSE_LIST,
          },
          {
            label: siteName ?? 'Site Detail',
            path: prepareDynamicUrl(UDOSE_VIEW, id),
          },
          {
            label: 'Site Health Check Settings',
            path: '',
            active: true,
          },
        ]}
        title="Site Health Check Settings"
      />

      {serverValidationError && (
        <BackendValidationMessage
          setServerValidationError={setServerValidationError}
        />
      )}

      {isSuccess && (
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row className="mb-3">
            <Col lg={8} md={12}>
              <SiteHealthCheckSettingsForm
                register={register}
                errors={errors}
                control={control}
                healthSettings={healthSettings}
                setValue={setValue}
              />
            </Col>
          </Row>
          <Row className="mb-3">
            <Col lg={8} md={12}>
              <div className="button-list float-end">
                <Button
                  variant="outline"
                  className="btn btn-ghost"
                  onClick={navigateToUdoseSiteView}>
                  <i className="bx bx-x" /> Cancel
                </Button>

                <Button
                  variant="secondary"
                  type="submit"
                  className="btn btn-secondary">
                  <i className="bx bx-save " /> Save
                </Button>
              </div>
            </Col>
          </Row>
        </Form>
      )}
    </>
  );
};

export default SiteHealthCheckSettings;
