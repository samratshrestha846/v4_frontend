import React, { Dispatch, FC, SetStateAction } from 'react';
import { Col, Form, Row, InputGroup } from 'react-bootstrap';
import Select from 'react-select';
import useAuth from '../../../hooks/useAuth';
import { getLocalStorageData } from '../../../helpers';
import {
  filterOptions,
  sortOptions,
} from '../../../constants/dashboardConstants';
import usePropertiesDropdown from '../../../hooks/dropdown/usePropertiesDropdown';
import CustomLoader from '../../../components/CustomLoader';
import ErrorMessage from '../../../components/ErrorMessage';

type Props = {
  setSearch: Dispatch<SetStateAction<string | undefined>>;
  setFilter: Dispatch<SetStateAction<number | undefined>>;
  setSort: Dispatch<SetStateAction<string | undefined>>;
  setProperty: Dispatch<SetStateAction<number | undefined>>;
};

const UbotDashboardFilter: FC<Props> = ({
  setSearch,
  setFilter,
  setSort,
  setProperty,
}) => {
  const { isSuperAdmin, isAdmin, isCustomer } = useAuth();

  const preservedData = getLocalStorageData('ubotFilterParameters');

  const {
    data: propertiesOptions,
    isFetching: isFetchingPropertiesOptions,
    isError: isErrorPropertiesOptions,
  } = usePropertiesDropdown(isSuperAdmin || isAdmin);

  if (isFetchingPropertiesOptions) {
    return <CustomLoader />;
  }

  if (isErrorPropertiesOptions) {
    return <ErrorMessage />;
  }

  return (
    <Row className="justify-content-start align-content-center mb-1 g-2 mt-1">
      <Col xs={6} md={3} className="mb-2">
        <Form>
          <Form.Group>
            <InputGroup className="mb-2">
              <Form.Control
                placeholder="Search (Site Name)"
                onChange={(e) => setSearch(e.target.value)}
                defaultValue={preservedData?.search}
              />
            </InputGroup>
          </Form.Group>
        </Form>
      </Col>
      <Col xs={6} md={3} className="mb-2">
        <Select
          isClearable
          options={filterOptions}
          onChange={(e) => setFilter(e ? e.value : undefined)}
          placeholder="Filter By Status..."
          defaultValue={filterOptions?.find(
            (item) => item.value === preservedData?.filter
          )}
        />
      </Col>
      <Col xs={6} md={3} className="mb-2">
        <Select
          isClearable
          options={sortOptions}
          onChange={(e) => setSort(e ? e.value : undefined)}
          placeholder="Sort By..."
          defaultValue={sortOptions.find(
            (item) => item.value === preservedData?.sort
          )}
        />
      </Col>

      {!isCustomer && (
        <Col xs={6} md={3} className="mb-2 ">
          <Select
            isClearable
            options={propertiesOptions}
            onChange={(e) => setProperty(e ? e.value : undefined)}
            placeholder="Filter By Property..."
            defaultValue={propertiesOptions?.find(
              (item: any) => item.value === preservedData?.property
            )}
          />
        </Col>
      )}
    </Row>
  );
};
export default UbotDashboardFilter;
