import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import { DitAuthUser } from '../types/user/user';
import { APICore } from '../helpers/api/apiCore';
import { refreshProfilePictureUrl } from '../redux/actions';

export default function useRefreshProfilePictureUrl() {
  const api = new APICore();
  const loggedInUser: DitAuthUser = api.getLoggedInUser();

  const dispatch = useDispatch();

  useEffect(() => {
    refreshProfilePicture();
  }, []);

  const computeExpirationDateDiff = (picUrl: string) => {
    const urlParams = new URLSearchParams(picUrl);
    const amzDate = urlParams.get('X-Amz-Date');
    const expiresInSeconds = urlParams.get('X-Amz-Expires');
    if (amzDate && expiresInSeconds) {
      const year = parseInt(amzDate.substring(0, 4), 10);
      const month = parseInt(amzDate.substring(4, 6), 10) - 1; // Months are 0-indexed in JavaScript
      const day = parseInt(amzDate.substring(6, 8), 10);
      const hour = parseInt(amzDate.substring(9, 11), 10);
      const minute = parseInt(amzDate.substring(11, 13), 10);
      const second = parseInt(amzDate.substring(13, 15), 10);

      const expirationDate = new Date(
        Date.UTC(year, month, day, hour, minute, second)
      );
      expirationDate.setSeconds(parseInt(expiresInSeconds, 10));

      const diffInMinutes = moment(expirationDate).diff(
        moment(new Date()),
        'minutes'
      );
      return diffInMinutes;
    }
    return 0;
  };

  const refreshProfilePicture = () => {
    const profilePicUrl = loggedInUser?.profile_picture_url;
    const profilePic = loggedInUser?.profile_picture;
    if (profilePicUrl) {
      const diffInMinutes = computeExpirationDateDiff(profilePicUrl);
      if (diffInMinutes <= 0) {
        dispatch(refreshProfilePictureUrl({ file_path: profilePic }));
      }
    }
  };
  return {};
}
