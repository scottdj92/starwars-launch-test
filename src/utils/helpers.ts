import axios from "axios";

export const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export const getCharacterId = (url: string) => {
	return url.replaceAll("https://swapi.dev/api/people/", "").slice(0, -1);
};
