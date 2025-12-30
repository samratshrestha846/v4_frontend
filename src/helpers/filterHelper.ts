import moment from 'moment';
import {
  CC_DURATION_ONE_MONTH,
  CC_DURATION_SIX_MONTHS,
  CC_DURATION_THREE_MONTHS,
  CC_DURATION_TWELVE_MONTHS,
  DURATION_LAST_14_DAYS,
  DURATION_LAST_24_HOURS,
  DURATION_LAST_3_MONTHS,
  DURATION_LAST_6_MONTHS,
  DURATION_LAST_7_DAYS,
  DURATION_LAST_MONTH,
  DURATION_YEAR_TO_DATE,
} from '../constants/durationOptions';

const filterByFromToDateQueryParams = (
  duration = DURATION_LAST_7_DAYS
): { as_of_date_from: string; as_of_date_to: string } => {
  let startDate = moment().startOf('day');
  let endDate = moment().endOf('day');

  const params: any = {};

  if (duration === DURATION_LAST_24_HOURS) {
    startDate = moment().subtract(1, 'days').startOf('day');
  }

  if (duration === DURATION_LAST_7_DAYS) {
    startDate = moment().subtract(7, 'days').startOf('day');
  }

  if (duration === DURATION_LAST_14_DAYS) {
    startDate = moment().subtract(14, 'days').startOf('day');
  }

  if (duration === DURATION_LAST_MONTH) {
    startDate = moment().subtract(1, 'month').startOf('month').startOf('day');
    endDate = moment(startDate).endOf('month').endOf('day');
  }

  if (duration === DURATION_LAST_3_MONTHS) {
    startDate = moment().subtract(3, 'month').startOf('month').startOf('day');
    endDate = moment(startDate).add(2, 'month').endOf('month').endOf('day');
  }

  if (duration === DURATION_LAST_6_MONTHS) {
    startDate = moment().subtract(6, 'month').startOf('month').startOf('day');
    endDate = moment(startDate).add(5, 'month').endOf('month').endOf('day');
  }

  if (duration === DURATION_YEAR_TO_DATE) {
    startDate = moment().startOf('year').startOf('month').startOf('day');
  }

  params.as_of_date_from = moment(startDate).format('YYYY-MM-DD hh:mm:ss');
  params.as_of_date_to = moment(endDate).format('YYYY-MM-DD hh:mm:ss');

  return params;
};

export default filterByFromToDateQueryParams;

export const prepareDateRangeFilterParams = (
  duration: string
): { as_of_date_from: string; as_of_date_to: string } => {
  let startDate = moment().startOf('day');
  const endDate = moment().toDate();
  const params: any = {};

  switch (duration) {
    case CC_DURATION_ONE_MONTH:
      startDate = moment(startDate).startOf('month').startOf('day');
      break;

    case CC_DURATION_THREE_MONTHS:
      startDate = moment().subtract(2, 'month').startOf('month').startOf('day');
      break;

    case CC_DURATION_SIX_MONTHS:
      startDate = moment().subtract(5, 'month').startOf('month').startOf('day');
      break;

    case CC_DURATION_TWELVE_MONTHS:
      startDate = moment()
        .subtract(11, 'month')
        .startOf('month')
        .startOf('day');
      break;

    default:
      break;
  }

  params.as_of_date_from = moment(startDate).format('YYYY-MM-DD hh:mm:ss');
  params.as_of_date_to = moment(endDate).format('YYYY-MM-DD hh:mm:ss');
  return params;
};
