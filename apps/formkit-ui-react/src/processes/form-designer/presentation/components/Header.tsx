import { useFadeAnimations } from '@kurocado-studio/react-design-system';
import { useWindowSize } from '@kurocado-studio/react-utils';
import {
  Avatar,
  Button,
  Card,
  CardContent,
  GearIcon,
  Grid,
  JustifySpaceBetween,
  PlusIcon,
  TwelveColumns,
} from '@kurocado-studio/shadcn-systemhaus-react';
import React from 'react';
import { twMerge } from 'tailwind-merge';

import { useFormKitService } from '@/processes/form-designer/application/useFormKitService';
import { useFormKitStore } from '@/processes/form-designer/state/useFormKitStore';
import {
  CONTAINER_MAX_WIDTH,
  VIEWPORT_WIDTH_TO_TRIGGER_MOBILE_PANEL,
} from '@/shared/config/constants';

const handleReadCaseStudy = (): void => {
  globalThis.open('https://www.kurocado.studio/case-studies/formkit', '_blank');
};
const handleSeeMonorepo = (): void => {
  globalThis.open(
    'https://github.com/Kurocado-Studio/formkit-public',
    '_blank',
  );
};

export function Header(): React.ReactNode {
  const { formIdBeingEdited } = useFormKitStore();
  const { size } = useWindowSize();

  const shouldOpenFormDesignerPanel =
    size.innerWidth < VIEWPORT_WIDTH_TO_TRIGGER_MOBILE_PANEL;

  const { handleReadForm } = useFormKitService();

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
        <Grid className={twMerge(CONTAINER_MAX_WIDTH)}>
          <JustifySpaceBetween className='z-50 col-span-12 w-full'>
            <Avatar
              alt='kurocado-studio'
              fallback={'KS'}
              src='https://avatars.githubusercontent.com/u/148841069?s=200&v=4'
            />
            <div className={'inline-flex space-x-1'}>
              <Button variant='outline' onClick={handleReadCaseStudy}>
                Case study
              </Button>
              <Button variant='outline' onClick={handleSeeMonorepo}>
                GitHub monorepo
              </Button>
            </div>
          </JustifySpaceBetween>
        </Grid>
      </CardContent>
      <Grid
        {...fadeInDefault.secondary}
        className='fixed inset-x-0 right-4 bottom-4 left-4 z-20 p-1 lg:hidden'
      >
        <TwelveColumns>
          <Card size={'sm'} className={'w-full'}>
            <CardContent className='inline-flex'>
              <JustifySpaceBetween>
                <Button variant='outline' disabled>
                  <PlusIcon />
                  Add Question
                </Button>
                <Button disabled onClick={handleReadCurrentForm}>
                  <GearIcon />
                  Form Settings
                </Button>
              </JustifySpaceBetween>
            </CardContent>
          </Card>
        </TwelveColumns>
      </Grid>
    </Card>
  );
}
