import { Navigate, Route, Routes } from 'react-router-dom';
import { NotFound } from '../layout/NotFound';
import { RootLayout } from '../layout/Root';
import { UserPostsPage } from '../../features/users/pages/UserPosts';
import { UsersPage } from '../../features/users/pages/UsersPage';
import { RouteElement } from './ComposedRouteComponent';

export const AppRoutes = () => {
  return (
    <RootLayout>
      <Routes>
        <Route path="/" element={<Navigate to="users" />} />
        <Route path="users" element={<RouteElement Component={UsersPage} />} />
        <Route path="/post/:userId" element={<RouteElement Component={UserPostsPage} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </RootLayout>
  );
};
