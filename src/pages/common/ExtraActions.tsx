// @flow
/* eslint-disable react/prop-types */
import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

type Props = {
  moduleUri: string;
  id: string;
  extras: any;
  deviceAttached: any;
};

const ExtraActions: React.FC<Props> = ({
  moduleUri,
  id,
  extras,
  deviceAttached,
}) => {
  const logModule = moduleUri.substring(0, moduleUri.length - 1);
  const { isSuperAdmin, isAdmin } = useAuth();
  const loadExtraActionsModule = () => {
    let module: React.ReactNode = null;
    switch (moduleUri) {
      case 'sites':
        // eslint-disable-next-line
        module = sitesExtraActions();
        break;
      case 'devices':
        break;
      case 'users':
        break;
      default:
    }

    return module;
  };

  const sitesExtraActions = () => {
    return (
      <>
        <Link to={`/${moduleUri}/notification-settings/${id}`}>
          <Dropdown.Item as="button"> Notification Settings </Dropdown.Item>
        </Link>
        <Dropdown.Divider />
        {deviceAttached && (isAdmin || isSuperAdmin) && (
          <>
            <Link to={`/devices/view/${extras}`}>
              {' '}
              <Dropdown.Item as="button"> Attached Device </Dropdown.Item>
            </Link>
            <Dropdown.Divider />
          </>
        )}
      </>
    );
  };

  return (
    <Dropdown className="action-icon">
      <Dropdown.Toggle size="sm" variant="secondary" id="dropdown-basic">
        <i className="mdi mdi-menu-down-outline" />
      </Dropdown.Toggle>
      <Dropdown.Menu>
        {loadExtraActionsModule()}
        <Link
          to={
            logModule === 'user'
              ? `/logs?user_id=${id}`
              : `/logs?model_type=${logModule}&model_id=${id}`
          }>
          {' '}
          <Dropdown.Item as="button"> Logs </Dropdown.Item>
        </Link>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default ExtraActions;
