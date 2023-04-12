import { Badge, Button, Card, Col, Stack } from "react-bootstrap";
import { GetPeopleResponse, People, Position } from "../../types/people";
import { getCharacterId, isMemberAdded } from "../../utils/helpers";
import ModalBody from "./ModalBody";

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
    <ModalBody showModal={showModal} setShowModal={setShowModal}>
      {data && data.count > 0 ? (
        data.results.map((item) => {
          const isDisabled = isMemberAdded(item, AllMembers);
          return (
            <Col key={item.name} xs={6} md={3} className="mb-3 border p-2">
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

              <Stack direction="horizontal" gap={1}>
                <Button
                  variant="primary"
                  onClick={() => addToStarship(item, Position.crew)}
                  disabled={isDisabled}
                >
                  Crew
                </Button>
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
    </ModalBody>
  );
};

export default AddCharacterModal;
