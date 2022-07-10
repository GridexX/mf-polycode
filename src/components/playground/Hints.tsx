import { Button, Typography, Box, IconButton } from '@mui/material';
import React, { useEffect } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Image from 'next/image';
import { buyItem, getItem } from '../../lib/api/item';
import { useLoginContext } from '../../lib/loginContext';
import { toastError } from '../base/toast/Toast';
import { useEditorContext } from './CodeEditorContext';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from './TopLevelAccordion';

import styles from '../../styles/components/playground/Hints.module.css';
import { useTranslation } from '../../lib/translations';

interface HintData {
  id: string;
  cost: number;
  data: { text?: string };
}

export default function Hints() {
  const context = useEditorContext();

  const { i18n } = useTranslation();

  const itemsIds = context.items;

  const { credentialsManager, user } = useLoginContext();

  const [hints, setHints] = React.useState<(HintData | null)[]>(
    new Array(itemsIds.length).fill(null)
  );
  const [expand, setExpand] = React.useState<boolean>(false);

  useEffect(() => {
    async function fetchHints() {
      const newHints = await Promise.all(
        itemsIds.map(async (value, id) => {
          try {
            const result = await getItem(value, credentialsManager);

            if (result.status !== 200)
              throw new Error('Unexpected return code');

            return {
              id: result.data.id,
              cost: result.data.cost,
              data: result.data.data,
            };
          } catch (e) {
            toastError(
              <Typography>
                {i18n.t('components.playground.hints.fetchError')}
                {id}
              </Typography>
            );
          }
          return null;
        })
      );
      setHints(newHints);
    }

    // only fetch hints if the user is logged in
    if (user) fetchHints();
  }, [credentialsManager, i18n, itemsIds, user]);

  const handleBuyHint = async (index: number) => {
    if (!user) return;

    const id = itemsIds[index];

    try {
      const result = await buyItem(id, credentialsManager);

      if (result.status !== 200) throw new Error('Unexpected return code');

      const newHints = [...hints];
      newHints[index] = {
        id: result.data.id,
        cost: result.data.cost,
        data: result.data.data,
      };
    } catch (e) {
      toastError(
        <Typography>
          {i18n.t('components.playground.hints.buyError')}
          {id}
        </Typography>
      );
    }
  };

  const nextHintToBuyIndex = hints.findIndex((hint) => hint && !hint.data.text);

  return (
    <Accordion expanded={expand} onChange={() => setExpand(!expand)}>
      <AccordionSummary
        className={styles.head}
        expandIcon={
          <IconButton>
            <ExpandMoreIcon />
          </IconButton>
        }
      >
        <Typography variant="h6">
          {i18n.t('components.playground.hints.title')}
        </Typography>
        <Box flexGrow={1} />
      </AccordionSummary>

      <AccordionDetails>
        {hints.map((h, index) => {
          if (h === null || !h.data.text) return null;
          return (
            <Box key={h.id}>
              <Typography>
                {i18n.t('components.playground.hints.item')}
                {index + 1}: {h.data.text}
              </Typography>
            </Box>
          );
        })}

        <Box className={styles.buyContainer}>
          {nextHintToBuyIndex !== -1 && (
            <Button
              variant="outlined"
              size="small"
              onClick={() => {
                handleBuyHint(nextHintToBuyIndex);
              }}
            >
              {i18n.t('components.playground.hints.buy')}{' '}
              {hints[nextHintToBuyIndex]?.cost}
              <Box className={styles.polypoint}>
                <Image width={100} height={100} src="/images/carrot.png" />
              </Box>
            </Button>
          )}
        </Box>
      </AccordionDetails>
    </Accordion>
  );
}
