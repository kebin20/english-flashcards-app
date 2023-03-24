import NavBar from './Navbar';
import 
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
padding: 6em;
margin-inline: 2em;
`;

const WelcomeImage = styled.img`

`

function WelcomeScreen() {
  return (
    <>
      <NavBar />
      <WelcomeScreenContainer>
        <WelcomeBox>
          <h1>3年生～6年生の単語を復習しよう！</h1>
          <WelcomeImage src={} alt=""/>
        </WelcomeBox>
      </WelcomeScreenContainer>
    </>
  );
}

export default WelcomeScreen;
