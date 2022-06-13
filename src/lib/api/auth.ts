import { CredentialsManager, fetchJSONApi } from './api';
import { User } from './user';

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

// eslint-disable-next-line import/prefer-default-export
export async function apiSignUp(
  email: string,
  password: string,
  username: string
): Promise<User> {
  const response = await fetchJSONApi<{ data: User }>('/user', 'POST', {
    email,
    password,
    username,
  });

  if (response.status === 200) return response.json.data;
  throw new Error('Unexpected response from server');
}
