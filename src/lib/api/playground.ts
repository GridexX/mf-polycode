import { CredentialsManager, fetchApi, fetchApiWithAuth } from './api';

export interface Content {
  id: string;
  name: string;
  reward: number;
  type: string;
  description: string;
  rootComponent: IContainerComponent;
}

interface IBaseComponent {
  id: string;
}

export type IComponent =
  | IContainerComponent
  | IMarkdownComponent
  | IEditorComponent;

export interface IContainerComponent extends IBaseComponent {
  type: 'container';
  data: {
    components: IComponent[];
    orientation: 'horizontal' | 'vertical';
  };
}

export interface IMarkdownComponent extends IBaseComponent {
  type: 'markdown';
  data: {
    markdown: string;
  };
}

export interface IEditorComponent extends IBaseComponent {
  type: 'editor';
  data: {
    validators: IValidator[];
    items: string[];
    editorSettings: {
      languages: {
        defaultCode: string;
        language: string;
        version: string;
      }[];
    };
  };
}

export type IValidator = IHiddenValidator | IVisibleValidator;

export interface IHiddenValidator {
  isHidden: true;
  id: string;
}

export interface IVisibleValidator {
  id: string;
  isHidden: false;
  input: {
    stdin: string[];
  };
  expected: {
    stdout: string[];
  };
}

export function RunValidator(
  validatorId: string,
  code: string,
  credentialsManager: CredentialsManager
) {
  return fetchApiWithAuth<
    {},
    { success: boolean; stdout: string; stderr: string }
  >(`/validator/${validatorId}`, credentialsManager, 'POST', {
    code,
  });
}

export function GetContent(id: string) {
  return fetchApi<{}, Content>(`/content/${id}`);
}
