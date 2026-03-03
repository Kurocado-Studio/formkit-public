import {
  type FormKitStore,
  createFormKitStore,
} from '@kurocado-studio/formkit-ui-store';
import React from 'react';
import { type StoreApi, useStore } from 'zustand';

const FormKitStoreContext = React.createContext<
  StoreApi<FormKitStore> | undefined
>(undefined);

type FormKitStoreProviderProperties = React.PropsWithChildren<{
  storeApi?: StoreApi<FormKitStore>;
}>;

export function FormKitStoreProvider({
  children,
  storeApi,
}: FormKitStoreProviderProperties): React.ReactNode {
  const storeReference = React.useRef<StoreApi<FormKitStore>>(
    storeApi ?? createFormKitStore(),
  );

  return React.createElement(
    FormKitStoreContext.Provider,
    { value: storeReference.current },
    children,
  );
}

export const useFormKitStoreApi = (): StoreApi<FormKitStore> => {
  const storeApi = React.useContext(FormKitStoreContext);
  if (!storeApi) {
    throw new Error('useFormKitStore must be used within FormKitStoreProvider');
  }
  return storeApi;
};

export function useFormKitStore(): FormKitStore;
export function useFormKitStore<T>(selector: (state: FormKitStore) => T): T;
export function useFormKitStore<T>(selector?: (state: FormKitStore) => T) {
  const storeApi = useFormKitStoreApi();
  return selector ? useStore(storeApi, selector) : useStore(storeApi);
}
