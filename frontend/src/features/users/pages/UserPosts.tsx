import { useState } from 'react';
import { PageLayout } from '../../../shared/components/PageLayout';
import { CreatePost } from '../components/CreatePost';
import { Header } from '../components/Header';
import { PostCard } from '../components/PostCard';
import type { Post } from '../types';
import { CreatePostModal } from '../components/CreatePostModal';
import { useCreatePostModalForm } from '../hooks/useCreatePostModalForm';

const posts: Post[] = [
  {
    id: 1,
    user_id: 1,
    title: 'Post 1',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    created_at: '2021-01-01',
  },
  {
    id: 2,
    user_id: 1,
    title: 'Post 2',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    created_at: '2021-01-02',
  },
  {
    id: 3,
    user_id: 1,
    title: 'Post 3',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    created_at: '2021-01-03',
  },
  {
    id: 3,
    user_id: 1,
    title: 'Post 3',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    created_at: '2021-01-03',
  },
  {
    id: 3,
    user_id: 1,
    title: 'Post 3',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    created_at: '2021-01-03',
  },
  {
    id: 3,
    user_id: 1,
    title: 'Post 3',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    created_at: '2021-01-03',
  },
  {
    id: 3,
    user_id: 1,
    title: 'Post 3',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    created_at: '2021-01-03',
  },
  {
    id: 3,
    user_id: 1,
    title: 'Post 3',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    created_at: '2021-01-03',
  },
  {
    id: 3,
    user_id: 1,
    title: 'Post 3',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    created_at: '2021-01-03',
  },
  {
    id: 3,
    user_id: 1,
    title: 'Post 3',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    created_at: '2021-01-03',
  },
  {
    id: 3,
    user_id: 1,
    title: 'Post 3',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    created_at: '2021-01-03',
  },
  {
    id: 3,
    user_id: 1,
    title: 'Post 3',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    created_at: '2021-01-03',
  },
  {
    id: 3,
    user_id: 1,
    title: 'Post 3',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    created_at: '2021-01-03',
  },
  {
    id: 3,
    user_id: 1,
    title: 'Post 3',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    created_at: '2021-01-03',
  },
  {
    id: 3,
    user_id: 1,
    title: 'Post 3',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    created_at: '2021-01-03',
  },
  {
    id: 3,
    user_id: 1,
    title: 'Post 3',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    created_at: '2021-01-03',
  },
  {
    id: 3,
    user_id: 1,
    title: 'Post 3',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    created_at: '2021-01-03',
  },
  {
    id: 3,
    user_id: 1,
    title: 'Post 3',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    created_at: '2021-01-03',
  },
];

export const UserPostsPage = () => {
  const [open, setOpen] = useState(false);
  const { title, body, handleTitleChange, handleBodyChange, handleSubmit, errors } =
    useCreatePostModalForm();

  return (
    <PageLayout>
      <Header />
      <main className="w-full flex flex-wrap gap-4 pt-11 overflow-y-auto">
        <CreatePost handleOpen={() => setOpen(true)} />
        {posts.map((post, idx) => (
          <PostCard key={idx} data={post} />
        ))}
      </main>
      <CreatePostModal
        open={open}
        onClose={() => setOpen(false)}
        onSubmit={handleSubmit}
        isLoading={false}
        errors={errors}
        title={title}
        body={body}
        handleTitleChange={handleTitleChange}
        handleBodyChange={handleBodyChange}
      />
    </PageLayout>
  );
};
