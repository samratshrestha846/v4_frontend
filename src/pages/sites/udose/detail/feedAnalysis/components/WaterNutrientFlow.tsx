import React, { FC } from 'react';
import { numberFormat } from '../../../../../../helpers/api/utils';
import { SumTotalData } from '../../../../../../types/udose/supplementFeedAnalysis';

type Props = {
  sumTotal: SumTotalData;
};

const WaterNutrientFlowInfo: FC<Props> = ({ sumTotal }) => {
  const averageFlow = (totalFlow: number) => {
    return totalFlow && sumTotal?.total_records
      ? numberFormat(totalFlow / sumTotal.total_records)
      : '';
  };

  return (
    <div className="water-nutrient-summary py-3">
      <div className="d-flex flex-column justify-content-start gap-4">
        <div className="water-flow">
          <h5 className="text-primary-color mt-0 mb-2 font-16">Water Flow</h5>
          <div className="">
            <div className="d-flex gap-2">
              <div className="flex-shrink-0">
                <div className="avatar-sm rounded">
                  <span className="avatar-title bg-info-lighten h3 my-0 text-info rounded">
                    <i className="mdi mdi-water" />
                  </span>
                </div>
              </div>
              <div className="d-flex justify-content-between align-items-center gap-3 flex-grow-1">
                <div>
                  <h5 className="mt-0 mb-1 text-secondary-color text-nowrap font-16">
                    {numberFormat(sumTotal.water_flow)} L
                  </h5>
                  <p className="mb-0 fw-semibold text-nowrap font-16">
                    Total Flow
                  </p>
                </div>
                <div>
                  <h5 className="mt-0 mb-1 text-secondary-color text-nowrap font-16">
                    {averageFlow(sumTotal.water_flow)} L
                  </h5>
                  <p className="mb-0 fw-semibold text-nowrap">Daily Average</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="nutrient-flow">
          <h5 className="text-primary-color mt-0 mb-2 font-16">
            Nutrient Dosed
          </h5>
          <div className=" ">
            <div className="d-flex gap-2">
              <div className="flex-shrink-0">
                <div className="avatar-sm rounded">
                  <span className="avatar-title bg-warning-lighten h3 my-0 text-warning rounded">
                    <i className="mdi mdi-water" />
                  </span>
                </div>
              </div>
              <div className="d-flex justify-content-between align-items-center gap-3 flex-grow-1">
                <div>
                  <h5 className="mt-0 mb-1 text-secondary-color text-nowrap font-16">
                    {numberFormat(sumTotal.nutrient_flow)} mL
                  </h5>
                  <p className="mb-0 fw-semibold text-nowrap">Total Dosed</p>
                </div>

                <div>
                  <h5 className="mt-0 mb-1 text-secondary-color text-nowrap font-16">
                    {averageFlow(sumTotal.nutrient_flow)} mL
                  </h5>
                  <p className="mb-0 fw-semibold text-nowrap">Daily Average</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WaterNutrientFlowInfo;
