import { cn } from '../../lib/utils/cn';

type TypographyVariant = 'heading1' | 'heading2' | 'subtitle' | 'body' | 'span' | 'link';

interface TypographyProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
  variant?: TypographyVariant;
  className?: string;
}

const globalClassName = 'text-text-default';

const classNameMap: Record<TypographyVariant, string> = {
  heading1: 'text-heading1',
  heading2: 'text-heading2',
  subtitle: 'text-subtitle font-medium',
  body: 'text-body font-normal',
  span: 'text-span',
  link: 'text-body',
};

const variantMap: Record<TypographyVariant, React.ElementType> = {
  heading1: 'h1',
  heading2: 'h2',
  subtitle: 'h3',
  body: 'p',
  span: 'span',
  link: 'a',
};

export const Typography = ({
  children,
  variant = 'body',
  className,
  ...props
}: TypographyProps) => {
  const Component = variantMap[variant ?? 'body'];
  const classNames = cn(globalClassName, classNameMap[variant ?? 'body'], className);

  return (
    <Component className={classNames} {...props}>
      {children}
    </Component>
  );
};
