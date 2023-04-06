import React, { useState } from 'react';
import classes from './Navbar.module.css';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import logo from '../assets/flash-card.png';

const StyledNavBar = styled.nav`
  position: fixed;
  width: 100%;
  padding: 0.7em 1.5em;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1em;
  background-color: var(--clr-white);
  box-shadow: var(--lg-shadow);
  z-index: 1000;
`;

const HamburgerButton = styled.button`
  display: block;
  cursor: pointer;
  width: 24px;
  height: 24px;
  transition: all 0.25s;
  position: relative;
  border: none;
  background-color: transparent;
  &:focus {
    outline: none;
  }

  @media only screen and (min-width: 600px) {
    display: none;
  }
`;

const Logo = styled.img`
  width: 3em;
`;

const NavTitle = styled.h1`
  margin-right: auto;
  font-family: var(--ff-jp-title);
`;

const NavMenu = styled.ul`
display: flex;
gap: 1em;

@media only screen and (max-width: 600px) {
  display: none;
}
`;

const NavMobileMenu = styled(NavMenu)`
  background-color: var(--clr-white);
  box-shadow: var(--lg-shadow);
  height: fit-content;
  flex-direction: column;
  align-items: center;
  position: absolute;
  inset: 70% 0 0 0;
  padding: 1.25em 1.5em;
  font-family: var(--ff-jp-text);
  font-weight: 900;
  font-size: var(--fs-500);

  @media only screen and (max-width: 600px) {
    display: flex;
  }
`;

function Navbar() {
  const [toggle, setToggle] = useState(false);
  const [closeMenu, setCloseMenu] = useState(false);

  function toggleHamburgerMenu() {
    setToggle((prevToggle) => !prevToggle);
  }
  return (
    <StyledNavBar>
      <Link to="/">
        <Logo src={logo} alt="ロゴ" />
      </Link>
      <NavTitle>フラッシュカード</NavTitle>

      <HamburgerButton onClick={toggleHamburgerMenu}>
        <span
          className={`${classes.hamburgerTop} ${toggle && classes.open} ${
            toggle && classes.openHamburgerTop
          }`}
        ></span>
        <span
          className={`${classes.hamburgerMiddle} ${toggle && classes.open} ${
            toggle && classes.openHamburgerMiddle
          }`}
        ></span>
        <span
          className={`${classes.hamburgerBottom} ${toggle && classes.open} ${
            toggle && classes.openHamburgerBottom
          }`}
        ></span>
      </HamburgerButton>

      {toggle && (
        <NavMobileMenu>
          <li>
            <Link onClick={() => setToggle(false)} to="/menu">
              デック
            </Link>
          </li>
          <li>
            <Link onClick={() => setToggle(false)} to="/revise">
              復習
            </Link>
          </li>
          <li>
            <Link onClick={() => setToggle(false)} to="/edit-deck">
              編集
            </Link>
          </li>
        </NavMobileMenu>
      )}
      <NavMenu>
        <li>
          <Link onClick={() => setToggle(false)} to="/menu">
            デック
          </Link>
        </li>
        <li>
          <Link onClick={() => setToggle(false)} to="/revise">
            復習
          </Link>
        </li>
        <li>
          <Link onClick={() => setToggle(false)} to="/edit-deck">
            編集
          </Link>
        </li>
      </NavMenu>
    </StyledNavBar>
  );
}

export default Navbar;
