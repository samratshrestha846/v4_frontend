import React from 'react';
import { Card } from 'react-bootstrap';
import PageTitle from '@uhub/components/PageTitle';
import { useParams } from 'react-router-dom';
import CustomLoader from '@uhub/components/CustomLoader';
import ErrorMessage from '@uhub/components/ErrorMessage';
import { prepareDynamicUrl } from '@uhub/helpers';
import { FILE_EDIT, FOLDER_VIEW } from '../../constants/constant';
import FileForm from './FileForm';
import useReadFile from '../../hooks/File/useReadFile';

const EditFile: React.FC = () => {
  const { id } = useParams();
  const title: string = 'File';
  const { data, isFetching, isError } = useReadFile(id);

  if (isFetching || !data) return <CustomLoader />;

  if (isError) return <ErrorMessage />;

  const folderOptions = [{ value: data.folder.id, label: data.folder.name }];

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
            label: `Edit ${title}`,
            path: FILE_EDIT,
            active: true,
          },
        ]}
        title={`Edit ${title}`}
      />
      <Card>
        <Card.Body>
          {data && (
            <FileForm
              defaultValues={{
                folder_id: data.folder.id,
                name: data.name,
                file_path: data.file_path,
              }}
              folderOptions={folderOptions}
            />
          )}
        </Card.Body>
      </Card>
    </>
  );
};

export default EditFile;
