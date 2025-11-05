export const PageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="!w-7xl h-full mx-auto pt-[132px] flex flex-col gap-8 pb-16">{children}</div>
  );
};
