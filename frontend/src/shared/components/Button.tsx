import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { cn } from '../../lib/utils/cn';
import { useMemo } from 'react';
import { Loader } from './Loader';

type ButtonVariant = 'primary' | 'cancel' | 'pagination' | 'pagination-active' | 'pagination-nav';
type ButtonSize = 'small' | 'medium' | 'large';

type PaginationNavDirection = 'previous' | 'next';

interface BaseButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
}

interface PaginationNavButtonProps extends BaseButtonProps {
  variant: 'pagination-nav';
  direction: PaginationNavDirection;
}

interface IconButtonProps extends BaseButtonProps {
  icon: React.ReactNode;
  position: 'before' | 'after';
}

type ButtonProps = BaseButtonProps | PaginationNavButtonProps | IconButtonProps;

const globalClassName =
  'rounded-[6px] text-red-100 disabled:opacity-50 disabled:cursor-not-allowed';
const classNameMap: Record<ButtonVariant, string> = {
  primary:
    'inline-flex items-center justify-center px-4 py-3 bg-primary rounded-[8px] h-9 font-medium text-white text-body',
  cancel:
    'inline-flex items-center justify-center py-3 px-4 bg-white border border-cancel-btn rounded-[8px] h-9 font-medium text-text-default text-body',
  'pagination-active': 'text-text-default w-8 h-8 bg-white border border-cancel-btn',
  pagination: 'text-text-default text-body w-8 h-8 bg-white hover:bg-gray-100',
  'pagination-nav':
    'text-text-default text-body w-fit px-4 flex items-center justify-center h-8 bg-white hover:bg-gray-100 text-body',
};

export const Button = ({
  children: childProps,
  variant = 'primary',
  className,
  isLoading = false,
  ...props
}: ButtonProps) => {
  const classNames = cn(globalClassName, classNameMap[variant ?? 'primary'], className);
  const icon = (props as IconButtonProps).icon;
  const position = (props as IconButtonProps).position;
  const direction = (props as PaginationNavButtonProps).direction;

  const children = useMemo(() => {
    if (isLoading) {
      return <Loader />;
    }

    if (icon && position) {
      return (
        <>
          {position === 'before' && icon}
          {childProps}
          {position === 'after' && icon}
        </>
      );
    }

    if (direction && variant === 'pagination-nav') {
      return (
        <>
          {direction === 'previous' && <ChevronLeftIcon />}
          {childProps}
          {direction === 'next' && <ChevronRightIcon />}
        </>
      );
    }

    return childProps;
  }, [childProps, isLoading, position, direction, icon, variant]);

  return (
    <button className={classNames} {...props}>
      {children}
    </button>
  );
};
