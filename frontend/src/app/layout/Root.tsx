import { Bounce, ToastContainer } from 'react-toastify';

interface RootLayoutProps {
  children: React.ReactNode;
}

export const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <div className="flex flex-col w-screen h-screen bg-page-default">
      {children}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        theme="light"
        transition={Bounce}
      />
    </div>
  );
};
