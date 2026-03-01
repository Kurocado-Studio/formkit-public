import { type Question } from '@kurocado-studio/formkit-ui-models';
import { Controls } from '@kurocado-studio/ui-react-research-and-development';
import { get } from 'lodash-es';
import * as React from 'react';
import { twMerge } from 'tailwind-merge';

import { VariantRenderer } from '@/domains/question/presentation/components/variants/VariantRenderer';
import { useFormKitStore } from '@/processes/form-designer/state/useFormKitStore';

import { EmptyFormCard } from './EmptyFormCard';
import { FormDesignerControls } from '../../../../processes/form-designer/presentation/components/FormDesignerControls';

export const FormRenderer = ({ previewMode }: { previewMode?: boolean }) => {
  const formsNodeTree = useFormKitStore((state) => state.formsNodeTree);
  const formIdBeingEdited = useFormKitStore((state) => state.formIdBeingEdited);
  const sectionIdBeingEdited = useFormKitStore(
    (state) => state.sectionIdBeingEdited,
  );
  const toQuestions = React.useMemo(() => {
    if (!formIdBeingEdited || !sectionIdBeingEdited) return;
    return [formIdBeingEdited, 'sections', sectionIdBeingEdited, 'questions'];
  }, [formIdBeingEdited, sectionIdBeingEdited]);

  const questionsMap = React.useMemo(
    () => get(formsNodeTree, toQuestions ?? '', {}),
    [formsNodeTree, toQuestions],
  );
  const questionsBeingEdited: Array<Question> = Object.values(questionsMap);

  return questionsBeingEdited.length > 0 ? (
    <Controls.HtmlForm formId='form-designer-preview'>
      {questionsBeingEdited.map((question: Question): React.ReactNode => {
        return previewMode ? (
          <VariantRenderer key={question.id} questionNode={question} />
        ) : (
          <FormDesignerControls
            key={question.id}
            question={question}
            className={twMerge(
              'z-20 col-span-12 mb-2 w-full',
              'md:col-span-12',
              'xl:col-span-10 xl:col-start-2',
            )}
          >
            <VariantRenderer questionNode={question} />
          </FormDesignerControls>
        );
      })}
    </Controls.HtmlForm>
  ) : (
    <EmptyFormCard />
  );
};
