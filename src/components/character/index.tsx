import { CloseButton } from "react-bootstrap";
import { People } from "../../types/people";

type CharacterProps = {
	character: People;
	removeFromStarship: (character: People) => void;
};
const Character = ({ character, removeFromStarship }: CharacterProps) => {
	const characterId = character.url
		.replaceAll("https://swapi.dev/api/people/", "")
		.slice(0, -1);

	return (
		<ul className="character" key={character.name}>
			<li>
				Name: <strong>{character.name}</strong>
			</li>
			<li>
				<img
					src={`/img/${characterId}.jpg`}
					alt={character.name}
					style={{
						width: "100px",
						height: "100px",
					}}
				/>
			</li>
			<li>
				Gender: <strong>{character.gender}</strong>
			</li>
			<li>
				Birth Year: <strong>{character.birth_year}</strong>
			</li>
			<li>
				<CloseButton
					onClick={() => {
						removeFromStarship(character);
					}}
				/>
			</li>
		</ul>
	);
};

export default Character;
