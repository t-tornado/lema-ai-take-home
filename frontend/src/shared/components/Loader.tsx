import { cn } from '../../lib/utils/cn';

interface LoaderProps {
  size?: 'small' | 'medium' | 'large';
  color?: string;
}

export const Loader = ({ size = 'medium', color: backgroundColor = 'white' }: LoaderProps) => {
  const sizeClass = {
    small: 'scale-[50%]',
    medium: 'scale-[100%]',
    large: 'scale-[150%]',
  };

  return (
    <div className={cn('lds-ellipsis', sizeClass[size])}>
      <div style={{ backgroundColor }}></div>
      <div style={{ backgroundColor }}></div>
      <div style={{ backgroundColor }}></div>
    </div>
  );
};
