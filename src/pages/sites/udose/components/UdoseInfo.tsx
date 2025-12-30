import { Row, Col } from 'react-bootstrap';
import Udose from '../../../../assets/images/udose/udose.png';

const UdoseInfo = () => {
  return (
    <Row>
      <Col md={12}>
        <h1 style={{ color: '#172b4d', fontWeight: 'bold' }}> uDose </h1>
        <p style={{ color: '172b4d' }}>
          Efficient supplementing via remote telemetry{' '}
        </p>
      </Col>
      <Row>
        <Col md={8}>
          <h3>Why uDose?</h3>
          <p>
            The uDOSE is designed exclusively for use with the DIT AgTech
            supplement range. Put an end to expensive lick runs and ensure that
            all your herd are receiving the correct dose of supplements while
            enjoying the peace of mind that our safety features offer. Check on
            the efficiency and control the uDOSE from the palm of your hand with
            the uHUB app.
          </p>
          <h3 style={{ color: '172b4d' }}>Key features </h3>
          <ul>
            <li>
              Designed for exclusive use with the DIT AgTech Supplement range
            </li>
            <li>
              The only dosing unit designed specifically to be compatible with
              urea feeding{' '}
            </li>
            <li>Enhanced safety features for peace of mind</li>
            <li>
              Ensure the whole herd receive the correct supplement dose
              proportional to their body weight
            </li>
            <li>
              Cost effective - reduced wear and tear on equipment,save on labour
              costs
            </li>
            <li>Flexible rental and install options</li>
            <li>Touch screen for ease of use</li>
            <li>Remote telemetry for monitoring dose rates</li>
            <li>Treat up to 10,000 head per day per unit</li>
            <li>Multiple fail safe mechanisms proven to provide safety</li>
            <li>Solar powered</li>
            <li>Remote telemetry with uHUB Platform connectivity</li>
            <li>Tech support available</li>
          </ul>
        </Col>
        <Col md={4}>
          <img
            src={Udose}
            className="img-fluid"
            alt=""
            style={{ maxWidth: '350px' }}
          />
        </Col>
      </Row>

      <Row style={{ textAlign: 'center', color: '#172b4d' }}>
        <Col md={12}>
          <p style={{ color: '#172b4d', fontWeight: 'bold', fontSize: '20px' }}>
            {' '}
            If you are interested please contact us.{' '}
          </p>
          <a
            className="btn btn-sm btn-success"
            href="https://ditagtech.com.au/contact/"
            target="_blank">
            Contact Us
          </a>
        </Col>
      </Row>
    </Row>
  );
};

export default UdoseInfo;
