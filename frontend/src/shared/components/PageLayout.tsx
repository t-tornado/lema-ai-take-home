export const PageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="max-w-7xl w-full min-w-[606px] h-full mx-auto pt-[132px] flex flex-col gap-8 pb-16 px-4">
      {children}
    </div>
  );
};
