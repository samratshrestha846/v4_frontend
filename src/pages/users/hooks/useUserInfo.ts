import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { DitAuthUser, User } from '../../../types/user/user';
import { APICore } from '../../../helpers/api/apiCore';
import { updateProfilePicture } from '../../../redux/actions';
import PROFILE_PICTURE_ALLOWED_FILE_EXTENSIONS from '../../../constants/profilePictureAllowedFileExtension';
import { formatFromNow, formattedDatetime } from '../../../helpers';

type UpdatedAt = {
  userUpdatedDate: string | undefined;
  userUpdatedDateFromNow: string | undefined;
};

export default function useUserInfo(user: User | undefined) {
  const api = new APICore();

  const [updatedAt, setUpdatedAt] = useState<UpdatedAt>({
    userUpdatedDate: undefined,
    userUpdatedDateFromNow: undefined,
  });
  const [showModal, setShowModal] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const loggedInUser: DitAuthUser = api.getLoggedInUser();

  const dispatch = useDispatch();

  const updatedDate: {
    userUpdatedDate: string;
    userUpdatedDateFromNow: string;
  } = {
    userUpdatedDate: '',
    userUpdatedDateFromNow: '',
  };

  const { profilePictureUrl, loading: pictureLoading } = useSelector(
    (state: any) => ({
      profilePictureUrl: state?.Auth?.user?.profile_picture_url,
      loading: state?.Auth?.loading,
    })
  );

  const chooseProfileImage = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: any) => {
    event.preventDefault();
    const selectedFile = event.target.files[0];
    if (!selectedFile) {
      toast.warning('File not selected!');
      return;
    }
    const originalExtension = selectedFile.name.split('.').pop();

    if (!PROFILE_PICTURE_ALLOWED_FILE_EXTENSIONS.includes(originalExtension)) {
      toast.warning('Only .jpg, .jpeg, .png, .webp files are allowed.');
      return;
    }
    const formData = { profile_picture: selectedFile };
    dispatch(updateProfilePicture(formData));
    toast.success('Profile Picture updated successfully.');
  };

  useEffect(() => {
    if (JSON.stringify(user) !== JSON.stringify({})) {
      const newUpdatedDate =
        loggedInUser?.id === user?.id
          ? loggedInUser?.updated_at
          : user?.updated_at || user?.created_at;
      updatedDate.userUpdatedDate = formattedDatetime(newUpdatedDate);
      updatedDate.userUpdatedDateFromNow = formatFromNow(newUpdatedDate);
      setUpdatedAt(updatedDate);
    }
  }, [user, profilePictureUrl]);

  return {
    profilePictureUrl,
    pictureLoading,
    updatedAt,
    setUpdatedAt,
    showModal,
    setShowModal,
    chooseProfileImage,
    handleFileChange,
    loggedInUser,
    fileInputRef,
  };
}
