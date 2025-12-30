import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { siteDetailFetchStart } from '../../../../../redux/actions';

export default function useUdoseDetail() {
  const { id } = useParams();

  const dispatch = useDispatch();
  const stateSite = useSelector((state: any) => state.Site);
  const { siteDetail: udoseDetail, loading } = stateSite;

  useEffect(() => {
    if (id) {
      dispatch(siteDetailFetchStart(parseInt(id, 10), {}));
    }
  }, []);

  return {
    udoseDetail,
    loading,
  };
}
