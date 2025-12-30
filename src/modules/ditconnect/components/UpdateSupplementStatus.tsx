import React, { useState } from 'react';
import Select from 'react-select';
import { toast } from 'react-toastify';
import { useQueryClient } from '@tanstack/react-query';
import IconLabelStatus from '@uhub/components/IconLabelStatus';
import HttpApi from '../Http/http';
import {
  SUPPLEMENT_STATUS_OPTIONS,
  SUPPLEMENT_STATUS_PENDING,
} from '../supplement-transfer/constants/constant';

type UpdateStatusProps = {
  status: string;
  id: number;
  canUpdate: boolean;
  baseEndpoint: string;
};

const UpdateSupplementStatus: React.FC<UpdateStatusProps> = ({
  status,
  id,
  canUpdate,
  baseEndpoint,
}) => {
  const [editing, setEditing] = useState(false);
  const queryClient = useQueryClient();
  const httpApi = new HttpApi();

  const updateStatusOnChange = async (selected: any) => {
    try {
      const response = await httpApi.updatePatch(`${baseEndpoint}/${id}`, {
        status: selected.value,
      });
      if (response.data && response.data.data) {
        toast.success(response.data.message);
        queryClient.invalidateQueries({ queryKey: [baseEndpoint] });
        setEditing(false);
      } else {
        toast.error(response.data.message);
      }
    } catch (error: any) {
      setEditing(false);
      if (error.response) {
        toast.error(
          error?.response?.data?.errors?.status?.[0] ||
            error?.response?.data?.message
        );
      } else {
        toast.error('Oops something went wrong. Please try again.');
      }
    }
  };

  return editing ? (
    <div className="d-flex align-items-center">
      <Select
        className="w-75"
        options={SUPPLEMENT_STATUS_OPTIONS}
        defaultValue={SUPPLEMENT_STATUS_OPTIONS?.find(
          (item) => item.value === status
        )}
        onChange={updateStatusOnChange}
        placeholder="Select"
      />
      <i
        tabIndex={0}
        role="button"
        className="bx bx-x text-muted ms-2 font-18"
        onClick={() => setEditing(false)}
        aria-label="Close"
        onKeyDown={(e) => e.key === 'Enter' && setEditing(false)}
      />
    </div>
  ) : (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {canUpdate && status === SUPPLEMENT_STATUS_PENDING ? (
        <div
          className="d-flex align-items-center gap-2"
          tabIndex={-1}
          role="button"
          onClick={() => setEditing(true)}
          onKeyDown={(e) => e.key === 'Enter' && setEditing(false)}>
          <IconLabelStatus
            label={status}
            iconTextClass={
              status === SUPPLEMENT_STATUS_PENDING
                ? 'text-light-gray'
                : 'text-success'
            }
          />
          <i className="bx bx-edit text-muted font-18" />
        </div>
      ) : (
        <IconLabelStatus
          label={status}
          iconTextClass={
            status === SUPPLEMENT_STATUS_PENDING
              ? 'text-light-gray'
              : 'text-success'
          }
        />
      )}
    </>
  );
};

export default UpdateSupplementStatus;
