import {
  CredentialsManager,
  fetchApi,
  fetchApiWithAuth,
  MissingData,
  UnexpectedResponse,
} from './api';

// Response structures (models)

export interface User {
  id: string;
  username: string;
  description: string;
  points: number;
  rank?: number;
  updatedAt?: string;
  createdAt?: string;
}

export interface UserEmail {
  id: string;
  userId: string;
  email: string;
  isVerified: string;
}

export interface UserSettings {
  id: string;
  userId: string;
  preferedEditingLanguage: string;
  preferedLanguage: string;
}

// Request structure

export interface CreateUserRequest {
  email: string;
  username: string;
  password: string;
}

export interface CreateUserEmailRequest {
  email: string;
}

export interface UpdateUserRequest {
  username: string;
}

export interface UpdateUserSettingsRequest {
  preferedEditingLanguage: string;
  preferedLanguage?: string;
}

// Create functions

export async function createUser(request: CreateUserRequest): Promise<User> {
  const { data, status } = await fetchApi<{}, User>('/user', 'POST', request);

  if (status === 200) {
    if (typeof data === 'undefined') throw MissingData;
    return data;
  }
  throw UnexpectedResponse;
}

export async function createUserEmail(
  credentialsManager: CredentialsManager,
  userId: string,
  request: CreateUserEmailRequest
): Promise<boolean> {
  const { status } = await fetchApiWithAuth<{}, boolean>(
    `/user/${userId}/email`,
    credentialsManager,
    'POST',
    request
  );

  if (status === 200) return true;
  throw UnexpectedResponse;
}

// Get functions

export async function getUsers(
  credentialsManager: CredentialsManager
): Promise<User[]> {
  const { data, status } = await fetchApiWithAuth<{}, User[]>(
    '/user',
    credentialsManager,
    'GET'
  );

  if (status === 200) {
    if (typeof data === 'undefined') throw MissingData;
    return data;
  }
  throw UnexpectedResponse;
}

export async function getUser(
  credentialsManager: CredentialsManager,
  userId: string
): Promise<User> {
  const { data, status } = await fetchApiWithAuth<{}, User>(
    `/user/${userId}`,
    credentialsManager,
    'GET'
  );
  if (status === 200) {
    if (typeof data === 'undefined') throw MissingData;
    return data;
  }
  throw UnexpectedResponse;
}

export async function getUserEmails(
  credentialsManager: CredentialsManager,
  userId: string
): Promise<UserEmail[]> {
  const { data, status } = await fetchApiWithAuth<{}, UserEmail[]>(
    `/user/${userId}/email`,
    credentialsManager,
    'GET'
  );
  if (status === 200) {
    if (typeof data === 'undefined') throw MissingData;
    return data;
  }
  throw UnexpectedResponse;
}

export async function getUserSettings(
  credentialsManager: CredentialsManager,
  userId: string
): Promise<UserSettings> {
  const { data, status } = await fetchApiWithAuth<{}, UserSettings>(
    `/user/${userId}/settings`,
    credentialsManager,
    'GET'
  );
  if (status === 200) {
    if (typeof data === 'undefined') throw MissingData;
    return data;
  }
  throw UnexpectedResponse;
}

// Update functions

export async function updateUser(
  credentialsManager: CredentialsManager,
  userId: string,
  request: UpdateUserRequest
): Promise<User> {
  const { data, status } = await fetchApiWithAuth<{}, User>(
    `/user/${userId}`,
    credentialsManager,
    'PATCH',
    request
  );
  if (status === 200) {
    if (typeof data === 'undefined') throw MissingData;
    return data;
  }
  throw UnexpectedResponse;
}

export async function updateUserSettings(
  credentialsManager: CredentialsManager,
  userId: string,
  request: UpdateUserSettingsRequest
): Promise<UserSettings> {
  const { data, status } = await fetchApiWithAuth<{}, UserSettings>(
    `/user/${userId}/settings`,
    credentialsManager,
    'PATCH',
    request
  );
  if (status === 200) {
    if (typeof data === 'undefined') throw MissingData;
    return data;
  }
  throw UnexpectedResponse;
}

// Delete functions

export async function deleteUser(
  credentialsManager: CredentialsManager,
  userId: string
): Promise<boolean> {
  const { status } = await fetchApiWithAuth<undefined, undefined>(
    `/user/${userId}`,
    credentialsManager,
    'DELETE'
  );
  if (status === 200) return true;
  throw UnexpectedResponse;
}

export async function deleteUserEmail(
  credentialsManager: CredentialsManager,
  userId: string,
  userEmailId: string
): Promise<boolean> {
  const { status } = await fetchApiWithAuth<undefined, undefined>(
    `/user/${userId}/emails/${userEmailId}`,
    credentialsManager,
    'DELETE'
  );
  if (status === 200) return true;
  throw UnexpectedResponse;
}
