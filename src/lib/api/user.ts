import {
  CredentialsManager,
  fetchApi,
  fetchApiWithAuth,
  MissingData,
  UnexpectedResponse,
} from './api';

export const UserAlreadyExists = new Error('User already exists');

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
  preferredEditingLanguage: string;
  preferredLanguage: string;
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
  preferredEditingLanguage?: string;
  preferredLanguage?: string;
}

// Create functions

export async function createUser(request: CreateUserRequest): Promise<User> {
  const { data, status } = await fetchApi<{}, User>('/user', 'POST', request);

  if (status === 201) {
    if (typeof data === 'undefined') throw MissingData;
    return data;
  }
  if (status === 409) throw UserAlreadyExists;
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

export async function resendEmail(emailId: string) {
  const { status } = await fetchApi(
    `/user/email/regenerate-token/${emailId}`,
    'POST'
  );
  if (status === 204) return true;
  throw UnexpectedResponse;
}

// validates the user's email, the code is sent to the user's email 
export async function validateEmail(code:string){
  const { status } = await fetchApi(
    `/user/email/validate/${code}`,
    "POST",
  );
  if (status === 204) return true;
  throw UnexpectedResponse;
}