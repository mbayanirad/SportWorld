import { useContext } from "react";
import styled from "styled-components";
import { GroupsContext } from "../../../Contexts/GroupsContext";
import { Image, Transformation, Placeholder } from "cloudinary-react";
import Map from "../../../Map";

const EventDetails = () => {
  const {
    state: { selectedEvent },
  } = useContext(GroupsContext);
  return (
    <Container>
      <EventInfo>
        <Image
          cloudName="doc7plec9"
          publicId={selectedEvent.imgs[0]}
          loading="lazy"
        >
          <Transformation rawTransformation="h_320,w_1410,c_fill,r_20" position="center"/>
          <Transformation effect="outline:1" color="white"  />
          <Transformation effect="cartoonify" />
          <Transformation
            overlay={`text:Arial_50:${selectedEvent.name}`}
            color="white"
            gravity="north"
            y="240"
            x="-550"
            margin="5"
            background="#15be89"
            width="300"
            radius="10"
          />
          {/* <Transformation background="lightblue" /> */}
        </Image>
      </EventInfo>
        <Map width={1410} height={600} setDirection={true} eventInfo={selectedEvent}/>
    </Container>
  );
};
const Container = styled.div``;
const EventInfo = styled.div`
  display: flex;
`;

export default EventDetails;
