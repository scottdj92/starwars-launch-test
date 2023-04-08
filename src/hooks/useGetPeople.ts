import { GetPeopleResponse } from "../types/people";
import { fetcher } from "../utils/helpers";
import useSWR from "swr";

export function useGetPeople(searchText: string) {
	const { data, error, isLoading, mutate } = useSWR<
		GetPeopleResponse | undefined
	>(`/people/?search=${searchText}`, fetcher);

	return {
		peopleData: data,
		isLoading,
		isError: error,
		mutate,
	};
}
