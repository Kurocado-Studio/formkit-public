import { type FormKitStore, formKitStore } from '@kurocado-studio/formkit-ui';
import { useStore } from 'zustand';

export { formKitStore } from '@kurocado-studio/formkit-ui';

export function useFormKitStore(): FormKitStore {
  return useStore(formKitStore);
}
