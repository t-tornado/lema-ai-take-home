import { ChevronRight } from 'lucide-react';
import { Typography } from '../../../shared/components/Typography';
import { useNavigate } from 'react-router-dom';

export const Header = () => {
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
        <Typography>James Sunderland</Typography>
      </nav>

      <div>
        <Typography variant="heading2">James Sunderland</Typography>
      </div>
      <div className="w-full flex items-center gap-x-1">
        <Typography variant="body" className="text-faded">
          james.sunderland@example.com
        </Typography>
        <div className="w-2 h-2 bg-dark rounded-full" />
        <Typography>4 posts</Typography>
      </div>
    </header>
  );
};
