import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

type Props = {
  isVehicleUsed: boolean;
};

export default function useValidation({ isVehicleUsed }: Props) {
  const schemaResolver = yupResolver(
    yup.object().shape({
      date: yup
        .string()
        .required('Date is required.')
        .typeError('Date is required'),
      total_hours: yup
        .number()
        .positive('Total hours must be a positive numeric value.')
        .required('Total hours is required.')
        .typeError('Total hours must be a positive numeric value.'),
      rnds: yup.array().of(
        yup.object().shape({
          rnd_hours: yup
            .number()
            .nullable()
            .transform((value, originalValue) =>
              originalValue === '' ? null : value
            )
            .notRequired()
            .test(
              'is-positive',
              'Value must be a positive number.',
              (value) => {
                if (value === null || value === undefined) {
                  return true;
                }
                return value > 0;
              }
            ),
          rnd_activity_id: yup.mixed().when('rnd_hours', {
            is: (val: any) => val > 0,
            then: yup
              .number()
              .typeError(
                'R&D activity is required when a R&D hour is greater than zero.'
              )
              .required(
                'R&D activity is required when a R&D hour is greater than zero.'
              ),
            otherwise: yup.number().nullable(),
          }),
          rnd_description: yup.mixed().when('rnd_hours', {
            is: (val: any) => val > 0,
            then: yup
              .string()
              .typeError(
                'R&D description is required when a R&D hour is greater than zero.'
              )
              .required(
                'R&D description is required when a R&D hour is greater than zero.'
              ),
            otherwise: yup.string().nullable(),
          }),
        })
      ),
      used_company_vehicle: yup.boolean().default(false),
      travel_diaries: yup.object().shape({
        vehicle_id: yup.mixed().when('used_company_vehicle', {
          is: () => isVehicleUsed,
          then: yup
            .number()
            .typeError(
              'Vehicle field is required when a company vehicle is used.'
            )
            .required(
              'Vehicle field is required when a company vehicle is used.'
            ),
          otherwise: yup.number().nullable(),
        }),
        start_time: yup.mixed().when('used_company_vehicle', {
          is: () => isVehicleUsed,
          then: yup
            .string()
            .typeError('Start time is required when a company vehicle is used.')
            .required('Start time is required when a company vehicle is used.'),
          otherwise: yup.string().nullable(),
        }),
        end_time: yup.mixed().when('used_company_vehicle', {
          is: () => isVehicleUsed,
          then: yup
            .string()
            .typeError('End time is required when a company vehicle is used.')
            .required('End time is required when a company vehicle is used.'),
          otherwise: yup.string().nullable(),
        }),
        start_odometer_reading: yup
          .number()
          .nullable()
          .transform((value, originalValue) =>
            originalValue === '' ? null : value
          )
          .test('is-positive', 'Value must be a positive number.', (value) => {
            if (value === null || value === undefined) {
              return true;
            }
            return value >= 0;
          }),
        end_odometer_reading: yup
          .number()
          .nullable()
          .transform((value, originalValue) =>
            originalValue === '' ? null : value
          )
          .when('start_odometer_reading', (startOdometerReading, schema) => {
            if (
              startOdometerReading !== null &&
              startOdometerReading !== undefined
            ) {
              return schema
                .required(
                  'End reading is required when start reading has a value'
                )
                .transform((value: any, originalValue: any) =>
                  originalValue === '' ? null : value
                )
                .test(
                  'is-greater',
                  'End reading must be greater than start reading.',
                  (value: any) => {
                    if (value === null) return false;
                    return value >= startOdometerReading;
                  }
                );
            }
            return schema.nullable();
          }),

        total_kms: yup
          .number()
          .nullable()
          .transform((value, originalValue) =>
            originalValue === '' ? null : value
          )
          .notRequired()
          .test('is-positive', 'Value must be a positive number.', (value) => {
            if (value === null || value === undefined) {
              return true;
            }
            return value >= 0;
          }),

        personal_kms: yup
          .number()
          .nullable()
          .transform((value, originalValue) =>
            originalValue === '' ? null : value
          )
          .notRequired()
          .test('is-positive', 'Value must be a positive number.', (value) => {
            if (value === null || value === undefined) {
              return true;
            }
            return value >= 0;
          }),
        work_kms: yup
          .number()
          .nullable()
          .transform((value, originalValue) =>
            originalValue === '' ? null : value
          )
          .notRequired()
          .test('is-positive', 'Value must be a positive number.', (value) => {
            if (value === null || value === undefined) {
              return true;
            }
            return value >= 0;
          }),
        rnd_distance: yup
          .number()
          .nullable()
          .transform((value, originalValue) =>
            originalValue === '' ? null : value
          )
          .notRequired()
          .test('is-positive', 'Value must be a positive number.', (value) => {
            if (value === null || value === undefined) {
              return true;
            }
            return value >= 0;
          }),
        non_rnd_distance: yup
          .number()
          .nullable()
          .transform((value, originalValue) =>
            originalValue === '' ? null : value
          )
          .notRequired()
          .test('is-positive', 'Value must be a positive number.', (value) => {
            if (value === null || value === undefined) {
              return true;
            }
            return value >= 0;
          }),

        public_road_distance: yup
          .number()
          .nullable()
          .transform((value, originalValue) =>
            originalValue === '' ? null : value
          )
          .notRequired()
          .test('is-positive', 'Value must be a positive number.', (value) => {
            if (value === null || value === undefined) {
              return true;
            }
            return value >= 0;
          }),
        private_road_distance: yup
          .number()
          .nullable()
          .transform((value, originalValue) =>
            originalValue === '' ? null : value
          )
          .notRequired()
          .test('is-positive', 'Value must be a positive number.', (value) => {
            if (value === null || value === undefined) {
              return true;
            }
            return value >= 0;
          }),
      }),
      non_rnd_hours: yup
        .number()
        .nullable()
        .transform((value, originalValue) =>
          originalValue === '' ? null : value
        )
        .notRequired()
        .test('is-positive', 'Value must be a positive number.', (value) => {
          if (value === null || value === undefined) {
            return true;
          }
          return value >= 0;
        }),
      non_rnd_description: yup.mixed().when('non_rnd_hours', {
        is: (val: any) => val > 0,
        then: yup
          .string()
          .typeError(
            'Non-R&D description is required when a Non-R&D hour is greater than zero.'
          )
          .required(
            'Non-R&D description is required when a Non-R&D hour is greater than zero.'
          ),
        otherwise: yup.string().nullable(),
      }),
      total_flying_hours: yup
        .number()
        .nullable()
        .transform((value, originalValue) =>
          originalValue === '' ? null : value
        )
        .notRequired()
        .test('is-positive', 'Value must be a positive number.', (value) => {
          if (value === null || value === undefined) {
            return true;
          }
          return value >= 0;
        }),
      rnd_flying_hours: yup
        .number()
        .nullable()
        .transform((value, originalValue) =>
          originalValue === '' ? null : value
        )
        .notRequired()
        .test('is-positive', 'Value must be a positive number.', (value) => {
          if (value === null || value === undefined) {
            return true;
          }
          return value >= 0;
        }),
      non_rnd_flying_hours: yup
        .number()
        .nullable()
        .transform((value, originalValue) =>
          originalValue === '' ? null : value
        )
        .notRequired()
        .test('is-positive', 'Value must be a positive number.', (value) => {
          if (value === null || value === undefined) {
            return true;
          }
          return value >= 0;
        }),
    })
  );

  return { schemaResolver };
}
