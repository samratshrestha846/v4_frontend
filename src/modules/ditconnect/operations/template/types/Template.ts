import { QueryParam } from '@uhub/types/common';
import { GeneralResponse } from '@uhub/types/generalResponse';

export type InputTypeField = {
  id: number | null;
  form_label: string | null;
  input_type_id: number | null;
  response_set_id: number | null;
  is_paragraph: boolean | null;
  min: number | null;
  max: number | null;
  enable_date: boolean | null;
  enable_time: boolean | null;
  is_required: boolean | null;
};
// export type TemplateOptions = {
//   enable_date: boolean;
//   enable_time: boolean;
//   is_required: boolean;
// };

export interface InputType {
  id: number;
  name: string;
  options: string[];
  created_at: string;
  updated_at: string;
}
export type TemplateItem = {
  id: number;
  template_id: number;
  form_label: string;
  input_type_id: number;
  options: string;
  input_type?: InputType;
  created_at: string | null;
  updated_at: string | null;
  deleted_at: string | null;
};

export type TemplateResponse = {
  id: number;
  title: string;
  slug: string;
  created_by: {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    email2: string;
    phone_number: string;
    platforms: string[];
    status: number;
    customer_id: number | null;
    last_active: string;
    created_at: string;
    updated_at: string;
    profile_picture: string | null;
    name: string;
  };
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  template_items: TemplateItem[];
};

export type TemplateFormProps = {
  title: string | null;
  inputFields: InputTypeField[];
};
export const DEFAULT_INPUT_FIELDS: InputTypeField = {
  id: null,
  form_label: null,
  input_type_id: null,
  response_set_id: null,
  is_paragraph: null,
  min: null,
  max: null,
  enable_date: null,
  enable_time: null,
  is_required: null,
};
export interface TemplateListResponse
  extends GeneralResponse<TemplateResponse[]> {
  data: TemplateResponse[];
}

export type TemplateParams = QueryParam & {
  user_id: number;
};
