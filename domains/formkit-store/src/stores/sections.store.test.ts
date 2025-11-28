import { sectionsStore } from './sections.store';
import type { SectionsStore } from '../types';
import { type StoreApi, createStore } from 'zustand/vanilla';
import { beforeEach, describe, expect, it } from 'vitest';

describe('sectionsStore', () => {
  let store: StoreApi<SectionsStore>;

  beforeEach(() => {
    store = createStore(sectionsStore);
  });

  it('should initialize with undefined sectionIdBeingEdited', () => {
    const state = store.getState();

    expect(state.sectionIdBeingEdited).toBeUndefined();
    expect(typeof state.handleUpdateSectionBeingEdited).toBe('function');
  });

  it('should update sectionIdBeingEdited when handleUpdateSectionBeingEdited is called', () => {
    const mockId = 'section-123';

    store.getState().handleUpdateSectionBeingEdited({ id: mockId });

    expect(store.getState().sectionIdBeingEdited).toBe(mockId);
  });

  it('should allow setting undefined (defensive)', () => {
    // call with undefined (should set undefined)
    // @ts-expect-error - testing defensive case where id may be undefined
    store.getState().handleUpdateSectionBeingEdited({ id: undefined });

    expect(store.getState().sectionIdBeingEdited).toBeUndefined();
  });
});
