import { useAxios } from '@kurocado-studio/axios-react';
import { type Form, formKitService } from '@kurocado-studio/formkit';
import { ReactTestingLibrary } from '@kurocado-studio/qa';

import { useFormKitStore } from '../../useFormikStore';
import { useGetFormById } from './useGetFormById';

const { act, renderHook } = ReactTestingLibrary;

vi.mock('../../useFormikStore', () => ({
  useFormKitStore: vi.fn(),
}));

vi.mock('@kurocado-studio/axios-react', () => ({
  useAxios: vi.fn(),
}));

vi.mock('@kurocado-studio/formkit', () => ({
  formKitService: vi.fn(),
}));

describe('useGetFormById', () => {
  const handleUpdateFormsStoreApiState = vi.fn();
  const resetState = vi.fn();
  const axiosHandler = vi.fn();
  const handleLoadForm = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    (useFormKitStore as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      handleUpdateFormsStoreApiState,
    });

    (useAxios as unknown as ReturnType<typeof vi.fn>).mockReturnValue([
      { resetState, isLoading: false, error: undefined },
      axiosHandler,
    ]);

    (formKitService as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      handleLoadForm,
    });
  });

  it('updates API state from axios hook values', () => {
    renderHook(() => useGetFormById());

    expect(handleUpdateFormsStoreApiState).toHaveBeenCalledWith(
      { isLoading: false, error: undefined },
      'getFormByIdState',
    );
  });

  it('resets axios state and delegates to handleLoadForm', async () => {
    const { result } = renderHook(() => useGetFormById());
    const expectedForm = { id: 'form-1' } as Form;
    handleLoadForm.mockResolvedValue(expectedForm);

    let response;
    await act(async () => {
      response = await result.current.handleGetForm({ id: 'form-1' });
    });

    expect(resetState).toHaveBeenCalled();
    expect(handleLoadForm).toHaveBeenCalledWith(
      {
        id: 'form-1',
      },
      axiosHandler,
    );
    expect(response).toBe(expectedForm);
  });

  it('passes through loading and error states', () => {
    const error = new Error('boom');

    (useAxios as unknown as ReturnType<typeof vi.fn>).mockReturnValueOnce([
      { resetState, isLoading: true, error },
      axiosHandler,
    ]);

    renderHook(() => useGetFormById());

    expect(handleUpdateFormsStoreApiState).toHaveBeenCalledWith(
      { isLoading: true, error },
      'getFormByIdState',
    );
  });
});
