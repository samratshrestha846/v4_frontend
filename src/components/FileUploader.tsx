/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/anchor-is-valid */
// @flow
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, OverlayTrigger, Tooltip } from 'react-bootstrap';
import Dropzone from 'react-dropzone';
import FILE_SIZE_UNITS from '../constants/fileSizeUnitsConstants';

type FileUploaderProps = {
  onFileUpload?: (files: any) => void;
  showPreview?: boolean;
  dropMessage?: string;
};

const FileUploader: React.FC<FileUploaderProps> = ({
  showPreview = true,
  onFileUpload,
  dropMessage,
  ...props
}) => {
  const [selectedFiles, setSelectedFiles] = useState<any[]>([]);
  /**
   * Handled the accepted files and shows the preview
   */
  const handleAcceptedFiles = (files: any[]) => {
    let allFiles = files;

    if (showPreview) {
      files?.map((file) =>
        Object.assign(file, {
          preview:
            file.type.split('/')[0] === 'image'
              ? URL.createObjectURL(file)
              : null,
          formattedSize: formatBytes(file.size),
        })
      );

      allFiles = selectedFiles;
      allFiles.push(...files);
      setSelectedFiles(allFiles);
    }

    if (onFileUpload) onFileUpload(allFiles);
  };

  /**
   * Formats the size
   */
  const formatBytes = (bytes: number, decimals = 2) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / k ** i).toFixed(dm))} ${FILE_SIZE_UNITS[i]}`;
  };

  /*
   * Removes the selected file
   */
  const removeFile = (file: any) => {
    const newFiles = [...selectedFiles];
    newFiles.splice(newFiles.indexOf(file), 1);
    setSelectedFiles(newFiles);
  };

  return (
    <>
      <Dropzone
        {...props}
        onDrop={(acceptedFiles) => handleAcceptedFiles(acceptedFiles)}>
        {({ getRootProps, getInputProps }) => (
          <div className="dropzone my-1">
            <div className="dz-message needsclick m-0" {...getRootProps()}>
              <input {...getInputProps()} />
              <i className="bx bx-cloud-upload text-muted dripicons-cloud-upload font-20" />
              <h5 className="text-muted fw-medium">
                {dropMessage ?? 'Drop files here or click to upload.'}
              </h5>
            </div>
          </div>
        )}
      </Dropzone>

      {showPreview && selectedFiles?.length > 0 && (
        <div className="dropzone-previews mt-3" id="uploadPreviewTemplate">
          {selectedFiles?.map((f, i) => (
            // eslint-disable-next-line react/no-array-index-key
            <Card className="mt-1 mb-0 shadow-none border" key={`${i}-file`}>
              <div className="p-2 d-flex justify-content-between align-items-center gap-1">
                <div className="d-flex justif-content-start align-items-center gap-1">
                  {f.preview && (
                    <div>
                      <img
                        data-dz-thumbnail=""
                        className="avatar-sm rounded"
                        alt={f.name}
                        src={f.preview}
                      />
                    </div>
                  )}
                  {!f.preview && (
                    <div className="avatar-sm">
                      <span className="avatar-title bg-primary rounded">
                        {f.type.split('/')[1]}
                      </span>
                    </div>
                  )}
                  <div>
                    <p className="m-0 text-truncate">{f.name}</p>
                    <p className="mb-0 text-muted">{f.formattedSize}</p>
                  </div>
                </div>
                <Link
                  to="#"
                  className="btn btn-link btn-lg text-muted shadow-none p-0"
                  onClick={() => removeFile(i)}>
                  <OverlayTrigger
                    placement="bottom"
                    overlay={<Tooltip id="Tooltip"> Remove File </Tooltip>}>
                    <i className="bx bx-trash text-danger" />
                  </OverlayTrigger>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      )}
    </>
  );
};

export default FileUploader;
