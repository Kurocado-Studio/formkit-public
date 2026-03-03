import { ReactTestingLibrary } from '@kurocado-studio/qa';
import React from 'react';

import { FormKitStoreProvider, useFormKitStore } from './useFormKitStore';

const { renderHook } = ReactTestingLibrary;

describe('useFormKitStore', () => {
  it('should expose primitive store state without derived helpers', () => {
    const { result } = renderHook(() => useFormKitStore(), {
      wrapper: ({ children }: React.PropsWithChildren) =>
        React.createElement(FormKitStoreProvider, undefined, children),
    });

    expect(result.current.getFormByIdState.isLoading).toBe(false);
    expect(result.current.createQuestionState.isLoading).toBe(false);
    expect(result.current.formIdBeingEdited).toBeUndefined();
    expect(result.current.sectionIdBeingEdited).toBeUndefined();
    expect(result.current.questionIdBeingEdited).toBeUndefined();
    expect(
      'composePaths' in (result.current as unknown as Record<string, unknown>),
    ).toBe(false);
    expect(
      'composeApiLoadingState' in
        (result.current as unknown as Record<string, unknown>),
    ).toBe(false);
  });
});
