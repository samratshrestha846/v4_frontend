import React from 'react';
import { Control, FieldErrors, UseFormRegister } from 'react-hook-form';
import { FormInput } from '../../../../components';
import ModuleWithPermissions from '../../../../types/module';
import { ExplicitPermissionFormFields } from '../../../../types/permission/permissionList';
import { User } from '../../../../types/user/user';

type Props = {
  item: ModuleWithPermissions;
  control: Control<ExplicitPermissionFormFields>;
  register: UseFormRegister<ExplicitPermissionFormFields>;
  errors: FieldErrors<ExplicitPermissionFormFields>;
  user?: User;
  grantedPermissionsList: () => number[];
};

const ExplicitPermissionForm: React.FC<Props> = ({
  item,
  control,
  register,
  errors,
  user,
  grantedPermissionsList,
}) => {
  const permissionsId = grantedPermissionsList();

  return (
    <ul className="nav d-flex flex-column">
      <FormInput
        type="hidden"
        name="user_id"
        register={register}
        errors={errors}
        control={control}
        defaultValue={Number(user!.id)}
      />
      {item?.permissions?.map(
        (permission) =>
          !permission.role_has_permission && (
            <li key={permission.name}>
              <div key={permission.name} className="form-check">
                <FormInput
                  label={permission.label}
                  type="checkbox"
                  name="permission_id[]"
                  register={register}
                  errors={errors}
                  control={control}
                  defaultValue={permission.permission_id}
                  defaultChecked={permissionsId.includes(
                    permission.permission_id
                  )}
                  id={`checkbox-${permission.permission_id}`}
                />
              </div>
            </li>
          )
      )}
    </ul>
  );
};

export default ExplicitPermissionForm;
