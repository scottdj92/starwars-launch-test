import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

type Props = {
	searchPeople: (searchText: string) => void;
	setSearch: (searchText: string) => void;
	search: string;
	launchStarship: () => void;
	isLaunchDisabled: boolean;
};

const NavbarMenu = ({
	searchPeople,
	setSearch,
	search,
	launchStarship,
	isLaunchDisabled,
}: Props) => {
	return (
		<Navbar bg="light" expand="lg" style={{ marginBottom: 30 }}>
			<Container fluid>
				<Navbar.Brand href="#">Starwars</Navbar.Brand>
				<Navbar.Toggle aria-controls="navbarScroll" />
				<Navbar.Collapse id="navbarScroll">
					<Nav
						className="me-auto my-2 my-lg-0"
						style={{ maxHeight: "100px" }}
						navbarScroll
					>
						<Nav.Link href="#" disabled>
							Crew 0/6
						</Nav.Link>
						<Nav.Link href="#" disabled>
							Passengers 0/6
						</Nav.Link>
						<Button
							onClick={launchStarship}
							disabled={isLaunchDisabled}
						>
							Launch starship
						</Button>
					</Nav>

					<Form className="d-flex">
						<Form.Control
							type="search"
							className="me-2"
							aria-label="Search"
							placeholder="Search character"
							aria-describedby="search-starwars-character"
							onChange={(e) => setSearch(e.target.value)}
						/>
						<Button
							variant="outline-success"
							onClick={() => searchPeople(search)}
						>
							Search
						</Button>
					</Form>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};

export default NavbarMenu;
