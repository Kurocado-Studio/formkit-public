import { useFadeAnimations } from '@kurocado-studio/react-design-system';
import {
  FourColumns,
  Grid,
  ThreeColumns,
  TwelveColumns,
  TwoColumns,
} from '@kurocado-studio/shadcn-systemhaus-react';
import * as React from 'react';
import { twMerge } from 'tailwind-merge';

import { FormRenderer } from '@/domains/form/presentation/components/FormRenderer';
import { FormTitle } from '@/domains/form/presentation/components/FormTitle';
import { QuestionCreators } from '@/domains/question/presentation/components/QuestionCreator';
import { VariantConfigurationPanel } from '@/domains/question/presentation/components/variants/VariantConfigurationPanel';
import { useFormKitService } from '@/processes/form-designer/application/useFormKitService.ts';
import { FormDesignerPanels } from '@/processes/form-designer/presentation/components/FormDesignerPanels.tsx';
import {
  FormDesignerSidebar,
  FormDesignerSidebarCardContent,
  FormDesignerSidebarCardHeader,
  FormDesignerSidebarCardTitle,
} from '@/processes/form-designer/presentation/components/FormDesignerSidebar';
import { Header } from '@/processes/form-designer/presentation/components/Header';
import { useFormKitStore } from '@/processes/form-designer/state/useFormKitStore';

export const FormDesigner = () => {
  const { fadeInLeft, fadeInRight, fadeInTop } = useFadeAnimations();
  const formIdBeingEdited = useFormKitStore((state) => state.formIdBeingEdited);
  const { handleReadForm } = useFormKitService();

  const handleReadCurrentFormById = React.useCallback((): void => {
    handleReadForm({ id: formIdBeingEdited });
  }, [formIdBeingEdited]);

  return (
    <main className={'bg-secondary flex h-screen flex-col space-y-2 p-1'}>
      <Header />
      <Grid className={'relative z-0 min-h-0 flex-1'}>
        <TwoColumns
          className={'relative z-9999 hidden lg:block'}
          {...fadeInLeft.primary}
        >
          <FormDesignerSidebar>
            <FormDesignerSidebarCardHeader>
              <FormDesignerSidebarCardTitle>
                Questions
              </FormDesignerSidebarCardTitle>
            </FormDesignerSidebarCardHeader>
            <FormDesignerSidebarCardContent>
              <QuestionCreators />
            </FormDesignerSidebarCardContent>
          </FormDesignerSidebar>
        </TwoColumns>
        <TwelveColumns
          className={'relative z-10 min-h-8 overflow-auto pt-4 lg:col-span-7'}
        >
          <Grid className={'z-9999 mx-auto gap-8 px-2 py-2 lg:max-w-2xl'}>
            <TwelveColumns className={'space-y-8'} {...fadeInTop.primary}>
              <FormTitle />
              <FormRenderer />
            </TwelveColumns>
          </Grid>
          <div
            aria-label='Click to see the form'
            className={twMerge(
              'cursor-pointer',
              'border border-transparent',
              'transition-colors duration-150',
              'fixed inset-0 z-[-9999]',
            )}
            role='button'
            onClick={handleReadCurrentFormById}
          />
          <VariantConfigurationPanel />
        </TwelveColumns>
        <ThreeColumns
          className={'z-9999 hidden lg:block'}
          {...fadeInRight.primary}
        >
          <FormDesignerPanels />
        </ThreeColumns>
      </Grid>
    </main>
  );
};
