import { Trash2 } from 'lucide-react';
import { Typography } from '../../../shared/components/Typography';
import type { Post } from '../types';
import { Button } from '../../../shared/components/Button';

interface PostCardProps {
  data: Post;
  onDelete: (postId: string) => void;
}

export const PostCard = ({ data, onDelete }: PostCardProps) => {
  return (
    <div className="relative w-full md:w-[270px] h-[293px] overflow-hidden bg-white text-text-default font-bold text-body border border-dashed border-faded rounded-[8px] flex flex-col gap-y-4 p-6">
      <div className="w-full flex flex-col gap-y-2">
        <Typography variant="subtitle">{data.title}</Typography>
        <Button
          variant="ghost"
          className="absolute top-2.5 right-2.5 cursor-pointer"
          onClick={() => onDelete(data.id)}
        >
          <Trash2 className="w-4 h-4 text-red-600" />
        </Button>
      </div>

      <div className="w-full flex-1 min-h-0 overflow-hidden">
        <Typography variant="body" className="text-faded line-clamp-[9]">
          {data.body}
        </Typography>
      </div>
    </div>
  );
};
