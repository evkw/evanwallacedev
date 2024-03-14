export function Tag(props: { value: string }) {
  const { value } = props;
  return (
    <a
      href="#"
      class="hover:text-blue-400 hover:underline border py-1 px-2 border-gray-300 rounded-md"
    >
      {value}
    </a>
  );
}
