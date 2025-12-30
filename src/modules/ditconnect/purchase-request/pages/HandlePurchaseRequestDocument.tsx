import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { toast } from 'react-toastify';
import heic2any from 'heic2any';
import classNames from 'classnames';
import { can } from '@uhub/helpers/checkPermission';
import Loader from '@uhub/components/Loader';
import { findFileIconFromExtension } from '@uhub/helpers';
import HttpApi from '../../Http/http';
import {
  PURCHASE_REQUEST_FILE,
  UPDATE_PURCHASE_REQUEST,
} from '../constants/constant';
import { PurchaseRequestDocumentResponse } from '../types/PurchaseRequest';

type Props = {
  wrapperClass?: string;
  title?: string;
  titleClass?: string;
  documents: PurchaseRequestDocumentResponse[];
};

const HandlePurchaseRequestDocument: React.FC<Props> = ({
  wrapperClass,
  title,
  titleClass,
  documents,
}) => {
  const [uploadedFiles, setUploadedFiles] = useState<
    PurchaseRequestDocumentResponse[]
  >([]);

  const [loading, setLoading] = useState(false);

  const canUpdate = can(UPDATE_PURCHASE_REQUEST);

  const convertHEICToJPEG = async (fileUrl: string) => {
    const response = await fetch(fileUrl);
    const blob = await response.blob();
    const convertedBlob = await heic2any({
      blob,
      toType: 'image/jpeg',
    });
    return URL.createObjectURL(convertedBlob as Blob);
  };

  const convertHEICImages = async () => {
    const files = await Promise.all(
      documents?.map(async (file: PurchaseRequestDocumentResponse) => {
        if (file.file_url.endsWith('.heic')) {
          const jpegUrl = await convertHEICToJPEG(file.file_url);
          return { ...file, file_url: jpegUrl };
        }
        return file;
      })
    );
    setUploadedFiles(files);
  };

  useEffect(() => {
    convertHEICImages();
  }, [documents]);

  const handleRemove = async (id: number) => {
    try {
      const httpApi = new HttpApi();

      setLoading(true);
      const response = await httpApi.delete(`${PURCHASE_REQUEST_FILE}/${id}`);
      if (response.data && response.data.status === 'ok') {
        const filteredImages = uploadedFiles?.filter((item) => item.id !== id);
        setUploadedFiles(filteredImages);
        toast.success('File Removed Successfully.');
        setLoading(false);
      }
    } catch (error) {
      toast.error('Oops something went wrong. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className={wrapperClass ?? 'mt-3'}>
      {loading && <Loader />}

      {title && (
        <h5
          className={classNames(titleClass ?? 'text-uppercase text-soft-gray')}>
          {title}
        </h5>
      )}
      <div className="d-flex flex-column align-items-between gap-2 py-2">
        {uploadedFiles?.length > 0 ? (
          uploadedFiles?.map((item: any) => (
            <div
              key={item.id}
              className="d-flex justify-content-between align-items-center flex-nowrap gap-1 p-1 bg-light rounded">
              <Link
                to={item.file_url}
                target="_blank"
                className="d-flex justify-content-start align-items-center flex-nowrap gap-1 w-80">
                <i
                  className={classNames(
                    'fs-2',
                    findFileIconFromExtension(item.file.split('.').pop())
                  )}
                />
                <p className="text-truncate-short m-0">
                  {item.file.split('/').pop()}
                </p>
              </Link>
              {canUpdate && (
                <OverlayTrigger
                  placement="bottom"
                  overlay={<Tooltip id="remove-file"> Remove File</Tooltip>}>
                  <Button
                    variant=""
                    onClick={() => handleRemove(item.id)}
                    className="btn btn-sm p-1 m-0 btn-outline-danger"
                    type="button">
                    <i className="bx bx-trash" />
                  </Button>
                </OverlayTrigger>
              )}
            </div>
          ))
        ) : (
          <p className="m-0"> No files available</p>
        )}
      </div>
    </div>
  );
};

export default HandlePurchaseRequestDocument;
