import useSWR from 'swr';
import {
  AsyncResponse,
  CredentialsManager,
  fetchApiWithAuth,
  PaginatedResponse,
  PaginationMeta,
  UnexpectedResponse,
} from './api';

// Variants
export type EditorLanguage = 'java' | 'javascript' | 'python' | 'rust';
export type ComponentType = 'container' | 'editor' | 'markdown';
export type ContentType = 'exercise';

// Components
interface BaseComponent {
  id?: string;
  type: ComponentType;
}

export type Component =
  | ContainerComponent
  | MarkdownComponent
  | CodeEditorComponent;

export interface ContainerComponent extends BaseComponent {
  type: 'container';
  data: {
    components: Component[];
    orientation: 'horizontal' | 'vertical';
  };
}

export interface MarkdownComponent extends BaseComponent {
  type: 'markdown';
  data: {
    markdown: string;
  };
}

export interface EditorSettings {
  languages: {
    defaultCode: string;
    language: EditorLanguage;
    version: string;
  }[];
}

export interface CodeEditorComponent extends BaseComponent {
  type: 'editor';
  data: {
    validators: Validator[];
    items: string[];
    editorSettings: EditorSettings;
  };
}

// Validators
export interface Validator {
  id?: string;
  isHidden: boolean;
  input?: {
    stdin: string[];
  };
  expected?: {
    stdout: string[];
  };
}

// Content
export interface Content {
  id?: string;
  type: ContentType;
  name: string;
  description: string;
  reward: number;
  rootComponent: ContainerComponent;
  data: {};
}

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
    request
  );

  if (status === 201) return data;
  throw UnexpectedResponse;
}

// Get functions
export async function getContents(
  credentialsManager: CredentialsManager
): Promise<PaginatedResponse<Content>> {
  const { data, metadata, status } = await fetchApiWithAuth<
    PaginationMeta,
    Content[]
  >('/content', credentialsManager, 'GET');

  if (status === 200) {
    return {
      data,
      page: metadata.pagination.page,
      limit: metadata.pagination.limit,
      count: metadata.count,
      total: metadata.pagination.total,
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
    request
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
  credentialsManager: CredentialsManager
): AsyncResponse<PaginatedResponse<Content>> {
  const { data, error } = useSWR('/content', () =>
    getContents(credentialsManager)
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
