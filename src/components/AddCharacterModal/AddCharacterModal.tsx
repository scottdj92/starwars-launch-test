import {
  Badge,
  Button,
  Card,
  Col,
  Container,
  Form,
  Modal,
  Row,
  Stack,
} from "react-bootstrap";
import { GetPeopleResponse, People, Position } from "../../types/people";
import { getCharacterId } from "../../utils/helpers";

type AddCharacterModalProps = {
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
  data: GetPeopleResponse | undefined;
  addToStarship: (character: People, position: Position) => void;
  AllMembers: People[];
};

const AddCharacterModal = ({
  showModal,
  setShowModal,
  data,
  addToStarship,
  AllMembers,
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
                const isDisabled = AllMembers.find(
                  (member) => member.name === item.name
                )
                  ? true
                  : false;
                console.log(isDisabled, "isDisabled");
                return (
                  <Col
                    key={item.name}
                    xs={6}
                    md={3}
                    xl={2}
                    className="mb-3 border p-2"
                  >
                    <p className="mb-0">{item.name}</p>

                    <Card.Img
                      variant="top"
                      src={`/img/${getCharacterId(item.url)}.jpg`}
                      className="mb-2 object-cover"
                    ></Card.Img>
                    {isDisabled ? (
                      <Badge pill bg="info" className="mb-2">
                        Added already
                      </Badge>
                    ) : (
                      <p className="mb-2">Add as:</p>
                    )}

                    <Stack direction="horizontal" gap={3}>
                      <Button
                        variant="primary"
                        onClick={() => addToStarship(item, Position.crew)}
                        disabled={isDisabled}
                      >
                        Crew
                      </Button>
                      <div className="vr" />
                      <Button
                        variant="secondary"
                        onClick={() => addToStarship(item, Position.passenger)}
                        disabled={isDisabled}
                      >
                        Passenger
                      </Button>
                    </Stack>
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
