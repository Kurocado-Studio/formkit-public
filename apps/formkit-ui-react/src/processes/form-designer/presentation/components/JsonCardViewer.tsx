import {
  useFadeAnimations,
} from '@kurocado-studio/react-design-system';
import { Card, CardContent } from '@kurocado-studio/shadcn-systemhaus-react';
import React from 'react';
import JsonView from 'react18-json-view';
import { twMerge } from 'tailwind-merge';

import type { JSONViewerProperties } from '@/processes/form-designer/presentation/types';

export function JsonCardViewer(properties: JSONViewerProperties): React.ReactNode {
  const { payload, ...rest } = properties;
  const { fadeInDefault } = useFadeAnimations();

  return (
    <Card {...rest} {...fadeInDefault.initial} size={'sm'} className={'bg-secondary/50 overflow-y-auto'}>
      <CardContent>
        <JsonView
          theme={'github'}
          className={twMerge('text-xs')}
          src={payload ?? { type: 'No data available' }}
        />
      </CardContent>
    </Card>
  );
}
