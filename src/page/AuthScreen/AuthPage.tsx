import { useState } from 'react';
import styled from 'styled-components';
import Login from './components/Login';
import Join from './components/Join';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const changeMode = () => {
    setIsLogin(!isLogin);
  };
  return (
    <Background>
      <Title>
        <span>IncluKiosk</span>
      </Title>
      {isLogin ? (
        <Login changeMode={changeMode} />
      ) : (
        <Join changeMode={changeMode} />
      )}
    </Background>
  );
};

export default AuthPage;

const Background = styled.div`
  min-height: 100%;
  background: ${({ theme }) =>
    `linear-gradient(135deg, ${theme.colors.standard} 0%, ${theme.colors.background} 100%)`};
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;

const Title = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  span {
    color: ${({ theme }) => theme.colors.white};
    font-size: ${({ theme }) => theme.fonts.sizes.logo};
    font-weight: ${({ theme }) => theme.fonts.weights.bold};
  }
`;
