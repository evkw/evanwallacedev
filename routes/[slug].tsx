import { Handlers, PageProps } from "$fresh/server.ts";
import { getPost, Post } from "./api/posts.ts";
import { CSS, render } from "https://deno.land/x/gfm@0.3.0/mod.ts";
import { Head } from "$fresh/runtime.ts";
import { Tags } from "../components/tags.tsx";

export const handler: Handlers<Post> = {
  async GET(_req, ctx) {
    const post = await getPost(ctx.params.slug);
    if (post === null) return ctx.renderNotFound();
    return ctx.render(post);
  },
};

export default function PostPage(props: PageProps<Post>) {
  const post = props.data;
  return (
    <>
      <Head>
        <style dangerouslySetInnerHTML={{ __html: CSS }} />
      </Head>

      <main class="max-w-screen-md px-4 pt-8 pb-16 md:pt-16 mx-auto">
        <h1 class="text-5xl font-bold">{post.title}</h1>
        <div class="mt-8 text-gray-500 text-lg">
          <time class="text-gray-500">
            {new Date(post.publishedAt).toLocaleDateString("en-us", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
          <Tags tags={post.tags} />
        </div>

        <article
          class="mt-8 markdown-body"
          dangerouslySetInnerHTML={{ __html: render(post.content) }}
        />
      </main>
    </>
  );
}
