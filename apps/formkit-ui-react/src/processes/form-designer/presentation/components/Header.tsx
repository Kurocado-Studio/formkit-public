import { useFadeAnimations } from '@kurocado-studio/react-design-system';
import { useWindowSize } from '@kurocado-studio/react-utils';
import {
  Avatar,
  Button,
  Card,
  CardContent,
  FiveColumns,
  Grid,
} from '@kurocado-studio/shadcn-systemhaus-react';
import React from 'react';
import { twMerge } from 'tailwind-merge';

import { usePanelsContext } from '@/app/context/PanelsContext';
import { useFormKitService } from '@/processes/form-designer/application/useFormKitService';
import { useFormKitStore } from '@/processes/form-designer/state/useFormKitStore';
import {
  CONTAINER_MAX_WIDTH,
  VIEWPORT_WIDTH_TO_TRIGGER_MOBILE_PANEL,
} from '@/shared/config/constants';
import { PanelsViewsEnum } from '@/shared/contracts/enums';

const { QUESTION_CREATOR } = PanelsViewsEnum;

export function Header(): React.ReactNode {
  const { getFormByIdState, formIdBeingEdited } = useFormKitStore();
  const { size } = useWindowSize();

  const shouldOpenFormDesignerPanel =
    size.innerWidth < VIEWPORT_WIDTH_TO_TRIGGER_MOBILE_PANEL;

  const { handleReadForm } = useFormKitService();

  const { handlePanelsState } = usePanelsContext();

  const { fadeInTop, fadeInDefault } = useFadeAnimations();

  const handleReadCurrentForm = () => {
    handleReadForm({
      id: formIdBeingEdited,
      shouldOpenFormDesignerPanel,
    });
  };

  return (
    <Card size={'sm'} {...fadeInTop.initial}>
      <CardContent>
        <Grid className={twMerge('z-9999', CONTAINER_MAX_WIDTH)}>
          <Avatar
            alt='kurocado-studio'
            fallback={'KS'}
            src='https://avatars.githubusercontent.com/u/148841069?s=200&v=4'
          />
        </Grid>
      </CardContent>
      <Grid
        {...fadeInDefault.secondary}
        className='fixed inset-x-0 top-14 z-20 p-1 lg:hidden'
      >
        <FiveColumns>
          <Button
            variant='primary'
            disabled={getFormByIdState.isLoading}
            onClick={() => handlePanelsState(QUESTION_CREATOR)}
          >
            Add Question
          </Button>
        </FiveColumns>
        <FiveColumns className='col-start-8 flex w-full justify-end'>
          <Button
            disabled={getFormByIdState.isLoading}
            onClick={handleReadCurrentForm}
          >
            Form Settings
          </Button>
        </FiveColumns>
      </Grid>
    </Card>
  );
}
