import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const StartPage = () => {
  const nav = useNavigate();
  return (
    <BaseContainer onClick={() => nav('/home')}>
      <LogoContainer />
    </BaseContainer>
  );
};

export default StartPage;
const BaseContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.main};
`;
const LogoContainer = styled.img``;
