import { Fragment, useState } from 'react';
import { PageLayout } from '../../../shared/components/PageLayout';
import { CreatePost } from '../components/CreatePost';
import { Header } from '../components/Header';
import { PostCard } from '../components/PostCard';
import { CreatePostModal } from '../components/CreatePostModal';
import { useCreatePostModalForm } from '../hooks/useCreatePostModalForm';
import { useUserPostsPageMetadata } from '../hooks/useUserPostsPage';
import { Loader } from '../../../shared/components/Loader';
import { useUserPostsQuery } from '../hooks/useUserPostsQuery';
import { Typography } from '../../../shared/components/Typography';
import { useDeletePostMutation } from '../hooks/useDeletePostMutation';
import { UserService } from '../services/UserService';
import { useCreatePostMutation } from '../hooks/useCreatePostMutation';

export const UserPostsPage = () => {
  const { metadata, userId } = useUserPostsPageMetadata();
  const { data, isLoading, error, setPosts } = useUserPostsQuery(userId);
  const { handleDeletePost } = useDeletePostMutation({
    setPosts,
    deletePostFn: UserService.deletePost,
    stalePosts: data,
  });
  const { handleCreatePost, isLoading: isCreatingPost } = useCreatePostMutation({
    setPosts,
    createPostFn: UserService.createPost,
    stalePosts: data,
    userId: userId!,
  });

  const [open, setOpen] = useState(false);
  const { title, body, handleTitleChange, handleBodyChange, handleSubmit, errors } =
    useCreatePostModalForm(handleCreatePost);

  return (
    <PageLayout>
      {isLoading && !error && !data && (
        <div className="w-full h-full flex items-center justify-center">
          <Loader color="gray" />
        </div>
      )}
      {!isLoading && error && (
        <div className="w-full h-full flex items-center justify-center">
          <Typography variant="body" className="text-faded">
            Error loading posts
          </Typography>
        </div>
      )}
      {!isLoading && !error && data && (
        <Fragment>
          <Header user={metadata.user} postsCount={data?.length ?? 0} />
          <main className="w-full flex flex-wrap gap-4 pt-11 overflow-y-auto">
            {metadata.user ? (
              <>
                <CreatePost handleOpen={() => setOpen(true)} />
                {data?.map((post, idx) => (
                  <PostCard key={idx} data={post} onDelete={handleDeletePost} />
                ))}
              </>
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <Loader color="gray" />
              </div>
            )}
          </main>
        </Fragment>
      )}
      <CreatePostModal
        open={open}
        onClose={() => setOpen(false)}
        onSubmit={handleSubmit}
        isLoading={isCreatingPost}
        errors={errors}
        title={title}
        body={body}
        handleTitleChange={handleTitleChange}
        handleBodyChange={handleBodyChange}
      />
    </PageLayout>
  );
};
