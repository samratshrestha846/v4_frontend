import React, { FC } from 'react';
import { Col, Row } from 'react-bootstrap';
import NutrientInfo from './NutrientInfo';
import DoseInfo from './DoseInfo';
import AvergaeFlow from './AverageFlow';
import WaterNutrientFlowBarGraph from '../graphs/WaterNutrientFlowBarGraph';
import useCalculateAverageFlow from '../hooks/useCalculateAverageFlow';
import { Site } from '../../../../../types/site';

type Props = {
  siteDetail: Site;
};

const Home: FC<Props> = ({ siteDetail }) => {
  const { averageWaterFlow, averageNutrientFlow } = useCalculateAverageFlow(
    siteDetail!.udose_record_twenty_four_hour
  );

  return (
    <Row className="site-info-wrapper">
      <Col xl={4} sm={12}>
        <div className="box-wrapper mt-1">
          <NutrientInfo
            settingRecord={siteDetail.setting}
            fourHourRecord={siteDetail.last_udose_record_four_hour}
            siteSupplement={siteDetail.site_supplement}
          />
          <DoseInfo settingRecord={siteDetail.setting} />
        </div>
      </Col>
      <Col xl={8} sm={12}>
        <AvergaeFlow
          averageWaterFlow={averageWaterFlow}
          averageNutrientFlow={averageNutrientFlow}
          waterFlowCheck={siteDetail!.water_flow_check}
        />
        <WaterNutrientFlowBarGraph
          records={siteDetail?.udose_record_twenty_four_hour}
        />
      </Col>
    </Row>
  );
};
export default Home;
