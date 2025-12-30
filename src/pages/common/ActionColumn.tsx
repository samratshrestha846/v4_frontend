import React from 'react';
import { Link } from 'react-router-dom';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import ExtraActions from './ExtraActions';
import { DEVICE_CONFIGURATION_TYPE_UDOSE } from '../../constants/constants';
import useAuth from '../../hooks/useAuth';

type Props = {
  moduleUri: string;
  id: string;
  extras: any;
  deviceAttached: boolean;
  installationType: string;
};

const ActionColumn: React.FC<Props> = ({
  moduleUri,
  id,
  extras,
  deviceAttached,
  installationType,
}) => {
  const { isSuperAdmin, isAdmin } = useAuth();
  return (
    <>
      <Link
        to={
          installationType === DEVICE_CONFIGURATION_TYPE_UDOSE
            ? `/${moduleUri}/udose/view/${id}`
            : `/${moduleUri}/view/${id}`
        }
        className="action-icon">
        {'  '}
        <OverlayTrigger
          placement="bottom"
          overlay={<Tooltip id="Tooltip"> View Detail </Tooltip>}>
          <i className="mdi mdi-eye mdi-24px me-2 text-dark" />
        </OverlayTrigger>
      </Link>
      {(isSuperAdmin || isAdmin) && moduleUri !== 'sites' && (
        <Link to={`/${moduleUri}/edit/${id}`} className="action-icon">
          <OverlayTrigger
            placement="bottom"
            overlay={<Tooltip id="Tooltip"> Edit </Tooltip>}>
            <i className="mdi mdi-square-edit-outline mdi-24px me-2 text-dark" />
          </OverlayTrigger>
        </Link>
      )}
      {moduleUri === 'users' && (
        <Link to={`/users/reset-password/${id}`} className="action-icon">
          {'  '}
          <OverlayTrigger
            placement="bottom"
            overlay={<Tooltip id="Tooltip"> Reset Password </Tooltip>}>
            <i className="mdi mdi-lock-reset mdi-24px text-dark me-2" />
          </OverlayTrigger>
        </Link>
      )}
      {(isSuperAdmin || isAdmin) && moduleUri !== 'sites' && (
        <ExtraActions
          moduleUri={moduleUri}
          id={id}
          extras={extras}
          deviceAttached={deviceAttached}
        />
      )}
    </>
  );
};

export default ActionColumn;
