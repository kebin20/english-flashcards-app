import styled from 'styled-components';
import { Link } from 'react-router-dom';
import logo from '../assets/flash-card.png';

const StyledNavBar = styled.nav`
position: fixed;
width: 100%;
padding: 0.5em;
display: flex;
align-items: center;
justify-content: space-between;
gap: 1em;
background-color: var(--clr-white);
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.3);
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
`;

function Navbar() {
  return (
    <StyledNavBar>
      <Link to="/">
        <Logo src={logo} alt="ロゴ" />
      </Link>
      <Link to="/">
        <NavTitle>フラッシュカード</NavTitle>
      </Link>
      <NavMenu>
        <Link to="/menu">デック</Link>
        <li>編集</li>
      </NavMenu>
    </StyledNavBar>
  );
}

export default Navbar;
