import React from 'react';
import moment from 'moment';
import { formattedDatetime } from '../../../helpers';
import { UdoseAgSessionSummary } from '../../../types/udoseAgs/udoseAgs';
import commaSeperatedNumber from '../../../helpers/numberHelper';
import UdoseAgSessionSummaryStatus from './UdoseAgSessionSummaryStatus';

type Props = {
  data: UdoseAgSessionSummary;
};

const UdoseAgListSessionItem: React.FC<Props> = ({ data }) => {
  return (
    <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 box-wrapper session-summary-box flex-grow-1">
      <div className="d-flex flex-column align-items-start gap-2">
        <div className="d-flex justify-content-start align-items-center gap-2 fw-bold">
          <div>
            <i className="bx bx-calendar me-1" />
            <span>{formattedDatetime(data?.started_at)} </span>
          </div>
          <UdoseAgSessionSummaryStatus status={data.status} />
        </div>
        <span className="d-flex justify-content-start align-items-center fw-bold">
          <i className="bx bx-time me-1" />
          {data?.started_at && data?.ended_at
            ? `Ran for ${moment(data?.ended_at).diff(data?.started_at, 'hours')} hrs.`
            : `Ran for -`}
        </span>
      </div>
      <div className="d-flex jsutify-content-between align-items-center gap-2 flex-wrap">
        <div className="udoseag-summary summary-water-flow flex-grow-1">
          <h5 className="text-center m-0">
            {data?.water_flow > 0
              ? `${commaSeperatedNumber(data.water_flow)} L`
              : `0 L`}
          </h5>
          <p className="text-center m-0">Total Water Flow</p>
        </div>
        <div className="udoseag-summary summary-fertilizer-flow flex-grow-1">
          <h5 className="text-center m-0">
            {data?.fertiliser_flow > 0
              ? `${commaSeperatedNumber(data.fertiliser_flow)} L`
              : `0 L`}
          </h5>
          <p className="text-center m-0">Total Fertilizer Flow</p>
        </div>
      </div>
    </div>
  );
};

export default UdoseAgListSessionItem;
