import { cn } from '../../lib/utils/cn';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  containerProps?: React.HTMLAttributes<HTMLDivElement>;
  labelProps?: React.LabelHTMLAttributes<HTMLLabelElement>;
}

export const Input = ({
  label,
  error,
  containerProps,
  labelProps,
  className,
  ...props
}: InputProps) => {
  const { className: labelClassName, ...labelPropsRest } = labelProps || {};
  const { className: containerClassName, ...containerPropsRest } = containerProps || {};
  return (
    <div className={cn('flex flex-col gap-2', containerClassName)} {...containerPropsRest}>
      {label && (
        <label
          htmlFor={props.id}
          className={cn(
            'text-text-default text-body font-medium bg-white text-body',
            labelClassName,
          )}
          {...labelPropsRest}
        >
          {label}
        </label>
      )}
      <input
        type="text"
        className={cn(
          'w-full h-10 py-2.5 px-3 border border-faded rounded-lg text-text-default bg-white text-body placeholder:text-faded',
          className,
        )}
        {...props}
      />
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};
