import { z } from 'zod';

import type { QuestionNodeUpdaterSchema } from '@/domains/question/domain/types';

export const QuestionNodeSchema =
  z.object<QuestionNodeUpdaterSchema>({
    question: z.string().trim().min(1, {
      message: 'This field cannot be empty or contain only whitespace.',
    }),
  });
