import { useEffect, useState } from "react";
import axios from "axios";
import { GetPeopleResponse, People, Position } from "./types/people";
import Crew from "./components/crew";
import Passenger from "./components/passengers";
import { Container } from "react-bootstrap";
import { toast } from "react-toastify";
import { STARSHIP_ID } from "./constants";
import SearchCharacterModal from "./components/add-character-modal";
import NavbarMenu from "./components/navbar-menu";

function App() {
	const [search, setSearch] = useState<string>("");
	const [data, setData] = useState<GetPeopleResponse>();
	const [crew, setCrew] = useState<People[]>([]);
	const [passengers, setPassengers] = useState<People[]>([]);
	const [maxCrew, setMaxCrew] = useState<number>(4);
	const [maxPassengers, setMaxPassengers] = useState<number>(6);
	const [showModal, setShowModal] = useState(false);
	const isLaunchDisabled =
		crew.length !== maxCrew || passengers.length !== maxPassengers;

	useEffect(() => {
		axios
			.get(`/starships/${STARSHIP_ID}`)
			.then((res) => {
				setMaxCrew(Number(res.data.crew));
				setMaxPassengers(Number(res.data.passengers));
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	const searchPeople = (searchText: string) => {
		axios
			.get(`/people/?search=${searchText}`)
			.then((res) => {
				setData(res.data);
				setShowModal(true);
			})
			.catch((err) => {
				console.log(err);
			});
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
				search={search}
				launchStarship={launchStarship}
				isLaunchDisabled={isLaunchDisabled}
				maxPassengers={maxPassengers}
				maxCrew={maxCrew}
				totalCrewMembers={crew.length}
				totalPassengers={passengers.length}
			/>
			<SearchCharacterModal
				showModal={showModal}
				setShowModal={setShowModal}
				data={data}
				addToStarship={addToStarship}
			/>
			<Container>
				<Crew crew={crew} removeFromStarship={removeFromStarship} />

				<Passenger
					passengers={passengers}
					removeFromStarship={removeFromStarship}
				/>
			</Container>
		</div>
	);
}

export default App;
