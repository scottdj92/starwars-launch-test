import { render, screen } from "@testing-library/react";
import mockData from "./mockData.json";
import { People, Position } from "../types/people";
import CharacterList from "../components/CharacterList/CharacterList";

describe("Validate Character List component is rendering", () => {
	test("render list of card components with data", async () => {
		render(
			<CharacterList
				data={mockData}
				removeFromStarship={() => console.log("hello")}
				position={Position.crew}
			/>
		);

		// check length of list
		expect(screen.getAllByRole("button")).toHaveLength(10);
		expect(mockData).toHaveLength(10);
		// need more tests...
	});
	test("render empty list with no data", async () => {
		const emptyList: People[] = [];
		render(
			<CharacterList
				data={emptyList}
				removeFromStarship={() => console.log("hello")}
				position={Position.crew}
			/>
		);

		// verify list is empty
		expect(emptyList).toHaveLength(0);
		expect(screen.queryAllByRole("button")).toHaveLength(0);
		// No {position} in the starship
		expect(
			screen.getByText(/No crew in the starship/i)
		).toBeInTheDocument();
	});
});
