export function Tag(
  props: { value: string; clickable: boolean; activeTag?: string },
) {
  const { value, activeTag } = props;
  const isActive = !!activeTag && value === props.activeTag;
  const displayValue = value.replace(/-/g, " ")
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return (
    <div>
      {props.clickable
        ? (
          <a
            href={isActive ? '/' : `?tag=${value.trim()}`}
            class={`hover:text-blue-400 hover:underline border py-1 px-2 border-gray-300 rounded-md ${isActive ? 'bg-blue-100' : ''}`}
          >
            {displayValue}
          </a>
        )
        : (
          <span class={`border py-1 px-2 border-gray-300 rounded-md ${isActive ? 'bg-blue-100' : ''}`}>
            {displayValue}
          </span>
        )}
    </div>
  );
}
