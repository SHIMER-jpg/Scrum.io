import { useMemo, useState } from "react";

export const useSearch = (initialData) => {
  const [query, setQuery] = useState("");
  const [filteredElements, setFilteredElements] = useState(initialData);

  useMemo(() => {
    const result = initialData.filter((data) => {
      return data.name.toLowerCase().includes(query.toLowerCase());
    });

    setFilteredElements(result);
  }, [initialData, query]);

  return [query, setQuery, filteredElements];
};
