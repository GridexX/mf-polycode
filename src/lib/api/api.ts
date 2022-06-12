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
async function fetchApi<T>(
  ressource: string,
  options?: RequestInit
): Promise<{ json: T; status: number }> {
  const response = await fetch(apiServer + ressource, options);
  const json = await response.json();
  return {
    json,
    status: response.status,
  };
}

export async function fetchJSONApi<T>(
  ressource: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
  body?: any,
  headers: HeadersInit = {}
): Promise<{ json: T; status: number }> {
  return Promise.race([
    fetchApi<T>(ressource, {
      method,
      body: body ? JSON.stringify(body) : undefined,
      headers: {
        ...headers,
        'Content-Type': 'application/json',
      },
    }),
    new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Request timeout')), fetchTimeout);
    }) as Promise<{ json: T; status: number }>,
  ]);
}

async function refreshTokens(
  credentials: Credentials,
  setCredentials: SetCredentials
) {
  const { json } = await fetchJSONApi<{
    accessToken: string;
    refreshToken: string;
  }>('/auth/refresh', 'POST', {
    refreshToken: credentials.refreshToken,
  });

  setCredentials(json);
  return { accessToken: json.accessToken, refreshToken: json.refreshToken };
}

// Fetch the backend api with automatic refresh
export async function fetchApiWithAuth<T>(
  ressource: string,
  tokensManager: CredentialsManager,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
  body?: any
): Promise<{ json: T; status: number }> {
  if (!tokensManager.credentials) {
    throw new Error('No credentials');
  }

  const response = await fetchJSONApi<T>(apiServer + ressource, method, body, {
    Authorization: `Bearer ${tokensManager.credentials.accessToken}`,
  });

  if (response.status === 403)
    await refreshTokens(
      tokensManager.credentials,
      tokensManager.setCredentials
    );

  return response;
}
