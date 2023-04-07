import React from "react";
import { People } from "../../types/people";
import Character from "../character";

type PassengerProps = {
	passengers: People[];
	removeFromStarship: (character: People) => void;
};

const Passenger = ({ passengers, removeFromStarship }: PassengerProps) => {
	return (
		<div id="passenger" style={{ border: "1px solid blue" }}>
			{passengers && passengers.length > 0 ? (
				passengers.map((character) => (
					<Character
						character={character}
						removeFromStarship={removeFromStarship}
					/>
				))
			) : (
				<p>No passengers are in the starship</p>
			)}
		</div>
	);
};

export default Passenger;
