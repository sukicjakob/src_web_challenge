export interface PostsResponse{
    posts: Post[],
    total: number,
    skip: number,
    limit: number
}

export interface Post{
    id: number,
    title: string,
    body: string,
    userId: number,
    tags: String[],
    reaction: number
}