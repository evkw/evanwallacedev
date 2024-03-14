import { Tag } from "./tag.tsx";

export function Tags(props: { tags: string[] }) {
  const { tags } = props;
  return (
    <div class="flex flex-wrap gap-2 text-sm text-gray-700">
      {tags.map((tag) => <Tag value={tag} />)}
    </div>
  );
}
