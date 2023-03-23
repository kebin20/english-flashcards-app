import React from 'react';
import logo from "../assets/flash-card.png"

function Navbar() {
  return(
    <nav>
      <img src={logo} alt="flashcard logo"/>
      <h1>フラッシュカード</h1>
      <ul>
        <li>デック</li>
        <li>編集</li>
      </ul>
    </nav>
  )
}

export default Navbar;
