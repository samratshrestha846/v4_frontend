import React from 'react';
import { Col, Row } from 'react-bootstrap';
import useAuth from '../../../../hooks/useAuth';
import useReadUser from '../../hooks/useReadUser';
import UserProperties from '../../components/UserProperties';
import { notEmptyKey } from '../../../../helpers';
import UserInfo from '../../components/UserInfo';
import ErrorMessage from '../../../../components/ErrorMessage';
import NotificationSettings from './notifications/NotificationSettings';
import MFASettings from './mfa/MFASettings';
import AddViewNotes from './view-notes/AddViewNotes';
import CustomLoader from '../../../../components/CustomLoader';
import { APICore } from '../../../../helpers/api/apiCore';

const MyAccount: React.FC = () => {
  const { isSuperAdmin, isAdmin, isStationManager } = useAuth();
  const api = new APICore();
  const { id: loggedInUserId } = api.getLoggedInUser();
  const { data: user, isFetching, isError } = useReadUser(loggedInUserId);

  if (isError) {
    return <ErrorMessage />;
  }

  if (isFetching) {
    return <CustomLoader />;
  }

  return (
    <div className="mt-2 my-account">
      <Row>
        <Col md={4}>
          <UserInfo user={user} />

          {isStationManager && <UserProperties user={user} />}
        </Col>

        <Col md={8}>
          {notEmptyKey(user) && (
            <>
              {(isSuperAdmin || isAdmin) && (
                <Col>
                  <AddViewNotes modelType="user" userId={user!.id} />
                </Col>
              )}
              <Row>
                {user && (
                  <Col md={6}>
                    <NotificationSettings user={user} />
                  </Col>
                )}

                <Col md={6}>
                  <MFASettings user={user} />
                </Col>
              </Row>
            </>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default MyAccount;
