import { ChevronRight } from 'lucide-react';
import { Typography } from '../../../shared/components/Typography';
import { useNavigate } from 'react-router-dom';
import type { User } from '../types';

interface HeaderProps {
  user: User | null;
  postsCount: number;
}

export const Header = ({ user, postsCount }: HeaderProps) => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate('/users');
  };

  return (
    <header className="w-full flex flex-col gap-y-6">
      <nav className="w-fit flex items-center gap-x-2">
        <Typography
          variant="link"
          onClick={goBack}
          className="cursor-pointer hover:bg-gray-100 px-1 text-faded"
        >
          Users
        </Typography>
        <ChevronRight className="w-4 h-4 text-text-default" />
        <Typography>{user?.name}</Typography>
      </nav>

      <div>
        <Typography variant="heading2">{user?.name}</Typography>
      </div>
      <div className="w-full flex items-center gap-x-1">
        <Typography variant="body" className="text-faded">
          {user?.email}
        </Typography>
        <div className="w-2 h-2 bg-dark rounded-full" />
        <Typography>{postsCount} posts</Typography>
      </div>
    </header>
  );
};
