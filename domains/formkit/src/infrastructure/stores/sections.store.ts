import type { SectionsStore, StoreCreator } from '../../domain/types.ts';

export const sectionsStore: StoreCreator<SectionsStore> = (setState) => {
  return {
    sectionIdBeingEdited: undefined,
    handleUpdateSectionBeingEdited: ({ id }) => {
      setState({ sectionIdBeingEdited: id });
    },
  };
};
