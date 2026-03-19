import { z } from 'zod';

import { TextFieldVariantUpdaterSchema } from '@/domains/question/domain/types';

export const textFieldNodeFormSchema = z.object<TextFieldVariantUpdaterSchema>({
  placeholder: z.string().trim().min(1, 'Cannot have empty spaces').optional(),
  autoComplete: z.string().trim().min(1, 'Cannot have empty spaces').optional(),
  defaultValue: z.string().trim().min(1, 'Cannot have empty spaces').optional(),
});
