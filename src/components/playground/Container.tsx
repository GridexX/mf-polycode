import React from 'react';
import { IContainerComponent } from '../../lib/api/playground';

// Cycle looks inevitable since we can render a container in a container
// eslint-disable-next-line import/no-cycle
import HorizontalContainer from './HorizontalContainer';
// eslint-disable-next-line import/no-cycle
import VerticalContainer from './VerticalContainer';

export default function Container({
  component,
}: {
  component: IContainerComponent;
}) {
  const { components } = component.data;

  if (components.length === 0) return null;

  switch (component.data.orientation) {
    case 'horizontal':
      return <HorizontalContainer components={components} />;
    case 'vertical':
      return <VerticalContainer components={components} />;
    default:
      return null;
  }
}