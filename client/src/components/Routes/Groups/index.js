import styled from "styled-components";
import Banner from "./Banner";
import { useContext, useState } from "react";
import { GroupsContext } from "../../Contexts/GroupsContext";
import GroupBody from "./GroupBody";
import NewGroup from "./NewGroup";

const Groups = () => {
  const {
    state: { groups },
  } = useContext(GroupsContext);
  const [createNewGroup, setCreateNewGroup] = useState(false);

  if (groups.length === 0) return <div>Loading...</div>;
  return (
   <>
      {createNewGroup && <NewGroup setStatus={setCreateNewGroup} />}
      <Wrapper id="Grouproute"
        style={{
          opacity: createNewGroup ? ".3" : "1",
          pointerEvents: createNewGroup ? "none" : "",
        }}
        >
        <Events>{groups.length > 0 && <Banner groups={groups} />}</Events>
        <Events>
          
        <GroupBody setStatus={setCreateNewGroup} groups = {groups}/>
        </Events>
      </Wrapper>
        </>
  );
};
const Wrapper = styled.div`
  width: 100vw;
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const Container = styled.div`
  height: 100vh;
  width: 100vw;
  align-items: center;
`;
const Events = styled.div`
  width: 100%;
  height: 48%;
  /* border: 2px solid red; */
`;

export default Groups;
