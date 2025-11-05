import Modal from '../../../shared/components/Modal';
import { Typography } from '../../../shared/components/Typography';
import { Input } from '../../../shared/components/Input';
import { Textarea } from '../../../shared/components/Textarea';
import { Button } from '../../../shared/components/Button';
import type { CreatePostErrors, CreatePostFormPayload } from '../schemas/createPostSchema';
interface CreatePostModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: CreatePostFormPayload) => void;
  isLoading: boolean;
  errors: CreatePostErrors | null;
  title: string;
  body: string;
  handleTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleBodyChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export const CreatePostModal = ({
  open,
  onClose,
  onSubmit,
  isLoading,
  title,
  body,
  handleTitleChange,
  handleBodyChange,
}: CreatePostModalProps) => {
  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    await onSubmit({ title, body });
    onClose();
  };
  return (
    <Modal
      open={open}
      onClose={onClose}
      className="flex flex-col gap-4 w-[679px] shadow-lg overflow-hidden box-border bg-white rounded-[16px] !p-6"
    >
      <Typography variant="heading2" className="text-2xl font-bold text-black">
        New Post
      </Typography>
      <form className="flex flex-col" onSubmit={(e) => e.preventDefault()}>
        <Input
          id="post-title"
          label="Post Title"
          placeholder="Enter title"
          className="w-full"
          containerProps={{ className: '!mb-6' }}
          value={title}
          onChange={handleTitleChange}
        />
        <Textarea
          id="post-body"
          label="Post Body"
          placeholder="Enter body"
          className="w-full"
          containerProps={{ className: '!mb-8' }}
          value={body}
          onChange={handleBodyChange}
        />
        <div className="w-full flex items-center justify-end gap-x-2">
          <Button variant="cancel" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" type="submit" isLoading={isLoading} onClick={handleSubmit}>
            Publish
          </Button>
        </div>
      </form>
    </Modal>
  );
};
