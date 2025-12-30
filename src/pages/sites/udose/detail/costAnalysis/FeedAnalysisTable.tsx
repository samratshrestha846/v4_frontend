import React from 'react';
import { Card, Table } from 'react-bootstrap';
import { NutrientCostAnalysis } from '../../../../../types/udose/costAnalysis';

type Props = {
  costAnalysisData: NutrientCostAnalysis | undefined;
};

const FeedAnalysisTable: React.FC<Props> = ({ costAnalysisData }) => {
  if (!costAnalysisData) return null;

  const { supplementName } = costAnalysisData;

  return (
    <Card className="tilebox-one box-shadow">
      <Card.Header
        as="h4"
        className="text-primary-color border-0 bg-ghost-white">
        Feed Analysis
      </Card.Header>
      <Card.Body>
        <Table responsive>
          <tbody>
            <tr className="h5">
              <td className="p-2 text-secondary-color">{supplementName}</td>
              <td className="p-2 text-end">g/Head/Day</td>
            </tr>
            {costAnalysisData?.breakdowns &&
              Object.entries(costAnalysisData?.breakdowns).map(
                ([key, value]) => (
                  <tr key={key}>
                    <td className="p-2 text-capitalize">
                      <i
                        className={`bx bxs-square text-${key.replace(
                          /_/g,
                          '-'
                        )} me-1`}
                      />
                      {key.replace(/_/g, ' ')}
                    </td>
                    <td className="p-2 text-secondary-color text-end">
                      {value} g
                    </td>
                  </tr>
                )
              )}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};

export default FeedAnalysisTable;
