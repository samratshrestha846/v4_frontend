import React from 'react';
import { Row, Col } from 'react-bootstrap';

import LabReportHeader from '../components/LabReportHeader';
import LabSampleInfo from '../components/LabSampleInfo';
import { LabReport } from '../../../../types/lab/labReport';
import SummaryRecommendationsInfo from '../components/SummaryRecommendationsInfo';
import WaterSampleTestResult from '../components/WaterSampleTestResult';
import prepareLabTestResults from '../helpers/labHelper';

type Props = {
  reportData?: LabReport;
};

const WaterLabReport: React.FC<Props> = ({ reportData }) => {
  const { defaultResults, otherResults } = prepareLabTestResults(
    reportData?.lab_samples
  );

  return (
    <Row>
      <Col>
        <div style={{ backgroundColor: '#E3E8EF' }} className="p-3 gap-3">
          <LabReportHeader />

          <LabSampleInfo labSample={reportData?.lab_samples?.[0]} />

          <WaterSampleTestResult
            defaultResults={defaultResults}
            otherResults={otherResults}
          />

          <SummaryRecommendationsInfo labReport={reportData} />

          <Row>
            <Col>
              <div className="mt-3">
                <h5 className="text-primary">Disclaimer</h5>
                <p className="mb-0 text-primary font-14">
                  DIT AgTech aims to assist livestock producers in enhancing the
                  performance and productivity of their animals. This report
                  contains results derived from water sample testing conducted
                  at the DIT AgTech laboratory. It serves as a reference and
                  should not substitute for professional water analysis or
                  expert advice
                </p>
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <div className="mt-3">
                <h5 className="text-primary">References</h5>
                <ol type="i">
                  <li>
                    <p className="font-14">
                      An Australia Government Initiative, 2023. Livestock
                      drinking water guidelines. Australian and New Zealand,
                      Guidelines for Fresh & Marine Water Quality. 1 -54.
                      Available at:&nbsp;
                      <a
                        href="https://www.waterquality.gov.au/sites/default/files/documents/livestock-drinking-water-guidelines-draft.pdf"
                        rel="noreferrer"
                        target="_blank">
                        https://www.waterquality.gov.au/sites/default/files/documents/livestock-drinking-water-guidelines-draft.pdf
                      </a>
                      &nbsp;[Accessed 1st March 2024].
                    </p>
                  </li>
                  <li>
                    <p>
                      Curran, G. NSW Government, Department of Primary
                      Industries. 2014. Water for livestock: interpreting water
                      quality tests. Primefact 533, 2nd edition, 1-4. Available
                      at:&nbsp;
                      <a
                        href="https://www.dpi.nsw.gov.au/__data/assets/pdf_file/0018/111348/water-for-livestock-interpreting-water-quality-tests.pdf"
                        rel="noreferrer"
                        target="_blank">
                        https://www.dpi.nsw.gov.au/__data/assets/pdf_file/0018/111348/water-for-livestock-interpreting-water-quality-tests.pdf
                      </a>
                      &nbsp;[Accessed 1st March 2024].
                    </p>
                  </li>
                  <li>
                    <p>
                      Davis, R. 2016. 5. Water Quality. Feedlot Design and
                      Construction, 1-13. Available at:&nbsp;
                      <a
                        href="https://www.mla.com.au/globalassets/mla-corporate/research-and-development/program-areas/feeding-finishing-and-nutrition/feedlot-design-manual/05-water-quality-2016_04_01.pdf"
                        rel="noreferrer"
                        target="_blank">
                        https://www.mla.com.au/globalassets/mla-corporate/research-and-development/program-areas/feeding-finishing-and-nutrition/feedlot-design-manual/05-water-quality-2016_04_01.pdf
                      </a>
                      &nbsp;[Accessed 1st March 2024].
                    </p>
                  </li>
                  <li>
                    <p>
                      Department of Primary Industries and Regional Development,
                      2016. Water Quality for Livestock. Agriculture and Food.
                      Available at:&nbsp;
                      <a
                        href="https://www.agric.wa.gov.au/livestock-biosecurity/water-quality-livestock"
                        rel="noreferrer"
                        target="_blank">
                        https://www.agric.wa.gov.au/livestock-biosecurity/water-quality-livestock
                      </a>
                      &nbsp;[Accessed 1st March 2024].
                    </p>
                  </li>
                  <li>
                    <p>
                      McCrory, D.F., and Hobbs, P.J. 2001. Additives to Reduce
                      Ammonia and Odor Emissions from Livestock Wastes: A
                      Review. J Environ Qual. 30 (2): 345-55. Available
                      at:&nbsp;
                      <a
                        href="https://doi.org/10.2134/jeq2001.302345x"
                        rel="noreferrer"
                        target="_blank">
                        https://doi.org/10.2134/jeq2001.302345x
                      </a>
                      &nbsp;[Accessed 1st March 2024].
                    </p>
                  </li>
                </ol>
              </div>
            </Col>
          </Row>
        </div>
      </Col>
    </Row>
  );
};

export default WaterLabReport;
