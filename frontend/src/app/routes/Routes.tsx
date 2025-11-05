import { Navigate, Route, Routes } from 'react-router-dom';
import { NotFound } from '../layout/NotFound';
import { UsersPage } from '../../features/users/page';
import { PostPage } from '../../features/post/page';
import { RootLayout } from '../layout/Root';

export const AppRoutes = () => {
  return (
    <RootLayout>
      <Routes>
        <Route path="/" element={<Navigate to="users" />} />
        <Route path="users" element={<UsersPage />} />
        <Route path="/post/:userId" element={<PostPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </RootLayout>
  );
};
