 
import {
  KurocadoStudioThemeProvider,
  defaultSystemHausThemeVariables,
} from '@kurocado-studio/react-design-system';
import React from 'react';
import 'react18-json-view/src/style.css';
import ReactDOM from 'react-dom/client';

import { PanelsProvider } from '@/app/context/PanelsContext';
import { FormDesigner } from '@/processes/form-designer/presentation/views/FormDesigner';
import { FormKitStoreProvider } from '@/processes/form-designer/state/useFormKitStore';

import '../../tailwind.css';

const rootElement = document.querySelector('#root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);

  root.render(
    <React.StrictMode>
      <KurocadoStudioThemeProvider
        themeOverwrite={defaultSystemHausThemeVariables}
        LoaderComponent={() => ''}
      >
        <FormKitStoreProvider>
          <PanelsProvider>
            <FormDesigner />
          </PanelsProvider>
        </FormKitStoreProvider>
      </KurocadoStudioThemeProvider>
    </React.StrictMode>,
  );
}
