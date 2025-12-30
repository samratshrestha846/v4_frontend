import { yupResolver } from '@hookform/resolvers/yup';
import { SetStateAction, Dispatch } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import moment from 'moment';
import { CustomDateRange } from '../../../../types/common';

type Props = {
  setCustomDateRange: Dispatch<SetStateAction<CustomDateRange>>;
  setDuration?: Dispatch<SetStateAction<string>>;
  toggleDropdown?: () => void;
};

export default function useCustomDateRange({
  setCustomDateRange,
  toggleDropdown,
}: Props) {
  const schemaResolver = yupResolver(
    yup.object().shape({
      from_date: yup
        .date()
        .max(new Date())
        .required('From Date is required.')
        .typeError('From Date is invalid.'),
      to_date: yup
        .mixed()
        .typeError('To date is invalid.')
        .required('To date is required.')
        .test(
          'not-before-than-from-date',
          'To date should not be before than from date.',
          // eslint-disable-next-line func-names
          function (value: any) {
            if (value === null) return true;
            const dayDifference = moment(value).diff(
              moment(this.parent.from_date),
              'days'
            );
            return dayDifference >= 0;
          }
        ),
    })
  );

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CustomDateRange>({
    resolver: schemaResolver,
    defaultValues: {
      to_date: new Date(),
    },
  });

  const onSubmit = (formData: CustomDateRange) => {
    if (formData.from_date && formData.to_date) {
      setCustomDateRange({
        from_date: formData.from_date,
        to_date: formData.to_date,
      });
      if (toggleDropdown) {
        toggleDropdown();
      }
    }
  };

  return {
    control,
    errors,
    handleSubmit,
    onSubmit,
  };
}
