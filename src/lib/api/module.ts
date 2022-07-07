import { CredentialsManager, fetchApiWithAuth } from "./api";
import { SortFilterType, TagFilterType } from "../common/filter";

export interface ModuleShort {
  id: string;
  name: string;
  tags: string[];
  description: string;
  progress: number;
  reward: number;
  image: string;
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

  return fetchApiWithAuth<{ total: number }, ModuleShort[]>(
    endpoint,
    credentialsManager,
  );
}
