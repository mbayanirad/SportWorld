import { useEffect, useState } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { Image, Transformation } from "cloudinary-react";
import { useContext } from "react";
import { UserContext } from "../../Contexts/UserContext";

const Banner = () => {
  //-------------------------------------------
  //-------------------------------------------
  //read user data from userContext
  const { state } = useContext(UserContext);
  return (
    <>
      {state?.logInUserId !== null && (
        <Container>
          <Image
            cloudName="doc7plec9"
            publicId={state.logInUserInfo.bannerSrc}
            loading="lazy"
          >
            <Transformation rawTransformation="h_320,w_1420,c_fill,g_auto,r_0:0:20:20" />
            <Transformation effect="outline:0" color="none" />
            {/* <Transformation */}
            {/* <Transformation background="lightblue" /> */}
          </Image>
          <ProfileWrapper>
            <Image
              cloudName="doc7plec9"
              publicId={state.logInUserInfo.imgSrc}
              // loading="lazy"
            >
              <Transformation
                rawTransformation={`a_2,bo_1px_solid_rgb:111111,c_fill,dpr_1.3,g_south_west,r_max,h_150,w_150,z_3.8`}
              />
              <Transformation
              rawTransformation={`c_scale,fl_relative,g_south,h_30,l_recipes:black_bar,o_60,w_150,x_0,y_0,r_5/co_rgb:ffffff,l_text:Arial_20_bold:Hi ${state.logInUserInfo.firstName},y_60`}
              />
              <Transformation effect="outline:0" color="none" />
            </Image>
          </ProfileWrapper>
        </Container>
      )}
    </>
  );
};
const ProfileWrapper = styled.div`
  position: absolute;
  border-radius: 50%;
  /* border: 2px solid red; */
  /* z-index: 10; */
`;
const Container = styled.div`
  position: relative;
  display: flex;
  margin-right: 15px;
  align-items: center;
  justify-content: space-between;
  min-height: 50%;
  max-height: 50%;
`;
const BannerWrapper = styled(NavLink)`
  text-decoration: none;
  display: flex;
  background: lightblue;
  display: flex;
  min-height: 45%;
  max-height: 45%;
  padding: 0 30px;
`;
const Info = styled.div`
  margin: 30px 30px;
`;

const P = styled.p`
  font-weight: bold;
  font-size: 1em;
  margin: 20px 0;
  /* color: white; */
`;
const DisJoined = styled.button`
  color: white;
  font-weight: bold;
  font-size: 1.2em;
  border: none;
  width: 150px;
  height: 30px;
  border-radius: 5px;
  margin: 10px 0;
  position: absolute;
  left: 80%;
  top: 80%;
  background: #953e4d;
  &:hover {
    background: #904371;
  }
`;

const Joined = styled(DisJoined)`
  color: white;
  background: #15be89;
  &:hover {
    background: #00d3d1;
  }
`;
export default Banner;
