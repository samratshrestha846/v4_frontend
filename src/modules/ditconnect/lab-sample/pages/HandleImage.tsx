import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import heic2any from 'heic2any';
import { can } from '@uhub/helpers/checkPermission';
import Image from '@uhub/components/Image';

import HttpApi from '../../Http/http';
import { LAB_SAMPLE_PHOTO, UPDATE_LAB_SAMPLE } from '../constants/constant';
import { LabSamplePhotoResponse } from '../types/LabSample';

type Props = {
  images: LabSamplePhotoResponse[];
};

const HandleImage: React.FC<Props> = ({ images }) => {
  const [uploadedImages, setUploadedImages] = useState<
    LabSamplePhotoResponse[]
  >([]);
  const canUpdate = can(UPDATE_LAB_SAMPLE);

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
      images?.map(async (file: LabSamplePhotoResponse) => {
        if (file.image_path.endsWith('.heic')) {
          const jpegUrl = await convertHEICToJPEG(file.image_path);
          return { ...file, image_path: jpegUrl };
        }
        return file;
      })
    );
    setUploadedImages(files);
  };

  useEffect(() => {
    convertHEICImages();
  }, [images]);

  const handleRemove = async (id: number) => {
    try {
      const httpApi = new HttpApi();
      const response = await httpApi.delete(`${LAB_SAMPLE_PHOTO}/${id}`);
      if (response.data && response.data.status === 'ok') {
        const filteredImages = uploadedImages?.filter((item) => item.id !== id);
        setUploadedImages(filteredImages);
        toast.success('Image Removed Successfully.');
      }
    } catch (error) {
      toast.error('Oops something went wrong. Please try again.');
    }
  };

  return (
    <div className="d-flex align-items-center gap-2 py-2">
      {uploadedImages?.map((item: any) => (
        <div key={item.id} className="uploaded-image-wrapper">
          <Link to={item.image_path} target="_blank">
            <Image
              src={item.image_path}
              alt="Attachment"
              className="uploaded-image img-cover p-1 border border-1 rounded-2"
              width={150}
              height={150}
            />
          </Link>
          {canUpdate && (
            <Button
              variant="danger"
              onClick={() => handleRemove(item.id)}
              className="uploaded-img-remove-btn btn btn-sm p-1 m-0"
              type="button">
              Remove
            </Button>
          )}
        </div>
      ))}
    </div>
  );
};

export default HandleImage;
