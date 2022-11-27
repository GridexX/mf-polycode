import {
  CredentialsManager,
  fetchApiWithAuth,
  UnexpectedResponse,
} from './api';
import { SortFilterType, TagFilterType } from '../common/filter';
import { Content } from './content';
import { buildPaginatedQuery, PaginatedFilter } from '../pagination';

export const MissingModuleId = new Error('Missing module id');

// Types

export type ModuleType = 'practice' | 'test' | 'submodule';

interface BaseModule {
  id?: string;
  name: string;
  description: string;
  type: ModuleType;
  image?: string;
  tags: string[];
  contents: Content[];
  data: {};
}

export interface PracticeModule extends BaseModule {
  type: 'practice' | 'submodule';
  modules: PracticeModule[];
  progress?: number;
  reward: number;
}
export interface TestModule extends BaseModule {
  type: 'test';
  data: {
    allowedDuration: number;
  };
}

export type Module = PracticeModule | TestModule;

export interface ModuleFilters extends PaginatedFilter {
  types?: ModuleType[];
  tags?: TagFilterType;
  sort?: SortFilterType;
}

// Default values

export const DEFAULT_IMAGE = '/module.png';
export const defaultPracticeModule = {
  name: '',
  description: '',
  tags: [],
  type: 'practice',
  reward: 0,
  modules: [],
  contents: [],
  data: {},
} as PracticeModule;
export const defaultTestModule = {
  name: '',
  description: '',
  tags: [],
  type: 'test',
  reward: 0,
  modules: [],
  contents: [],
  data: {
    allowedDuration: 0,
  },
} as TestModule;

// Utils

function buildModuleUrl(filters: ModuleFilters): string {
  let params = buildPaginatedQuery(filters);

  if (filters.types) {
    params += `&types=[${filters.types.join(',')}]`;
  }
  if (filters.tags) {
    const formattedTags = Object.keys(filters.tags).reduce((prev, key) => {
      if (filters.tags && filters.tags[key]) return [...prev, key];
      return prev;
    }, [] as string[]);
    params += `&tags=[${formattedTags.join(',')}]`;
  }
  if (filters.sort) {
    params += `&sort=${filters.sort}`;
  }

  const query = params.length > 0 ? `?${params.slice(1)}` : '';
  return `/modules${query}`;
}

function formatModule(module: Module) {
  if (module.type === 'test') {
    return {
      ...module,
      id: undefined,
      author: undefined,
      contents: module.contents.map((c: Content) => c.id),
    };
  }
  return {
    ...module,
    id: undefined,
    author: undefined,
    modules: module.modules.map((m) => m.id),
    contents: module.contents.map((c) => c.id),
  };
}

// API

export async function createModule(
  module: Module,
  credentialsManager: CredentialsManager
) {
  const moduleToSend = formatModule(module);
  const { data, status } = await fetchApiWithAuth<{}, Module>(
    '/module',
    credentialsManager,
    'POST',
    moduleToSend
  );

  if (status !== 201) {
    throw UnexpectedResponse;
  }

  return data;
}

export async function getModules(
  credentialsManager: CredentialsManager,
  filters?: ModuleFilters
): Promise<Module[]> {
  const endpoint = filters ? buildModuleUrl(filters) : '/module';
  const { data, status } = await fetchApiWithAuth<{ total: number }, Module[]>(
    endpoint,
    credentialsManager
  );

  if (status !== 200) {
    throw UnexpectedResponse;
  }

  return data;
}

export async function getModule(
  id: string,
  credentialsManager: CredentialsManager
) {
  const { data, status } = await fetchApiWithAuth<{}, Module>(
    `/module/${id}`,
    credentialsManager
  );

  if (status !== 200) {
    throw UnexpectedResponse;
  }

  return data;
}

export async function updateModule(
  module: Module,
  credentialsManager: CredentialsManager
) {
  if (!module.id) {
    throw MissingModuleId;
  }

  const moduleToSend = formatModule(module);

  const { data, status } = await fetchApiWithAuth<{}, Module>(
    `/module/${module.id}`,
    credentialsManager,
    'PATCH',
    moduleToSend
  );

  if (status !== 200) {
    throw UnexpectedResponse;
  }

  return data;
}

export async function deleteModule(
  credentialsManager: CredentialsManager,
  id: string
): Promise<boolean> {
  const { status } = await fetchApiWithAuth<{}, void>(
    `/module/${id}`,
    credentialsManager,
    'DELETE'
  );

  if (status === 204) return true;
  throw UnexpectedResponse;
}

/**
 * Fetches all the modules then filters by matching the search with the name field.
 * user parameter has no effect for now.
 * This function should change when the api permits searching.
 */
export async function searchModule(
  search: string,
  credentialsManager: CredentialsManager
) {
  const { data, status } = await fetchApiWithAuth<{}, Module[]>(
    '/module',
    credentialsManager
  );

  if (status !== 200) {
    throw UnexpectedResponse;
  }

  return data.filter((module) =>
    module.name.toLowerCase().includes(search.toLowerCase())
  );
}
