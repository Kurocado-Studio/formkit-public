import { Card } from '@kurocado-studio/shadcn-systemhaus-react';

export const FormDesignerSidebar: typeof Card = (properties) => {
  return <Card {...properties} className={`h-full ${properties.className}`} />;
};

export {
  CardTitle as FormDesignerSidebarCardTitle,
  CardDescription as FormDesignerSidebarCardDescription,
  CardContent as FormDesignerSidebarCardContent,
  CardHeader as FormDesignerSidebarCardHeader,
} from '@kurocado-studio/shadcn-systemhaus-react';
