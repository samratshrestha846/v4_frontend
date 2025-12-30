import React from 'react';
import { Card } from 'react-bootstrap';
import PageTitle from '@uhub/components/PageTitle';
import { useParams } from 'react-router-dom';
import CustomLoader from '@uhub/components/CustomLoader';
import ErrorMessage from '@uhub/components/ErrorMessage';
import { prepareDynamicUrl } from '@uhub/helpers';
import {
  FOLDER_EDIT,
  FOLDER_LIST,
  FOLDER_VIEW,
} from '../../constants/constant';
import useReadFolder from '../../hooks/Folder/useReadFolder';
import FolderForm from './FolderForm';

const EditFolder: React.FC = () => {
  const { id } = useParams();

  const title: string = 'Folder';
  const { data, isFetching, isError } = useReadFolder(id);

  if (isFetching || !data) return <CustomLoader />;

  if (isError) return <ErrorMessage />;

  return (
    <>
      <PageTitle
        breadCrumbItems={[
          { label: `${title}`, path: FOLDER_LIST, active: false },
          {
            label: `View ${title}`,
            path: prepareDynamicUrl(FOLDER_VIEW, id),
            active: true,
          },
          {
            label: `Edit ${title}`,
            path: prepareDynamicUrl(FOLDER_EDIT, id),
            active: true,
          },
        ]}
        title={`Edit ${title}`}
      />
      <Card>
        <Card.Body>{data && <FolderForm defaultValues={data} />}</Card.Body>
      </Card>
    </>
  );
};

export default EditFolder;
