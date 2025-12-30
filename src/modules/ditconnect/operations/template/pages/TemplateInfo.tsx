import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { capitalizeFirstLetter, convertToSentence } from '@uhub/helpers';
import { TemplateResponse } from '../types/Template';

type Props = {
  template: TemplateResponse;
};

const TemplateInfo: React.FC<Props> = ({ template }) => {
  const parseOptions = (options: string) => {
    const option = JSON.parse(options);
    return Object.entries(option);
  };
  return (
    <>
      <Row>
        <h6 className="font-14">Title</h6>
        <p>{template?.title ?? '-'}</p>
      </Row>

      <h6 className="font-14">Template Items</h6>
      {template.template_items.map((templateItem, index) => (
        <Card key={index}>
          <Card.Body>
            <Row>
              <Col sm={6} md={4} lg={4}>
                <h6 className="font-14">Form Label</h6>
                <p>{templateItem?.form_label ?? '-'}</p>
              </Col>
              <Col sm={6} md={4} lg={4}>
                <h6 className="font-14">Input Type</h6>
                <p>{templateItem?.input_type?.name ?? '-'}</p>
              </Col>

              {parseOptions(templateItem.options).map(([key, value], indx) => (
                <Col sm={6} md={4} lg={4} key={indx}>
                  <h6 className="font-14">{convertToSentence(key)}</h6>
                  <p>{capitalizeFirstLetter(String(value)) ?? '-'}</p>
                </Col>
              ))}
            </Row>
          </Card.Body>
        </Card>
      ))}
    </>
  );
};

export default TemplateInfo;
