import styled from "styled-components";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { useState, useRef } from "react";
import { Autocomplete, useJsApiLoader } from "@react-google-maps/api";
import { useContext } from "react";
import { UserContext } from "../Contexts/UserContext";
import { useEffect } from "react";

const SignUp = ({ setSignUp }) => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });
  /** @type React.MutableRe&Object<HTMLInputElement> */
  const addressRef = useRef();

  /** @type React.MutableRe&Object<HTMLInputElement> */
  const passwordRef = useRef();
  //reducer funcntion for register new user
  const 
    {actions:{registerNewUser}} = useContext(UserContext);
  //deceler user document's structuer
  const inisialState = {
    firstName: "",
    lastName: "",
    email: "",
    userId: "",
    password: "",
    verifyPassword: "",
    imgSrc: "",
    bannerSrc: "",
    address: null,
    birthDate: null,
    bio: "",
    joined: null,
    myGroups:[],
    registeredGroups:[],
    followerIds:[],
    followingIds:[],
    active:true
  };
  const [individuals, setIndividuals] = useState(inisialState);

  //set address by change addressRef value
  useEffect(() => {
    if(addressRef?.current?.value)
    setIndividuals({
      ...individuals,
      address: addressRef.current.value})
      
      return () => {
        setIndividuals(inisialState)
      };
    }, [addressRef?.current?.value]);
    
    const handleSignUp = async (ev) => {
      ev.preventDefault();
      
      //check password is mutch or not
      if(individuals.password === individuals.verifyPassword){
        //set current time for joind
        // console.log("address",address);
        setIndividuals({
          ...individuals,
          joined: await new Date().toISOString()})
          const result = await registerNewUser(individuals);
          console.log("handlesubmit result",result)
          // if not focus on password input
          console.log(individuals);
        }else{
          passwordRef.current.style.backgroundColor = "#ffcccb";
          
          passwordRef.current.focus();
        }
      }
      const previewFile = (file, key) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          setIndividuals({
            ...individuals,
            [key]:reader.result
          })
        }
      }
      if (!isLoaded) return <div>Loading...</div>;
      return (
    <Cointtainer
      onClick={(ev) => {
        console.log("key is", ev.key);
        if (ev.key === "Escape") setSignUp(false);
      }}
    >
      <Head>
        <h1>Sign Up</h1>
        <IoMdCloseCircleOutline size={30} onClick={() => setSignUp(false)} />
      </Head>
      <Divider />
      <form 
        onSubmit={(ev)=>handleSignUp(ev)}
        >
        {/* fullName setion */}
        <Section>
          <Input
            // required
            type="text"
            placeholder="firstName"
            value={individuals.firstName}
            onChange={(ev) =>
              setIndividuals({ ...individuals, firstName: ev.target.value })
            }
            // key={"firstName"}
          />
          <Input
            // required
            type="text"
            placeholder="lastName"
            value={individuals.lastName}
            onChange={(ev) =>
              setIndividuals({ ...individuals, lastName: ev.target.value })
            }
            // key={"lastName"}
          />
        </Section>
        {/* email/Id section */}
        <Section>
          <Input
            // required
            type="text"
            placeholder="email"
            value={individuals.email}
            onChange={(ev) =>
              setIndividuals({ ...individuals, email: ev.target.value })
            }
            // key={"email"}
          />
          <Input
            // required
            type="text"
            placeholder="userId"
            value={individuals.userId}
            onChange={(ev) =>
              setIndividuals({ ...individuals, userId: ev.target.value })
            }
            // key={"userId"}
          />
        </Section>
        {/* password section */}
        <Section>
          <Input
            // required
            ref={passwordRef}
            type="password"
            placeholder="password"
            value={individuals.password}
            onChange={(ev) =>{
              passwordRef.current.style.backgroundColor="white";
              setIndividuals({ ...individuals, password: ev.target.value });
            }
            }
            // key={"password"}
          />
          <Input
            
            // required
            type="password"
            placeholder="verifyPassword"
            value={individuals.verifyPassword}
            onChange={(ev) =>{
              passwordRef.current.style.backgroundColor="white";
              setIndividuals({
                ...individuals,
                verifyPassword: ev.target.value,
              })
            }
            }
            // key={"verifyPassword"}
          />
        </Section>
        {/* birthday section */}
        <Section>
          <label style={{ margin: "10px" }}>birthDate</label>
          <input
            type="date"
            style={{ width: "316px", height: "30px" }}
            value={individuals.birthDate}
            onChange={(ev) =>
              setIndividuals({
                ...individuals,
                birthDate: ev.target.value,
              })
            }
          />
        </Section>
        <Divider />
        <Section>
          <Autocomplete>
            <Address
              type="text"
              placeholder="Address"
              ref={addressRef}
            />
          </Autocomplete>
        </Section>
        {/* bio section */}
        <Section>
          <Bio
            placeholder="biography"
            value={individuals.bio}
            onChange={(ev) =>
              setIndividuals({
                ...individuals,
                bio: ev.target.value,
              })
            }
          />
        </Section>
        <Divider />
        {/* imags section */}
        <Section>
          <label> select an image</label>
          <Input
            type="file"
            name="image"
            accept="image/*"
            // placeholder="password"
            // value={individuals.imgSrc}
            onChange={(ev) => previewFile(ev.target.files[0],"imgSrc")}
            // key={"img"}
          />
        </Section>
        <Section>
          <label> select an banner</label>

          <Input
            type="file"
            name="banner"
            // placeholder="verifyPassword"
            // value={individuals.bannerSrc}
            onChange={(ev) => previewFile(ev.target.files[0],"bannerSrc")}
            // key={"banner"}
          />
        </Section>
        <Divider />
        <Submit>
        <Btn type="submit" />
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
const Address = styled(Input)`
  min-width: 390px;
`;
const Btn = styled(Input)`
  background: #15be89;
  color: white;
  border: none;
  font-weight: bold;
  border-radius: 5px;
  &:hover {
    background: #99be62;
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
  min-height: 80%;
  background: white;
  // #E9EBEE;
  position: absolute;
  left: 20%;
  top: 8%;
  z-index: 10;
  border-radius: 10px;
  box-shadow: 5px 6px 15px 6px #888888;
`;
const Head = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 30px 20px 2px 10px;
`;
export default SignUp;
