import React from "react";
import { connect, styled } from "frontity";
import Link from "../link";
import Nav from "./nav";
import MobileMenu from "./menu";

const Header = ({ state, libraries }) => {
  return (
    <>
      <BrandContainer>
        <StyledLink link="/">
          <h1>Logo</h1>
        </StyledLink>
        <MobileMenu />
      </BrandContainer>
      <Nav />
    </>
  );
};

// Connect the Header component to get access to the `state` in it's `props`
export default connect(Header);

const BrandContainer = styled.div`
  box-sizing: border-box;
  color: var(--orange);
  width: 100%;
  @media (min-width: 768px) {
    display: flex;
    width: auto;
  }
`;

const Title = styled.div`
  margin: 0;
  font-size: 20px;
  span {
    font-weight:800;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color:var(--orange);
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  &:hover {
    color:var(--black);
  }
`;
