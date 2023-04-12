import { Button, Card, Col, Container, Modal, Row } from "react-bootstrap";
import { GetPeopleResponse, People, Position } from "../../types/people";
import { getCharacterId } from "../../utils/helpers";

type AddCharacterModalProps = {
	showModal: boolean;
	setShowModal: (showModal: boolean) => void;
	data: GetPeopleResponse | undefined;
	addToStarship: (character: People, position: Position) => void;
};

const AddCharacterModal = ({
	showModal,
	setShowModal,
	data,
	addToStarship,
}: AddCharacterModalProps) => {
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
				<Container>
					<Row>
						{data && data.count > 0 ? (
							data.results.map((item) => {
								return (
									<Col
										key={item.name}
										xs={6}
										md={3}
										xl={2}
										className="mb-3"
									>
										<p className="mb-0">{item.name}</p>
										<Card.Img
											variant="top"
											src={`/img/${getCharacterId(
												item.url
											)}.jpg`}
											style={{
												aspectRatio: 1,
												objectFit: "cover",
											}}
											className="mb-2"
										></Card.Img>
										<Button
											variant="primary"
											onClick={() =>
												addToStarship(
													item,
													Position.crew
												)
											}
										>
											Add as crew
										</Button>
										<Button
											variant="secondary"
											onClick={() =>
												addToStarship(
													item,
													Position.passenger
												)
											}
										>
											Add as passenger
										</Button>
									</Col>
								);
							})
						) : (
							<p>Not found</p>
						)}
					</Row>
				</Container>
			</Modal.Body>
		</Modal>
	);
};

export default AddCharacterModal;
