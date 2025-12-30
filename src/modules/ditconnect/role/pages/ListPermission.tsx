import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { capitalizeFirstLetter } from '@uhub/helpers';
import CustomLoader from '@uhub/components/CustomLoader';
import { FormInput } from '@uhub/components';
import { Permission } from '../types/Role';
import usePermissions from '../../hooks/usePermissions';

type Props = {
  permissions?: Permission[];
  readOnly: boolean;
  register?: any;
  errors?: any;
  control?: any;
  hideTitle?: boolean;
};

const ListPermission: React.FC<Props> = ({
  permissions,
  readOnly,
  register,
  errors,
  control,
  hideTitle,
}) => {
  const { data, isFetching } = usePermissions();

  if (isFetching) {
    return <CustomLoader />;
  }

  return (
    <>
      {!hideTitle && <h6 className="font-14">Permissions</h6>}
      <Row>
        {data?.map((moduleItem: any) => (
          <Col sm={6} md={6} lg={4} key={moduleItem.module} className="p-1">
            <div>
              <div className="fw-bold ms-1">
                {capitalizeFirstLetter(moduleItem.module)}
              </div>
              <ul className="list-unstyled ms-3">
                {moduleItem.permissions.map((perm: any) => {
                  const isChecked = permissions?.some(
                    (assignedPermission) =>
                      assignedPermission.name === perm.name
                  );

                  return (
                    <li key={perm.name} className="d-flex align-items-center">
                      {readOnly ? (
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            checked={isChecked}
                            readOnly
                          />
                          <span className="ms-1">
                            {capitalizeFirstLetter(perm.name)}
                          </span>
                        </div>
                      ) : (
                        <FormInput
                          label={capitalizeFirstLetter(perm.name)}
                          id={perm.name}
                          type="checkbox"
                          name="permissions[]"
                          register={register}
                          errors={errors}
                          control={control}
                          defaultValue={perm.name}
                          defaultChecked={isChecked}
                        />
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default ListPermission;
