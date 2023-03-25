import styled from 'styled-components';

const StyledButton = styled.button`
  display: inline-block;
  padding: 1em 3em;
  font-family: var(--ff-jp-title);
  background-color: var(--clr-orange);
  color: var(--clr-dark);
  border-radius: var(--round);
  border: none;
  box-shadow: var(--md-shadow);
  font-size: 1.25rem;
  line-height: 1.6rem;
  cursor: pointer;
  
&:hover, &:active {
  background-color: var(--clr-orange-hover);
}
`;

const StyledRevisedButton = styled(StyledButton)`
background-color: var(--clr-alert);
color: var(--clr-white);
`;

function RevisedButton(props) {
  return (
    <StyledRevisedButton type={props.type || 'button'} onClick={props.onClick}>
      {props.children}
    </StyledRevisedButton>
  );
}

export default RevisedButton;