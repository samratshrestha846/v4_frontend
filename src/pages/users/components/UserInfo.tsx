/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { Card, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { User } from '../../../types/user/user';
import useUserInfo from '../hooks/useUserInfo';
import Loader from '../../../components/Loader';
import ProfilePicture from './ProfilePicture';
import profileImg from '../../../assets/images/users/user-logo.png';
import TruncateTextWithOverlayTooltip from '../../../components/TruncateTextWithOverlayTooltip';
import { formatFromNow } from '../../../helpers';

type Props = {
  user: User | undefined;
};

const UserInfo: React.FC<Props> = ({ user }) => {
  const {
    profilePictureUrl,
    pictureLoading,
    updatedAt,
    chooseProfileImage,
    handleFileChange,
    loggedInUser,
    fileInputRef,
  } = useUserInfo(user);
  return (
    <Card className="tilebox-one mb-2">
      <Card.Body className="p-3">
        {pictureLoading && <Loader />}
        <div className="d-flex flex-column gap-3 overflow-hidden">
          <div className="d-flex flex-column gap-1">
            <div className="d-flex justify-content-center align-items-center">
              <div
                className="avatar-lg my-profile-picture"
                style={{
                  position: 'relative',
                }}>
                <ProfilePicture
                  url={
                    loggedInUser?.id === user?.id
                      ? profilePictureUrl
                      : profileImg
                  }
                  alt=""
                  className="rounded-circle img-thumbnail border-primary mdi-box-shadow"
                />

                {loggedInUser?.id === user?.id && (
                  <OverlayTrigger
                    placement="right"
                    overlay={
                      <Tooltip id="change-photo"> Change photo </Tooltip>
                    }>
                    <button
                      className="photo-icon"
                      onClick={chooseProfileImage}
                      type="button">
                      <i className="bx bx-camera" />
                      <input
                        type="file"
                        ref={fileInputRef}
                        style={{ display: 'none' }}
                        onChange={(e) => handleFileChange(e)}
                      />
                    </button>
                  </OverlayTrigger>
                )}
              </div>
            </div>

            <div className="d-flex flex-column justify-content-center align-items-center">
              <h5 className="m-0 font-18 user-full-name">{`${user?.first_name} ${user?.last_name}`}</h5>
              <p className="m-0">
                {user?.roles?.map((role) => (
                  <span
                    key={role.id}
                    className="text-secondary-color fw-semibold">
                    {role.name}
                  </span>
                ))}
              </p>
              {loggedInUser?.id === user?.id && (
                <p className="m-0 font-10">
                  {`Active : `}
                  {formatFromNow(loggedInUser?.last_active)}
                </p>
              )}
            </div>
          </div>

          <div className="d-flex flex-column gap-2">
            <h5 className="m-0 text-uppercase text-slate-gray">User Info</h5>
            <div className="d-flex justify-content-start gap-1">
              <p className="m-0 fw-semibold user-info">Full Name :</p>
              <p className="m-0 text-secondary-color text-nowrap">
                <TruncateTextWithOverlayTooltip
                  text={`${user?.first_name} ${user?.last_name}`}
                  endIndex={18}
                  tooltipPlacement="bottom"
                />
              </p>
            </div>

            <div className="d-flex justify-content-start gap-1">
              <p className="m-0 fw-semibold user-info">Mobile :</p>
              <p className="m-0 text-secondary-color text-nowrap">
                {user?.phone_number ?? '-'}
              </p>
            </div>

            <div className="d-flex justify-content-start gap-1">
              <p className="m-0 fw-semibold user-info">Email :</p>
              <p className="m-0 text-secondary-color text-nowrap">
                {user?.email ? (
                  <TruncateTextWithOverlayTooltip
                    text={user.email}
                    endIndex={18}
                    tooltipPlacement="bottom"
                  />
                ) : (
                  '-'
                )}
              </p>
            </div>

            <div className="d-flex justify-content-start gap-1">
              <p className="m-0 fw-semibold user-info">Last Updated :</p>
              <p className="m-0 text-secondary-color text-nowrap">
                {updatedAt?.userUpdatedDate ?? '-'}
                <br />
                <small>({updatedAt?.userUpdatedDateFromNow ?? '-'})</small>
              </p>
            </div>
          </div>

          {user?.customer && (
            <div className="d-flex flex-column gap-2">
              <h5 className="m-0 text-uppercase text-slate-gray">
                Business Info
              </h5>
              <div className="d-flex justify-content-start gap-1">
                <p className="m-0 fw-semibold user-info ">Name :</p>
                <p className="m-0 text-secondary-color text-nowrap">
                  {`${user?.customer?.business_name}`}
                </p>
              </div>

              <div className="d-flex justify-content-start gap-1">
                <p className="m-0 fw-semibold user-info">Phone :</p>
                <p className="m-0 text-secondary-color text-nowrap">
                  {user?.customer?.phone ?? '-'}
                </p>
              </div>

              <div className="d-flex justify-content-start gap-1">
                <p className="m-0 ext-black-50 font-14 fw-bold user-info">
                  Email :
                </p>
                <p className="m-0 text-secondary-color text-nowrap">
                  {user?.customer?.email ?? '-'}
                </p>
              </div>
            </div>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};

export default UserInfo;
