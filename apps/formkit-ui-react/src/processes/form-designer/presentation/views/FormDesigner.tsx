import {
  AnimateMotionPresence,
  DirectionEnum,
  useFadeAnimations,
  useFadeIn,
} from '@kurocado-studio/react-design-system';
import {
  Grid,
  ThreeColumns,
  TwelveColumns,
  TwoColumns,
} from '@kurocado-studio/shadcn-systemhaus-react';
import * as React from 'react';
import { twMerge } from 'tailwind-merge';

import { usePanelsContext } from '@/app/context/PanelsContext';
import { FormNodeEditor } from '@/domains/form/presentation/components/FormConfiguration';
import { FormRenderer } from '@/domains/form/presentation/components/FormRenderer';
import { FormTitle } from '@/domains/form/presentation/components/FormTitle';
import { QuestionCreators } from '@/domains/question/presentation/components/QuestionCreator';
import { VariantConfigurationPanel } from '@/domains/question/presentation/components/variants/VariantConfigurationPanel';
import { VariantConfigurationPanel2 } from '@/domains/question/presentation/components/variants/VariantConfigurationPanel2';
import { useFormKitService } from '@/processes/form-designer/application/useFormKitService.ts';
import {
  FormDesignerSidebar,
  FormDesignerSidebarCardContent,
  FormDesignerSidebarCardHeader,
  FormDesignerSidebarCardTitle,
} from '@/processes/form-designer/presentation/components/FormDesignerSidebar';
import { Header } from '@/processes/form-designer/presentation/components/Header';
import { useFormKitStore } from '@/processes/form-designer/state/useFormKitStore';
import { PanelsViewsEnum } from '@/shared/contracts/enums';

export const FormDesigner = () => {
  const { fadeInLeft, fadeInRight, fadeInTop } = useFadeAnimations();
  const { panelsState } = usePanelsContext();
  const formIdBeingEdited = useFormKitStore((state) => state.formIdBeingEdited);

  const { handleReadForm } = useFormKitService();

  const questionEditorFadeInConfig = useFadeIn({
    onEnterDirection: DirectionEnum.LEFT,
    onExitDirection: DirectionEnum.LEFT,
  });

  const formEditorFadeInConfig = useFadeIn({
    onEnterDirection: DirectionEnum.RIGHT,
    onExitDirection: DirectionEnum.RIGHT,
  });

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
          <VariantConfigurationPanel2 />
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
          <AnimateMotionPresence isVisible mode={'sync'}>
            {panelsState[PanelsViewsEnum.FORM_CONFIGURATION] && (
              <FormDesignerSidebar {...formEditorFadeInConfig}>
                <FormDesignerSidebarCardHeader>
                  <FormDesignerSidebarCardTitle>
                    Form configuration
                  </FormDesignerSidebarCardTitle>
                </FormDesignerSidebarCardHeader>
                <FormDesignerSidebarCardContent>
                  <FormNodeEditor />
                </FormDesignerSidebarCardContent>
              </FormDesignerSidebar>
            )}
            {panelsState[PanelsViewsEnum.QUESTION_CONFIGURATION] && (
              <FormDesignerSidebar {...questionEditorFadeInConfig}>
                <FormDesignerSidebarCardHeader>
                  <FormDesignerSidebarCardTitle>
                    Question configuration
                  </FormDesignerSidebarCardTitle>
                </FormDesignerSidebarCardHeader>
                <FormDesignerSidebarCardContent>
                  QUESTION EDITOR PLACEHOLDER
                </FormDesignerSidebarCardContent>
              </FormDesignerSidebar>
            )}
          </AnimateMotionPresence>
        </ThreeColumns>
      </Grid>
    </main>
  );
};
