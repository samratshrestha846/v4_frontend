import React from 'react';
import { Button, Card } from 'react-bootstrap';
import PageTitle from '../../components/PageTitle';
import { CREATE_TAG, UPDATE_TAG } from '../../constants/permissions';
import CustomDataTable from '../../components/CustomDataTable';
import Pagination from '../../components/Pagination';
import CustomLoader from '../../components/CustomLoader';
import { CustomDropdownMenuItem, TableColumn } from '../../types/common';
import useListTags from './hooks/useListTags';
import ErrorMessage from '../../components/ErrorMessage';
import { Tag } from '../../types/tag';
import ActionDropdown from '../../components/ActionDropdown';
import FilterTag from './FilterTag';
import useTagTypesDropdown from '../../hooks/dropdown/useTagTypesDropdown';
import useModalFeature from '../../hooks/common/useModalFeature';
import AddTagModal from './modals/AddTagModal';
import { can } from '../../helpers/checkPermission';
import EditTag from './EditTag';

const ListTag: React.FC = () => {
  const canCreateTag = can(CREATE_TAG);

  const { data: tagtypesOptions, isError: isErrorTagTypeOptions } =
    useTagTypesDropdown();

  const {
    pageNumber,
    search,
    data,
    isFetching,
    isError,
    handlePageChange,
    handleSearchOnChange,
    refetch,
    setSearch,
    type,
    setType,
  } = useListTags();

  const { showModal, toggleModal } = useModalFeature();

  const actionColumnFormatter = (row: Tag) => {
    const menuItems: CustomDropdownMenuItem[] = [
      {
        label: 'Edit',
        icon: 'bx bx-edit',
        actionKey: 'Edit Tag',
        modalContent: (
          <EditTag toggleModal={toggleModal} refetch={refetch} id={row.id} />
        ),
        permission: UPDATE_TAG,
      },
    ];
    return (
      <ActionDropdown
        menuItems={menuItems}
        containerClass="custom-dropdown d-flex align-items-center justify-content-between text-white"
        icon="bx bx-dots-vertical-rounded"
        iconColorClass="text-muted"
        refetch={refetch}
      />
    );
  };

  const columns: TableColumn[] = [
    {
      text: 'Type',
      dataField: 'type',
      sortable: false,
    },
    {
      text: 'Name',
      dataField: 'name',
      sortable: false,
    },
    {
      text: '',
      dataField: '',
      formatter: actionColumnFormatter,
    },
  ];

  if (isError || isErrorTagTypeOptions) return <ErrorMessage />;

  return (
    <>
      <PageTitle
        breadCrumbItems={[
          {
            label: 'Tags',
            path: '/tags/list',
            active: true,
          },
        ]}
        title="Tags List"
      />
      <Card>
        <Card.Body>
          <div className="d-flex justify-content-between align-items-center gap-1 flex-wrap mb-2">
            <FilterTag
              search={search}
              setSearch={setSearch}
              handleSearchOnChange={handleSearchOnChange}
              type={type}
              setType={setType}
              tagtypesOptions={tagtypesOptions ?? []}
            />
            {canCreateTag && (
              <div className="float-end">
                <Button
                  variant="secondary"
                  className="btn btn-sm mb-2"
                  onClick={toggleModal}>
                  <i className="bx bx-plus me-1" /> Add Tag
                </Button>
              </div>
            )}
          </div>

          {isFetching ? (
            <CustomLoader />
          ) : (
            <>
              <CustomDataTable columns={columns} data={data!.data} />
              <Pagination
                data={data!.meta}
                pageNumber={pageNumber}
                handlePageChange={handlePageChange}
              />
            </>
          )}
        </Card.Body>
      </Card>
      <AddTagModal
        showModal={showModal}
        toggleModal={toggleModal}
        refetch={refetch}
      />
    </>
  );
};

export default ListTag;
