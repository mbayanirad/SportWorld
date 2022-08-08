import styled from "styled-components";
const Singin = () => {
  return (
    <Container>
      <div>
        <Name>Sport World</Name>
        <Des>Connect with Sport's frinds and Groups around you</Des>
      </div>

      <>
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
            // context="meysammmmm"
            // width="1px"
            // logo_alignment={false}
          />
        </div>
      </>
    </Container>
  );
};

const Container = styled`
    display: flex;
`;

const Name = styled.h1`
  color: blue;
  font-weight: bold;
`;
const Des = styled.h1``;

export default Singin;
