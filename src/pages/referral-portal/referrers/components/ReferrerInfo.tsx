import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { shortDateFormat } from '../../../../helpers';
import ReferrerStaus from './ReferrerStatus';
import FileDocumentLink from '../../../../components/FileDocumentLink';
import CustomLoader from '../../../../components/CustomLoader';
import { Referrer } from '../../../../types/referrer/referrerList';
import ErrorMessage from '../../../../components/ErrorMessage';

type Props = {
  referrer: Referrer | undefined;
  isFetchingReferrer: boolean;
  isErrorReferrer: boolean;
};

const ReferrerInfo: React.FC<Props> = ({
  referrer,
  isFetchingReferrer,
  isErrorReferrer,
}) => {
  if (isFetchingReferrer) return <CustomLoader />;

  if (isErrorReferrer) return <ErrorMessage />;

  return (
    <Card>
      <Card.Body>
        <Row>
          <Col xl={3} lg={3} md={3} sm={6} className="mb-2">
            <h6 className="font-14 text-black-50">Name</h6>
            <span className="text-black-50">
              {referrer?.first_name} {referrer?.last_name}
            </span>
          </Col>
          <Col xl={3} lg={3} md={3} sm={6} className="mb-2">
            <h6 className="font-14 text-black-50">Email</h6>
            <span className="text-black-50">{referrer?.email}</span>
          </Col>
          <Col xl={3} lg={3} md={3} sm={6} className="mb-2">
            <h6 className="font-14 text-black-50">Phone No.</h6>
            <span className="text-black-50">{referrer?.phone_number}</span>
          </Col>
          <Col xl={3} lg={3} md={3} sm={6} className="mb-2">
            <h6 className="font-14 text-black-50">Address</h6>
            <span className="text-black-50">{referrer?.address}</span>
          </Col>
        </Row>
        <Row>
          <Col xl={3} lg={3} md={3} sm={6} className="mb-2">
            <h6 className="font-14 text-black-50">Status</h6>
            <ReferrerStaus referrer={referrer} />
          </Col>
          <Col xl={3} lg={3} md={3} sm={6} className="mb-2">
            <h6 className="font-14 text-black-50">Contract Effective Date </h6>
            <span className="text-black-50">
              {shortDateFormat(referrer?.contract_effective_date)}
            </span>
          </Col>
          <Col xl={3} lg={3} md={3} sm={6} className="mb-2">
            <h6 className="font-14 text-black-50">Contract Expiry Date</h6>
            <span className="text-black-50">
              {shortDateFormat(referrer?.contract_expiry_date)}
            </span>
          </Col>
          <Col xl={3} lg={3} md={3} sm={6} className="mb-2">
            <FileDocumentLink
              fileLabel="Attached File"
              fileName="Contract File"
              fileUrl={referrer?.contract_file}
              fileTypeIcon="bx bxs-file-pdf"
            />
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default ReferrerInfo;
