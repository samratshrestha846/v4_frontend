import React, { useState } from 'react';
import Select from 'react-select';
import { toast } from 'react-toastify';
import { useQueryClient } from '@tanstack/react-query';
import { productionFacilityOptions, statusColorOptions } from './types/filter';
import HttpApi from '../../Http/http';
import { PRODUCTION_REQUEST } from './constants/constant';

type UpdateStatusProps = {
  status: string;
  id: number;
};

const UpdateStatus: React.FC<UpdateStatusProps> = ({
  status,
  id,
}: UpdateStatusProps) => {
  const [editing, setEditing] = useState(false);
  const queryClient = useQueryClient();
  const httpApi = new HttpApi();

  const selectedValue = productionFacilityOptions.find(
    (option) => option.value === status
  );
  const findStatusColor = (stat: string) => {
    const color = statusColorOptions.find((option) => option.key === stat);
    return color?.value;
  };

  const updateStatusOnChange = async (selected: any) => {
    const response = await httpApi.updatePatch(`${PRODUCTION_REQUEST}/${id}`, {
      status: selected.value,
    });
    if (response.data && response.data.data) {
      toast.success(response.data.message);
      queryClient.invalidateQueries({ queryKey: [PRODUCTION_REQUEST] });
      setEditing(false);
    } else {
      toast.error(response.data.message);
    }
  };

  return editing ? (
    <div className="d-flex align-items-center">
      <Select
        className="w-75"
        options={productionFacilityOptions}
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
