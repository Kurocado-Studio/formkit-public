import { type FormKitStore, formKitStore } from '@kurocado-studio/formkit';
import { useStore } from 'zustand';

export { formKitStore } from '@kurocado-studio/formkit';

export function useFormKitStore(): FormKitStore;

export function useFormKitStore<T>(selector: (state: FormKitStore) => T): T;

export function useFormKitStore<T>(selector?: (state: FormKitStore) => T) {
  return selector ? useStore(formKitStore, selector) : useStore(formKitStore);
}
