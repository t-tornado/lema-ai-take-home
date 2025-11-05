import { Bounce, ToastContainer } from 'react-toastify';

interface RootLayoutProps {
  children: React.ReactNode;
}

export const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <div className="w-full h-full overflow-hidden">
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
