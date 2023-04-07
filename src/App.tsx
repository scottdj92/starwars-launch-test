import { useEffect, useState } from "react";
import axios from "axios";
import { GetPeopleResponse, People } from "./types/people";
import Crew from "./components/crew";
import Passenger from "./components/passengers";
import { Button, Container, Form, InputGroup, Row } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

axios.defaults.baseURL = "https://swapi.dev/api/";

export const enum Position {
	crew = "crew",
	passenger = "passenger",
}

function App() {
	const [search, setSearch] = useState<string>("");
	const [data, setData] = useState<GetPeopleResponse>();
	const [crew, setCrew] = useState<People[]>([]);
	const [passengers, setPassengers] = useState<People[]>([]);
	const [maxCrew, setMaxCrew] = useState<number>(0);
	const [passengerCapacity, setPassengerCapacity] = useState<number>(0);
	const notify = () => toast("Wow so easy!");

	const starshipID = 10;

	const isLaunchDisabled =
		crew.length !== maxCrew || passengers.length !== passengerCapacity;

	useEffect(() => {
		axios
			.get(`/starships/${starshipID}`)
			.then((res) => {
				setMaxCrew(Number(res.data.crew));
				setPassengerCapacity(Number(res.data.passengers));
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	const searchPeople = () => {
		axios
			.get(`/people/?search=${search}`)
			.then((res) => {
				setData(res.data);
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
			alert("Already added");
			return;
		}

		if (position === Position.passenger) {
			if (passengers.length >= passengerCapacity) {
				alert("Max passengers reached");
				return;
			}
			setPassengers([...passengers, character]);
		} else {
			if (crew.length >= maxCrew) {
				alert("Max crew reached");
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
		alert("Starship has been launched!");
		setCrew([]);
		setPassengers([]);
	};

	return (
		<div className="App">
			<button onClick={notify}>Notify!</button>
			<ToastContainer autoClose={3000} />
			<Container>
				<Row mt={10}>
					<InputGroup className="mb-3">
						<Form.Control
							placeholder="Search character's"
							aria-label="Search character"
							aria-describedby="search-starwars-character"
							onChange={(e) => setSearch(e.target.value)}
						/>
						<Button
							variant="outline-secondary"
							id="button-addon2"
							onClick={searchPeople}
						>
							Search
						</Button>
					</InputGroup>
				</Row>

				{data && data.count > 0 ? (
					data.results.map((item) => (
						<div key={item.name}>
							{item.name}
							<Button
								variant="primary"
								onClick={() =>
									addToStarship(item, Position.crew)
								}
							>
								Add to starship as crew
							</Button>
							<Button
								variant="secondary"
								onClick={() => addToStarship(item)}
							>
								Add to starship as passenger
							</Button>
						</div>
					))
				) : (
					<p>Not found</p>
				)}
				<Button disabled={isLaunchDisabled} onClick={launchStarship}>
					Launch starship
				</Button>

				<Crew crew={crew} removeFromStarship={removeFromStarship} />

				{/* <Passenger
					passengers={passengers}
					removeFromStarship={removeFromStarship}
				/> */}
			</Container>
		</div>
	);
}

export default App;
