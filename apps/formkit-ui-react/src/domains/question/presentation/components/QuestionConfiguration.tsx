import { type Question } from '@kurocado-studio/formkit-ui-models';
import { composePaths } from '@kurocado-studio/formkit-ui-store';
import { PolymorphicMotionElement } from '@kurocado-studio/react-design-system';
import {
  Button,
  GearIcon,
  HtmlForm,
  InputTextField,
} from '@kurocado-studio/shadcn-systemhaus-react';
import { get } from 'lodash-es';
import React from 'react';

import { QuestionNodeSchema } from '@/domains/question/domain/schemas/questionNode.schema.ts';
import { QuestionNodeUpdaterSchema } from '@/domains/question/domain/types';
import { useFormKitService } from '@/processes/form-designer/application/useFormKitService';
import { JsonCardViewer } from '@/processes/form-designer/presentation/components/JsonCardViewer';
import { useFormKitStore } from '@/processes/form-designer/state/useFormKitStore';

export function QuestionConfiguration(): React.ReactNode {
  const formsNodeTree = useFormKitStore((state) => state.formsNodeTree);
  const state = useFormKitStore((state) => state);
  const { toCurrentQuestion } = composePaths(state);
  const { handleUpdateQuestion, handleConfigureQuestionVariant } =
    useFormKitService();

  const questionBeingEdited: Question = get(
    formsNodeTree,
    toCurrentQuestion,
    {},
  );


  const handleConfigureVariant = () => {
    handleConfigureQuestionVariant({ question: questionBeingEdited });
  };

  return (
    <PolymorphicMotionElement className='space-y-2'>
      <HtmlForm<QuestionNodeUpdaterSchema>
        schema={QuestionNodeSchema}
        id={questionBeingEdited.id}
        key={questionBeingEdited.id}
        className={'space-y-4'}
        defaultValue={questionBeingEdited}
        shouldValidate='onInput'
        shouldRevalidate='onInput'
        onSuccess={(updatedQuestion: QuestionNodeUpdaterSchema) => {
          handleUpdateQuestion({
            updatedQuestionProperties: updatedQuestion,
          });
        }}
      >
        <InputTextField name='id' disabled label='Question Id' />
        <InputTextField name='question' label='Question' />
        <InputTextField name='description' label='Description' />
      </HtmlForm>
      <Button disabled onClick={handleConfigureVariant}>
        <GearIcon />
        Configure variant
      </Button>
      <JsonCardViewer payload={questionBeingEdited} />
    </PolymorphicMotionElement>
  );
}
