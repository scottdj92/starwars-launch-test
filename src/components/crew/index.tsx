import React from "react";
import { People } from "../../types/people";
import Character from "../character";
import { Col, Row } from "react-bootstrap";

type CrewProps = {
	crew: People[];
	removeFromStarship: (character: People) => void;
};

const Crew = ({ crew, removeFromStarship }: CrewProps) => {
	return (
		<Row style={{ border: "1px solid red" }}>
			{crew && crew.length > 0 ? (
				crew.map((character) => (
					<Col xs={6} md={4} lg={3} key={character.name}>
						<Character
							character={character}
							remove={removeFromStarship}
						/>
					</Col>
				))
			) : (
				<p>No crew are in the starship</p>
			)}
		</Row>
	);
};

export default Crew;
