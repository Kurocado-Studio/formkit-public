import { get, set } from 'lodash-es';

import type { UpdateFormDependencies, UpdateFormPayload } from '../../types';

export const updateFormByIdUseCase = ({ store }: UpdateFormDependencies) => {
  const executeUpdateForm = ({ updatedProperties }: UpdateFormPayload) => {
    const { formsNodeTree, composePaths, handleUpdateFormsNodeTree } =
      store.getState();

    const updatedNodeTree = { ...formsNodeTree };
    const { toCurrentForm } = composePaths();

    const updatedForm = get(updatedNodeTree, toCurrentForm);

    if (updatedForm === undefined) return;

    for (const [key, value] of Object.entries(updatedProperties)) {
      set(updatedForm, [key], value);
    }

    handleUpdateFormsNodeTree(updatedNodeTree);
  };

  return { executeUpdateForm };
};
