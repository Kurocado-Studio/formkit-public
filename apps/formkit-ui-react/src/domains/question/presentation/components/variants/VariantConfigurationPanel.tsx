import {
  type Question,
  VariantEnum,
  composePaths,
} from '@kurocado-studio/formkit-ui-store';
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
import { TextFieldVariantConfiguration } from '@/domains/question/presentation/components/variants/TextFieldVariantConfiguration.tsx';
import { VariantRenderer } from '@/domains/question/presentation/components/variants/VariantRenderer';
import { JsonCardViewer } from '@/processes/form-designer/presentation/components/JsonCardViewer';
import { useFormKitStore } from '@/processes/form-designer/state/useFormKitStore';
import { PanelsViewsEnum } from '@/shared/contracts/enums';

const { VARIANT_CONFIGURATION } = PanelsViewsEnum;

const variantMap = {
  [VariantEnum.TEXT]: TextFieldVariantConfiguration,
};

export const VariantConfigurationPanel = () => {
  const { handlePanelsState, panelsState } = usePanelsContext();
  const formKitStore = useFormKitStore((state) => state);
  const { toCurrentQuestion } = composePaths(formKitStore);
  const variantBeingEdited: Question = get(
    formKitStore.formsNodeTree,
    toCurrentQuestion,
    {},
  );

  const VariantForm = get(variantMap, [variantBeingEdited.variant]);

  return (
    <Panel
      title={''}
      size={'4xl'}
      triggerPanel={() => handlePanelsState({ VARIANT_CONFIGURATION: false })}
      isOpen={panelsState[VARIANT_CONFIGURATION]}
      onEnterDirection={DirectionEnum.TOP}
      onExitDirection={DirectionEnum.BOTTOM}
    >
      <Card
        size={'sm'}
        className={'bg-secondary w-full overflow-y-auto md:p-12'}
      >
        <HtmlForm id={'variant-configuration-panel'}>
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
        </HtmlForm>
      </Card>
      <CardContent>
        <VariantForm />
        <JsonCardViewer
          payload={get(formKitStore.formsNodeTree, toCurrentQuestion)}
        />
      </CardContent>
      <Button onClick={() => handlePanelsState({ VARIANT_CREATOR: true })}>
        VARIANT_CREATOR
      </Button>
    </Panel>
  );
};
