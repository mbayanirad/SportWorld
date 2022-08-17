import styled from "styled-components";
import { MdAdd } from "react-icons/md";
import { useContext } from "react";
import { UserContext } from "../../Contexts/UserContext";
import GroupBox from "./GroupBox";

const GroupBody = ({ setStatus, groups }) => {
  const {
    state: { logInUserId },
  } = useContext(UserContext);
  return (
    <>
      <Container>
        My Groups
        <MyGroups>
          <NewGroupWrapper>
            <MdAdd size={60} fill="#898F9C" onClick={() => setStatus(true)} />
          </NewGroupWrapper>
          {groups
            .filter((group) => group.owner === logInUserId)
            .map((myGroup) => {
              return (
                <GroupWrapper>
                  <GroupBox group={myGroup} />
                </GroupWrapper>
              );
            })}
        </MyGroups>
        {groups.filter((group) => group.members.includes(logInUserId)).length > 0 && (
          <>
            <Divider />
            Subscriptions Groups
            <RegistredGroups>
              {groups
                .filter((group) => group.members.includes(logInUserId))
                .map((myGroup) => {
                  return (
                    <GroupWrapper>
                      <GroupBox group={myGroup} />
                    </GroupWrapper>
                  );
                })}
            </RegistredGroups>
          </>
        )}
        <Divider />
        Suggestion Groups
        <RegistredGroups>
          {groups
            .filter((group) => group.owner !== logInUserId && 
            !group.members.includes(logInUserId) )
            .map((myGroup) => {
              return (
                <GroupWrapper>
                  <GroupBox group={myGroup} />
                </GroupWrapper>
              );
            })}
        </RegistredGroups>
      </Container>
    </>
  );
};

const Container = styled.div`
  padding: 20px;
  width: 100%;
  height: 100%;
`;
const MyGroups = styled.div`
  margin: 20px 20px;
  display: flex;
  width: 100%;
  height: 50%;
`;
const RegistredGroups = styled(MyGroups)``;

const Divider = styled.div`
  border: 1px solid lightgray;
  margin-bottom: 20px;
`;

const GroupWrapper = styled.div`
  min-height: 100%;
  min-width: 20%;
  border: 1px solid gray;
  border-radius: 10px;
  margin-right: 10px;
`;
const NewGroupWrapper = styled(GroupWrapper)`
  border: 1px dashed lightgray;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export default GroupBody;
