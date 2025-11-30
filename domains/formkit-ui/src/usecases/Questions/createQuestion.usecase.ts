import { VariantEnum } from '@kurocado-studio/formkit-ui-models';
import { get } from 'lodash-es';

import { EMPTY_QUESTION_NODE } from '../../constants';
import { FormDesignerPanelsEnum, ModalsAndPanelsViewsEnum } from '../../enums';
import { QuestionCreatorUseCase, QuestionCreatorUseCaseApi } from '../../types';
import { scrollToElement } from '../../utils/scrollToElement';

export const createQuestionUseCase: QuestionCreatorUseCase = ({
  store,
  httpClient,
  organizationId,
  panelsAndModalsContext,
  formDesignerContext,
}) => {
  const { QUESTION } = FormDesignerPanelsEnum;
  const { UNKNOWN } = ModalsAndPanelsViewsEnum;

  const {
    formIdBeingEdited,
    sectionIdBeingEdited,
    handleAddQuestionToForm,
    handleSetQuestionToBeEdited,
    handleUpdateQuestionsStoreApiState,
  } = store.getState();

  const isQuestionSelectorOpen = get(
    panelsAndModalsContext,
    ['panelsAndModalsState', ModalsAndPanelsViewsEnum.QUESTION_SELECTOR_PANEL],
    false,
  );

  const handleFormDesignerState = get(
    formDesignerContext,
    ['handleFormDesignerState'],
    () => {},
  );

  const handlePanelsAndModalsState = get(
    panelsAndModalsContext,
    ['handlePanelsAndModalsState'],
    () => {},
  );

  const createQuestion: QuestionCreatorUseCaseApi['createQuestion'] = async (
    payload,
  ) => {
    try {
      handleUpdateQuestionsStoreApiState(
        { isLoading: true, error: undefined },
        'createQuestionState',
      );
      const { data } = await httpClient({
        url: `/api/v1/organizations/${organizationId}/forms/${formIdBeingEdited}/sections/${sectionIdBeingEdited}/questions`,
        method: 'POST',
        data: payload,
      });

      const { id } = data;

      handleAddQuestionToForm({ question: data });
      handleSetQuestionToBeEdited({ id });
      scrollToElement(id);
      handleUpdateQuestionsStoreApiState(
        { isLoading: false, error: undefined },
        'createQuestionState',
      );

      handleFormDesignerState(QUESTION);

      if (isQuestionSelectorOpen) {
        handlePanelsAndModalsState(UNKNOWN);
      }
      return data;
    } catch (error) {
      handleUpdateQuestionsStoreApiState(
        { isLoading: false, error },
        'createQuestionState',
      );
      return EMPTY_QUESTION_NODE;
    }
  };

  const createTextFieldQuestion: QuestionCreatorUseCaseApi['createTextFieldQuestion'] =
    async (data) => {
      return createQuestion<VariantEnum.TEXT>(data);
    };

  return { createTextFieldQuestion, createQuestion };
};
