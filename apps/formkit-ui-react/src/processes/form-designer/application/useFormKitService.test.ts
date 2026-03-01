import { ReactTestingLibrary } from '@kurocado-studio/qa';

import { useFormKitService } from './useFormKitService';

const { renderHook } = ReactTestingLibrary;

vi.mock('@/domains/form/application/hooks/useGetFormById', () => ({
  useGetFormById: vi.fn(() => ({ handleGetForm: vi.fn() })),
}));
vi.mock('@/domains/form/application/hooks/useReadForm', () => ({
  useReadForm: vi.fn(() => ({ executeReadForm: vi.fn() })),
}));
vi.mock('@/domains/form/application/hooks/useUpdateForm', () => ({
  useUpdateForm: vi.fn(() => ({ executeUpdateForm: vi.fn() })),
}));
vi.mock('@/domains/question/application/hooks/useCreateQuestion', () => ({
  useCreateTextFieldQuestion: vi.fn(() => ({
    executeCreateTextFieldQuestion: vi.fn(),
  })),
}));
vi.mock('@/domains/question/application/hooks/useReadQuestion', () => ({
  useReadQuestion: vi.fn(() => ({ executeReadQuestion: vi.fn() })),
}));
vi.mock('@/domains/question/application/hooks/useUpdateQuestion', () => ({
  useUpdateQuestion: vi.fn(() => ({ executeUpdateQuestion: vi.fn() })),
}));

describe('useFormKitService', () => {
  it('should expose all expected service methods', () => {
    const { result } = renderHook(() => useFormKitService());

    expect(result.current).toHaveProperty('handleGetForm');
    expect(result.current).toHaveProperty('executeReadForm');
    expect(result.current).toHaveProperty('executeReadQuestion');
    expect(result.current).toHaveProperty('executeUpdateQuestion');
    expect(result.current).toHaveProperty('executeUpdateForm');
    expect(result.current).toHaveProperty('executeCreateTextFieldQuestion');
  });
});
