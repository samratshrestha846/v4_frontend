import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import ubot from '../../../../helpers/api/ubot';

export default function useReadUbotSite() {
  const { id } = useParams();

  const getUbotSiteById = () => {
    return ubot.getUbotSiteById(id);
  };

  const { data, isFetching, isFetched, isError, isSuccess } = useQuery({
    queryKey: ['read-ubot-site', id],
    queryFn: getUbotSiteById,
    refetchOnWindowFocus: false,
    enabled: !!id,
  });

  return {
    data,
    isFetching,
    isFetched,
    isError,
    isSuccess,
  };
}
