import NavBar from './Navbar';
import Button from '../UI/Button';
import welcomeImage from '../assets/welcome-image.png';
import styled from 'styled-components';

const WelcomeScreenContainer = styled.div`
display: flex;
align-items: center;
justify-content: center;
flex-direction: column;
height: 100vh;
gap: 2em;
`;

const WelcomeBox = styled.div`
border-radius: var(--round);
background-color: var(--clr-white);
box-shadow: var(--shadow);
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
      <NavBar />
      <WelcomeScreenContainer>
        <WelcomeBox>
          <WelcomeTitle>単語練習</WelcomeTitle>
          <p>3年生～6年生の単語を復習しよう！</p>
          <WelcomeImage src={welcomeImage} alt="英語を話している" />
        </WelcomeBox>
        <Button>スタート！</Button>
      </WelcomeScreenContainer>
    </>
  );
}

export default WelcomeScreen;
