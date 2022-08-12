import { useContext } from "react";
import styled from "styled-components";
import { GroupsContext } from "../../Contexts/GroupsContext";
import { Image, Transformation } from "cloudinary-react";
import Map from "../../Map";

const EventDetails = () => {
  const {
    state: { selectedEvent },
  } = useContext(GroupsContext);
  console.log("inside the eventDetails");
  console.log(selectedEvent);
  return (
    <Container>
      <EventInfo>
        <Image
          cloudName="doc7plec9"
          publicId={selectedEvent.imgs[0]}
          loading="lazy"
        >
          <Transformation rawTransformation="h_320,w_1410,c_fill,r_20" />
          <Transformation effect="outline:1" color="white" />
          <Transformation
            overlay={`text:Arial_50:${selectedEvent.name}`}
            color="white"
            gravity="north"
            y="240"
            x="-550"
          />
          {/* <Transformation background="lightblue" /> */}
        </Image>
      </EventInfo>
        <Map width={1410} height={600} setDistination={true} />
    </Container>
  );
};
const Container = styled.div``;
const EventInfo = styled.div`
  display: flex;
`;

export default EventDetails;
