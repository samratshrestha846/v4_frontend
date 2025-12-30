// @flow
import React from 'react';
import { useForm } from 'react-hook-form';

type VerticalFromProps = {
  defaultValues?: Object;
  resolver?: any;
  children?: any;
  onSubmit: any;
  formClass?: string;
};

const VerticalForm: React.FC<VerticalFromProps> = ({
  defaultValues,
  resolver,
  children,
  onSubmit,
  formClass,
}) => {
  /*
   * form methods
   */
  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm({ defaultValues, resolver });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={formClass} noValidate>
      {Array.isArray(children)
        ? children.map((child) => {
            return child.props && child.props.name
              ? React.createElement(child.type, {
                  ...{
                    ...child.props,
                    register,
                    key: child.props.name,
                    errors,
                    control,
                  },
                })
              : child;
          })
        : children}
    </form>
  );
};

export default VerticalForm;
