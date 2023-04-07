import React from "react";
import { People } from "../../types/people";
import Character from "../character";

type CrewProps = {
	crew: People[];
	removeFromStarship: (character: People) => void;
};

const Crew = ({ crew, removeFromStarship }: CrewProps) => {
	return (
		<div id="crew" style={{ border: "1px solid red" }}>
			{crew && crew.length > 0 ? (
				crew.map((character) => (
					<Character
						character={character}
						removeFromStarship={removeFromStarship}
					/>
				))
			) : (
				<p>No crew are in the starship</p>
			)}
		</div>
	);
};

export default Crew;
