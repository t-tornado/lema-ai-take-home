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
    <header className="w-full flex flex-col gap-y-2.5 md:gap-y-6 px-5">
      <nav className="w-fit flex items-center gap-x-1">
        <Typography
          variant="link"
          onClick={goBack}
          className="cursor-pointer hover:bg-gray-100 px-1 text-faded text-xs lg:text-sm"
        >
          Users
        </Typography>
        <ChevronRight className="w-4 h-4 text-text-default" />
        <Typography className="text-xs lg:text-sm">{user?.name}</Typography>
      </nav>
      <div>
        <Typography variant="heading2" className="text-xl lg:text-heading2">
          {user?.name}
        </Typography>
      </div>
      <div className="w-full flex items-center gap-x-2">
        <Typography variant="body" className="text-faded text-xs lg:text-body">
          {user?.email}
        </Typography>
        <div className="w-1.5 h-1.5 bg-dark rounded-full" />
        <Typography className="text-xs lg:text-sm text-body">{postsCount} posts</Typography>
      </div>
    </header>
  );
};
