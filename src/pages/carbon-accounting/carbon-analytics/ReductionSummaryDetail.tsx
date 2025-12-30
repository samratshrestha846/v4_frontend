import React from 'react';

import { CarbonEmissionReductionSummary } from '../../../types/carbon-accounting/carbonAccounting';
import CCEmissionUnit from '../components/CCEmissionUnit';
import commaSeperatedNumber from '../../../helpers/numberHelper';
import {
  DIGIT_AFTER_DECIMAL_IN_CARBON_CREDIT,
  DIGIT_AFTER_DECIMAL_IN_SUPPLEMENT_FEED,
  SUPPLEMENT_FEED_UNIT_ML,
} from '../../../constants/constants';
import { formattedShortDate } from '../../../helpers';
import { Verra } from '../../../assets/images';
import TrendAnalysis from '../../../components/TrendAnalysis';
import TruncateTextWithOverlayTooltip from '../../../components/TruncateTextWithOverlayTooltip';

type Props = {
  data: CarbonEmissionReductionSummary;
};

const ReductionSummaryDetail: React.FC<Props> = ({ data }) => {
  const trendAmount =
    Number(data.trend_values.total_actual_emission) > 0
      ? Math.round(
          ((Number(data.total_actual_emission) -
            Number(data.trend_values.total_actual_emission)) /
            Number(data.trend_values.total_actual_emission)) *
            100
        )
      : 0;

  return (
    <div className="carbon-accounting-summary-wrapper mt-3">
      <div className="carbon-analytics-summary">
        <div className="d-flex justify-content-start align-items-center gap-2 flex-nowrap">
          <p className="m-0 fw-semibold text-gray">Total Carbon Abatement : </p>
          <div className="d-flex justify-content-start align-items-center">
            <span className="text-secondary-color">
              {data.total_actual_emission
                ? commaSeperatedNumber(
                    Number(
                      data.total_actual_emission.toFixed(
                        DIGIT_AFTER_DECIMAL_IN_CARBON_CREDIT
                      )
                    )
                  )
                : 0}
            </span>
            <CCEmissionUnit wrapperClass="ms-half fw-semibold text-secondary-color" />
            <TrendAnalysis trendAmount={trendAmount} />
          </div>
        </div>
        <div className="d-flex justify-content-start align-items-center gap-2 flex-nowrap">
          <p className="m-0 fw-semibold text-gray">Feed Additive : </p>
          <div className="d-flex justify-content-start align-items-center gap-1 text-secondary-color">
            {data?.supplements?.length === 0 && <span>-</span>}

            {data?.supplements?.length === 1 &&
              data?.supplements?.map((item) => <span>{item.name}</span>)}

            {data?.supplements?.length > 1 &&
              data?.supplements?.map((item) => (
                <TruncateTextWithOverlayTooltip
                  text={item.name}
                  key={item.name}
                  endIndex={20}
                />
              ))}
          </div>
        </div>

        <div className="d-flex justify-content-start align-items-center gap-2 flex-nowrap">
          <p className="m-0 fw-semibold text-gray">Agolin Feed : </p>
          <span className="text-secondary-color">
            {data?.supplement_feed_in_ml
              ? `${commaSeperatedNumber(Number(data?.supplement_feed_in_ml?.toFixed(DIGIT_AFTER_DECIMAL_IN_SUPPLEMENT_FEED)))} ${SUPPLEMENT_FEED_UNIT_ML}`
              : `0 ${SUPPLEMENT_FEED_UNIT_ML}`}
          </span>
        </div>

        <div className="d-flex justify-content-start align-items-center gap-2 flex-nowrap">
          <p className="m-0 fw-semibold text-gray">Period : </p>
          <span className="text-secondary-color">
            {`${formattedShortDate(data.date_from)} - ${formattedShortDate(data.date_to)}`}
          </span>
        </div>

        <div className="d-flex justify-content-start align-items-center gap-2 flex-nowrap mb-2">
          <p className="m-0 fw-semibold text-gray">Method : </p>
          <img src={Verra} alt="VERRA" />
        </div>
      </div>
      <div className="d-flex flex-column align-items-start justify-content-center gap-2 flex-nowrap mt-2">
        <div className="d-flex justify-content-start align-items-center gap-2 flex-nowrap">
          <p className="m-0 fw-semibold text-gray">Customers : </p>
          <span className="text-secondary-color">
            {data?.customer_count ?? 0}
          </span>
        </div>

        <div className="d-flex justify-content-start align-items-center gap-2 flex-nowrap">
          <p className="m-0 fw-semibold text-gray">Properties : </p>
          <span className="text-secondary-color">
            {data?.customer_property_count ?? 0}
          </span>
        </div>

        <div className="d-flex justify-content-start align-items-center gap-2 flex-nowrap">
          <p className="m-0 fw-semibold text-gray">Sites : </p>
          <span className="text-secondary-color">{data?.site_count ?? 0}</span>
        </div>
      </div>
    </div>
  );
};

export default ReductionSummaryDetail;
