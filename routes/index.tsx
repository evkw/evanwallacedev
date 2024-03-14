import { Handlers, PageProps } from "$fresh/server.ts";
import { Tags } from "../components/tags.tsx";

import { getPosts, Post } from "./api/posts.ts";

type HomePageProps = {
  posts: Post[];
  tags: string[];
};

export const handler: Handlers<HomePageProps> = {
  async GET(_req, ctx) {
    const posts = await getPosts();
    const tags = Array.from(new Set(posts.map((post) => post.tags).flat()))
      .sort();
    return ctx.render({ posts, tags });
  },
};

function PostCard(props: { post: Post }) {
  const { post } = props;
  return (
    <div class="grid sm:grid-cols-4 gap-4">
      <div class="w-full text-gray-500">
        <time>
          {new Date(post.publishedAt).toLocaleDateString("en-us", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </time>

        <div class="flow-root mt-4">
          <Tags tags={post.tags} />
        </div>
      </div>

      <a
        class="sm:col-span-3 sm:pl-8 sm:border-l sm:border-gray-300 flex flex-col gap-4 pb-16"
        href={`/${post.slug}`}
      >
        <h3 class="text-base font-semibold tracking-tight text-slate-900 dark:text-slate-200 lg:pt-0">
          {post.title}
        </h3>
        <div class="mt-2 mb-4 prose prose-slate prose-a:relative prose-a:z-10 dark:prose-dark line-clamp-2">
          {post.snippet}
        </div>
      </a>
    </div>
  );
}

export default function Home(props: PageProps<HomePageProps>) {
  const { posts, tags } = props.data;
  return (
    <main class="max-w-screen-md px-4 pt-16 mx-auto">
      <header>
        <h1 class="mb-4 text-3xl sm:text-4xl tracking-tight text-slate-900 font-extrabold dark:text-slate-200">
          Blog
        </h1>
        <p class="text-lg text-slate-700 dark:text-slate-400">
          Triumphs and tribulations in the wonderful world of development
        </p>
      </header>
      <div class="flow-root mt-8 mb-16 text-sm text-gray-700">
        <Tags tags={tags} />
      </div>

      {posts.map((post) => <PostCard post={post} />)}
    </main>
  );
}
