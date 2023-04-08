import { Button, Card } from "react-bootstrap";
import { People, Position } from "../../types/people";

type CharacterProps = {
	character: People;
	remove: () => void;
	position: Position;
};

const CharacterCard = ({ character, remove, position }: CharacterProps) => {
	const characterId = character.url
		.replaceAll("https://swapi.dev/api/people/", "")
		.slice(0, -1);

	return (
		<Card style={{ marginBottom: 10 }}>
			<Card.Img
				variant="top"
				src={`/img/${characterId}.jpg`}
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
