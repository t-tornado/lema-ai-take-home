import { QueryClientProvider } from './QueryClient';
import { RouterProvider } from './Router';

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider>
      <RouterProvider>{children}</RouterProvider>
    </QueryClientProvider>
  );
};
