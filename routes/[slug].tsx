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

      <div class="px-4 sm:px-6 md:px-8">
        <div class="max-w-8xl mx-auto">
          <div class="flex px-4 pt-8 pb-10 lg:px-8">
            <a
              href="/"
              class="group flex font-semibold text-sm leading-6 text-slate-700 hover:text-slate-900 dark:text-slate-200 dark:hover:text-white"
            >
              Go Back
            </a>
          </div>
        </div>
        <main class="max-w-screen-md px-4 pt-8 pb-16 md:pt-16 mx-auto">
          <article class="relative pt-10">
            <div class="absolute top-0 inset-x-0 text-slate-700 dark:text-slate-400">
              <time class="text-gray-500">
                {new Date(post.publishedAt).toLocaleDateString("en-us", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            </div>
            <h1 class="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-slate-200 md:text-3xl">
              {post.title}
            </h1>

            
            <div class="mt-8 text-gray-500 text-lg">
              <Tags tags={post.tags} clickable={false} />
            </div>

            <article
              class="mt-8 markdown-body"
              dangerouslySetInnerHTML={{ __html: render(post.content) }}
            />
          </article>
        </main>
      </div>
    </>
  );
}
