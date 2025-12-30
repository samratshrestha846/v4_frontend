import React from 'react';
import { CarbonTopPerformerCustomer } from '../../../../types/carbon-accounting/carbonAccounting';
import TopGainerCard from '../../components/TopGainerCard';

type Props = {
  data?: CarbonTopPerformerCustomer[];
};

const CustomerTopGainerList: React.FC<Props> = ({ data }) => {
  return (
    <div className="top-gainers">
      <h4 className="text-gray m-0 mb-2">Top Gainers</h4>
      <div className="top-gainer-card-wrapper">
        {data?.map((item: CarbonTopPerformerCustomer) => (
          <TopGainerCard
            key={item.customer_id}
            amount={Number(item.total_actual_emission)}
            title={item.customer?.business_name}
            trend={
              Number(item.trendItem.total_actual_emission) > 0
                ? Math.round(
                    ((Number(item.total_actual_emission) -
                      Number(item.trendItem.total_actual_emission)) /
                      Number(item.trendItem.total_actual_emission)) *
                      100
                  )
                : 0
            }
          />
        ))}
      </div>
    </div>
  );
};

export default CustomerTopGainerList;
