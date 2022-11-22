// Types

import { Validator } from './validator';

export enum EditorLanguage {
  Node = 'NODE',
  Python = 'PYTHON',
  Java = 'JAVA',
  Rust = 'RUST',
}
export type ComponentType = 'container' | 'editor' | 'markdown' | 'mcq';

interface BaseComponent {
  id?: string;
  type: ComponentType;
}

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

export interface MCQComponent extends BaseComponent {
  type: 'mcq';
  data: {
    multipleAnswers: boolean;
    answers: MarkdownComponent[];
    validators: Validator[];
  };
}

export type Component =
  | ContainerComponent
  | MarkdownComponent
  | CodeEditorComponent
  | MCQComponent;

// Helpers

export function getMonacoLanguageNameFromEditorLanguage(
  language: EditorLanguage
): string {
  switch (language) {
    case EditorLanguage.Java:
      return 'java';
    case EditorLanguage.Python:
      return 'python';
    case EditorLanguage.Node:
      return 'javascript';
    case EditorLanguage.Rust:
      return 'rust';
    default:
      return 'plaintext';
  }
}

export function getLanguageNameFromEditorLanguage(
  language: EditorLanguage
): string {
  switch (language) {
    case EditorLanguage.Java:
      return 'Java';
    case EditorLanguage.Python:
      return 'Python';
    case EditorLanguage.Node:
      return 'JavaScript';
    case EditorLanguage.Rust:
      return 'Rust';
    default:
      return '';
  }
}
