import React from 'react';
import { convertToSentence, convertToSlug } from '../../../helpers';
import { FeedAnalysisData } from '../../../types/costFeed/costFeed';

type Props = {
  feedAnalysisData: FeedAnalysisData;
  productName: string;
};

const FeedAnalysis: React.FC<Props> = ({ feedAnalysisData, productName }) => {
  return (
    <div className="p-3 box-showdow">
      <h4 className="analysis-header"> Feed Analysis</h4>
      <ul className="list-group gap-2">
        <li className="list-group-item m-0 p-0">
          <div className="d-flex justify-content-between align-items-center analysis-header-wrapper">
            <span className="text-label fw-bold">{productName}</span>
            <span className="text-label fw-bold">Gram/Head/Day</span>
          </div>
        </li>
        {feedAnalysisData &&
          Object.entries(feedAnalysisData).map(([supplement, value]) => (
            <li className="list-group-item m-0 p-0" key={supplement}>
              <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex justify-content-center">
                  <i
                    className={`mdi mdi-square text-${convertToSlug(supplement)} me-1`}
                  />
                  <span className="text-label fw-bold">
                    {convertToSentence(supplement)}
                  </span>
                </div>
                <span className="text-value">{value.toFixed(4)}</span>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default FeedAnalysis;
