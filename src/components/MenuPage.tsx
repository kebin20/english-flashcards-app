import NavBar from './Navbar';
import Button from '../UI/Button';
import styled from 'styled-components';

const MenuContainer = styled.div`
display: flex;
align-items: center;
justify-content: center;
flex-direction: column;
height: 100vh;
gap: 2em;
`;

const MenuBox = styled.div`
border-radius: var(--round);
background-color: var(--clr-white);
box-shadow: var(--lg-shadow);
display: grid;
grid-template-columns: repeat(3, 1fr);
align-items: center;
padding: 2em;
margin-inline: 2em;
text-align: center;
`;

function Menu() {
  return (
    <>
      <NavBar />
      <MenuContainer>
        <MenuBox>
          <Button>全部復習</Button>
        </MenuBox>
      </MenuContainer>
    </>
  );
}

export default Menu;
