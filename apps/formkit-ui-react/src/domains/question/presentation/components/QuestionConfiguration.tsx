import { type Question } from '@kurocado-studio/formkit-ui-models';
import {
  AnimateMotionPresence,
  PolymorphicMotionElement,
  useFadeAnimations,
} from '@kurocado-studio/react-design-system';
import {
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
  const formIdBeingEdited = useFormKitStore((state) => state.formIdBeingEdited);
  const sectionIdBeingEdited = useFormKitStore(
    (state) => state.sectionIdBeingEdited,
  );
  const questionIdBeingEdited = useFormKitStore(
    (state) => state.questionIdBeingEdited,
  );
  const { handleUpdateQuestion } = useFormKitService();
  const {  fadeInDefault } = useFadeAnimations();

  const toQuestions = React.useMemo(() => {
    if (!formIdBeingEdited || !sectionIdBeingEdited) return;
    return [formIdBeingEdited, 'sections', sectionIdBeingEdited, 'questions'];
  }, [formIdBeingEdited, sectionIdBeingEdited]);
  const toCurrentQuestion = React.useMemo(() => {
    if (!toQuestions || !questionIdBeingEdited) return;
    return [...toQuestions, questionIdBeingEdited];
  }, [questionIdBeingEdited, toQuestions]);

  const questionBeingEdited: Question = get(
    formsNodeTree,
    toCurrentQuestion,
    {},
  );
  const questionMap = get(formsNodeTree, toQuestions, {});

  const [isAnimationReady, setIsAnimationReady] = React.useState(false);

  const [defaultValue, setDefaultValue] = React.useState({
    id: '',
    question: '',
  });


  return (
    <PolymorphicMotionElement {...fadeInDefault.initial}>
      <HtmlForm<TextFieldNodeUpdaterSchema>
        schema={textFieldNodeFormSchema}
        id={defaultValue.id}
        key={defaultValue.id}
        className={'space-y-4'}
        defaultValue={isAnimationReady ? defaultValue : questionBeingEdited}
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
      <JsonCardViewer payload={questionMap[defaultValue.id]} />
    </PolymorphicMotionElement>
  );
}
