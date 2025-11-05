interface RootLayoutProps {
  children: React.ReactNode;
}

export const RootLayout = ({ children }: RootLayoutProps) => {
  return <div className="flex flex-col w-screen h-screen bg-page-default">{children}</div>;
};
