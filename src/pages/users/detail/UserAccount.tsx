import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import useReadUser from '../hooks/useReadUser';
import UserProperties from '../components/UserProperties';
import ErrorMessage from '../../../components/ErrorMessage';
import CustomLoader from '../../../components/CustomLoader';
import UserInfo from '../components/UserInfo';
import AddViewNotes from '../settings/my-account/view-notes/AddViewNotes';
import NotificationSettings from '../settings/my-account/notifications/NotificationSettings';
import MFASettings from '../settings/my-account/mfa/MFASettings';
import UserPermission from '../explicitPermissions/components/UserPermission';
import useModalFeature from '../../../hooks/common/useModalFeature';
import { APICore } from '../../../helpers/api/apiCore';

const UserAccount: React.FC = () => {
  const { id } = useParams();
  const { isSuperAdmin, isAdmin } = useAuth();
  const api = new APICore();
  const loggedInUser = api.getLoggedInUser();
  const { data: user, isFetching, isError, refetch } = useReadUser(Number(id));

  const { showModal, setShowModal } = useModalFeature();

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
          {isSuperAdmin && loggedInUser?.id !== user?.id && (
            <UserPermission
              showModal={showModal}
              user={user}
              setShowModal={setShowModal}
              refetch={refetch}
            />
          )}
          <UserProperties user={user} isTitleInsideCard />
        </Col>

        <Col md={8}>
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
        </Col>
      </Row>
    </div>
  );
};

export default UserAccount;
