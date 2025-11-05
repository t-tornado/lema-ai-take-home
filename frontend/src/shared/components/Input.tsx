interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  multiline?: boolean;
}

export const Input = ({ label, error, ...props }: InputProps) => {
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label htmlFor={props.id} className="text-text-default bg-white text-body">
          {label}
        </label>
      )}
      <input
        type="text"
        className="w-full h-10 border border-faded rounded-[8px] text-text-default bg-white text-body placeholder:text-faded"
        {...props}
      />
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};
