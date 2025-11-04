import { AppProvider } from './providers';
import { AppRoutes } from './routes/Routes';

export const App = () => {
  return (
    <AppProvider>
      <AppRoutes />
    </AppProvider>
  );
};
