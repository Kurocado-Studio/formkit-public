import {
  TextFieldQuestionCreatorDto,
  VariantEnum,
} from '@kurocado-studio/formkit-ui-models';
import {
  type FormKitStore,
  composePaths,
} from '@kurocado-studio/formkit-ui-store';
import { type PolymorphicMotionProperties } from '@kurocado-studio/react-design-system';
import {
  AtIcon,
  Button,
  CircleIcon,
  DotsNineIcon,
  DotsThreeVerticalIcon,
  PasswordIcon,
  PhoneIcon,
  SquareIcon,
  SquareSplitVerticalIcon,
  TextSizeSm,
  TextSizeXs,
  TextTIcon,
  TextboxIcon,
  ToggleRightIcon,
  UploadIcon,
} from '@kurocado-studio/shadcn-systemhaus-react';
import { get } from 'lodash-es';
import React from 'react';

import { useCreateQuestion } from '@/domains/question/application/hooks/useCreateQuestion';
import type {} from '@/domains/question/domain/types';
import { useFormKitStore } from '@/processes/form-designer/state/useFormKitStore';

const comingSoonProperties = {
  disabled: true,
  variant: 'secondary',
};

const QuestionCreatorTitle: typeof TextSizeXs = (properties) => (
  <TextSizeSm
    className={'inline-flex w-full items-center space-x-2 [&_svg]:mr-2'}
    {...properties}
  />
);

const QuestionCreatorButton = (
  properties: PolymorphicMotionProperties<'button'>,
) => {
  const isDisabled = useFormKitStore((state) => {
    const isAnyLoading =
      state.getFormByIdState.isLoading || state.createQuestionState.isLoading;
    return isAnyLoading || state.formIdBeingEdited === undefined;
  });

  return (
    <Button
      disabled={isDisabled}
      variant='secondary'
      className={`w-full justify-start`}
      {...properties}
    />
  );
};

export function SingleLineQuestionCreator(): React.ReactNode {
  const store = useFormKitStore((state) => state);
  const { handleCreateQuestion } = useCreateQuestion();
  const { name, question } = React.useMemo(
    () => composeEmptyQuestionCreator(store),
    [store],
  );

  const hidden = false;
  const required = false;

  const handleCreateTextFieldQuestion = () => {
    const variant = VariantEnum.TEXT;
    const questionData = TextFieldQuestionCreatorDto.toInstance({
      question: { name, question, variant, hidden, required },
      variant: {
        variantType: variant,
        variantPayload: {},
      },
    });

    const payload = {
      question: questionData.question,
      variant: questionData.variant,
      formId: store.formIdBeingEdited ?? '',
      sectionId: store.sectionIdBeingEdited ?? '',
    };
    handleCreateQuestion(payload).then();
  };

  return (
    <article className={'w-full space-y-2'}>
      <QuestionCreatorTitle>
        <TextboxIcon />
        Single choice
      </QuestionCreatorTitle>
      <section>
        <QuestionCreatorButton onClick={handleCreateTextFieldQuestion}>
          <TextTIcon />
          <span>Text</span>
        </QuestionCreatorButton>
        <QuestionCreatorButton {...comingSoonProperties}>
          <AtIcon />
          e-mail
        </QuestionCreatorButton>
        <QuestionCreatorButton {...comingSoonProperties}>
          <PhoneIcon />
          Phone
        </QuestionCreatorButton>
        <QuestionCreatorButton {...comingSoonProperties}>
          <PasswordIcon />
          Password
        </QuestionCreatorButton>
        <QuestionCreatorButton {...comingSoonProperties}>
          <CircleIcon />
          Radio
        </QuestionCreatorButton>
        <QuestionCreatorButton {...comingSoonProperties}>
          <ToggleRightIcon />
          Yes/No
        </QuestionCreatorButton>
      </section>
    </article>
  );
}

export function MultipleLineQuestionCreator(): React.ReactNode {
  return (
    <article className={'w-full space-y-2'}>
      <QuestionCreatorTitle>
        <DotsNineIcon />
        Multiple choice
      </QuestionCreatorTitle>
      <div>
        <QuestionCreatorButton {...comingSoonProperties}>
          <SquareSplitVerticalIcon />
          <span>Dropdown</span>
        </QuestionCreatorButton>
        <QuestionCreatorButton {...comingSoonProperties}>
          <SquareIcon />
          Checkbox
        </QuestionCreatorButton>
      </div>
    </article>
  );
}

export function OtherTypesQuestionCreator(): React.ReactNode {
  return (
    <article className={'w-full space-y-2'}>
      <QuestionCreatorTitle>
        <DotsThreeVerticalIcon />
        Other
      </QuestionCreatorTitle>
      <div>
        <QuestionCreatorButton {...comingSoonProperties}>
          <UploadIcon />
          <span>File upload</span>
        </QuestionCreatorButton>
      </div>
    </article>
  );
}

export const QuestionCreators = () => {
  return (
    <>
      <section className={'space-y-4'}>
        <SingleLineQuestionCreator />
        <MultipleLineQuestionCreator />
        <OtherTypesQuestionCreator />
      </section>
    </>
  );
};

function composeEmptyQuestionCreator(store: FormKitStore) {
  const formsNodeTree = store.formsNodeTree;
  const { toQuestions } = composePaths(store);
  const numberOfQuestions =
    Object.keys(get(formsNodeTree, toQuestions, {})).length + 1;

  const question = `Untitled Question ${numberOfQuestions}`;
  const name = `question${numberOfQuestions}`;
  return { question, name };
}
