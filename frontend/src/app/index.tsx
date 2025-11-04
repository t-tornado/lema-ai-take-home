import { QueryClientProvider } from './queryClient';

export const App = () => {
  return (
    <QueryClientProvider>
      <main className="h-screen w-screen bg-slate-300">
        <h1 className="text-4xl font-bold text-center text-slate-900">
          Welcome to the Lema AI Posts assignment
        </h1>
      </main>
    </QueryClientProvider>
  );
};
