import {
  AnimateMotionPresence,
  DirectionEnum,
  useFadeIn,
} from '@kurocado-studio/react-design-system';
import * as React from 'react';

import { usePanelsContext } from '@/app/context/PanelsContext.tsx';
import { FormNodeEditor } from '@/domains/form/presentation/components/FormConfiguration.tsx';
import { QuestionConfiguration } from '@/domains/question/presentation/components/QuestionConfiguration.tsx';
import {
  FormDesignerSidebar,
  FormDesignerSidebarCardContent,
  FormDesignerSidebarCardHeader,
  FormDesignerSidebarCardTitle,
} from '@/processes/form-designer/presentation/components/FormDesignerSidebar.tsx';
import { PanelsViewsEnum } from '@/shared/contracts/enums.ts';

export const FormDesignerPanels = () => {
  const { panelsState } = usePanelsContext();
  const questionEditorFadeInConfig = useFadeIn({
    onEnterDirection: DirectionEnum.LEFT,
    onExitDirection: DirectionEnum.LEFT,
  });

  const formEditorFadeInConfig = useFadeIn({
    onEnterDirection: DirectionEnum.RIGHT,
    onExitDirection: DirectionEnum.RIGHT,
  });
  return (
    <AnimateMotionPresence isVisible>
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
            <QuestionConfiguration />
          </FormDesignerSidebarCardContent>
        </FormDesignerSidebar>
      )}
    </AnimateMotionPresence>
  );
};
