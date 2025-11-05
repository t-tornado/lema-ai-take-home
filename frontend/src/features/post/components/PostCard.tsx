import { Trash2 } from 'lucide-react';
import { Typography } from '../../../shared/components/Typography';
import type { Post } from '../types';

interface PostCardProps {
  data: Post;
}

export const PostCard = ({ data }: PostCardProps) => {
  return (
    <div className="relative w-[270px] h-[293px] bg-white text-text-default font-bold text-body border border-dashed border-faded rounded-[8px] flex flex-col p-6">
      <div className="w-full flex flex-col gap-y-2">
        <Typography variant="subtitle">{data.title}</Typography>
        <Trash2 className="w-4 h-4 text-red-600 absolute top-2.5 right-2.5 cursor-pointer" />
      </div>

      <div className="w-full flex items-center justify-between">
        <Typography variant="body" className="text-faded">
          {data.body}
        </Typography>
      </div>
    </div>
  );
};
