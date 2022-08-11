import { useEffect, useState } from "react";
import styled from "styled-components";
import { Image, Transformation } from "cloudinary-react";

const Banner = ({ groups }) => {
  // const [groups, setGroups] = useState([]);
  const [event, setEvent] = useState({});
  // const loadData = () => {
  // fetch('/api/AllGroups')
  // .then(res => res.json())
  // .then(data => {
  //     // console.log(data.status);
  //     // console.log(data.data);
  //     // console.log("----------------------")

  //    if(data.status === 200 ) setGroups([...data.data]);
  // })
  // }
  useEffect(() => {
    // loadData();
    let groupIndex = 0;
    let eventindex = 0;
    const entervalId = setInterval(async () => {
      if (groups.length > 0) {
        console.log("groupssssxx", groups);
        await setEvent({
          name: groups[groupIndex].name,
          ...groups[groupIndex].annuncements[eventindex],
        });
        console.log("groupindex", groupIndex);
        console.log("eventindex", eventindex);

        if (groupIndex < groups.length - 1) groupIndex += 1;
        else groupIndex = 0;
        if (eventindex < groups[groupIndex].annuncements.length - 1)
          eventindex += 1;
        else eventindex = 0;
        console.log("event", event);
      }
      // console.log("-----c-----------------")
      return () => {
        clearInterval(entervalId);
      };
    }, 10000);
  }, []);
  return (
    <Container>
      {event.imgs && (
        <Image cloudName="doc7plec9" publicId={event.imgs[0]}>
          <Transformation effect="trim" angle="45" crop="scale" width="600" />
          <Transformation overlay="text:Arial_100:Hello" />
        </Image>
      )}
      {event.name}
    </Container>
  );
};

const Container = styled.div`
  margin-top: 20px;
  margin-left: 100px;
  border-radius: 10px;
  background: rgb(255, 255, 200);
  min-height: 40%;
  max-height: 40%;
`;
export default Banner;
