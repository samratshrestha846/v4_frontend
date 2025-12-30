import { useQuery } from '@tanstack/react-query';
import udose from '../../../../../../../helpers/api/udose';

export default function useReadSiteFollowup(
  siteId: number,
  followUpId: number
) {
  const getSiteFollowUpById = () => {
    return udose.getUdoseSitesFollowUpById(siteId, followUpId);
  };

  const { data, isFetching, isFetched, isError } = useQuery({
    queryKey: ['read-site-followup', followUpId],
    queryFn: getSiteFollowUpById,
    refetchOnWindowFocus: false,
    enabled: !!followUpId,
  });

  return {
    data,
    isFetching,
    isFetched,
    isError,
  };
}
