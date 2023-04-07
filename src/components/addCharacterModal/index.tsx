import React from "react";
import { Button, Modal } from "react-bootstrap";
import { GetPeopleResponse, People, Position } from "../../types/people";

type Props = {
	showModal: boolean;
	setShowModal: (showModal: boolean) => void;
	data: GetPeopleResponse | undefined;
	addToStarship: (character: People, position: Position) => void;
};

const SearchCharacterModal = ({
	showModal,
	setShowModal,
	data,
	addToStarship,
}: Props) => {
	return (
		<Modal
			show={showModal}
			fullscreen={true}
			onHide={() => setShowModal(false)}
		>
			<Modal.Header closeButton>
				<Modal.Title>Add to starship</Modal.Title>
			</Modal.Header>
			<Modal.Body>
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
								Add as crew
							</Button>
							<Button
								variant="secondary"
								onClick={() =>
									addToStarship(item, Position.passenger)
								}
							>
								Add as passenger
							</Button>
						</div>
					))
				) : (
					<p>Not found</p>
				)}
			</Modal.Body>
		</Modal>
	);
};

export default SearchCharacterModal;
