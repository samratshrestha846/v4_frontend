/* eslint-disable react/no-array-index-key */
// @flow
import React from 'react';
import { Row, Col, Breadcrumb } from 'react-bootstrap';
import { Helmet } from 'react-helmet';

type BreadcrumbItems = {
  label: string;
  path: string;
  active?: boolean;
};

type PageTitleProps = {
  breadCrumbItems: Array<BreadcrumbItems>;
  title: string;
};

/**
 * PageTitle
 */

const PageTitle: React.FC<PageTitleProps> = ({ breadCrumbItems, title }) => {
  return (
    <Row>
      <Helmet>
        <title>{title} | uHUB - Helping farmers make positive impact.</title>
      </Helmet>
      <Col>
        <div className="page-title-box">
          <div className=" m-0 page-title-right">
            <Breadcrumb className="m-0">
              {breadCrumbItems.map((item, index) => {
                return item.active ? (
                  <Breadcrumb.Item active key={index}>
                    {item.label}
                  </Breadcrumb.Item>
                ) : (
                  <Breadcrumb.Item key={index} href={item.path}>
                    {item.label}
                  </Breadcrumb.Item>
                );
              })}
            </Breadcrumb>
          </div>
          <h5 className="page-title">{title}</h5>
        </div>
      </Col>
    </Row>
  );
};

export default PageTitle;
