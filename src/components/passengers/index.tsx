import { People, Position } from "../../types/people";
import Character from "../CharacterCard";
import { Col, Row } from "react-bootstrap";

type PassengerProps = {
	passengers: People[];
	removeFromStarship: (character: People, position: Position) => void;
};

const Passenger = ({ passengers, removeFromStarship }: PassengerProps) => {
	return (
		<Row>
			{passengers && passengers.length > 0 ? (
				passengers.map((character) => (
					<Col xs={6} md={4} lg={3} key={character.name}>
						<Character
							key={character.name}
							character={character}
							remove={() =>
								removeFromStarship(
									character,
									Position.passenger
								)
							}
							position={Position.passenger}
						/>
					</Col>
				))
			) : (
				<p>No passengers are in the starship</p>
			)}
		</Row>
	);
};

export default Passenger;
