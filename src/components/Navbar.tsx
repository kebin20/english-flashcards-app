import React from 'react';
import styled from 'styled-components';
import logo from '../assets/flash-card.png';

const Nav = styled.nav`
display: flex;
align-items: center;
justify-content: space-between;
background-color: --clr-white;
`;

function Navbar() {
  return (
    <Nav>
      <img src={logo} alt="flashcard logo" />
      <h1>フラッシュカード</h1>
      <ul>
        <li>デック</li>
        <li>編集</li>
      </ul>
    </Nav>
  );
}

export default Navbar;
