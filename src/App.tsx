import { useEffect, useState } from "react";
import axios from "axios";
import { GetPeopleResponse, People } from "./types/people";
import Crew from "./components/crew";
import Passenger from "./components/passengers";

axios.defaults.baseURL = "https://swapi.dev/api/";

function App() {
	const [search, setSearch] = useState<string>("");
	const [data, setData] = useState<GetPeopleResponse>();
	const [crew, setCrew] = useState<People[]>([]);
	const [passengers, setPassengers] = useState<People[]>([]);
	const [maxCrew, setMaxCrew] = useState<number>(0);
	const [passengerCapacity, setPassengerCapacity] = useState<number>(0);

	const starshipID = 10;

	const isLaunchDisabled =
		crew.length !== maxCrew || passengers.length !== passengerCapacity;

	const enum Position {
		crew = "crew",
		passenger = "passenger",
	}

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

	const removeFromStarship = (character: People) => {
		const newCrew = crew.filter((crew) => crew.name !== character.name);
		setCrew(newCrew);

		const newPassengers = passengers.filter(
			(passenger) => passenger.name !== character.name
		);
		setCrew(newPassengers);
	};

	const launchStarship = () => {
		alert("Starship has been launched!");
		setCrew([]);
		setPassengers([]);
	};

	return (
		<div className="App">
			<label htmlFor="search">helloworld</label>
			<input
				type="search"
				name="search"
				id="search"
				onChange={(e) => setSearch(e.target.value)}
			/>
			<button onClick={searchPeople}>search people</button>
			{data && data.count > 0 ? (
				data.results.map((item) => (
					<div key={item.name}>
						{item.name}
						<button
							onClick={() => addToStarship(item, Position.crew)}
						>
							Add to starship as crew
						</button>
						<button onClick={() => addToStarship(item)}>
							Add to starship as passenger
						</button>
					</div>
				))
			) : (
				<p>Not found</p>
			)}
			<button disabled={isLaunchDisabled} onClick={launchStarship}>
				Launch starship
			</button>

			<Crew crew={crew} removeFromStarship={removeFromStarship} />
			<Passenger
				passengers={passengers}
				removeFromStarship={removeFromStarship}
			/>
		</div>
	);
}

export default App;
