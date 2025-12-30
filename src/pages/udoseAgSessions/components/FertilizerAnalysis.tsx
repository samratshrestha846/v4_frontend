import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { SessionSummaryFertilizerAnalysis } from '../../../types/udoseAgs/udoseAgs';
import CustomDataTable from '../../../components/CustomDataTable';
import CustomLoader from '../../../components/CustomLoader';
import ErrorMessage from '../../../components/ErrorMessage';
import usePrepareFertilizerAnalysisCompositionTable from '../hooks/usePrepareFertilizerAnalysisCompositionTable';
import commaSeperatedNumber from '../../../helpers/numberHelper';

type Props = {
  fertilizerAnalysis?: SessionSummaryFertilizerAnalysis;
  isFetchingFertilizerAnalysis: boolean;
  isErrorFertilizerAnalysis: boolean;
};

const FertilizerAnalysis: React.FC<Props> = ({
  fertilizerAnalysis,
  isFetchingFertilizerAnalysis,
  isErrorFertilizerAnalysis,
}) => {
  const { loading, columns, data } =
    usePrepareFertilizerAnalysisCompositionTable(fertilizerAnalysis);

  if (isFetchingFertilizerAnalysis || loading) {
    return <CustomLoader />;
  }

  if (isErrorFertilizerAnalysis) {
    return <ErrorMessage />;
  }

  return (
    <Card>
      <Card.Header as="h5" className="text-primary">
        Fertilizer Analysis
      </Card.Header>
      <Card.Body className="pt-1">
        <Row>
          <Col xs={6} sm={6} md={6}>
            <p className="text-sm">
              <span className="fw-bold">Fertilizer: </span>
              {fertilizerAnalysis?.fertilizer_name ?? '-'}
            </p>
          </Col>
          <Col xs={6} sm={6} md={6}>
            <p className="text-sm">
              <span className="fw-bold">Per Hectare: </span>
              {fertilizerAnalysis?.hectare?.fertilizer_per_hectare
                ? `${commaSeperatedNumber(
                    fertilizerAnalysis?.hectare?.fertilizer_per_hectare
                  )} g`
                : '-'}
            </p>
          </Col>
        </Row>
        <Row>
          <Col xs={6} sm={6} md={6}>
            <p className="text-sm">
              <span className="fw-bold">Total Consumption: </span>
              {fertilizerAnalysis?.fertiliser_flow
                ? `${commaSeperatedNumber(fertilizerAnalysis?.fertiliser_flow)} L`
                : '-'}
            </p>
          </Col>
          <Col xs={6} sm={6} md={6}>
            <p className="text-sm">
              <span className="fw-bold">Per Plant: </span>
              {fertilizerAnalysis?.plant?.fertilizer_per_plant
                ? `${commaSeperatedNumber(
                    fertilizerAnalysis?.plant?.fertilizer_per_plant
                  )} g`
                : '-'}
            </p>
          </Col>
        </Row>
        <CustomDataTable columns={columns} data={data} />
      </Card.Body>
    </Card>
  );
};

export default FertilizerAnalysis;
