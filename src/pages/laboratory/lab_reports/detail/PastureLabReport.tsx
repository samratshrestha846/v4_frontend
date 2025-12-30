import React from 'react';
import { Row, Col } from 'react-bootstrap';

import LabReportHeader from '../components/LabReportHeader';
import SupplementInfo from '../components/SupplementInfo';
import PaddockMap from '../components/PaddockMap';
import LabSampleInfo from '../components/LabSampleInfo';
import { LabReport } from '../../../../types/lab/labReport';
import SummaryRecommendationsInfo from '../components/SummaryRecommendationsInfo';
import LabSampleSpeciesInfo from '../components/LabSampleSpeciesInfo';
import PastureSampleTestResult from '../components/PastureSampleTestResult';
import prepareLabTestResults from '../helpers/labHelper';

type Props = {
  reportData?: LabReport;
};

const PastureLabReport: React.FC<Props> = ({ reportData }) => {
  const { defaultResults } = prepareLabTestResults(reportData?.lab_samples);

  return (
    <Row>
      <Col>
        <div style={{ backgroundColor: '#E3E8EF' }} className="p-3 gap-3">
          <LabReportHeader />

          <LabSampleInfo labSample={reportData?.lab_samples?.[0]} />

          <PastureSampleTestResult defaultResults={defaultResults} />

          <SupplementInfo
            paddock={reportData?.lab_samples?.[0].paddock}
            udoseSetting={reportData?.lab_samples?.[0].udose_setting}
          />

          <LabSampleSpeciesInfo defaultTestResults={defaultResults} />

          <SummaryRecommendationsInfo labReport={reportData} />

          <PaddockMap labSamples={reportData?.lab_samples} />

          <Row>
            <Col>
              <div className="mt-3">
                <h5 className="text-primary">Disclaimer</h5>
                <p className="mb-0 text-primary font-14">
                  DIT AgTech is currently commissioning a laboratory for the
                  analysis of pasture samples using an NIR instrument model
                  Perkin Elmer - DA 7250. A calibration of this NIR is currently
                  in progress to analyse pastures more adequately within the
                  different Australia grazing bioregion. Results indicated in
                  this report are on an under calibrated basis and should
                  therefore be only used as a guide and users should seek
                  further advice before making any adjustments to their
                  production system.
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
                      BR-Corte, 2016. Nutrient Requirements of Zebu and
                      Crossbred Cattle 3rd Ed. 314p. Eds. S.C. Valadares Filho,
                      L.F. Costa e Silva, M.P. Gionbelli, P.P. Rotta, M.I.
                      Marcondes, M.L. Chizzotti, L.F. Prados. Suprema Gráfica
                      Ltda. Viçosa, Minas Gerais - Brazil. Available at:&nbsp;
                      <a
                        href="https://brcorte.com.br/livro2016en"
                        rel="noreferrer"
                        target="_blank">
                        https://brcorte.com.br/livro2016en
                      </a>
                      &nbsp;[Accessed 1st March 2024].
                    </p>
                  </li>
                  <li>
                    <p>
                      CSIRO, 2007. Nutrient Requirements of Domesticated
                      Ruminants. 270p. CSIRO PUBLISHING. Collingwood, Victoria -
                      Australia. Available at:&nbsp;
                      <a
                        href="https://www.publish.csiro.au/book/5688"
                        rel="noreferrer"
                        target="_blank">
                        https://www.publish.csiro.au/book/5688
                      </a>
                      &nbsp;[No digital version available].
                    </p>
                  </li>
                  <li>
                    <p>
                      National Research Council, Committee on Animal Nutrition,
                      & Subcommittee on Dairy Cattle Nutrition. (2001). Nutrient
                      requirements of dairy cattle: 2001. 7th Ed. 381p.
                      Washington D.C: National Academies Press. 381 p. Available
                      at:&nbsp;
                      <a
                        href="https://nap.nationalacademies.org/catalog/9825/nutrient-requirements-of-dairy-cattle-seventh-revised-edition-2001"
                        rel="noreferrer"
                        target="_blank">
                        https://nap.nationalacademies.org/catalog/9825/nutrient-requirements-of-dairy-cattle-seventh-revised-edition-2001
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

export default PastureLabReport;
