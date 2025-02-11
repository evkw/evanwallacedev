import { Tag } from "./tag.tsx";

export function Tags(props: { tags: string[], clickable: boolean, activeTag?: string }) {
  return (
    <div class="flex flex-wrap gap-2 text-sm text-gray-700">
      {props.tags.map((tag) => <Tag value={tag} clickable={props.clickable} activeTag={props.activeTag}/>)}
    </div>
  );
}
