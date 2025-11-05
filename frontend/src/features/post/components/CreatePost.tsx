import { Button } from '../../../shared/components/Button';
import plusIcon from '../../../assets/icons/add-post.svg';

export const CreatePost = () => {
  const icon = <img src={plusIcon} alt="plus" />;

  return (
    <Button
      icon={icon as React.ReactNode}
      position="before"
      className="w-[270px] h-[293px] bg-white text-text-default font-bold text-body border border-dashed border-faded rounded-[8px] flex flex-col items-center justify-center"
    >
      New Post
    </Button>
  );
};
