import { useState } from "react";
import { People, Position } from "./types/people";
import CharacterList from "./components/CharacterList";
import { Container } from "react-bootstrap";
import { toast } from "react-toastify";
import AddCharacterModal from "./components/AddCharacterModal";
import NavbarMenu from "./components/Navbar";
import { useGetStarship } from "./hooks/useGetStarship";
import { useGetPeople } from "./hooks/useGetPeople";

function App() {
	const [search, setSearch] = useState<string>("");
	const [crew, setCrew] = useState<People[]>([]);
	const [passengers, setPassengers] = useState<People[]>([]);
	const [showModal, setShowModal] = useState(false);
	const { maxCrew, maxPassengers } = useGetStarship();

	const { peopleData, enableSearch } = useGetPeople(search);
	const isLaunchDisabled =
		crew.length !== maxCrew || passengers.length !== maxPassengers;

	const searchPeople = () => {
		setShowModal(true);
		enableSearch();
	};

	const addToStarship = (
		character: People,
		position: Position = Position.passenger
	) => {
		if (
			crew.find((crew) => crew.name === character.name) ||
			passengers.find((passenger) => passenger.name === character.name)
		) {
			toast.warning("Already added");
			return;
		}

		if (position === Position.passenger) {
			if (passengers.length >= maxPassengers) {
				toast.warning("Max passengers reached");
				return;
			}
			setPassengers([...passengers, character]);
		} else {
			if (crew.length >= maxCrew) {
				toast.warning("Max crew reached");
				return;
			}
			setCrew([...crew, character]);
		}
	};

	const removeFromStarship = (
		character: People,
		position: Position = Position.passenger
	) => {
		if (position === Position.passenger) {
			const newPassengers = passengers.filter(
				(passenger) => passenger.name !== character.name
			);
			setPassengers(newPassengers);
		} else {
			const newCrew = crew.filter((crew) => crew.name !== character.name);
			setCrew(newCrew);
		}
	};

	const launchStarship = () => {
		toast.success("Starship has been launched!");
		setCrew([]);
		setPassengers([]);
	};

	return (
		<div className="App">
			<NavbarMenu
				searchPeople={searchPeople}
				setSearch={setSearch}
				launchStarship={launchStarship}
				isLaunchDisabled={isLaunchDisabled}
				totalCrewMembers={crew.length}
				totalPassengers={passengers.length}
			/>
			<AddCharacterModal
				showModal={showModal}
				setShowModal={setShowModal}
				data={peopleData}
				addToStarship={addToStarship}
			/>
			<Container>
				<CharacterList
					data={crew}
					removeFromStarship={removeFromStarship}
					position={Position.crew}
				/>

				<CharacterList
					data={passengers}
					removeFromStarship={removeFromStarship}
					position={Position.passenger}
				/>
			</Container>
		</div>
	);
}

export default App;
