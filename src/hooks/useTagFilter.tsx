import { debounce } from "lodash";
import { useState, useMemo, useCallback } from "react";

export function useTagFilter<Type extends { node: { tags: string[] } }>(
  items: Type[]
) {
  const [filterTags, setFilterTags] = useState<string[]>([]);
  const [filterText, setFilterText] = useState<string>("");
  const tags = useMemo(
    () => Array.from(new Set(items.map((item) => item.node.tags).flat())),
    []
  );
  const handleDelete = (tag: string) => {
    setFilterTags(filterTags.filter((t) => t !== tag));
  };
  const setTag = useCallback(
    debounce((text: string) => {
      const tag = tags.find(
        (tag) => tag.toLocaleLowerCase().trim() === text.toLocaleLowerCase()
      );
      if (tag && !filterTags.includes(tag)) {
        setFilterTags([...filterTags, tag]);
        return setFilterText("");
      }
    }, 500),
    [filterTags]
  );
  const handleFilter = (text: string) => {
    setFilterText(text);
    setTag(text);
  };
  return {
    filterTags,
    handleDelete,
    handleFilter,
    filterText,
  };
}

export default useTagFilter;
