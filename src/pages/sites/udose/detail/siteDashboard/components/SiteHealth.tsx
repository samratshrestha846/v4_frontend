/* eslint-disable react/no-array-index-key */
import React from 'react';
import { Card } from 'react-bootstrap';
import { formattedDatetime } from '../../../../../../helpers';
import useCheckUdoseSiteHealth from '../../hooks/useCheckUdoseSiteHealth';
import CustomLoader from '../../../../../../components/CustomLoader';
import ErrorMessage from '../../../../../../components/ErrorMessage';
import {
  SITE_HEALTH_STATUS_OK,
  SITE_HEALTH_STATUS_SEVERE,
  SITE_HEALTH_STATUS_WARNING,
} from '../../../../../../constants/constants';
import IconLabelStatus from '../../../../../../components/IconLabelStatus';
import CustomTooltip from '../../../../../../components/CustomTooltip';

const SiteHealth: React.FC = () => {
  const { data: siteHealth, isFetching, isError } = useCheckUdoseSiteHealth();

  if (isFetching) {
    return <CustomLoader />;
  }

  if (isError) {
    return <ErrorMessage />;
  }

  return (
    <Card>
      <Card.Body>
        <div className="d-flex flex-column justify-content-start">
          <div className="d-flex justify-content-between align-items-center gap-2 mb-2">
            <h5 className="m-0 text-primary-color">Site Health Status</h5>
            {siteHealth?.latest_site_health_check_result?.health_status && (
              <IconLabelStatus
                label={
                  siteHealth?.latest_site_health_check_result?.health_status ===
                  SITE_HEALTH_STATUS_OK
                    ? SITE_HEALTH_STATUS_OK
                    : SITE_HEALTH_STATUS_WARNING
                }
                iconTextClass={
                  siteHealth?.latest_site_health_check_result?.health_status ===
                  SITE_HEALTH_STATUS_OK
                    ? 'text-success'
                    : 'text-warning'
                }
              />
            )}
          </div>
          <h5 className="text-black">
            {formattedDatetime(
              siteHealth?.latest_site_health_check_result?.created_at
            )}
          </h5>
          <p className="fw-bold m-0 p-0">Checked At</p>

          {(siteHealth?.latest_site_health_check_result?.health_status ===
            SITE_HEALTH_STATUS_WARNING ||
            siteHealth?.latest_site_health_check_result?.health_status ===
              SITE_HEALTH_STATUS_SEVERE) &&
            siteHealth?.latest_site_health_check_result?.health_message
              ?.length > 0 && (
              <>
                <h5 className="text-primary-color">Causes</h5>
                <ul
                  className="ps-1 nav d-flex"
                  style={{
                    flexBasis: 'auto',
                    width: 'fit-content',
                    maxWidth: '100%',
                  }}>
                  {siteHealth?.latest_site_health_check_result?.health_message?.map(
                    (message, key) => (
                      <li className="d-block-flex-basis">
                        <CustomTooltip
                          key={key}
                          tooltipText={message}
                          wrapperClass="bg-warning"
                          anglePeakClass="bg-warning">
                          <span className="text-truncate-short">
                            <i className="bx bx-radio-circle-marked me-half" />
                            {message}
                          </span>
                        </CustomTooltip>
                      </li>
                    )
                  )}
                </ul>
              </>
            )}
        </div>
      </Card.Body>
    </Card>
  );
};

export default SiteHealth;
