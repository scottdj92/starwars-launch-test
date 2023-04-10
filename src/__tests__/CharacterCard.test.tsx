import { render, screen } from "@testing-library/react";
import CharacterCard from "../components/CharacterCard";
import mockData from "./mockData.json";
import { Position } from "../types/people";

describe("Validate HTML elements in Card component", () => {
	test("render crew character card", async () => {
		render(
			<CharacterCard
				character={mockData[0]}
				remove={() => console.log("hello")}
				position={Position.crew}
			/>
		);

		expect(screen.getByText(/luke skywalker/i)).toBeInTheDocument();
		expect(screen.getByText(/male/i)).toBeInTheDocument();
		expect(screen.getByText(/19BBY/i)).toBeInTheDocument();
		expect(screen.getByText(/crew/i)).toBeInTheDocument();
		expect(screen.getByRole("button")).not.toBeDisabled();
	});
	test("render passenger character card", async () => {
		render(
			<CharacterCard
				character={mockData[0]}
				remove={() => console.log("hello")}
				position={Position.passenger}
			/>
		);
		expect(screen.getByText(/passenger/i)).toBeInTheDocument();
	});
});
