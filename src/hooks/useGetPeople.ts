import { useEffect, useState } from "react";
import { GetPeopleResponse } from "../types/people";
import { fetcher } from "../utils/axios";
import useSWR from "swr";

export function useGetPeople(searchText: string) {
  const [shouldFetch, setShouldFetch] = useState(false);

  const enableSearch = () => {
    setShouldFetch(true);
  };

  useEffect(() => {
    setShouldFetch(false);
  }, [searchText]);

  const { data, error, isLoading } = useSWR<GetPeopleResponse | undefined>(
    shouldFetch ? `/people/?search=${searchText}` : null,
    fetcher
  );

  return {
    peopleData: data,
    isLoading,
    isError: error,
    enableSearch,
  };
}
