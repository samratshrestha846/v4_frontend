import React from 'react';
import { Card } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { can } from '../../../../../../helpers/checkPermission';
import {
  ACCESS_HEALTH_CHECK_SETTING,
  ACCESS_WATER_PRESSURE,
  READ_UDOSE,
} from '../../../../../../constants/permissions';
import {
  DAILY_SUMMARY_BY_SITE,
  HEALTH_CHECK_SETTINGS_LIST_BY_SITE,
  WATER_PRESSURES_LIST_BY_SITE,
} from '../../../../../../constants/path';

import useAuth from '../../../../../../hooks/useAuth';
import { prepareDynamicUrl } from '../../../../../../helpers';

const QuickLinks: React.FC = () => {
  const stateSite = useSelector((state: any) => state.Site);
  const { siteDetail } = stateSite;
  const { isAdmin, isSuperAdmin } = useAuth();
  const { id } = useParams();

  return (
    <Card>
      <Card.Header as="h5" className="text-primary-color">
        Quick Links
      </Card.Header>
      <Card.Body>
        <ul className="d-flex flex-column justify-content-start gap-2 quick-link-nav m-0">
          {can(READ_UDOSE) && (
            <li>
              <Link
                to={`${prepareDynamicUrl(
                  DAILY_SUMMARY_BY_SITE,
                  id
                )}?site_name=${siteDetail?.name}`}>
                <i className="bx bx-notepad me-1" />
                <span>Site Daily Summary</span>
              </Link>
            </li>
          )}

          {(isSuperAdmin || isAdmin) && can(ACCESS_HEALTH_CHECK_SETTING) && (
            <li>
              <Link
                to={`${prepareDynamicUrl(HEALTH_CHECK_SETTINGS_LIST_BY_SITE, id)}?siteName=${siteDetail.name}`}>
                <i className="bx bx-cog me-1" />
                <span>Site Health Check Settings</span>
              </Link>
            </li>
          )}

          {(isSuperAdmin || isAdmin) && can(ACCESS_WATER_PRESSURE) && (
            <li>
              <Link to={prepareDynamicUrl(WATER_PRESSURES_LIST_BY_SITE, id)}>
                <i className="bx bx-water me-1" />
                <span>Water Pressure</span>
              </Link>
            </li>
          )}
        </ul>
      </Card.Body>
    </Card>
  );
};

export default QuickLinks;
