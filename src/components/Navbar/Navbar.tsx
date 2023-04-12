import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import SearchCharacter from "../SearchCharacter/SearchCharacter";

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
}: Props) => {
	return (
		<Navbar bg="dark" expand="md" className="mb-4">
			<Container fluid>
				<Navbar.Brand href="#">
					<span style={{ color: "white" }}>Starwars</span>
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="navbarScroll" />
				<Navbar.Collapse id="navbarScroll">
					<Nav
						className="me-auto my-2 my-md-0"
						style={{ maxHeight: "100px" }}
						navbarScroll
					>
						<Button
							onClick={launchStarship}
							disabled={isLaunchDisabled}
						>
							{isLaunchDisabled
								? "Launch starship"
								: "Ready to launch!"}
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
