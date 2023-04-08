import { People, Position } from "../../types/people";
import Character from "../CharacterCard";
import { Col, Row } from "react-bootstrap";

type CharacterListProps = {
	data: People[];
	removeFromStarship: (character: People, position: Position) => void;
	position: Position;
};

const CharacterList = ({
	data,
	removeFromStarship,
	position,
}: CharacterListProps) => {
	return (
		<Row>
			{data && data.length > 0 ? (
				data.map((character) => (
					<Col xs={6} md={4} lg={3} key={character.name}>
						<Character
							character={character}
							remove={() =>
								removeFromStarship(character, position)
							}
							position={position}
						/>
					</Col>
				))
			) : (
				<p>No {position} in the starship</p>
			)}
		</Row>
	);
};

export default CharacterList;
