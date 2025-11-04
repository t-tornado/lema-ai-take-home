import { useEffect } from 'react';
import apiClient from './lib/apiClient/axios';

function App() {
  useEffect(() => {
    const fetchUsers = async () => {
      const res = await apiClient.get(`/users`);
      console.log('RESPONSE > > > ', res);
    };
    fetchUsers();
  }, []);

  return (
    <main className="h-screen w-screen bg-slate-300">
      <h1 className="text-4xl font-bold text-center text-slate-900">
        Welcome to the lema assignment
      </h1>
    </main>
  );
}

export default App;
