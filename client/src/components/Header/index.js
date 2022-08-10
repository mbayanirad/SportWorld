import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";
import { RiShoppingCartFill } from "react-icons/ri";
import { MdOutlineBusinessCenter } from "react-icons/md";
import { MdSportsKabaddi } from "react-icons/md";
// import { FaHiking, FaIcons } from "";
import { GiThreeFriends } from "react-icons/gi";
// import { useContext, useEffect, useState } from "react";
import Logo from "../../assets/Logo.gif";
// import { v4 as uuidv4, v4 } from "uuid";

const Header = () => {

  return (
  
      <>
      <Wrapper>
         <img src={Logo} style={{ width: "30px", borderRadius: "50%" }} />
        {/* <Company to="/">BodyBreak</Company> */}
        <Container>
          <SearchBar
            type="text"
            placeholder="What are you looking for..."
            ></SearchBar>
          {/* <SearchDiv>
            <SearchResults
              style={{ display:  "none" }}
              >
            </SearchResults>
          </SearchDiv> */}
        </Container>
        <CartTxt>
          Cart
          <IconDiv>
            {/* <Link to="/"> */}
              <RiShoppingCartFill
                style={{ color: "white", fontSize: "23px" }}
                />
              <QuantityBox>qty</QuantityBox>
            {/* </Link> */}
          </IconDiv>
        </CartTxt> 
      </Wrapper>
      <Nav>

      </Nav>
      {/* </> */}
       <Nav> 
        <Icon >
          <Categories>Sport Groups </Categories>
          <MdSportsKabaddi style={{fill:"white", marginLeft: "10px" }} />
        </Icon>
        <Icon >
          <Categories>Sport Friends </Categories>
          <GiThreeFriends style={{fill:"white", marginLeft: "10px" }} />
        </Icon>
        <Icon >
          <Categories>Sport Business </Categories>
          <MdOutlineBusinessCenter style={{fill:"white", marginLeft: "10px" }} />
        </Icon>
    </Nav> 
    </>
    )}
//   );
// };

const Category = styled.span`
  display: flex;
  justify-content: center;
  border-bottom: 2px solid white;
  font-weight: bold;
  padding-bottom: 5px;
`;
const Container = styled.div`
  position: relative;
`;
const Span = styled.span`
  color: white;
`;
const SearchDiv = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  width: 800px;
  max-height: 500px;
  overflow: auto;
  border-radius: 4px;
  z-index: 5;
`;
const SearchResults = styled.ul`
  display: flex;
  position: relative;
  flex-direction: column;
  color: white;
  background-color: #313131;
  cursor: pointer;

  border: none;
  width: auto;
  height: auto;
  padding: 10px;
  z-index: 5;
`;
const Result = styled.li`
  display: flex;
  font-size: 14px;
  color: white;
  margin-bottom: 5px;
  padding: 5px;
  &:hover {
    background-color: #8e8b8b;
  }
`;
const Predictions = styled.span`
  color: #80b3c4;
`;
const Icon = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
  padding: 10px;
  position: relative;
  :after {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 2px;
    border-bottom: 1px solid white;
    transform: scaleX(0);
    transform-origin: right;
    transition: transform 400ms ease-in-out;
  }
  :hover::after {
    transform: scaleX(1);
    transform-origin: left;
  }
`;
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  background: #5890FF;
  font-family: "Poppins", sans-serif;
  font-weight: bold;
  height: 50px;
  padding: 0 70px 0 53px;
`;

const Company = styled(Link)`
  font-family: "Poppins", sans-serif;
  font-size: 30px;
  color: white;
  text-decoration: none;
`;

const SearchBar = styled.input`
  border: none;
  border-radius: 5px;
  height: 28px;
  width: 800px;
  font-family: "Poppins", sans-serif;
  font-weight: bold;
  background-color: white;
  color: white;
  padding-left: 15px;
`;
const CartTxt = styled.div`
  display: flex;
  align-items: center;
  color: white;
`;
const IconDiv = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  margin-left: 5px;
  cursor: pointer;
  color: white;
`;
const QuantityBox = styled.div`
  position: absolute;
  color: white;
  left: 23px;
  bottom: 14px;
  font-size: 12px;
  margin-left: 2px;
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-around;
  padding-top: 10px;
  padding-bottom: 10px;
  color: white;
  font-family: "Poppins", sans-serif;
  font-weight: bold;
  background: #5890FF;
`;

const Categories = styled.div``;

export default Header;