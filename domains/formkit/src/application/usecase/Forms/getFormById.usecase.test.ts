import type { Form } from '@kurocado-studio/formkit-ui-models';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import {
  EMPTY_FORM_NODE,
  KUROCADO_STUDIO_ORGANIZATION_ID_FORMKIT,
} from '../../../domain/constants';
import type { FormKitStore } from '../../../domain/types';
import { getFormByIdUseCase } from './getFormById.usecase';

const createForm = (): Form => ({
  id: 'form-1',
  title: 'Form 1',
  description: 'Test form',
  createdAt: '2024-01-01T00:00:00.000Z',
  updatedAt: '2024-01-02T00:00:00.000Z',
  sections: [
    {
      id: 'section-1',
      title: 'Section 1',
      description: 'Test section',
      createdAt: '2024-01-01T00:00:00.000Z',
      updatedAt: '2024-01-02T00:00:00.000Z',
      order: 0,
      questions: [],
    },
  ],
});

const createFormikStore = () =>
  ({
    handleUpdateFormsStoreApiState: vi.fn(),
    handleSetFormBeingEdited: vi.fn(),
    handleComposeFormsNodeTree: vi.fn(),
    handleUpdateSectionBeingEdited: vi.fn(),
  }) as unknown as FormKitStore;

describe('getFormByIdUseCase', () => {
  let formikStore: FormKitStore;

  beforeEach(() => {
    vi.clearAllMocks();
    formikStore = createFormikStore();
  });

  it('loads a form into the store', () => {
    const form = createForm();
    const { handleLoadFormById } = getFormByIdUseCase({ formikStore });

    const result = handleLoadFormById({ form });

    expect(result).toBe(form);
    expect(formikStore.handleUpdateFormsStoreApiState).toHaveBeenCalledWith(
      { isLoading: true, error: undefined },
      'getFormByIdState',
    );
    expect(formikStore.handleComposeFormsNodeTree).toHaveBeenCalledWith({
      forms: [form],
    });
    expect(formikStore.handleSetFormBeingEdited).toHaveBeenCalledWith({
      id: form.id,
    });
    expect(formikStore.handleUpdateSectionBeingEdited).toHaveBeenCalledWith({
      id: form.sections[0].id,
    });
    expect(formikStore.handleUpdateFormsStoreApiState).toHaveBeenCalledWith(
      { isLoading: false, error: undefined },
      'getFormByIdState',
    );
  });

  it('fetches a form by id and loads it into the store', async () => {
    const form = createForm();
    const axiosHandler = vi.fn().mockResolvedValue(form);
    const { handleGetFormById } = getFormByIdUseCase({ formikStore });

    const result = await handleGetFormById({ id: form.id, axiosHandler });

    expect(result).toBe(form);
    expect(axiosHandler).toHaveBeenCalledWith({
      url: `/api/v1/organizations/${KUROCADO_STUDIO_ORGANIZATION_ID_FORMKIT}/forms/${form.id}`,
      method: 'GET',
    });
    expect(formikStore.handleComposeFormsNodeTree).toHaveBeenCalledWith({
      forms: [form],
    });
  });

  it('returns EMPTY_FORM_NODE when the request fails', async () => {
    const error = new Error('boom');
    const axiosHandler = vi.fn().mockRejectedValue(error);
    const { handleGetFormById } = getFormByIdUseCase({ formikStore });

    const result = await handleGetFormById({ id: 'missing', axiosHandler });

    expect(result).toBe(EMPTY_FORM_NODE);
    expect(formikStore.handleUpdateFormsStoreApiState).toHaveBeenCalledWith(
      { isLoading: false, error },
      'getFormByIdState',
    );
  });
});
