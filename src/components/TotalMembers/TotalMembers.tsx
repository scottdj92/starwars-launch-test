import { Badge } from "react-bootstrap";

type TotalMembersProps = {
  totalCrewMembers: number;
  totalPassengers: number;
  maxCrew: number;
  maxPassengers: number;
};

const TotalMembers = ({
  totalCrewMembers,
  totalPassengers,
  maxCrew,
  maxPassengers,
}: TotalMembersProps) => {
  return (
    <div className="mb-3">
      <Badge bg="success">
        Crew {totalCrewMembers}/{maxCrew}
      </Badge>{" "}
      <Badge bg="primary">
        Passengers {totalPassengers}/{maxPassengers}
      </Badge>
    </div>
  );
};

export default TotalMembers;
