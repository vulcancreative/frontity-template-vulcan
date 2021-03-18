import React from "react";
import { styled, connect } from "frontity";
import Link from "../link";

const MenuModal = ({ state }) => {
  const { menu } = state.theme;
  const items = state.source.get(`/menu/${state.theme.menuUrl}/`).items;
  const isThereLinks = items != null && items.length > 0;

  return (
    <>
      <MenuOverlay />
      <MenuContent as="nav">
        {isThereLinks &&
          items.map((item) => {
            if (!item.child_items) {
              return (
                <MenuLink
                  key={item.ID}
                  link={item.url}
                  aria-current={state.router.link === item.url ? "page" : undefined}
                >
                  {item.title}
                </MenuLink>
              );
            } else {
              const childItems = item.child_items;
              return (
                <MenuLinkWithChild key={item.ID}>
                  <MenuLink
                    key={item.ID}
                    link={item.url}
                    aria-current={state.router.link === item.url ? "page" : undefined}
                  >
                    {item.title}
                  </MenuLink>
                  <ChildMenu>
                    {childItems.map((childItem) => {
                      return (
                        <MenuLink
                          key={childItem.ID}
                          link={childItem.url}
                          aria-current={state.router.link === childItem.url ? "page" : undefined}
                        >
                          {childItem.title}
                        </MenuLink>
                      );
                    })}
                  </ChildMenu>
                </MenuLinkWithChild>
              );
            }
          })
        }
     
      </MenuContent>
    </>
  );
};

const MenuOverlay = styled.div`
  background-color: #1f38c5;
  width: 100vw;
  height: 100vh;
  overflow: hidden auto;
  position: fixed;
  z-index: 2;
  top: 0;
  left: 0;
`;

const MenuContent = styled.div`
  z-index: 3;
  display:flex;
  flex-direction: column;
  width: 100%;
  overflow-y: scroll;
`;

const MenuLink = styled(Link)`
  width: 100%;
  outline: 0;
  font-size: 20px;
  text-align: center;
  padding: 1.2rem 0;
  color:var(--white);
    display: block;
    position: relative;
    z-index: 999;
    transition: all 0.3s ease 0s;
  &:hover,
  &:focus {
    color:var(--black);
    background-color: rgba(0, 0, 0, 0.05);
  }
  /* styles for active link */
  &[aria-current="page"] {
    color: var(--black);
    font-weight: bold;
  }
`;

/**
 * Styling of nav elements
 */
const MenuLinkWithChild = styled.div`
  background: pink;
`;
const ChildMenu = styled.div`
  left: 0;
  background-color: lightblue;
  width: 100%;
  z-index: 1;
`;

export default connect(MenuModal);
