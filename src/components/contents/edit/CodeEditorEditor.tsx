import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  FormGroup,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import Editor from '@monaco-editor/react';
import React from 'react';
import {
  CodeEditorComponent,
  EditorLanguage,
  EditorSettings,
  getLanguageNameFromEditorLanguage,
  getMonacoLanguageNameFromEditorLanguage,
  Validator,
} from '../../../lib/api/content';
import { useTranslation } from '../../../lib/translations';
import Select from '../../base/Select';

import stylesCommon from '../../../styles/components/contents/edit/common.module.css';

export type Props = {
  editor: CodeEditorComponent;
  onChange: (editor: CodeEditorComponent) => void;
  removeButton?: React.ReactNode;
};

export default function CodeEditorEditor({
  editor,
  onChange,
  removeButton,
}: Props) {
  const { i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = React.useState<EditorLanguage>(
    (editor.data?.editorSettings?.languages[0]?.language ||
      EditorLanguage.Node) as EditorLanguage
  );

  // --- Utils ---
  const hasLanguage = (language: EditorLanguage) =>
    editor.data.editorSettings?.languages?.find(
      (languageSettings) => languageSettings.language === language
    ) !== undefined;

  const getLanguages = () =>
    editor.data.editorSettings?.languages.map((languageSettings) => ({
      name: getLanguageNameFromEditorLanguage(
        languageSettings.language as EditorLanguage
      ),
      value: languageSettings.language,
    })) || [];

  // --- Handlers ---

  // validators
  const setValidators = (validators?: Validator[]) => {
    onChange({
      ...editor,
      data: {
        ...editor.data,
        validators: validators || [],
      },
    });
  };

  const handleValidatorInputChange = (
    validatorIndex: number,
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setValidators(
      editor.data.validators?.map((validator, index) => {
        if (index === validatorIndex) {
          return {
            ...validator,
            input: {
              stdin: event.target.value.split('\n'),
            },
          };
        }
        return validator;
      })
    );
  };

  const handleValidatorExpectedOutputChange = (
    validatorIndex: number,
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setValidators(
      editor.data.validators?.map((validator, index) => {
        if (index === validatorIndex) {
          return {
            ...validator,
            expected: {
              stdout: event.target.value.split('\n'),
            },
          };
        }
        return validator;
      })
    );
  };

  const handleValidatorHiddenChange = (
    validatorIndex: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setValidators(
      editor.data.validators?.map((validator, index) => {
        if (index === validatorIndex) {
          return {
            ...validator,
            isHidden: event.target.checked,
          };
        }
        return validator;
      })
    );
  };

  const handleAddValidator = () => {
    const validator = {
      input: {
        stdin: [''],
      },
      expected: {
        stdout: [''],
      },
      isHidden: false,
    } as Validator;
    setValidators([...(editor.data.validators || []), validator]);
  };

  const handleDeleteValidator = (validatorIndex: number) => {
    setValidators(
      editor.data.validators?.filter((_, index) => index !== validatorIndex)
    );
  };

  // editor settings
  const setEditorSettings = (editorSettings?: EditorSettings) => {
    onChange({
      ...editor,
      data: {
        ...editor.data,
        editorSettings: editorSettings || {
          languages: [],
        },
      },
    });
  };

  const handleEditorLanguageChange = (
    language: EditorLanguage,
    checked: boolean
  ) => {
    if (checked) {
      setEditorSettings({
        ...editor.data.editorSettings,
        languages: [
          ...(editor.data.editorSettings?.languages || []),
          {
            language,
            defaultCode: '',
            version: '',
          },
        ],
      });
    } else {
      const updatedLanguages =
        editor.data.editorSettings?.languages?.filter(
          (languageSettings) => languageSettings.language !== language
        ) || [];
      if (language === currentLanguage) {
        setCurrentLanguage(
          (updatedLanguages[0]?.language ||
            EditorLanguage.Node) as EditorLanguage
        );
      }
      setEditorSettings({
        ...editor.data.editorSettings,
        languages: updatedLanguages,
      });
    }
  };

  const handleEditorDefaultCodeChange = (value: string) => {
    const updatedLanguages =
      editor.data.editorSettings?.languages.map((languageSettings) => {
        if (languageSettings.language === currentLanguage) {
          return {
            ...languageSettings,
            defaultCode: value,
          };
        }
        return languageSettings;
      }) || [];
    setEditorSettings({
      languages: updatedLanguages,
    });
  };

  // --- Render ---

  const renderLanguageCheckbox = (language: EditorLanguage) => (
    <FormControlLabel
      control={
        <Checkbox
          checked={hasLanguage(language)}
          disabled={
            (editor.data.editorSettings?.languages?.length || 0) <= 1 &&
            hasLanguage(language)
          }
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            handleEditorLanguageChange(language, event.target.checked)
          }
        />
      }
      label={getLanguageNameFromEditorLanguage(language)}
    />
  );

  return (
    <Accordion className={stylesCommon.container}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        className={stylesCommon.headerContainer}
      >
        <Stack direction="row" className={stylesCommon.header}>
          <Typography>
            {i18n.t('components.contents.edit.codeEditorEditor.type')}
          </Typography>
          {removeButton || <div />}
        </Stack>
      </AccordionSummary>
      <AccordionDetails>
        <Stack direction="column" spacing={4}>
          <Stack direction="column" spacing={2}>
            <Divider textAlign="left">
              {i18n.t(
                'components.contents.edit.codeEditorEditor.allowedLanguages'
              )}
            </Divider>
            <FormGroup>
              {Object.values(EditorLanguage).map((language) =>
                renderLanguageCheckbox(language)
              )}
            </FormGroup>
          </Stack>
          <Divider textAlign="left">
            {i18n.t('components.contents.edit.codeEditorEditor.defaultCode')}
          </Divider>
          <Stack direction="column" spacing={2}>
            <Box>
              <Select
                value={currentLanguage}
                onChange={(event) => {
                  if (
                    Object.values(EditorLanguage).find(
                      (c) => c === event.target.value
                    )
                  ) {
                    setCurrentLanguage(event.target.value as EditorLanguage);
                  }
                }}
                label={i18n.t(
                  'components.contents.edit.codeEditorEditor.language'
                )}
                items={getLanguages()}
              />
            </Box>
            <Editor
              value={
                editor.data.editorSettings?.languages.find(
                  (languageSettings) =>
                    languageSettings.language === currentLanguage
                )?.defaultCode || ''
              }
              theme="vs-dark"
              onChange={(value) => handleEditorDefaultCodeChange(value || '')}
              language={getMonacoLanguageNameFromEditorLanguage(
                currentLanguage
              )}
              height="20vh"
              width="100%"
            />
          </Stack>
          <Divider textAlign="left">
            {i18n.t(
              'components.contents.edit.codeEditorEditor.validators.title'
            )}
          </Divider>
          <Box>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center">
                    {i18n.t(
                      'components.contents.edit.codeEditorEditor.validators.input'
                    )}
                  </TableCell>
                  <TableCell align="center">
                    {i18n.t(
                      'components.contents.edit.codeEditorEditor.validators.expectedOutput'
                    )}
                  </TableCell>
                  <TableCell align="center">
                    {i18n.t(
                      'components.contents.edit.codeEditorEditor.validators.hidden'
                    )}
                  </TableCell>
                  <TableCell align="center">
                    <Button onClick={handleAddValidator} variant="outlined">
                      {i18n.t(
                        'components.contents.edit.codeEditorEditor.validators.new'
                      )}
                    </Button>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {editor.data?.validators?.map((validator, index) => (
                  <TableRow key={validator.id}>
                    <TableCell align="center">
                      <TextField
                        multiline
                        value={validator.input?.stdin?.join('\n')}
                        onChange={(e) => handleValidatorInputChange(index, e)}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <TextField
                        multiline
                        value={validator.expected?.stdout?.join('\n')}
                        onChange={(e) =>
                          handleValidatorExpectedOutputChange(index, e)
                        }
                      />
                    </TableCell>
                    <TableCell align="center">
                      <Checkbox
                        checked={validator.isHidden}
                        onChange={(e) => handleValidatorHiddenChange(index, e)}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <IconButton onClick={() => handleDeleteValidator(index)}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
}
