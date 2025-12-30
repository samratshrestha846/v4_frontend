import { isNull } from 'lodash';
import moment from 'moment';

const formattedDate = (d: Date | string | null | undefined) => {
  if (isNull(d)) return '-';
  return moment.utc(d).local().format('ddd, MMM Do YYYY [at] h:mm a');
};

const dateString = (d: Date | string | null | undefined) => {
  return moment(d).format('DD-MM-YYYY');
};

const formattedYmdDate = (d: Date | string | null | undefined) => {
  return moment.utc(d).local().format('YYYY-MM-DD');
};

const now = () => {
  return moment();
};

const formatDateForGraph = (d: Date | string | null | undefined) => {
  return moment.utc(d).local().format('Do MMM YY, HH:mm');
};

const yesterday = () => {
  return moment().subtract(1, 'days').toDate();
};

const tabularDate = (d: Date | string | null | undefined) => {
  return moment.utc(d).local().format('MMM Do YY, hh:mm a');
};

const formattedDateString = (d: Date | string | null | undefined) => {
  return moment(d).format('MMM Do YYYY');
};

const humanReadableDate = (d: Date | string | null | undefined) => {
  return moment.utc(d).local().fromNow();
};

const formatGraphDate = (d: Date | string | null | undefined) => {
  return moment.utc(d).local().format('DD MMM YYYY');
};

const shortDateFormat = (d: Date | string | null | undefined) => {
  return moment.utc(d).local().format('DD MMM YY');
};

const formattedShortDate = (d: Date | string | null | undefined) => {
  return moment.utc(d).local().format('DD MMM YYYY');
};

const formattedDatetime = (d: Date | string | null | undefined) => {
  return moment.utc(d).local().format('DD MMM YYYY, hh:mm A');
};

const formattedTime = (d: Date | string | null | undefined) => {
  return moment.utc(d).local().format('hh:mm A');
};

const formattedHmsTime = (d: Date | string | null | undefined) => {
  return moment(d, 'HH:mm:ss').format('h:mm A');
};

const formatFromNow = (d: Date | string | null | undefined) => {
  return moment.utc(d).local().fromNow();
};

const dayNameFromDate = (d: Date | string | null | undefined) => {
  return moment.utc(d).local().format('ddd');
};

const dayAndMonthFromDate = (d: Date | string | null | undefined) => {
  return moment.utc(d).local().format('MMM D');
};

export {
  formattedDate,
  dateString,
  now,
  yesterday,
  formatDateForGraph,
  tabularDate,
  formattedDateString,
  humanReadableDate,
  formatGraphDate,
  shortDateFormat,
  formattedShortDate,
  formattedDatetime,
  formattedTime,
  formattedYmdDate,
  formattedHmsTime,
  formatFromNow,
  dayNameFromDate,
  dayAndMonthFromDate,
};
