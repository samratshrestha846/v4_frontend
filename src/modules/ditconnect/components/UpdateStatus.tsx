import React, { useState } from 'react';
import Select from 'react-select';
import { toast } from 'react-toastify';
import { LabelValue } from '@uhub/types/common';
import { useQueryClient } from '@tanstack/react-query';
import HttpApi from '../Http/http';

type UpdateStatusProps = {
  status: string;
  endpoint: string;
  options: LabelValue[];
  colorOptions: { key: string; value: string }[];
};

const UpdateStatus: React.FC<UpdateStatusProps> = ({
  status,
  endpoint,
  options,
  colorOptions,
}: UpdateStatusProps) => {
  const [editing, setEditing] = useState(false);
  const queryClient = useQueryClient();
  const httpApi = new HttpApi();

  const selectedValue = options.find((option) => option.value === status);
  const findStatusColor = (stat: string) => {
    const color = colorOptions.find((option) => option.key === stat);
    return color?.value;
  };

  const updateStatusOnChange = async (selected: any) => {
    try {
      const response = await httpApi.updatePatch(endpoint, {
        status: selected.value,
      });

      toast.success(response.data.message);
      queryClient.invalidateQueries({ queryKey: [endpoint] });
      setEditing(false);
    } catch (error: any) {
      const errorMessages = error.response?.data?.errors?.status;

      const formattedError = Array.isArray(errorMessages)
        ? errorMessages.join(', ')
        : 'An unexpected error occurred';

      toast.error(formattedError);
      setEditing(false);
    }
  };

  return editing ? (
    <div className="d-flex align-items-center">
      <Select
        className="w-75"
        options={options}
        defaultValue={selectedValue}
        onChange={updateStatusOnChange}
      />
      <i
        tabIndex={0}
        role="button"
        className="bx bx-x text-muted ms-2"
        onClick={() => setEditing(false)}
        aria-label="Close"
        onKeyDown={(e) => e.key === 'Enter' && setEditing(false)}
      />
    </div>
  ) : (
    <span
      className={`${findStatusColor(status)}`}
      tabIndex={-1}
      role="button"
      onClick={() => setEditing(true)}
      onKeyDown={(e) => e.key === 'Enter' && setEditing(false)}>
      {status}
      <i className="bx bx-edit text-muted font-20" />
    </span>
  );
};

export default UpdateStatus;
