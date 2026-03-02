import { composePaths } from '@kurocado-studio/formkit-ui-store';
// eslint-disable-next-line import/named -- design-system package export
import { DirectionEnum } from '@kurocado-studio/react-design-system';
import {
  Button,
  Card,
  CardContent,
  HtmlForm,
  Panel,
} from '@kurocado-studio/shadcn-systemhaus-react';
import { get } from 'lodash-es';
import React from 'react';

import { usePanelsContext } from '@/app/context/PanelsContext';
import { VariantRenderer } from '@/domains/question/presentation/components/variants/VariantRenderer';
import { JsonCardViewer } from '@/processes/form-designer/presentation/components/JsonCardViewer';
import { useFormKitStore } from '@/processes/form-designer/state/useFormKitStore';
import { PanelsViewsEnum } from '@/shared/contracts/enums';

const { VARIANT_CONFIGURATION } = PanelsViewsEnum;

export const VariantConfigurationPanel = ({
  componentRef,
}: {
  componentRef?: React.RefObject<HTMLElement | null>;
}) => {
  const { handlePanelsState, panelsState } = usePanelsContext();
  const formKitStore = useFormKitStore((state) => state);
  const { toCurrentQuestion } = composePaths(formKitStore);

  return (
    <Panel
      title={''}
      size={'7xl'}
      containerRef={componentRef}
      triggerPanel={() => handlePanelsState({ VARIANT_CONFIGURATION: false })}
      isOpen={panelsState[VARIANT_CONFIGURATION]}
      onEnterDirection={DirectionEnum.LEFT}
      onExitDirection={DirectionEnum.LEFT}
    >
      <HtmlForm id={'variant-configuration-panel'}>
        <Card size={'sm'} className={'bg-secondary w-full md:p-12'}>
          <CardContent className={'md:p-12'}>
            <Card className={'mx-auto max-w-4xl'}>
              <CardContent>
                <VariantRenderer
                  questionNode={get(
                    formKitStore.formsNodeTree,
                    toCurrentQuestion,
                  )}
                />
              </CardContent>
            </Card>
          </CardContent>
        </Card>
        <CardContent>
          <JsonCardViewer
            payload={get(formKitStore.formsNodeTree, toCurrentQuestion)}
          />
        </CardContent>
        <CardContent>
          <JsonCardViewer
            payload={get(formKitStore.formsNodeTree, toCurrentQuestion)}
          />
        </CardContent>
        <Button onClick={() => handlePanelsState({ VARIANT_CREATOR: true })}>
          VARIANT_CREATOR
        </Button>
      </HtmlForm>
    </Panel>
  );
};
