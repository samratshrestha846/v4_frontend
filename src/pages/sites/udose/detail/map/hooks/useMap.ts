import { useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { SiteWithLocation } from '../../../../../../types/siteMap';

export default function useMap() {
  const [isCopied, setIsCopied] = useState(false);
  const stateSite = useSelector((state: any) => state.Site);
  const { siteDetail } = stateSite;

  const siteWithLocation: SiteWithLocation[] = [
    {
      id: siteDetail.id,
      name: siteDetail.name,
      site_number: siteDetail.site_number,
      location: {
        latitude: siteDetail?.latitude,
        longitude: siteDetail?.longitude,
      },
    },
  ];

  const handleSucces = () => {
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  const copyCoordinate = () => {
    const coordinates = `${siteDetail?.latitude}, ${siteDetail?.longitude}`;
    if (navigator.clipboard) {
      navigator.clipboard
        .writeText(coordinates)
        .then(handleSucces)
        .catch(() => {
          toast.error('Oops something sent wrong! Please try againa later.');
        });
    } else {
      try {
        document.execCommand('copy', true, coordinates);
        handleSucces();
      } catch (error) {
        toast.error('Oops something sent wrong! Please try againa later.');
      }
    }
  };

  return { siteDetail, copyCoordinate, isCopied, siteWithLocation };
}
