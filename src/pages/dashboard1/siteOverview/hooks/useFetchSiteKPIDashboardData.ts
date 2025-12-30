import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import moment from 'moment';
import apiDashboard from '../../../../helpers/api/dashboard';
import { DashboardKPIUdoseSiteFilterParams } from '../../../../types/dashboard/kpi';

export default function useFetchSiteKPIDashboardData() {
  const [startDate, setStartDate] = useState<Date | null>(
    moment().subtract(7, 'days').toDate()
  );
  const [endDate, setEndDate] = useState<Date | null>(new Date());

  const [creditType, setCreditType] = useState<string>();

  const getDashboardUdoseSiteKpis = () => {
    const params: DashboardKPIUdoseSiteFilterParams = {
      as_of_date_from: moment.utc(startDate).format('YYYY-MM-DD'),
      as_of_date_to: moment.utc(endDate).format('YYYY-MM-DD'),
    };

    if (creditType) {
      params.credit_type = creditType;
    }

    return apiDashboard.getDashboardUdoseSiteKpis(params);
  };

  const { data, isFetching, isError } = useQuery(
    ['dashboard-udose-site-kpi', { startDate, endDate, creditType }],
    getDashboardUdoseSiteKpis,
    {
      refetchOnWindowFocus: false,
    }
  );

  return {
    data,
    isFetching,
    isError,
    setStartDate,
    setEndDate,
    setCreditType,
    startDate,
    endDate,
    creditType,
  };
}
