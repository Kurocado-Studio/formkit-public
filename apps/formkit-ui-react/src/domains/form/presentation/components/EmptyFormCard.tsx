import { DirectionEnum, useFadeIn } from '@kurocado-studio/react-design-system';
import {
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  PenNibIcon,
  PlusIcon,
  TextSize2xl,
  TextSize7xl,
} from '@kurocado-studio/shadcn-systemhaus-react';

import { useCreateForm } from '@/domains/form/application/hooks/useCreateForm';

export const EmptyFormCard = () => {
  const { handleCreateForm } = useCreateForm();
  const fadeInFromBottom = useFadeIn({
    onEnterDirection: DirectionEnum.BOTTOM,
  });

  return (
    <Card
      size={'sm'}
      className={'align-center flex justify-center'}
      {...fadeInFromBottom}
    >
      <CardHeader className={'flex flex-col items-center justify-center'}>
        <TextSize7xl>
          <PenNibIcon className={'text-primary'} />
        </TextSize7xl>
        <TextSize2xl fontDisplay>Let’s design a form!</TextSize2xl>
      </CardHeader>
      <CardContent className={'flex flex-col text-center'}>
        <p className={'text-center'}>
          There is no form yet. Let's create a new one by pressing the button
          below.
        </p>
      </CardContent>
      <CardFooter className={'flex justify-center'}>
        <Button onClick={handleCreateForm}>
          <PlusIcon /> Create form
        </Button>
      </CardFooter>
    </Card>
  );
};
