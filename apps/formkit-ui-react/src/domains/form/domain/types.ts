import type { Form } from '@kurocado-studio/formkit-ui-models';
import type { LoadFormPayload } from '@kurocado-studio/formkit-ui-store';

import type { FormNodeFormSchema } from '@/domains/form/domain/schemas/formNode.schema';

export interface FormUpdaterDto {
  updatedProperties: FormNodeFormSchema;
}

export type UseReadForm = () => {
  handleReadForm: (payload: {
    id?: string;
    shouldOpenFormDesignerPanel?: boolean;
  }) => void;
};

export type UseCreateForm = () => {
  handleCreateForm: () => void;
};

export type UseUpdateForm = () => {
  handleUpdateForm: (payload: FormUpdaterDto) => void;
};

export type UseGetFormById = () => {
  handleGetForm: (payload: LoadFormPayload) => Promise<Form>;
};
