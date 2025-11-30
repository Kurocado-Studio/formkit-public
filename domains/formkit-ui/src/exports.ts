import { type StoreApi } from 'zustand/vanilla';

import { createFormKitStore } from './stores/formKit.store';
import type { FormKitStore } from './types';

export type {
  ApiState,
  FormKitStore,
  FormsNodeTree,
  FormsStore,
  FormsStoreApiNames,
  QuestionStoreApiNames,
  QuestionsStore,
  SectionNodeTree,
  SectionsStore,
  StoreCreator,
} from './types';

export * from '@kurocado-studio/formkit-ui-models';

export { formsStore } from './stores/forms.store';
export { questionsStore } from './stores/questions.store';
export { sectionsStore } from './stores/sections.store';

export type FormKitStoreApi = StoreApi<FormKitStore>;

export const formKitStore = createFormKitStore();

export { composeFormsNodeTree } from './utils/composeFormsNodeTree';
export { scrollToElement } from './utils/scrollToElement';

export * from './constants';

export * from './types';

export * from './usecases';
