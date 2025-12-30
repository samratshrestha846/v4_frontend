import React from 'react';
import { Card } from 'react-bootstrap';
import PageTitle from '@uhub/components/PageTitle';
import { can } from '@uhub/helpers/checkPermission';
import useFetchList from '../hooks/useFetchList';
import useUrlFilters from '../hooks/useUrlFilters';
import ListTable from './ListTable';
import FilterSection from '../components/FilterSection';
import {
  CustomerContactListResponse,
  CustomerContactParams,
} from './types/customerContact';
import {
  CREATE_CUSTOMER_CONTACT,
  CUSTOMER_CONTACTS,
  CUSTOMER_CONTACT_ADD,
  CUSTOMER_CONTACT_LIST,
} from './constants/constant';

const ListCustomerContacts: React.FC = () => {
  const title: string = 'Customer Contact';
  const canCreate = can(CREATE_CUSTOMER_CONTACT);
  const [filters, setFilters] = useUrlFilters<CustomerContactParams>();

  const { data, isFetching } = useFetchList<CustomerContactListResponse>(
    CUSTOMER_CONTACTS,
    filters
  );

  return (
    <>
      <PageTitle
        breadCrumbItems={[
          {
            label: `${title} List`,
            path: CUSTOMER_CONTACT_LIST,
            active: true,
          },
        ]}
        title={title}
      />

      <Card>
        <Card.Body>
          <FilterSection
            filterFields={[]}
            filters={filters}
            setFilters={setFilters}
            title={title}
            canCreate={canCreate}
            createPath={CUSTOMER_CONTACT_ADD}
          />
          <ListTable
            isFetching={isFetching}
            data={data}
            filters={filters}
            setFilters={setFilters}
          />
        </Card.Body>
      </Card>
    </>
  );
};

export default ListCustomerContacts;
