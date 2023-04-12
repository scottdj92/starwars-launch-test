import { Container, Modal, Row } from "react-bootstrap";

type ModalBodyProps = {
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
  children: React.ReactNode;
};

const ModalBody = ({ showModal, setShowModal, children }: ModalBodyProps) => {
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
          <Row>{children}</Row>
        </Container>
      </Modal.Body>
    </Modal>
  );
};

export default ModalBody;
