import { STARSHIP_ID } from "../constants";
import { GetStarshipResponse } from "../types/starship";
import { fetcher } from "../utils/axios";
import useSWR from "swr";

export function useGetStarship() {
	const { data, error, isLoading } = useSWR<GetStarshipResponse>(
		`/starships/${STARSHIP_ID}`,
		fetcher
	);

	const maxCrew = Number(data?.crew) || 4;
	const maxPassengers = Number(data?.passengers) || 6;

	return {
		starshipData: data,
		isLoading,
		isError: error,
		maxCrew,
		maxPassengers,
	};
}
