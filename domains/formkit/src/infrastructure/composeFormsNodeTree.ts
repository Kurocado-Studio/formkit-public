import type {
  Form,
  FormsNodeTree,
  Section,
} from '@kurocado-studio/formkit-ui-models';
import { get, keyBy } from 'lodash-es';

export function composeFormsNodeTree(apiForms: Form[] = []): FormsNodeTree {
  return keyBy(
    apiForms.map((form: Form) => ({
      ...form,
      sections: keyBy(
        get(form, ['sections'], []).map((section: Section) => ({
          ...section,
          questions: keyBy(get(section, ['questions'], []), 'id'),
        })),
        'id',
      ),
    })),
    'id',
  );
}
