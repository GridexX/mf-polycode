import useSWR from 'swr';
import { SortFilterType, StateFilterType } from '../common/filter';
import {
  AsyncResponse,
  CredentialsManager,
  fetchApiWithAuth,
  UnexpectedResponse,
} from './api';
import { ContainerComponent } from './component';
import { PaginatedMeta } from './pagination';

// Types

export type ContentType = 'exercise' | 'question';

interface BaseContent {
  id?: string;
  type: ContentType;
  name: string;
  description: string;
  reward: number;
  rootComponent: ContainerComponent;
  data: {};
}
export interface ExerciceContent extends BaseContent {
  type: 'exercise';
}

export interface QuestionContent extends BaseContent {
  type: 'question';
  data: {
    internalName: string;
    allowedDuration: number;
  };
}

export type Content = ExerciceContent | QuestionContent;

export interface ContentFilters {
  limit: number;
  offset: number;
  state: StateFilterType;
  sort: SortFilterType;
}

// Default values

export const defaultContent = {
  type: 'exercise',
  name: '',
  description: '',
  reward: 0,
  rootComponent: {
    type: 'container',
    data: {
      orientation: 'horizontal',
      components: [],
    },
  },
  data: {},
};

// Utils
function buildFilterQuery(filters: ContentFilters): string {
  let url = `/content?limit=${filters.limit}&offset=${filters.offset}`;

  const states = Object.keys(filters.state).reduce((prev, key) => {
    if (filters.state[key]) return [...prev, key];
    return prev;
  }, [] as string[]);

  url += `&states=[${states.join(',')}]`;
  url += `&sort=${filters.sort}`;

  return url;
}

function formatContent(content: Content): Content {
  return {
    ...content,
    id: undefined,
  };
}

// API calls

// Create functions
export async function createContent(
  credentialsManager: CredentialsManager,
  request: Content
): Promise<Content> {
  const { data, status } = await fetchApiWithAuth<{}, Content>(
    '/content',
    credentialsManager,
    'POST',
    formatContent(request)
  );

  if (status === 201) return data;
  throw UnexpectedResponse;
}

// Get functions
export async function getContents(
  credentialsManager: CredentialsManager,
  filters?: ContentFilters
) {
  const endpoint = filters ? buildFilterQuery(filters) : '/content';

  const { data, /* metadata, */ status } = await fetchApiWithAuth<
    PaginatedMeta,
    Content[]
  >(endpoint, credentialsManager, 'GET');

  if (status === 200) {
    return {
      data,
      /* backend doesn't return these things yet */
      // page: metadata.pagination.page,
      // limit: metadata.pagination.limit,
      // count: metadata.count,
      // total: metadata.pag  ination.total,
    };
  }
  throw UnexpectedResponse;
}

export async function getContent(
  credentialsManager: CredentialsManager,
  id: string
): Promise<Content> {
  const { data, status } = await fetchApiWithAuth<{}, Content>(
    `/content/${id}`,
    credentialsManager,
    'GET'
  );

  if (status === 200) return data;
  throw UnexpectedResponse;
}

// Update functions
export async function updateContent(
  credentialsManager: CredentialsManager,
  id: string,
  request: Content
): Promise<Content> {
  const { data, status } = await fetchApiWithAuth<{}, Content>(
    `/content/${id}`,
    credentialsManager,
    'PUT',
    formatContent(request)
  );

  if (status === 200) return data;
  throw UnexpectedResponse;
}

// Delete functions
export async function deleteContent(
  credentialsManager: CredentialsManager,
  id: string
): Promise<boolean> {
  const { status } = await fetchApiWithAuth<{}, void>(
    `/content/${id}`,
    credentialsManager,
    'DELETE'
  );

  if (status === 204) return true;
  throw UnexpectedResponse;
}

// Hooks

export function useGetContents(
  credentialsManager: CredentialsManager,
  filters?: ContentFilters
) {
  const { data, error } = useSWR(
    `/content?q=${JSON.stringify(filters || null)}`,
    () => getContents(credentialsManager, filters)
  );

  return {
    data,
    loading: !error && !data,
    error,
  };
}

export function useGetContent(
  credentialsManager: CredentialsManager,
  id?: string
): AsyncResponse<Content> {
  const { data, error } = useSWR(`/content/${id}`, () =>
    id ? getContent(credentialsManager, id) : undefined
  );

  return {
    data,
    loading: !error && !data,
    error,
  };
}
/**
 * Fetches all the contents then filters by matching the search with the name field.
 * user parameter has no effect for now.
 * This function should change when the api permits searching.
 */
export async function searchContent(
  search: string,
  credentialsManager: CredentialsManager
) {
  const { data, status } = await fetchApiWithAuth<{}, Content[]>(
    '/content',
    credentialsManager
  );

  if (status !== 200) {
    throw UnexpectedResponse;
  }

  return data.filter((content) =>
    content.name.toLowerCase().includes(search.toLowerCase())
  );
}

export default ContentType;
