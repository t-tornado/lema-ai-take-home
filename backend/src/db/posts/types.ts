export interface Post {
  id: number;
  user_id: number;
  title: string;
  body: string;
  created_at: string;
}

export interface CreatePostPayload {
  title: string;
  body: string;
  user_id: number;
}
