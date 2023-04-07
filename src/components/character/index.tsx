import { Button, Card } from "react-bootstrap";
import { People } from "../../types/people";

const enum Position {
	crew = "crew",
	passenger = "passenger",
}

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
					Gender: <strong>{character.gender}</strong>
					<br />
					Birth Year: <strong>{character.birth_year}</strong>
				</Card.Text>
				<Button
					variant="danger"
					onClick={() => {
						remove();
					}}
				>
					Remove from starship
				</Button>
			</Card.Body>
		</Card>
	);
};

export default Character;
