import { mapKeys, camelCase, snakeCase } from 'lodash';

// errors
export const MissingMetaData = new Error('Missing metadata in response');
export const MissingData = new Error('Missing data in response');
export const UnexpectedResponse = new Error('Unexpected response from server');
export const InvalidCredentialsError = new Error('Invalid credentials');
export const InvalidRefreshTokenError = new Error('Invalid refresh token');

// credentials
export interface Credentials {
  accessToken: string;
  refreshToken: string;
}
export type RefreshUser = () => any;
export type SetCredentials = (newCreds: Credentials) => void;
export interface CredentialsManager {
  credentials: Credentials | undefined;
  setCredentials: SetCredentials;
}

// 1 minute timeout
const fetchTimeout = 60000;

const apiServer =
  process.env.NEXT_PUBLIC_API_URL ??
  (process.env.NODE_ENV === 'production'
    ? 'https://api.polycode.dopolytech.fr'
    : 'http://localhost:8080');

// Fetch the backend api
export async function fetchApi<MetaDataType, DataType>(
  ressource: string,
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' = 'GET',
  body?: any,
  headers: HeadersInit = {}
): Promise<{ metadata: MetaDataType; data: DataType; status: number }> {
  const formatedBody = body
    ? JSON.stringify(mapKeys(body, (_, k) => snakeCase(k)))
    : undefined;
  const response = await Promise.race([
    fetch(apiServer + ressource, {
      method,
      body: formatedBody,
      headers: {
        ...headers,
        'Content-Type': 'application/json',
      },
    }),
    new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Request timeout')), fetchTimeout);
    }) as Promise<Response>,
  ]);
  const json = await response.json();

  return {
    metadata: mapKeys(json.metadata, (_v, k) => camelCase(k)) as MetaDataType,
    data: mapKeys(json.data, (_v, k) => camelCase(k)) as DataType,
    status: response.status,
  };
}

export async function refreshTokens(
  credentialsManager: CredentialsManager
): Promise<boolean> {
  const { data, status } = await fetchApi<{}, Credentials>(
    '/auth/token',
    'POST',
    {
      grantType: 'refresh_token',
      refreshToken: credentialsManager.credentials?.refreshToken,
    }
  );

  if (status === 200) {
    credentialsManager.setCredentials(data);
    return true;
  }

  throw InvalidRefreshTokenError;
}

export async function login(
  email: string,
  password: string,
  credentialsManager: CredentialsManager
): Promise<boolean> {
  const { data, status } = await fetchApi<{}, Credentials>(
    '/auth/token',
    'POST',
    {
      grantType: 'implicit',
      identity: email,
      secret: password,
    }
  );

  if (status === 200) {
    credentialsManager.setCredentials(data);
    return true;
  }
  throw InvalidCredentialsError;
}

// Fetch the backend api with automatic refresh
export async function fetchApiWithAuth<MetaDataType, DataType>(
  ressource: string,
  credentialsManager: CredentialsManager,
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' = 'GET',
  body?: any
): Promise<{ metadata: MetaDataType; data: DataType; status: number }> {
  const tryFetch = async () => {
    if (!credentialsManager.credentials) {
      throw new Error('No credentials');
    }

    return fetchApi<MetaDataType, DataType>(
      apiServer + ressource,
      method,
      body,
      {
        Authorization: `Bearer ${credentialsManager.credentials.accessToken}`,
      }
    );
  };

  const response = await tryFetch();

  if (response.status === 403) {
    const success = await refreshTokens(credentialsManager);

    if (success) return tryFetch();
  }

  return response;
}
