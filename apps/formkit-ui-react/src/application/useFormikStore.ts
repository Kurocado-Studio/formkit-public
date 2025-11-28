import {
  type FormKitStore,
  formKitStore,
} from '@kurocado-studio/formkit-store';
import { useStore } from 'zustand';

export { formKitStore } from '@kurocado-studio/formkit-store';

export function useFormKitStore(): FormKitStore;

export function useFormKitStore<T>(selector: (state: FormKitStore) => T): T;

export function useFormKitStore<T>(selector?: (state: FormKitStore) => T) {
  return selector ? useStore(formKitStore, selector) : useStore(formKitStore);
}
