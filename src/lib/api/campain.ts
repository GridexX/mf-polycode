import {
  CredentialsManager,
  fetchApiWithAuth,
  UnexpectedResponse,
} from './api';
import { PaginatedMeta, PaginatedResponse } from './pagination';

// Types

export interface Campain {
  id?: string;
  name: string;
  description: string;
  testId: string;
  creatorId: string;
}

export interface PartialCampain {
  name?: string;
  description?: string;
  testId?: string;
  creatorId?: string;
}

export interface CampainFilters {
  limit: number;
  offset: number;
}

// Utils

function buildFilterQuery(filters?: CampainFilters): string {
  return filters
    ? `/campain?limit=${filters.limit}&offset=${filters.offset}`
    : '/campain';
}

function formatCampain(campain: Campain): Campain {
  return { ...campain, id: undefined };
}

// API

export async function createCampain(
  credentialsManager: CredentialsManager,
  request: Campain
): Promise<Campain> {
  const { data, status } = await fetchApiWithAuth<{}, Campain>(
    '/campain',
    credentialsManager,
    'POST',
    formatCampain(request)
  );

  if (status === 201) return data;
  throw UnexpectedResponse;
}

export async function getCampains(
  credentialsManager: CredentialsManager,
  filters?: CampainFilters
): Promise<PaginatedResponse<Campain>> {
  const url = buildFilterQuery(filters);
  const { metadata, data, status } = await fetchApiWithAuth<
    PaginatedMeta,
    Campain[]
  >(url, credentialsManager, 'GET');

  if (status === 200)
    return {
      data,
      page: metadata.pagination.page,
      limit: metadata.pagination.limit,
      total: metadata.pagination.total,
    };
  throw UnexpectedResponse;
}

export async function getCampain(
  credentialsManager: CredentialsManager,
  id: string
): Promise<Campain> {
  const { data, status } = await fetchApiWithAuth<{}, Campain>(
    `/campain/${id}`,
    credentialsManager,
    'GET'
  );

  if (status === 200) return data;
  throw UnexpectedResponse;
}

export async function updateCampain(
  credentialsManager: CredentialsManager,
  id: string,
  request: PartialCampain
): Promise<Campain> {
  const { data, status } = await fetchApiWithAuth<{}, Campain>(
    `/campain/${id}`,
    credentialsManager,
    'PATCH',
    request
  );

  if (status === 200) return data;
  throw UnexpectedResponse;
}

export async function deleteCampain(
  credentialsManager: CredentialsManager,
  id: string
): Promise<boolean> {
  const { status } = await fetchApiWithAuth<{}, {}>(
    `/campain/${id}`,
    credentialsManager,
    'DELETE'
  );

  if (status === 204) return true;
  throw UnexpectedResponse;
}
