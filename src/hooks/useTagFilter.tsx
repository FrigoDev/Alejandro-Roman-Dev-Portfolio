import { debounce } from "lodash";
import { useState, useMemo, useCallback, useEffect } from "react";

export function useTagFilter<Type extends { node: { tags: string[] } }>(
  items: Type[]
) {
  const [filterTags, setFilterTags] = useState<string[]>([]);
  const [filterText, setFilterText] = useState<string>("");

  const availableTags = useMemo(
    () =>
      Array.from(
        new Set(items.flatMap((item) => item.node.tags))
      ).sort((a, b) => a.localeCompare(b)),
    [items]
  );

  const handleDelete = useCallback((tag: string) => {
    setFilterTags((prev) => prev.filter((t) => t !== tag));
  }, []);

  const addTag = useCallback((tag: string) => {
    setFilterTags((prev) => {
      if (prev.includes(tag)) return prev;
      return [...prev, tag];
    });
  }, []);

  const toggleTag = useCallback((tag: string) => {
    setFilterTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  }, []);

  const clearFilterText = useCallback(() => {
    setFilterText("");
  }, []);

  const setTag = useCallback(
    debounce((text: string) => {
      const matchedTag = availableTags.find(
        (tag) => tag.toLocaleLowerCase().trim() === text.toLocaleLowerCase().trim()
      );
      if (matchedTag) {
        setFilterTags((prev) =>
          prev.includes(matchedTag) ? prev : [...prev, matchedTag]
        );
        setFilterText("");
      }
    }, 500),
    [availableTags]
  );

  useEffect(() => {
    return () => setTag.cancel();
  }, [setTag]);

  const handleFilter = (text: string) => {
    setFilterText(text);
    setTag(text);
  };

  return {
    filterTags,
    availableTags,
    handleDelete,
    handleFilter,
    filterText,
    addTag,
    toggleTag,
    clearFilterText,
  };
}

export default useTagFilter;
