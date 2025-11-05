import { cn } from '../../lib/utils/cn';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  containerProps?: React.HTMLAttributes<HTMLDivElement>;
  labelProps?: React.LabelHTMLAttributes<HTMLLabelElement>;
}

export const Textarea = ({
  label,
  error,
  className,
  containerProps,
  labelProps,
  ...props
}: TextareaProps) => {
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
      <textarea
        className={cn(
          'w-full h-[141px] border border-faded rounded-[8px] py-2 px-3 text-text-default bg-white text-body placeholder:text-faded',
          className,
        )}
        {...props}
      />
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};
