import { Button, Card } from "react-bootstrap";
import { People } from "../../types/people";

type CharacterProps = {
	character: People;
	remove: () => void;
};

const Character = ({ character, remove }: CharacterProps) => {
	const characterId = character.url
		.replaceAll("https://swapi.dev/api/people/", "")
		.slice(0, -1);

	return (
		<Card>
			<Card.Img
				variant="top"
				src={`/img/${characterId}.jpg`}
				style={{ aspectRatio: 1, objectFit: "cover" }}
			/>
			<Card.Body>
				<Card.Title>{character.name}</Card.Title>
				<Card.Text>
					<strong>Gender:</strong> {character.gender}
					<br />
					<strong>Birth Year:</strong> {character.birth_year}
				</Card.Text>
				<div className="d-grid gap-2">
					<Button
						variant="danger"
						onClick={() => {
							remove();
						}}
					>
						Remove
					</Button>
				</div>
			</Card.Body>
		</Card>
	);
};

export default Character;
