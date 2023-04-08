import { GetPeopleResponse } from "../types/people";
import { fetcher } from "../utils/helpers";
import useSWR from "swr";

export function useGetPeople(searchText: string, shouldFetch: boolean = false) {
	const { data, error, isLoading, mutate } = useSWR<
		GetPeopleResponse | undefined
	>(shouldFetch ? `/people/?search=${searchText}` : null, fetcher);

	return {
		peopleData: data,
		isLoading,
		isError: error,
		mutate,
	};
}
