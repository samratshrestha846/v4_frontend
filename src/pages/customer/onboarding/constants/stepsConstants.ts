import { OnboardingStep } from '../../../../types/customer/customerOnboarding';

export const ONBOARDING_STEPS_1 = 1;
export const ONBOARDING_STEPS_2 = 2;
export const ONBOARDING_STEPS_3 = 3;
export const ONBOARDING_STEPS_4 = 4;
export const ONBOARDING_STEPS_5 = 5;

export const ONBOARDING_STEPS: OnboardingStep[] = [
  {
    label: 'Customer Business Details',
    step: ONBOARDING_STEPS_1,
    icon: 'bx bx-building',
  },
  {
    label: 'Customer Account Details',
    step: ONBOARDING_STEPS_2,
    icon: 'bx bx-user-circle',
  },
  {
    label: 'Property Details',
    step: ONBOARDING_STEPS_3,
    icon: 'bx bx-briefcase',
  },
  {
    label: 'Station Manager Details',
    step: ONBOARDING_STEPS_4,
    icon: 'bx bx-user-pin',
  },
  {
    label: 'Verify Details',
    step: ONBOARDING_STEPS_5,
    icon: 'bx bx-check-circle',
  },
];
