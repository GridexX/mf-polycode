import { CredentialsManager, fetchJSONApi } from './api';

export const InvalidCredentialsError = new Error('Invalid credentials');

export async function apiSignIn(
  email: string,
  password: string,
  credentialsManager: CredentialsManager
): Promise<boolean> {
  const response = await fetchJSONApi<{
    data: {
      accessToken: string;
      refreshToken: string;
    };
  }>('/auth/login', 'POST', {
    email,
    password,
  });

  if (response.status === 200) {
    credentialsManager.setCredentials(response.json.data);
    return true;
  }
  throw InvalidCredentialsError;
}
