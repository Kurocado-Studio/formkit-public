import type { Question } from '@kurocado-studio/formkit-ui-models';
import {
  type CardProperties,
  useFadeAnimations,
} from '@kurocado-studio/react-design-system';
import {
  Button,
  Card,
  CardContent,
  CardFooter,
  EraserIcon,
  GearIcon,
  HighlighterIcon,
  JustifySpaceBetween,
} from '@kurocado-studio/shadcn-systemhaus-react';
import type React from 'react';
import { twMerge } from 'tailwind-merge';

import { usePanelsContext } from '@/app/context/PanelsContext';
import { useFormKitService } from '@/processes/form-designer/application/useFormKitService';
import { useFormKitStore } from '@/processes/form-designer/state/useFormKitStore';
import { PanelsViewsEnum } from '@/shared/contracts/enums';

export interface QuestionControls extends CardProperties {
  className?: string;
  id?: string;
  question: Question;
}

export function FormDesignerControls(
  properties: React.PropsWithChildren<QuestionControls>,
): React.ReactNode {
  const { handleToggleOffStateExceptFor } = usePanelsContext();
  const { handleReadQuestion } = useFormKitService();
  const { questionIdBeingEdited } = useFormKitStore((store) => store);
  const { fadeInDefault, fadeInTop } = useFadeAnimations();

  const { question, className, ...restProperties } = properties;

  const readQuestionHandler = (): void => {
    handleReadQuestion({ question });
  };

  return (
    <Card
      size={'sm'}
      {...fadeInDefault.initial}
      {...restProperties}
      id={question.id}
      className={twMerge(
        className,
        question.id === questionIdBeingEdited &&
          'ring-2 ring-blue-600 outline-none',
        'outline-none hover:bg-gray-50',
      )}
    >
      <CardContent>{properties.children}</CardContent>
      <CardFooter {...fadeInTop.primary}>
        <JustifySpaceBetween className={'w-full'}>
          <div>
            <Button
              variant={'outline'}
              size='xs'
              aria-label='Icon xs'
              onClick={() => {
                readQuestionHandler();
                handleToggleOffStateExceptFor([
                  PanelsViewsEnum.QUESTION_CONFIGURATION,
                  PanelsViewsEnum.VARIANT_CONFIGURATION,
                ]);
              }}
            >
              <GearIcon />
              Configure variant
            </Button>
          </div>
          <div className={'space-x-1'}>
            <Button
              onClick={readQuestionHandler}
              variant={'outline'}
              size='xs'
              aria-label='Icon xs'
            >
              <HighlighterIcon />
              Edit
            </Button>
            <Button
              disabled
              variant={'destructive'}
              size='xs'
              aria-label='Icon xs'
            >
              <EraserIcon />
              Delete
            </Button>
          </div>
        </JustifySpaceBetween>
      </CardFooter>
    </Card>
  );
}
