 
import { type Question } from '@kurocado-studio/formkit-ui-models';
import { composePaths } from '@kurocado-studio/formkit-ui-store';
import {
  PolymorphicMotionElement,
  useFadeAnimations,
} from '@kurocado-studio/react-design-system';
import {
  Button,
  Card,
  CardContent,
  CardFooter,
  GearIcon,
  HtmlForm,
  InputTextField,
} from '@kurocado-studio/shadcn-systemhaus-react';
import { get } from 'lodash-es';
import React from 'react';

import { textFieldNodeFormSchema } from '@/domains/question/domain/schemas/textFieldNode.schema';
import type { TextFieldNodeUpdaterSchema } from '@/domains/question/domain/types';
import { useFormKitService } from '@/processes/form-designer/application/useFormKitService';
import { JsonCardViewer } from '@/processes/form-designer/presentation/components/JsonCardViewer';
import { useFormKitStore } from '@/processes/form-designer/state/useFormKitStore';

export function QuestionConfiguration(): React.ReactNode {
  const formsNodeTree = useFormKitStore((state) => state.formsNodeTree);
  const state = useFormKitStore((state) => state);
  const { toCurrentQuestion } = composePaths(state);
  const { handleUpdateQuestion, handleConfigureQuestionVariant } =
    useFormKitService();
  const { fadeInDefault } = useFadeAnimations();

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
      <Card {...fadeInDefault.initial}>
        <CardContent>
          <HtmlForm<TextFieldNodeUpdaterSchema>
            schema={textFieldNodeFormSchema}
            id={questionBeingEdited.id}
            key={questionBeingEdited.id}
            className={'space-y-4'}
            // @ts-expect-error while we sync modules
            defaultValue={questionBeingEdited}
            shouldValidate='onInput'
            shouldRevalidate='onInput'
            onSuccess={(updatedQuestion: TextFieldNodeUpdaterSchema) => {
              handleUpdateQuestion({
                updatedQuestionProperties: updatedQuestion,
              });
            }}
          >
            <InputTextField name='id' disabled label='Question Id' />
            <InputTextField name='question' label='Question' />
          </HtmlForm>
        </CardContent>
        <CardFooter>
          <Button disabled onClick={handleConfigureVariant}>
            <GearIcon />
            Configure variant
          </Button>
        </CardFooter>
      </Card>
      <JsonCardViewer payload={questionBeingEdited} />
    </PolymorphicMotionElement>
  );
}
