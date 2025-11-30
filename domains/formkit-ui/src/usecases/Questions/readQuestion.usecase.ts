import type {
  ReadQuestionDependencies,
  ReadQuestionPayload,
} from '../../types';
import { scrollToElement } from '../../utils/scrollToElement';

export const createReadQuestionUseCase = ({
  store,
  onOpenDesigner,
  onOpenPanels,
}: ReadQuestionDependencies) => {
  const executeReadQuestion = ({ question }: ReadQuestionPayload) => {
    const { handleSetQuestionToBeEdited } = store.getState();

    const id = question.id;

    handleSetQuestionToBeEdited({ id });
    scrollToElement(id);
    onOpenDesigner?.();
    onOpenPanels?.();
  };

  return { executeReadQuestion };
};
