import React from 'react';
import { Card } from 'react-bootstrap';
import PageTitle from '@uhub/components/PageTitle';
import { FOLDER_ADD, FOLDER_LIST } from '../../constants/constant';
import FolderForm from './FolderForm';
import { FolderFormProps } from '../../types/Document';

const AddFolder: React.FC = () => {
  const title: string = 'Folder';
  const defaultValues: FolderFormProps = {
    name: null,
  };
  return (
    <>
      <PageTitle
        breadCrumbItems={[
          { label: `${title}`, path: FOLDER_LIST, active: false },
          {
            label: `Add ${title}`,
            path: FOLDER_ADD,
            active: true,
          },
        ]}
        title={`Add ${title}`}
      />
      <Card>
        <Card.Body>
          <FolderForm defaultValues={defaultValues} />
        </Card.Body>
      </Card>
    </>
  );
};

export default AddFolder;
