type UserAuthenticationRequestQueryParams = {
  response_type: string;
  state: string;
  client_id: string;
  redirect_uri: string;
};

type UserAuthenticationRedirectQueryParams = {
  token_type: string;
  access_token: string;
  state: string;
  expires_in: string;
  id_token?: string;
};

export type {
  UserAuthenticationRequestQueryParams,
  UserAuthenticationRedirectQueryParams,
};
