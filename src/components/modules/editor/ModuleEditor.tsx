import {
  Typography,
  Stack,
  TextField,
  Button,
  Autocomplete,
} from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import ContentListEditor from './ContentListEditor';
import { useTranslation } from '../../../lib/translations';
import {
  createModule,
  getModule,
  Module,
  updateModule,
  defaultPracticeModule,
  defaultTestModule,
  PracticeModule,
  ModuleType,
  searchModule,
  TestModule,
} from '../../../lib/api/module';
import { Content, searchContent } from '../../../lib/api/content';
import Search from './Search';

import styles from '../../../styles/components/modules/Editor/ModuleEditor.module.css';
import { useLoginContext } from '../../../lib/loginContext';
import { toastError, toastSuccess } from '../../base/toast/Toast';
import { CredentialsManager } from '../../../lib/api/api';

interface ModuleEditorProps {
  id?: string; // undefined if new module
  type: ModuleType;
}

const availableTags = ['frontpage', 'javascript', 'rust', 'java', 'python'];

export default function ModuleEditor({ id, type }: ModuleEditorProps) {
  const { i18n } = useTranslation();

  const { credentialsManager } = useLoginContext();

  const router = useRouter();

  const [moduleData, setModuleData] = useState<Module>(() => {
    switch (type) {
      case 'practice':
        return defaultPracticeModule;
      case 'test':
        return defaultTestModule;
      default:
        return defaultPracticeModule;
    }
  });

  const [fetchError, setFetchError] = useState<string>();

  useEffect(() => {
    if (id && credentialsManager.credentials && id !== 'undefined') {
      getModule(id, credentialsManager)
        .then((value) => {
          setModuleData(value);
          setFetchError(undefined);
        })
        .catch((e) => {
          switch (type) {
            case 'practice' || 'submodule':
              toastError(
                <Typography>
                  {i18n.t('components.modules.moduleEditor.getModuleError')}
                </Typography>
              );
              break;
            case 'test':
              toastError(
                <Typography>
                  {i18n.t('components.tests.testEditor.getTestError')}
                </Typography>
              );
              break;
            default:
              toastError(
                <Typography>
                  {i18n.t('components.modules.moduleEditor.invalidModuleType')}
                </Typography>
              );
          }

          setFetchError(e.message);
        });
    }
  }, [id, type, credentialsManager, i18n]);

  const handleSubmoduleChange = (submodules: PracticeModule[]) => {
    setModuleData({ ...moduleData, modules: submodules } as PracticeModule);
  };
  const handleContentChange = (contents: Content[]) => {
    setModuleData({ ...moduleData, contents });
  };
  const handleAddSubmodule = (submodule: PracticeModule) => {
    setModuleData({
      ...moduleData,
      modules: [...(moduleData as PracticeModule).modules, submodule],
    } as PracticeModule);
  };
  const handleAddContent = (content: Content) => {
    setModuleData({
      ...moduleData,
      contents: [...moduleData.contents, content],
    });
  };
  const handleNameChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    // backend limit set to 30 chars
    const value = evt.target.value.substring(0, 30);

    setModuleData({ ...moduleData, name: value });
  };
  const handleAllowedDurationChange = (
    evt: React.ChangeEvent<HTMLInputElement>
  ) => {
    let value = parseInt(evt.target.value, 10);
    if (value < 0) {
      value = 0;
    }

    setModuleData({
      ...moduleData,
      data: { ...moduleData.data, allowedDuration: value * 60 },
    });
  };

  const handleDescriptionChange = (
    evt: React.ChangeEvent<HTMLInputElement>
  ) => {
    setModuleData({ ...moduleData, description: evt.target.value });
  };
  const handleRewardChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    let value = parseInt(evt.target.value, 10);
    if (value < 0) {
      value = 0;
    }
    setModuleData({ ...moduleData, reward: value } as PracticeModule);
  };

  const handleSave = async () => {
    try {
      if (id) {
        await updateModule(moduleData, credentialsManager);

        switch (type) {
          case 'practice' || 'submodule':
            toastSuccess(
              <Typography>
                {i18n.t('components.modules.editor.updated')}
              </Typography>
            );

            router.push(`/module/${id}`);
            break;
          case 'test':
            toastSuccess(
              <Typography>
                {i18n.t('components.tests.editor.updated')}
              </Typography>
            );

            router.push(`/test/${id}`);
            break;
          default:
            toastError(
              <Typography>
                {i18n.t('components.modules.moduleEditor.invalidModuleType')}
              </Typography>
            );

            router.push('/');
        }
      } else {
        const newMod = await createModule(moduleData, credentialsManager);

        switch (type) {
          case 'practice' || 'submodule':
            toastSuccess(
              <Typography>
                {i18n.t('components.modules.editor.created')}
              </Typography>
            );

            router.push(`/module/${newMod.id}`);
            break;
          case 'test':
            toastSuccess(
              <Typography>
                {i18n.t('components.tests.editor.created')}
              </Typography>
            );

            router.push(`/test/${newMod.id}`);
            break;
          default:
            toastError(
              <Typography>
                {i18n.t('components.modules.moduleEditor.invalidModuleType')}
              </Typography>
            );

            router.push('/');
        }
      }
    } catch (e) {
      switch (type) {
        case 'practice' || 'submodule':
          toastError(
            <Typography>
              {i18n.t('components.modules.editor.error.save')}
            </Typography>
          );
          break;
        case 'test':
          toastError(
            <Typography>
              {i18n.t('components.tests.editor.error.save')}
            </Typography>
          );
          break;
        default:
          toastError(
            <Typography>
              {i18n.t('components.modules.moduleEditor.invalidModuleType')}
            </Typography>
          );
      }
    }
  };

  if (fetchError) {
    return (
      <Box className={styles.container}>
        <Typography>{fetchError}</Typography>

        <Button variant="contained" onClick={() => router.back()}>
          Go back
        </Button>
      </Box>
    );
  }

  switch (type) {
    case 'practice' || 'submodule':
      return (
        <Box className={styles.container}>
          <Box className={styles.titleContainer}>
            <Typography
              variant="h3"
              component="span"
              color="text.primary"
              className={styles.title}
            >
              {id
                ? i18n.t('components.modules.editor.titleEdit')
                : i18n.t('components.modules.editor.titleNew')}
            </Typography>{' '}
            <Typography variant="caption" component="span">
              {id}
            </Typography>
          </Box>
          <Stack spacing={3}>
            <Box className={styles.metadataRow}>
              {/* TODO: require at least 3 characters */}
              <TextField
                className={styles.moduleName}
                label={i18n.t('components.modules.editor.name')}
                variant="standard"
                value={moduleData.name}
                onChange={handleNameChange}
              />

              <TextField
                label={i18n.t('components.modules.editor.reward')}
                variant="standard"
                value={(moduleData as PracticeModule).reward}
                onChange={handleRewardChange}
                className={styles.reward}
                type="number"
              />
            </Box>

            {/* TODO : require at least 3 chararcters */}

            <TextField
              label={i18n.t('components.modules.editor.description')}
              variant="outlined"
              multiline
              maxRows={5}
              minRows={5}
              value={moduleData.description}
              onChange={handleDescriptionChange}
            />
            <Autocomplete
              multiple
              options={availableTags}
              value={moduleData.tags}
              renderInput={(params) => (
                <TextField
                  label={i18n.t('components.modules.editor.tags')}
                  {...params}
                />
              )}
              onChange={(event, value) => {
                setModuleData({ ...moduleData, tags: value });
              }}
              fullWidth
            />
          </Stack>

          <Typography
            variant="h4"
            color="primary"
            className={styles.categoryTitle}
          >
            {i18n.t('components.modules.submodules')}
          </Typography>
          <ContentListEditor
            items={(moduleData as PracticeModule).modules}
            setItems={handleSubmoduleChange}
          />
          <Box
            sx={{ borderColor: 'divider' }}
            className={styles.insertInterface}
          >
            <Typography variant="h6">
              {i18n.t('components.modules.editor.insertSubmodule')}
            </Typography>

            <Search
              alreadyAdded={(moduleData as PracticeModule).modules}
              addNew={handleAddSubmodule}
              searchFunction={async (
                search: string,
                cm: CredentialsManager
              ) => {
                const modules = await searchModule(search, cm);
                return modules
                  .filter(
                    (module: Module) =>
                      module.type === 'practice' || module.type === 'submodule'
                  )
                  .map((module: Module) => module as PracticeModule);
              }}
              type="module"
              excludeId={moduleData.id}
            />
          </Box>

          <Typography
            variant="h4"
            color="primary"
            className={styles.categoryTitle}
          >
            {i18n.t('components.modules.contents')}
          </Typography>
          <ContentListEditor
            items={moduleData.contents}
            setItems={handleContentChange}
          />
          <Box
            sx={{ borderColor: 'divider' }}
            className={styles.insertInterface}
          >
            <Typography variant="h6">
              {i18n.t('components.modules.editor.insertContent')}
            </Typography>

            <Search
              alreadyAdded={moduleData.contents}
              addNew={handleAddContent}
              searchFunction={searchContent}
              type="content"
            />
          </Box>

          <Button
            className={styles.validateButton}
            variant="contained"
            fullWidth
            onClick={handleSave}
          >
            {id
              ? i18n.t('components.modules.editor.update')
              : i18n.t('components.modules.editor.create')}
          </Button>
        </Box>
      );
    case 'test':
      return (
        <Box className={styles.container}>
          <Box className={styles.titleContainer}>
            <Typography
              variant="h3"
              component="span"
              color="text.primary"
              className={styles.title}
            >
              {id
                ? i18n.t('components.tests.editor.titleEdit')
                : i18n.t('components.tests.editor.titleNew')}
            </Typography>{' '}
            <Typography variant="caption" component="span">
              {id}
            </Typography>
          </Box>
          <Stack spacing={3}>
            <Box className={styles.metadataRow}>
              {/* TODO: require at least 3 characters */}
              <TextField
                className={styles.moduleName}
                label={i18n.t('components.tests.editor.name')}
                variant="standard"
                value={moduleData.name}
                onChange={handleNameChange}
              />
              <TextField
                label={i18n.t('components.tests.editor.allowedDuration')}
                variant="standard"
                value={(moduleData as TestModule).data.allowedDuration / 60}
                onChange={handleAllowedDurationChange}
                className={styles.reward}
                type="number"
              />
            </Box>

            {/* TODO : require at least 3 chararcters */}

            <TextField
              label={i18n.t('components.tests.editor.description')}
              variant="outlined"
              multiline
              maxRows={5}
              minRows={5}
              value={moduleData.description}
              onChange={handleDescriptionChange}
            />

            <TextField
              value={moduleData.tags}
              label={i18n.t('components.tests.editor.tags')}
              onChange={(event) => {
                setModuleData({
                  ...moduleData,
                  tags: event.target.value.split(','),
                });
              }}
              fullWidth
            />
          </Stack>

          {/* TODO Add questions to a test, reuse the Search component */}

          <Button
            className={styles.validateButton}
            variant="contained"
            fullWidth
            onClick={handleSave}
          >
            {id
              ? i18n.t('components.tests.editor.update')
              : i18n.t('components.tests.editor.create')}
          </Button>
        </Box>
      );
    default:
      toastError(
        <Typography>
          {i18n.t('components.modules.moduleEditor.invalidModuleType')}
        </Typography>
      );

      return (
        <Box className={styles.container}>
          <Typography>{fetchError}</Typography>

          <Button variant="contained" onClick={() => router.back()}>
            Go back
          </Button>
        </Box>
      );
  }
}
