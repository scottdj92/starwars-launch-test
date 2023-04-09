import { Button, Card } from "react-bootstrap";
import { People, Position } from "../../types/people";
import { getCharacterId } from "../../utils/helpers";

type CharacterProps = {
	character: People;
	remove: () => void;
	position: Position;
};

const CharacterCard = ({ character, remove, position }: CharacterProps) => {
	return (
		<Card className="mb-3">
			<Card.Img
				variant="top"
				src={`/img/${getCharacterId(character.url)}.jpg`}
				style={{ aspectRatio: 1, objectFit: "cover" }}
			></Card.Img>
			<span
				style={{
					fontSize: "0.75rem",
					backgroundColor:
						position === Position.crew ? "green" : "blue",
					color: "white",
					padding: "0.25rem 0.5rem",
				}}
			>
				{position}
			</span>
			<Card.Body>
				<Card.Title>{character.name}</Card.Title>
				<Card.Text>
					<strong>Gender:</strong> {character.gender}
					<br />
					<strong>Birth Year:</strong> {character.birth_year}
				</Card.Text>
				<div className="d-grid gap-2">
					<Button variant="danger" onClick={remove}>
						Remove
					</Button>
				</div>
			</Card.Body>
		</Card>
	);
};

export default CharacterCard;
