import React from 'react';
import { Col, Row, Card } from 'react-bootstrap';
import Filter from './Filter';
import Tabular from './Tabular';
import * as constants from './constants/FilterConstant';
import PerHeadConsumption from './components/PerHeadConsumption';
import WaterNutrientFlowGraph from './components/WaterNutrientFlowGraph';
import useFeedAnalysis from './hooks/useFeedAnalysis';
import WaterNutrientFlowInfo from './components/WaterNutrientFlow';
import CustomLoader from '../../../../../components/CustomLoader';
import { capitalizeFirstLetter } from '../../../../../helpers';
import ErrorMessage from '../../../../../components/ErrorMessage';

const FeedAnalysis: React.FC = () => {
  const {
    data,
    isFetching,
    isError,
    breakdownAs,
    setBreakdownAs,
    getAeToDseEquivalentMessage,
    breakdownNumberLabel,
    breakdownNumber,
    setBreakdownNumber,
    duration,
    setDuration,
    calculate,
  } = useFeedAnalysis();

  if (isFetching) {
    return <CustomLoader />;
  }

  if (isError) {
    return (
      <ErrorMessage message="There was some error while processing your request." />
    );
  }

  return (
    <div className=" mt-2">
      <h5 className="text-primary-color mt-0 mb-2 font-16">
        {data?.records?.map(
          (item, key) =>
            `${item?.supplement_name}${data!.records.length - 1 > key && data!.records.length !== 1 ? ' + ' : ''}`
        )}
      </h5>
      <Card className="box-shadow-custom">
        <Card.Body>
          {data ? (
            <Filter
              setBreakdownAs={setBreakdownAs}
              breakdownAs={breakdownAs}
              duration={duration}
              setDuration={setDuration}
              breakdownNumber={breakdownNumber}
              setBreakdownNumber={setBreakdownNumber}
              breakdownNumberLabel={breakdownNumberLabel}
              calculate={calculate}
            />
          ) : null}

          {data ? (
            <>
              <small className="fst-italic">
                The breakdown is based on{' '}
                {constants.BREAKDOWN_TYPE_LABEL[data?.filters?.breakdown_as]}
                {': '}
                {data?.filters?.breakdown_number}{' '}
                {data?.filters?.breakdown_as === constants.BREAKDOWN_TYPE_ANIMAL
                  ? 'heads'
                  : 'litres per head per day'}{' '}
                for {constants.DURATION_LABEL[data?.filters?.duration]}
              </small>
              <br />
              <small className="fst-italic ml-2">
                {data?.filters?.breakdown_as ===
                  constants.BREAKDOWN_TYPE_WATER &&
                  getAeToDseEquivalentMessage()}
              </small>
            </>
          ) : null}
        </Card.Body>
      </Card>
      {data && (
        <div>
          <h5 className="text-primary-color mt-0 mb-2">
            Total Water and Nutrient Dosed -{' '}
            {capitalizeFirstLetter(
              constants.DURATION_LABEL[data?.filters?.duration]
            )}
          </h5>
          <Card className="feed-analysis-card pb-2 box-shadow-custom">
            <Card.Body>
              <Row>
                <Col md={4}>
                  <WaterNutrientFlowInfo sumTotal={data.sum_total} />
                </Col>
                <Col md={8} className="mt-1">
                  <WaterNutrientFlowGraph
                    records={data.sum_total?.records ?? []}
                  />
                </Col>
              </Row>
            </Card.Body>
          </Card>

          <PerHeadConsumption
            sumPerHead={data?.sum_per_head}
            avgPerHead={data?.avg_per_head}
            totalRecords={data?.sum_total.total_records}
            filters={data?.filters}
          />
          {data.records?.map((record) => (
            <Tabular
              key={record.supplement_name}
              breakdowns={record.breakdowns}
              supplement={record.supplement_name}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default FeedAnalysis;
