import React from "react";
import { connect, styled } from "frontity";
import Link from "./../link";

const Nav = ({ state }) => {
  const items = state.source.get(`/menu/${state.theme.menuUrl}/`).items;
  return (
    <NavHeader>
      <NavContainer>
        <NavWrapper>
          {items.map((item) => {
            if (!item.child_items) {
              return (
                <NavItem key={item.ID}>
                  <Link link={item.url}>{item.title}</Link>
                </NavItem>
              );
            } else {
              const childItems = item.child_items;
              return (
                <NavItemWithChild key={item.ID}>
                  <Link link={item.url}>{item.title}</Link>
                  <ChildMenu>
                    {childItems.map((childItem) => {
                      return (
                        <NavItem key={childItem.ID}>
                          <Link link={childItem.url}>{childItem.title}</Link>
                        </NavItem>
                      );
                    })}
                  </ChildMenu>
                </NavItemWithChild>
              );
            }
          })}
        </NavWrapper>
      </NavContainer>
    </NavHeader>
  );
};

export default connect(Nav);

const NavHeader = styled.div`
  @media (max-width: 767px) {
    display: none;
  }
`;

const NavContainer = styled.nav`
  display: block;
  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }
`;

const NavWrapper = styled.ul`
  vertical-align: top;
  display: inline-block;
  a {
    display: block;
    color: var(--white);
    text-decoration: none;
    padding: 8px 20px;
    text-transform: capitalize;
    position: relative;
    opacity: .6;
  }
  li {
    position: relative;
  }
  & > li {
    float: left;
    margin-right: 1px;
  }
  & > li > a {
    margin-bottom: 1px;
  }
  & > li:hover,
  & > li:hover > a {
    border-bottom-color: var(--orange);
  }
  & li:hover > a {
    color: orange;
  }

  & li a:first-of-type:nth-last-of-type(2):before {
    content: "";
    position: absolute;
    height: 0;
    width: 0;
    border: 5px solid transparent;
    top: 50%;
    right: 5px;
  }
  /* submenu positioning*/
  & ul {
    position: absolute;
    white-space: nowrap;
    border-bottom: 5px solid var(--orange);
    z-index: 1;
    left: -99999em;
  }
  & > li:hover > ul {
    left: auto;
    padding-top: 5px;
    min-width: 100%;
  }
  & > li li ul {
    border-left: 1px solid var(--white);
  }

  & > li li:hover > ul {
    /* margin-left: 1px */
    left: 100%;
    top: -1px;
  }
  /* arrow hover styling */
  & > li > a:first-of-type:nth-last-of-type(2):before {
    border-top-color: #aaa;
  }
  & > li:hover > a:first-of-type:nth-last-of-type(2):before {
    border: 5px solid transparent;
    border-bottom-color: var(--orange);
    margin-top: -5px;
  }
  & li li > a:first-of-type:nth-last-of-type(2):before {
    border-left-color: #aaa;
    margin-top: -5px;
  }
  & li li:hover > a:first-of-type:nth-last-of-type(2):before {
    border: 5px solid transparent;
    border-right-color: var(--orange);
    right: 10px;
  }
`;

const NavItem = styled.li``;

/**
 * Styling of nav elements
 */
const NavItemWithChild = styled.li``;

const ChildMenu = styled.ul`
  background-color: var(--orange);
`;
