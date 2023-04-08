import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useGetStarship } from "../../hooks/useGetStarship";
import SearchCharacter from "../SearchCharacter";

type Props = {
	searchPeople: () => void;
	setSearch: (searchText: string) => void;
	launchStarship: () => void;
	isLaunchDisabled: boolean;
	totalCrewMembers: number;
	totalPassengers: number;
};

const NavbarMenu = ({
	searchPeople,
	setSearch,
	launchStarship,
	isLaunchDisabled,
	totalCrewMembers,
	totalPassengers,
}: Props) => {
	const { maxCrew, maxPassengers } = useGetStarship();

	return (
		<Navbar bg="light" expand="md" style={{ marginBottom: 30 }}>
			<Container fluid>
				<Navbar.Brand href="#">Starwars</Navbar.Brand>
				<Navbar.Toggle aria-controls="navbarScroll" />
				<Navbar.Collapse id="navbarScroll">
					<Nav
						className="me-auto my-2 my-md-0"
						style={{ maxHeight: "100px" }}
						navbarScroll
					>
						<Nav.Link href="#" disabled>
							Crew {totalCrewMembers}/{maxCrew}
						</Nav.Link>
						<Nav.Link href="#" disabled>
							Passengers {totalPassengers}/{maxPassengers}
						</Nav.Link>
						<Button
							onClick={launchStarship}
							disabled={isLaunchDisabled}
						>
							Launch starship
						</Button>
					</Nav>
					<SearchCharacter
						searchPeople={searchPeople}
						setSearch={setSearch}
					/>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};

export default NavbarMenu;
