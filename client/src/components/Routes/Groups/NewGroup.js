import { useContext, useState } from "react";
import styled, { keyframes } from "styled-components";
import { UserContext } from "../../Contexts/UserContext";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { GroupsContext } from "../../Contexts/GroupsContext";

const NewGroup = ({ setStatus }) => {
  const [upLoadEvent, setupLoadEvent] = useState(false);

  //reducer funcntion for register new group
  const {
    state: { logInUserId },
  } = useContext(UserContext);
  const { actions:{addNewGroup}} = useContext(GroupsContext)
  //deceler user document's of newGroup
  const initialState = {
    name: "",
    owner: logInUserId,
    members: [],
    establishDate: new Date(),
    activityType: "",
    annuncements: [],
    banner: "",
    desc: "",
  };
  const [individuals, setIndividuals] = useState(initialState);
  //set address by change addressRef value

  const handleRegister = async (ev) => {
    ev.preventDefault();
    setupLoadEvent(true);
    await addNewGroup(individuals);
    setStatus(false);
  };

  const previewFile = (file, key) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setIndividuals({
        ...individuals,
        [key]: reader.result,
      });
    };
  };
  return (
    <Cointtainer>
      <Head>
        <h1>New Group</h1>
        <IoMdCloseCircleOutline size={30} onClick={() => setStatus(false)} />
      </Head>
      <Divider />
      <form onSubmit={(ev) => handleRegister(ev)}>
        {/* Group Name setion */}
        <Section>
          <Input
            required
            type="text"
            placeholder="Group name"
            value={individuals.name}
            onChange={(ev) =>
              setIndividuals({ ...individuals, name: ev.target.value })
            }
            // key={"firstName"}
          />
          <Input
            required
            type="text"
            placeholder="Activity type"
            value={individuals.activityType}
            onChange={(ev) =>
              setIndividuals({ ...individuals, activityType: ev.target.value })
            }
            // key={"firstName"}
          />
        </Section>

          <Section>
            <Bio
              placeholder="description"
              value={individuals.desc}
              onChange={(ev) =>
                setIndividuals({
                  ...individuals,
                  desc: ev.target.value,
                })
              }
            />
          </Section>

        <Divider />
        {/* imags section */}
        <Section>
          <label> select a banner</label>
          <Input
            type="file"
            name="image"
            accept="image/*"
            onChange={(ev) => previewFile(ev.target.files[0], "banner")}
          />
        </Section>
        <Divider />
        <Submit>
          <Btn type="submit" disabled = {upLoadEvent? true:false}>
              Submit
          {upLoadEvent && (
            <Loading>
            <div></div>
            <div></div>
            </Loading>
          )}
          </Btn>
        </Submit>
      </form>
    </Cointtainer>
  );
};
const Bio = styled.textarea`
  min-height: 60px;
  min-width: 97%;
  margin-left: 5px;
`;
const Input = styled.input`
  min-height: 30px;
  min-width: 190px;
  margin-left: 5px;
`;

const Btn = styled.button`
 position: relative;
  display: block;
  width: 60%;
  height: 35px;
  border-color: transparent;
  font-family: "Poppins", Arial, Helvetica, sans-serif;

  border-radius: 4px;
  color: white;
  margin-left: 5%;
  margin-top: 2%;
  background: #15be89;

  &:hover {
    background: #009ed9;
  }

  /* background: #363292; */
  color: #fff;
  cursor: pointer;
  font-weight: 600;
  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }

`;
const Section = styled.div`
  margin: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const Submit = styled(Section)`
  justify-content: center;
  margin: 20px;
`;
const Divider = styled.div`
  border: 1px solid #e9ebee;
  width: 99%;
`;
const Cointtainer = styled.div`
  text-align: left;
  min-width: 30%;
  min-height: auto;
  background: white;
  // #E9EBEE;
  margin-top: 8%;
  margin-left: 15%;
  position: absolute;
  left: 20%;
  top: 8%;
  z-index: 10;
  border-radius: 10px;
  box-shadow: 5px 6px 15px 6px #888888;
  padding: 10px;
`;
const Head = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 30px 20px 2px 10px;
`;

const ldsRipple = keyframes`
  0% {
    top: 36px;
    left: 36px;
    width: 0;
    height: 0;
    opacity: 1;
  }
  100% {
    top: 0px;
    left: 0px;
    width: 72px;
    height: 72px;
    opacity: 0;
  }
`;
const Loading = styled.div`
  display: inline-block;
  position: relative;
  width: 80px;
  height: 140px;
  top: -21px;
  /* z-index: 20; */

  div {
    position: absolute;
    border: 4px solid #fff;
    opacity: 1;
    border-radius: 50%;
    animation: ${ldsRipple} 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;

    &:nth-child(2) {
      animation-delay: -0.5s;
    }
  }
`;

export default NewGroup;
