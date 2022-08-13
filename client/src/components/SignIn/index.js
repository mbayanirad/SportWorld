import styled from "styled-components";
import { GoogleLogin } from "@react-oauth/google";
import ski from "../../assets/Login/ski.jpg";
import ski2 from "../../assets/Login/ski2.jpg";
import ski3 from "../../assets/Login/ski3.jpg";
import camping from "../../assets/Login/camping.jpg";
import cycling from "../../assets/Login/cycling.jpg";
import cycling3 from "../../assets/Login/cycling3.jpg";
import fitness from "../../assets/Login/fitness.jpg";
import fitness2 from "../../assets/Login/fitness2.jpg";
import football from "../../assets/Login/football.jpg";
import hicking from "../../assets/Login/hicking.jpg";
import hicking2 from "../../assets/Login/hicking2.jpg";
import running from "../../assets/Login/running.jpg";
import swimming from "../../assets/Login/swimming.jpg";
import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import SignUp from "./SignUp";
import { useContext } from "react";
import { UserContext } from "../Contexts/UserContext";
import { useRef } from "react";

const imgsrc = [
  ski,
  ski2,
  ski3,
  camping,
  cycling,
  cycling3,
  fitness,
  fitness2,
  football,
  hicking,
  hicking2,
  running,
  swimming,
];

const SignIn = () => {
  const [currentImage, setCurrentImage] = useState(null);
  const [signUp, setSignUp] = useState(false);
  const navigate = useNavigate();
  const {
    actions: { logIn },
  } = useContext(UserContext);
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");

  const userIdRef = useRef();
  const passwordRef = useRef();
  useEffect(() => {
    //for first time just load a pictuer
    setCurrentImage(imgsrc[Math.floor(Math.random() * imgsrc.length)]);
    //every 5sec change pictuer
    const intervalId = setInterval(() => {
      setCurrentImage(imgsrc[Math.floor(Math.random() * imgsrc.length)]);
    }, 5000);
    //kill inetrval after logIn
    return () => clearInterval(intervalId);
  }, []);
  const handleLogIn = async (ev) => {
    ev.preventDefault();
    const result = await logIn({userId:userId, password: password})
    if (result === "success")
      navigate("/home");
    else if (result === "passwordNotMatch"){
      setPassword("");
      passwordRef.current.style.backgroundColor = "#ffcccb";
      passwordRef.current.placeholder = "password not match"
      passwordRef.current.value = "";
      passwordRef.current.focus();
    }else{
      setUserId("");
      userIdRef.current.style.backgroundColor = "#ffcccb";
      userIdRef.current.placeholder = "userId/Email not match"
      userIdRef.current.value = "";
      userIdRef.current.focus();
    }

  };
  return (
    <Container>
      {signUp && <SignUp setSignUp={setSignUp} />}
      <SingInForm
        style={{
          opacity: signUp ? ".3" : "1",
          pointerEvents: signUp ? "none" : "",
        }}
      >
        <Img src={currentImage !== null ? currentImage : running} />
        <div>
          <Name>Sport World</Name>
          <Des>Connect with Sport's frinds and Groups around you</Des>
          <Form_Wrapper>
            <Form onSubmit={(ev) => handleLogIn(ev)}>
              <Input
                ref={userIdRef}
                type="text"
                placeholder="User Id or Email"
                required
                value={userId}
                onChange={(ev) =>{
                  userIdRef.current.style.backgroundColor = "white";
                  userIdRef.current.placeholder = "User Id or Email"
                  setUserId(ev.target.value)}}
              />

              <Input
                ref={passwordRef}
                type="password"
                placeholder="Password"
                required
                value={password}
                onChange={(ev) => {
                  passwordRef.current.style.backgroundColor = "white";
                  passwordRef.current.placeholder = "Password"
                  setPassword(ev.target.value)}}
              />

              <Login type="submit" value="Log In" />
              <Forgotpsw to="/">Forgot Password?</Forgotpsw>
              <Divider />
            </Form>
            <CreatAccount>
              <CreatAccountBtn
                onClick={(ev) => {
                  ev.preventDefault();
                  setSignUp(true);
                }}
              >
                {" "}
                Create new account
              </CreatAccountBtn>
              <div>
                <GoogleLogin
                  onSuccess={(credentialResponse) => {
                    console.log(credentialResponse);
                  }}
                  onError={() => {
                    console.log("Login Failed");
                  }}
                  shape="circle"
                  logo_alignment="center"
                />
              </div>
            </CreatAccount>
          </Form_Wrapper>
        </div>
      </SingInForm>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  display: flex;
  /* border: 2px solid red; */
  height: 98vh;
  background-color: #e9ebee;
`;
const SingInForm = styled(Container)``;

const Img = styled.img`
  width: 850px;
  min-width: 850px;
  max-width: 74%;
`;
const Name = styled.h1`
  text-align: center;
  color: #5890ff;
  font-weight: bold;
`;
const Des = styled.h1`
  margin-left: 15px;
`;

const Form_Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Form = styled.form`
  background-color: white;
  min-width: 60%;
  max-width: 90%;
  padding: 30px 10px 10px 10px;

  border: none;
  border-radius: 2%;
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
`;
const CreatAccount = styled(Form)`
  padding: 0px 10px 30px 10px;
`;
const Input = styled.input`
  width: 250px;
  height: 30px;
  margin: 10px 5px;
`;

const Login = styled(Input)`
  background: #5890ff;
  font-size: 1.3em;
  text-decoration: none;
  border: none;
  border-radius: 5px;
  color: white;
  height: 40px;
  margin-bottom: 20px;
  &:hover {
    background: #9288ff;
  }
`;

const Divider = styled.div`
  border: 1px solid lightgray;
  width: 80%;
  margin: 10px 0;
`;

const Forgotpsw = styled(NavLink)`
  text-decoration: none;
  color: #5890ff;
`;

const CreatAccountBtn = styled.button`
  background: #15be89;
  color: white;
  border: none;
  width: 150px;
  height: 30px;
  border-radius: 5px;
  margin: 10px 0;
  &:hover {
    background: #99be62;
  }
`;
export default SignIn;
