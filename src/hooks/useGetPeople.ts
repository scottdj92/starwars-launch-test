import { useEffect, useState } from "react";
import { GetPeopleResponse } from "../types/people";
import { fetcher } from "../utils/helpers";
import useSWR from "swr";

export function useGetPeople(searchText: string) {
	const [shouldFetch, setShouldFetch] = useState(false);

	const enableSearch = () => {
		setShouldFetch(true);
	};

	useEffect(() => {
		setInterval(() => {
			setShouldFetch(false);
		}, 250);
	}, [searchText]);

	const { data, error, isLoading, mutate } = useSWR<
		GetPeopleResponse | undefined
	>(shouldFetch ? `/people/?search=${searchText}` : null, fetcher);

	return {
		peopleData: data,
		isLoading,
		isError: error,
		mutate,
		enableSearch,
	};
}
