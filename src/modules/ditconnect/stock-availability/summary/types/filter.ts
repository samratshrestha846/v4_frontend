const SupplementGroup = {
  UCALM: 'uCALM',
  UCALM_PREMIUM: 'uCALM PREMIUM',
  UCALM_WEANER: 'uCALM WEANER',
  UCALM_EXPORT: 'uCALM EXPORT',
  UPRO_WEANER: 'uPRO WEANER',
  UPRO_SOUTHERN: 'uPRO SOUTHERN',
  UPRO_ORANGE: 'uPRO ORANGE',
  UPRO_ORANGE_HIGH_PHOS: 'uPRO ORANGE HIGH PHOS',
  UPRO_MULGA: 'uPRO MULGA',
  UPRO_GREEN: 'uPRO GREEN',
  UPRO_FORAGE: 'uPRO FORAGE',
  UPRO_BLUE: 'uPRO BLUE',
  UBOAT: 'uBLOAT',
  UTETANY: 'uTETANY',
  UTETANY_HIGH_PHOS: 'uTETANY HIGH PHOS',
  UTRACE: 'uTrace',
  UTRACE_PREMIUM: 'uTRACE Premium',
  UTRACE_CLASSIC: 'uTRACE Classic',
  UFLY: 'uFLY',
} as const;

const supplementGroupOptions = Object.entries(SupplementGroup).map(
  ([, value]) => ({
    label: value,
    value,
  })
);
export default supplementGroupOptions;
