import { LabelValueDropdown } from '../types/common';

export const LOG: string = 'log';
export const SITE_NOTES: string = 'site_notes';
export const UDOSE_STOP: string = 'uDose_stop';

export const SITE_NOTES_OPTIONS: LabelValueDropdown[] = [
  { value: LOG, label: 'Log' },
  { value: SITE_NOTES, label: 'Site Notes' },
  { value: UDOSE_STOP, label: 'uDose Stop' },
];
