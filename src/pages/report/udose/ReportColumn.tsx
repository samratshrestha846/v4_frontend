/* eslint-disable react/prop-types */
import React from 'react';
import { Control, UseFormRegister } from 'react-hook-form';
import { ListGroup } from 'react-bootstrap';
import { FormInput } from '../../../components';

type Props = {
  register: UseFormRegister<any>;
  control: Control<any>;
  reportColumns: any[];
};

const ReportColumn: React.FC<Props> = ({
  register,
  control,
  reportColumns,
}) => {
  return (
    <ListGroup>
      <ListGroup.Item className=" border-0 p-0">
        <div className="d-flex gap-2 flex-column">
          {reportColumns.map((row) => (
            <FormInput
              key={row.label}
              control={control}
              register={register}
              label={row.label}
              type="checkbox"
              name={`columns[${row.name}]`}
            />
          ))}
        </div>
      </ListGroup.Item>
    </ListGroup>
  );
};

export default ReportColumn;
