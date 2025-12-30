import React from 'react';
import { Card } from 'react-bootstrap';
import PageTitle from '@uhub/components/PageTitle';
import { prepareDynamicUrl } from '@uhub/helpers';
import { useParams } from 'react-router-dom';
import { FILE_ADD, FOLDER_VIEW } from '../../constants/constant';
import { FileFormProps } from '../../types/Document';
import useReadFolder from '../../hooks/Folder/useReadFolder';
import FileForm from './FileForm';

const AddFile: React.FC = () => {
  const title: string = 'File';
  const { id } = useParams();
  const { data } = useReadFolder(id);

  const folderOptions = [{ value: data?.id, label: data?.name }];

  const defaultValues: FileFormProps = {
    folder_id: Number(id),
    name: null,
    file: null,
  };
  return (
    <>
      <PageTitle
        breadCrumbItems={[
          {
            label: `${title}`,
            path: prepareDynamicUrl(FOLDER_VIEW, id),
            active: false,
          },
          {
            label: `Add ${title}`,
            path: FILE_ADD,
            active: true,
          },
        ]}
        title={`Add ${title}`}
      />
      <Card>
        <Card.Body>
          {data && (
            <FileForm
              defaultValues={defaultValues}
              folderOptions={folderOptions}
            />
          )}
        </Card.Body>
      </Card>
    </>
  );
};

export default AddFile;
