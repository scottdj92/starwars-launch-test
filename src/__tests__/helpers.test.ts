import "@testing-library/jest-dom";
import { getCharacterId } from "../utils/helpers";

describe("Test getCharacterId", () => {
	test("Get character ID from URL", () => {
		const characterId = getCharacterId("https://swapi.dev/api/people/1/");
		expect(characterId).toBe(1);
	});
});
