import NavBar from './Navbar';
import welcomeImage from '../assets/welcome-image.png';
import styled from 'styled-components';

const WelcomeScreenContainer = styled.div`
display: flex;
align-items: center;
justify-content: center;
flex-direction: column;
height: 100vh;
`;

const WelcomeBox = styled.div`
border-radius: var(--round);
background-color: var(--clr-white);
box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
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
text-align: center;s
`;

function WelcomeScreen() {
  return (
    <>
      <NavBar />
      <WelcomeScreenContainer>
        <WelcomeBox>
          <WelcomeTitle>単語練習</WelcomeTitle>
          <p>3年生～6年生の単語を復習しよう！</p>
          <WelcomeImage src={welcomeImage} alt="英語を話している" />
        </WelcomeBox>
      </WelcomeScreenContainer>
    </>
  );
}

export default WelcomeScreen;
