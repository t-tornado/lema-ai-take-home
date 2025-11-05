export const PageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full h-full mx-auto flex flex-col gap-8 py-10 box-border overflow-hidden">
      {children}
    </div>
  );
};
