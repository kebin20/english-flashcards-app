import styled from "styled-components";
import Container from "../UI/Container";

import { MainLink } from "../UI/Buttons/Buttons";

import welcomeImage from "../assets/welcome-image.png";
import React from "react";

const WelcomeBox = styled.div`
  border-radius: var(--round);
  background-color: var(--clr-white);
  box-shadow: var(--lg-shadow);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2em;
  margin-inline: 2em;
  text-align: center;
`;

const WelcomeImage = styled.img`
  max-width: 60%;
`;

const WelcomeTitle = styled.h1`
  text-align: center;
`;

function WelcomeScreen() {
  return (
    <>
      <Container>
        <WelcomeBox>
          <WelcomeTitle>単語練習</WelcomeTitle>
          <p>3年生～6年生の単語を復習しよう！</p>
          <WelcomeImage src={welcomeImage} alt="英語を話している" />
        </WelcomeBox>
        <MainLink to="/menu" deckData={[]}>スタート!</MainLink>
      </Container>
    </>
  );
}

export default WelcomeScreen;
