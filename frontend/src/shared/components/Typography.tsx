import { cn } from '../../lib/utils/cn';

type TypographyVariant =
  | 'heading1'
  | 'heading2'
  | 'heading3'
  | 'heading4'
  | 'heading5'
  | 'heading6'
  | 'paragraph'
  | 'span';

interface TypographyProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
  variant?: TypographyVariant;
  className?: string;
}

const globalClassName = 'text-text-default';

const classNameMap: Record<TypographyVariant, string> = {
  heading1: 'text-heading1',
  heading2: 'text-heading2',
  heading3: 'text-heading3',
  heading4: 'text-heading4',
  heading5: 'text-heading5',
  heading6: 'text-heading6',
  paragraph: 'text-paragraph',
  span: 'text-span',
};

const variantMap: Record<TypographyVariant, React.ElementType> = {
  heading1: 'h1',
  heading2: 'h2',
  heading3: 'h3',
  heading4: 'h4',
  heading5: 'h5',
  heading6: 'h6',
  paragraph: 'p',
  span: 'span',
};

export const Typography = ({
  children,
  variant = 'paragraph',
  className,
  ...props
}: TypographyProps) => {
  const Component = variantMap[variant ?? 'paragraph'];
  const classNames = cn(globalClassName, classNameMap[variant ?? 'paragraph'], className);

  return (
    <Component className={classNames} {...props}>
      {children}
    </Component>
  );
};
