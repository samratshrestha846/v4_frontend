import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import PageTitle from '../../components/PageTitle';
import { shortDateFormat } from '../../helpers';
import NewsDefaultImg from '../../assets/images/news.png';
import useReadNews from './hooks/useReadNews';
import CustomLoader from '../../components/CustomLoader';
import ErrorMessage from '../../components/ErrorMessage';
import {
  NEWS_LABEL_DRAFT,
  NEWS_LABEL_PUBLISHED,
} from '../../constants/statusOptions';

const ViewNews = () => {
  const { id } = useParams();
  const { data: newsDetail, isFetching, isError } = useReadNews(Number(id));

  if (isFetching) return <CustomLoader />;

  if (isError) return <ErrorMessage />;

  return (
    <>
      <PageTitle
        breadCrumbItems={[
          { label: 'News', path: '/news/list' },
          {
            label: 'News Details',
            path: `/news/view/${id}`,
            active: true,
          },
        ]}
        title="News Detail"
      />
      <div className="content-title">
        <Row>
          <Col md={12} className="news-card-detail">
            <Card className="d-block ribbon-box">
              <div className=" h-25" style={{ height: '250px' }}>
                <Card.Img
                  src={`${
                    newsDetail?.image_url
                      ? newsDetail.image_url
                      : NewsDefaultImg
                  }`}
                  alt="news img"
                />
              </div>

              <div
                className={`ribbon ribbon-${
                  newsDetail?.is_published ? 'success' : 'info'
                } float-end`}>
                <i className="mdi mdi-access-point me-1" />
                {newsDetail?.is_published
                  ? NEWS_LABEL_PUBLISHED
                  : NEWS_LABEL_DRAFT}
              </div>

              <Card.Body>
                <Card.Title as="h5" className="p-0 m-0 text-primary">
                  {newsDetail?.title}
                </Card.Title>
                <p className="font-14 text-muted py-1 m-0">
                  <span className="fw-bold">Published on: </span>
                  {shortDateFormat(newsDetail?.published_on)}
                </p>
                <Card.Text>{newsDetail?.content}</Card.Text>
              </Card.Body>
              <Card.Footer>
                <p>
                  {newsDetail?.url_link ? (
                    <Link
                      to={newsDetail.url_link}
                      className="btn-link d-flex align-items-center justify-content-end"
                      target="_blank">
                      view more
                      <i className="bx bx-right-arrow-circle ms-1" />
                    </Link>
                  ) : (
                    <span className="ms-2">No link available </span>
                  )}
                </p>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default ViewNews;
