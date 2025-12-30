type CustomerInputFields = {
  business_name: string;
  email: string;
  phone?: string;
  referrer_id?: number;
  subscribed_products?: string[] | null;
  settings?: {
    show_dashboard: boolean;
  };
  is_active: boolean;
};

type BusinessOwnerInputFields = {
  owner_first_name: string;
  owner_last_name: string;
  owner_email: string;
  owner_phone_number?: string;
};

type PropertyInputFields = {
  name: string;
  region_id: number;
  client_id: number;
  is_enable: boolean;
};

type StationManagerInputFields = {
  first_name: string;
  last_name: string;
  email_address: string;
  phone_number?: string;
};

type InputFields = CustomerInputFields &
  BusinessOwnerInputFields &
  PropertyInputFields &
  StationManagerInputFields;

type OnboardingStep = { label: string; step: number; icon: string };

export type {
  CustomerInputFields,
  PropertyInputFields,
  StationManagerInputFields,
  InputFields,
  OnboardingStep,
  BusinessOwnerInputFields,
};
