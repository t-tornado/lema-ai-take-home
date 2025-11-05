interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const Textarea = ({ label, error, ...props }: TextareaProps) => {
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label htmlFor={props.id} className="text-text-default bg-white text-body">
          {label}
        </label>
      )}
      <textarea
        className="w-full h-[141px] border border-faded rounded-[8px] text-text-default bg-white text-body placeholder:text-faded"
        {...props}
      />
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};
