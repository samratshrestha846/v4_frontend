/* eslint-disable no-nested-ternary */
/* eslint-disable no-unused-vars */
import React from 'react';
import { Link } from 'react-router-dom';
import CustomLoader from '../../../components/CustomLoader';
import CustomDataTable from '../../../components/CustomDataTable';
import Pagination from '../../../components/Pagination';
import {
  formattedDatetime,
  formattedShortDate,
  prepareDynamicUrl,
} from '../../../helpers';
import { can } from '../../../helpers/checkPermission';
import {
  READ_CERES_TAG,
  UPDATE_CERES_TAG,
} from '../../../constants/permissions';
import { CERES_TAGS_VIEW, PROPERTY_VIEW } from '../../../constants/path';
import {
  CeresTag,
  CeresTagListResponse,
} from '../../../types/ceresTag/ceresTag';
import { CERES_TAG_BRAND_CERESRANCH } from '../../../constants/ceresTagConstants';
import ActionDropdown from '../../../components/ActionDropdown';
import { CustomDropdownMenuItem } from '../../../types/common';
import RequestHistoricalDataModal from '../modal/RequestHistoricalDataModal';
import UpdateAnimalCeresTagModal from '../modal/UpdateAnimalCeresTagModal';

type Props = {
  pageNumber: number;
  isFetching: boolean;
  isFetchingPropertiesOptions: boolean;
  data?: CeresTagListResponse;
  handlePageChange: (e: any) => void;
  refetch: any;
};

const ListCeresTagsTable: React.FC<Props> = ({
  pageNumber,
  isFetching,
  isFetchingPropertiesOptions,
  data,
  handlePageChange,
  refetch,
}) => {
  const canReadCeresTag = can(READ_CERES_TAG);

  const actionColumnFormatter = (row: CeresTag) => {
    const menuItems: CustomDropdownMenuItem[] = [
      {
        label: 'View',
        icon: 'bx bx-show',
        url: prepareDynamicUrl(CERES_TAGS_VIEW, row.id),
        permission: READ_CERES_TAG,
      },
      {
        label: 'Request Historical Data',
        icon: 'bx bx-history',
        actionKey: 'request_historical_data',
        permission: READ_CERES_TAG,
        modalContent: <RequestHistoricalDataModal ceresTag={row} />,
      },
    ];

    if (row.brand === CERES_TAG_BRAND_CERESRANCH) {
      menuItems.push({
        label: 'Update Ceres Tag on Animal',
        icon: 'bx bx-message-edit',
        actionKey: 'update_ceres_tag',
        permission: UPDATE_CERES_TAG,
        modalContent: (
          <UpdateAnimalCeresTagModal id={String(row.id)} refetch={refetch} />
        ),
      });
    }

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

  const customerPropertyColumnformatter = (row: CeresTag) => {
    return row.customer_property ? (
      canReadCeresTag ? (
        <Link
          to={prepareDynamicUrl(PROPERTY_VIEW, row.customer_property?.id)}
          target="_blank">
          {row.customer_property?.name}
        </Link>
      ) : (
        row.customer_property?.name
      )
    ) : (
      '-'
    );
  };

  const columns = [
    {
      dataField: 'vid',
      text: 'VID',
    },
    {
      dataField: 'customer_property.name',
      text: 'Property',
      formatter: customerPropertyColumnformatter,
    },

    {
      dataField: 'linked_date',
      text: 'Linked At',
      formatter: (row: CeresTag) => formattedShortDate(row.linked_date),
    },
    {
      dataField: 'brand',
      text: 'Brand',
    },
    {
      dataField: 'last_communicated_at',
      text: 'Last Communicated At',
      formatter: (row: CeresTag) =>
        row.last_communicated_at
          ? formattedDatetime(row.last_communicated_at)
          : '',
    },
    {
      dataField: '',
      text: 'Action',
      formatter: actionColumnFormatter,
    },
  ];

  if (isFetching || isFetchingPropertiesOptions) return <CustomLoader />;

  return (
    <>
      <CustomDataTable columns={columns} data={data!.body} />
      <Pagination
        data={data!.meta_data!.pagination}
        pageNumber={pageNumber}
        handlePageChange={handlePageChange}
      />
    </>
  );
};

export default ListCeresTagsTable;
