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
  const {
    metadata,
    userId,
    isLoading: isFetchingUser,
    error: userError,
  } = useUserPostsPageMetadata();
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

  const dataIsLoading = (isLoading && !error && !data) || isFetchingUser;
  const dataIsReady = !dataIsLoading && !userError && metadata.user;
  const dataError = !dataIsLoading && userError && !metadata.user;

  return (
    <PageLayout>
      {dataIsLoading && (
        <div className="w-full h-full flex items-center justify-center">
          <Loader color="gray" />
        </div>
      )}
      {dataError && (
        <div className="w-full h-full flex items-center justify-center">
          <Typography variant="body" className="text-faded">
            Error loading posts
          </Typography>
        </div>
      )}
      {dataIsReady && (
        <Fragment>
          <Header user={metadata.user} postsCount={data?.length ?? 0} />
          <main className="min-w-0 w-full flex-1 h-full flex flex-wrap p-5 min-w-0 min-h-0 md:pt-10 overflow-y-auto gap-6 ">
            {metadata.user ? (
              <Fragment>
                <CreatePost handleOpen={() => setOpen(true)} />
                {data?.map((post, idx) => (
                  <PostCard key={idx} data={post} onDelete={handleDeletePost} />
                ))}
              </Fragment>
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
