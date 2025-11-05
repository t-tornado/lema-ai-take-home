import { Button } from '../../../shared/components/Button';
import plusIcon from '../../../assets/icons/add-post.svg';

export const CreatePost = ({ handleOpen }: { handleOpen: () => void }) => {
  return (
    <Button
      icon={<img src={plusIcon} alt="plus" />}
      position="before"
      className="w-[270px] h-[293px] bg-white text-text-default font-bold text-body border border-dashed border-faded rounded-[8px] flex flex-col gap-y-3 items-center justify-center"
      onClick={handleOpen}
    >
      New Post
    </Button>
  );
};
