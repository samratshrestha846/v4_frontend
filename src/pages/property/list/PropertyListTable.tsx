/* eslint-disable no-unused-vars */
import React from 'react';
import { Link } from 'react-router-dom';
import CustomDataTable from '../../../components/CustomDataTable';
import Pagination from '../../../components/Pagination';
import CustomLoader from '../../../components/CustomLoader';

import {
  Property,
  PropertyListResponse,
} from '../../../types/property/propertyList';
import {
  UPDATE_CUSTOMER_PROPERTY,
  READ_CUSTOMER_PROPERTY,
  READ_USER,
} from '../../../constants/permissions';
import { firstCharOfWords, prepareDynamicUrl } from '../../../helpers';
import {
  PROPERTY_SETTINGS,
  PROPERTY_VIEW,
  USER_VIEW,
} from '../../../constants/path';
import CircleNameInitials from '../../../components/CircleNameInitials';
import ActiveInactiveStatus from '../../../components/ActiveInactiveStatus';
import { ACTION_EDIT_PROPERTY } from '../constants/actionConstants';
import { can } from '../../../helpers/checkPermission';
import ActionDropdown from '../../../components/ActionDropdown';
import { CustomDropdownMenuItem } from '../../../types/common';
import PropertyEditForm from '../form/PropertyEditForm';

type PropertyListTableProps = {
  refetch: any;
  isFetching: boolean;
  data?: PropertyListResponse;
  sort: any;
  direction: any;
  handlePageChange: (e: any) => void;
  pageNumber: number;
  handleTabeDataSorting: (column: string) => void;
};

const PropertyListTable: React.FC<PropertyListTableProps> = ({
  refetch,
  isFetching,
  data,
  sort,
  direction,
  handlePageChange,
  pageNumber,
  handleTabeDataSorting,
}) => {
  const canReadUser = can(READ_USER);

  const nameInitialCharacters = (
    firstName: string,
    lastName: string
  ): string => {
    return `${firstCharOfWords(firstName)[0]}${firstCharOfWords(lastName)[0]}`.toUpperCase();
  };

  const actionColumnFormatter = (property: Property) => {
    const menuItems: CustomDropdownMenuItem[] = [
      {
        label: 'View',
        icon: 'bx bx-show',
        url: prepareDynamicUrl(PROPERTY_VIEW, property.id),
        permission: READ_CUSTOMER_PROPERTY,
      },
      {
        label: 'Edit',
        icon: 'bx bx-edit',
        actionKey: ACTION_EDIT_PROPERTY,
        permission: UPDATE_CUSTOMER_PROPERTY,
        modalContent: <PropertyEditForm propertyId={property.id} />,
      },
      {
        label: 'Settings',
        icon: 'bx bx-cog',
        url: prepareDynamicUrl(PROPERTY_SETTINGS, property.id),
        permission: READ_CUSTOMER_PROPERTY,
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

  const propertyManagersColumnFormatter = (row: Property) => {
    return (
      <div className="d-flex justify-content-start align-items-cnter">
        <div className="circle-container">
          {row.customer_property_managers?.map((item, index) =>
            canReadUser ? (
              <Link to={prepareDynamicUrl(USER_VIEW, item.id)} key={item.id}>
                <CircleNameInitials
                  fullName={`${item.first_name} ${item.last_name}`}
                  assignedRole="Station Manager"
                  index={index}
                  key={item.id}
                  initialCharacters={nameInitialCharacters(
                    item.first_name,
                    item.last_name
                  )}
                />
              </Link>
            ) : (
              <CircleNameInitials
                fullName={`${item.first_name} ${item.last_name}`}
                assignedRole="Station Manager"
                index={index}
                key={item.id}
                initialCharacters={nameInitialCharacters(
                  item.first_name,
                  item.last_name
                )}
              />
            )
          )}
        </div>

        {row.customer_property_managers &&
          row.customer_property_managers.length > 0 &&
          row.territory_managers &&
          row.territory_managers?.length > 0 && <div className="separator" />}

        <div className="circle-container">
          {row.territory_managers?.map((item, index) =>
            canReadUser ? (
              <Link to={prepareDynamicUrl(USER_VIEW, item.id)} key={item.id}>
                <CircleNameInitials
                  fullName={`${item.first_name} ${item.last_name}`}
                  assignedRole="Territory Manager"
                  index={index}
                  key={item.id}
                  initialCharacters={nameInitialCharacters(
                    item.first_name,
                    item.last_name
                  )}
                />
              </Link>
            ) : (
              <CircleNameInitials
                fullName={`${item.first_name} ${item.last_name}`}
                assignedRole="Territory Manager"
                index={index}
                key={item.id}
                initialCharacters={nameInitialCharacters(
                  item.first_name,
                  item.last_name
                )}
              />
            )
          )}
        </div>
      </div>
    );
  };

  const statusColumnFormatter = (row: Property) => {
    return <ActiveInactiveStatus isActive={row?.is_active} />;
  };

  const columns = [
    {
      dataField: 'identifier',
      text: 'Identifier',
      sortable: true,
    },
    {
      dataField: 'customer.business_name',
      text: 'Customer',
      sortable: true,
    },
    {
      dataField: 'name',
      text: 'Property',
      sortable: true,
    },
    {
      dataField: 'region.name',
      text: 'Region',
      sortable: true,
    },
    {
      dataField: 'region.state',
      text: 'State',
      sortable: true,
    },
    {
      dataField: 'is_active',
      text: 'Status',
      formatter: statusColumnFormatter,
    },
    {
      dataField: '',
      text: 'Property Managers',
      formatter: propertyManagersColumnFormatter,
    },
    {
      dataField: 'df1',
      text: '',
      formatter: actionColumnFormatter,
    },
  ];

  if (isFetching) return <CustomLoader />;

  return (
    <>
      <CustomDataTable
        columns={columns}
        data={data!.body}
        sort={sort}
        direction={direction}
        handleTabeDataSorting={handleTabeDataSorting}
      />
      <Pagination
        data={data!.meta_data!.pagination}
        pageNumber={pageNumber}
        handlePageChange={handlePageChange}
      />
    </>
  );
};

export default PropertyListTable;
