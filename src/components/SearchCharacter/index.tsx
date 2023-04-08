import React from "react";
import { Form, Button } from "react-bootstrap";

type SearchCharacterProps = {
	searchPeople: () => void;
	setSearch: (searchText: string) => void;
};

const SearchCharacter = ({ searchPeople, setSearch }: SearchCharacterProps) => {
	const updateSearch = (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		e.preventDefault();
		searchPeople();
	};
	return (
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
				type="submit"
				variant="outline-success"
				onClick={(e) => updateSearch(e)}
			>
				Search
			</Button>
		</Form>
	);
};

export default SearchCharacter;
