import { People, Position } from "../../types/people";
import { Col, Row } from "react-bootstrap";
import CharacterCard from "../CharacterCard";

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
						<CharacterCard
							character={character}
							remove={() => removeFromStarship(character, position)}
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
