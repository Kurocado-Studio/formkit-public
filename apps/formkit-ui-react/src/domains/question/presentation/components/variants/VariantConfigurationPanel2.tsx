import { composePaths } from '@kurocado-studio/formkit-ui-store';
// eslint-disable-next-line import/named -- design-system package export
import { DirectionEnum } from '@kurocado-studio/react-design-system';
import {
  CardContent,
  HtmlForm,
  PanelDrawer,
} from '@kurocado-studio/shadcn-systemhaus-react';
import { get } from 'lodash-es';
import React from 'react';

import { usePanelsContext } from '@/app/context/PanelsContext';
import { JsonCardViewer } from '@/processes/form-designer/presentation/components/JsonCardViewer';
import { useFormKitStore } from '@/processes/form-designer/state/useFormKitStore';
import { PanelsViewsEnum } from '@/shared/contracts/enums';

const { VARIANT_CREATOR } = PanelsViewsEnum;

export const VariantConfigurationPanel2 = () => {
  const { handlePanelsState, panelsState } = usePanelsContext();
  const formKitStore = useFormKitStore((state) => state);
  const { toCurrentQuestion } = composePaths(formKitStore);

  return (
    <PanelDrawer
      size={'7xl'}
      title={''}
      triggerPanel={() => handlePanelsState({ VARIANT_CREATOR: true })}
      isOpen={panelsState[VARIANT_CREATOR]}
      onEnterDirection={DirectionEnum.LEFT}
      onExitDirection={DirectionEnum.RIGHT}
    >
      <HtmlForm id={'variant-configuration-panel'}>
        {/*<Card size={'sm'} className={'bg-secondary md:p-12'}>*/}
        {/*  <CardContent className={'md:p-12'}>*/}
        {/*    <Card className={'mx-auto max-w-4xl'}>*/}
        {/*      <CardContent>*/}
        {/*        <VariantRenderer*/}
        {/*          questionNode={get(*/}
        {/*            formKitStore.formsNodeTree,*/}
        {/*            toCurrentQuestion,*/}
        {/*          )}*/}
        {/*        />*/}
        {/*      </CardContent>*/}
        {/*    </Card>*/}
        {/*  </CardContent>*/}
        {/*</Card>*/}
        <CardContent>
          <JsonCardViewer
            payload={get(formKitStore.formsNodeTree, toCurrentQuestion)}
          />
        </CardContent>
      </HtmlForm>
    </PanelDrawer>
  );
};
