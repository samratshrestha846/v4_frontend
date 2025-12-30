import React, { FC } from 'react';
import { ProfilePic } from '../../../assets/images';
import useRefreshProfilePictureUrl from '../../../hooks/useRefreshProfilePictureUrl';

type Props = {
  url?: string;
  alt?: string;
  className?: string;
};
const ProfilePicture: FC<Props> = ({ url, alt, className }) => {
  useRefreshProfilePictureUrl();
  return (
    <img
      src={url || ProfilePic}
      className={className || 'rounded-circle'}
      alt={alt || 'user'}
      style={{ height: '100%', width: '100%' }}
    />
  );
};

export default ProfilePicture;
