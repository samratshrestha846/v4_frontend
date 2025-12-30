import React from 'react';
import { Button, Row, Col, Card } from 'react-bootstrap';
import Select from 'react-select';

import { Link, useNavigate } from 'react-router-dom';
import PageTitle from '../../components/PageTitle';
import { can } from '../../helpers/checkPermission';
import { prepareDynamicUrl } from '../../helpers';
import {
  CREATE_NEWS,
  READ_NEWS,
  DELETE_NEWS,
  UPDATE_NEWS,
} from '../../constants/permissions';
import Pagination from '../../components/Pagination';
import NewsDefaultImg from '../../assets/images/news.png';
import { News } from '../../types/news';
import { CustomDropdownMenuItem } from '../../types/common';
import { NEWS_ADD, NEWS_EDIT, NEWS_VIEW } from '../../constants/path';
import { ACTION_DELETE_NEWS } from './constants/actionConstants';
import ActionDropdown from '../../components/ActionDropdown';
import useListNews from './hooks/useListNews';
import CustomLoader from '../../components/CustomLoader';
import ErrorMessage from '../../components/ErrorMessage';
import DeleteNewsModal from './modals/DeleteNewsModal';
import SearchBox from '../../components/SearchBox';

import {
  NEWS_LABEL_DRAFT,
  NEWS_LABEL_PUBLISHED,
  NEWS_PUBLISH_OPTIONS,
} from '../../constants/statusOptions';
import NoDataAvailable from '../../components/NoDataAvailable';

const ListNews = () => {
  const {
    data,
    isFetching,
    isError,
    refetch,
    pageNumber,
    handlePageChange,
    isPublished,
    setIsPublished,
    search,
    handleSearchOnChange,
  } = useListNews();

  const canCreateNews = can(CREATE_NEWS);
  const navigate = useNavigate();

  const actionColumnFormatter = (row: News) => {
    const menuItems: CustomDropdownMenuItem[] = [
      {
        label: 'View',
        icon: 'bx bx-show',
        url: prepareDynamicUrl(NEWS_VIEW, row.id),
        permission: READ_NEWS,
      },
      {
        label: 'Edit',
        icon: 'bx bx-edit',
        url: prepareDynamicUrl(NEWS_EDIT, row.id),
        permission: UPDATE_NEWS,
      },

      {
        label: 'Delete',
        icon: 'bx bx-trash',
        actionKey: ACTION_DELETE_NEWS,
        permission: DELETE_NEWS,
        modalContent: <DeleteNewsModal refetch={refetch} id={row.id} />,
      },
    ];

    return (
      <ActionDropdown
        icon="bx bx-dots-vertical-rounded"
        iconColorClass="font-14 text-gray"
        containerClass="custom-dropdown d-flex align-items-center justify-content-between text-white"
        menuItems={menuItems}
        refetch={refetch}
      />
    );
  };

  if (isError) {
    return <ErrorMessage />;
  }

  return (
    <>
      <PageTitle
        breadCrumbItems={[
          {
            label: 'News',
            path: '/news/list',
            active: true,
          },
        ]}
        title="News List"
      />
      <Row>
        <Col xl={4} md={4}>
          <SearchBox
            search={search}
            handleSearchOnChange={handleSearchOnChange}
          />
        </Col>
        <Col xl={4} md={4}>
          <Select
            options={NEWS_PUBLISH_OPTIONS}
            onChange={(selected) =>
              setIsPublished(selected?.value ?? undefined)
            }
            defaultValue={NEWS_PUBLISH_OPTIONS?.find(
              (item) => item.value === isPublished
            )}
            isClearable
            placeholder="Status"
            className="mb-2"
          />
        </Col>
        {canCreateNews && (
          <Col>
            <div className="float-end">
              <Button
                variant="secondary"
                className="mb-1 btn btn-secondary btn-sm"
                onClick={() => navigate(NEWS_ADD)}>
                <i className="bx bx-plus" /> Add News
              </Button>
            </div>
          </Col>
        )}
      </Row>
      {isFetching ? (
        <CustomLoader />
      ) : (
        <>
          <Row className="d-flex flex-wrap news-card">
            {data?.data?.length > 0 ? (
              data?.data?.map((item: any) => (
                <Col md={4}>
                  <Card className="d-block ribbon-box">
                    <div className=" h-25" style={{ height: '250px' }}>
                      <Card.Img
                        src={`${item?.image_url ? item.image_url : NewsDefaultImg}`}
                        alt="news img"
                      />
                    </div>

                    <div
                      className={`ribbon ribbon-${
                        item?.is_published ? 'success' : 'info'
                      } float-end`}>
                      <i className="mdi mdi-access-point me-1" />
                      {item?.is_published
                        ? NEWS_LABEL_PUBLISHED
                        : NEWS_LABEL_DRAFT}
                    </div>

                    <Card.Body>
                      <Card.Title as="h5" className="p-0 m-0 text-primary">
                        <Link to={prepareDynamicUrl(NEWS_VIEW, item?.id)}>
                          {item.title}
                        </Link>
                      </Card.Title>
                      <p className="font-12 text-muted py-1 m-0">
                        <span className="fw-bold">Published on: </span>
                        {item.published_on}
                      </p>
                      <Card.Text>{item.content}</Card.Text>
                    </Card.Body>
                    <Card.Footer>
                      <Row>
                        <Col>
                          <div className="float-end">
                            {actionColumnFormatter(item)}
                          </div>
                        </Col>
                      </Row>
                    </Card.Footer>
                  </Card>
                </Col>
              ))
            ) : (
              <Col>
                <Card>
                  <Card.Body>
                    <NoDataAvailable />
                  </Card.Body>
                </Card>
              </Col>
            )}
          </Row>

          <Pagination
            data={data?.meta}
            pageNumber={pageNumber}
            handlePageChange={handlePageChange}
          />
        </>
      )}
    </>
  );
};

export default ListNews;
