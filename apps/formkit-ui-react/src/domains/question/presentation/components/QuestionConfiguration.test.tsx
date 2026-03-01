import { ReactTestingLibrary } from '@kurocado-studio/qa';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { vi } from 'vitest';

import { useFormKitService } from '@/processes/form-designer/application/useFormKitService';
import { useFormKitStore } from '@/processes/form-designer/state/useFormKitStore';
import {
  mockedForm,
  mockedFormNodeTree,
  mockedQuestion1,
  mockedSection,
} from '@/shared/utils/mocks';

import { QuestionConfiguration } from './QuestionConfiguration';

const { render, screen } = ReactTestingLibrary;

vi.mock('@/processes/form-designer/application/useFormKitService', () => ({
  useFormKitService: vi.fn(),
}));

vi.mock('@/processes/form-designer/presentation/state/useFormKitStore', () => ({
  useFormKitStore: vi.fn(),
}));

// eslint-disable-next-line unicorn/no-null
userEvent.setup({ delay: null });

describe('TextFieldNodeEditor', () => {
  let questionIdField: HTMLElement;
  let questionField: HTMLElement;
  const mockExecuteUpdateQuestion = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    (useFormKitStore as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      formsNodeTree: mockedFormNodeTree,
      composePaths: () => ({
        toCurrentQuestion: [
          mockedForm.id,
          'sections',
          mockedSection.id,
          'questions',
          mockedQuestion1.id,
        ],
        toQuestions: [mockedForm.id, 'sections', mockedSection.id, 'questions'],
      }),
    });

    (useFormKitService as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      executeUpdateQuestion: mockExecuteUpdateQuestion,
    });

    render(<QuestionConfiguration />);

    questionIdField = screen.getByLabelText('Questions Id');
    questionField = screen.getByLabelText('Questions');
  });

  it('renders default values correctly', async () => {
    expect(questionIdField).toBeInTheDocument();
    expect(questionField).toBeInTheDocument();

    expect(questionIdField).toHaveValue(mockedQuestion1.id);
    expect(questionField).toHaveValue(mockedQuestion1.question);
  });
});
