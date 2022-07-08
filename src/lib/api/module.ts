import {
  CredentialsManager,
  fetchApiWithAuth,
  UnexpectedResponse,
} from "./api";
import { SortFilterType, TagFilterType } from "../common/filter";
import { Content } from "./content";

export const MissingModuleId = new Error("Missing module id");

export interface ModuleWithProgress {
  id: string;
  name: string;
  tags: string[];
  description: string;
  progress: number;
  reward: number;
  image?: string;
}

// info about a submodule
export interface Submodule {
  id: string;
  name: string;
  description: string;
  type: string;
  reward: number;
  tags: string[];
  modules: Submodule[];
  contents: Content[];
}

// module without user progress
export interface Module {
  id?: string;
  name: string;
  description: string;
  type: string;
  reward: number;
  tags: string[];
  modules: Submodule[];
  contents: Content[];
}

export interface ModuleFilters {
  limit: number;
  offset: number;
  tags: TagFilterType;
  sort: SortFilterType;
}

function buildQuery(filters: ModuleFilters): string {
  let url = `/module?limit=${filters.limit}&offset=${filters.offset}`;

  const tags = Object.keys(filters.tags).reduce((prev, key) => {
    if (filters.tags[key]) return [...prev, key];
    return prev;
  }, [] as string[]);

  url += `&tags=[${tags.join(",")}]`;
  url += `&sort=${filters.sort}`;

  return url;
}

export function getModules(
  credentialsManager: CredentialsManager,
  filters?: ModuleFilters,
) {
  const endpoint = filters ? buildQuery(filters) : "/module";

  return fetchApiWithAuth<{ total: number }, ModuleWithProgress[]>(
    endpoint,
    credentialsManager,
  );
}

/**
 * Fetches all the modules then filters by matching the search with the name field.
 * user parameter has no effect for now.
 * This function should change when the api permits searching.
 */
export async function searchModule(
  search: string,
  user: string | undefined,
  credentialsManager: CredentialsManager,
) {
  const { data, status } = await fetchApiWithAuth<{}, Submodule[]>(
    "/module",
    credentialsManager,
  );

  if (status !== 200) {
    throw UnexpectedResponse;
  }

  return data.filter((module) =>
    module.name.toLowerCase().includes(search.toLowerCase())
  );
}

export async function getModule(
  id: string,
  credentialsManager: CredentialsManager,
) {
  const { data, status } = await fetchApiWithAuth<{}, Module>(
    `/module/${id}`,
    credentialsManager,
  );

  if (status !== 200) {
    throw UnexpectedResponse;
  }

  return data;
}

function formatModule(module: Module) {
  return {
    name: module.name,
    description: module.description,
    type: module.type,
    reward: module.reward,
    tags: module.tags,
    modules: module.modules.map((m) => m.id),
    contents: module.contents.map((c) => c.id),
    data: {},
  };
}

export async function createModule(
  module: Module,
  credentialsManager: CredentialsManager,
) {
  const moduleToSend = formatModule(module);

  const { data, status } = await fetchApiWithAuth<{}, Module>(
    "/module",
    credentialsManager,
    "POST",
    moduleToSend,
  );

  if (status !== 201) {
    throw UnexpectedResponse;
  }

  return data;
}

export async function updateModule(
  module: Module,
  credentialsManager: CredentialsManager,
) {
  if (!module.id) {
    throw MissingModuleId;
  }

  const moduleToSend = formatModule(module);

  const { data, status } = await fetchApiWithAuth<{}, Module>(
    `/module/${module.id}`,
    credentialsManager,
    "PATCH",
    moduleToSend,
  );

  if (status !== 200) {
    throw UnexpectedResponse;
  }

  return data;
}
