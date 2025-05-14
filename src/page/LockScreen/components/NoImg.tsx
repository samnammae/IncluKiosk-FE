import styled, { keyframes } from 'styled-components';

const NoImg = () => {
  return (
    <Background>
      <Title>IncluKiosk</Title>
    </Background>
  );
};

export default NoImg;

const Background = styled.div`
  min-height: 100%;
  background: ${({ theme }) =>
    `linear-gradient(135deg, ${theme.colors.standard} 0%, ${theme.colors.background} 100%)`};
  display: flex;
  justify-content: center;
  align-items: center;
`;
const bounceAnimation = keyframes`
  0%, 70% {
    transform: translateY(0);
  }
  30% {
    transform: translateY(-30px);
  }
`;
const Title = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fonts.sizes.logo};
  font-weight: ${({ theme }) => theme.fonts.weights.bold};
  animation: ${bounceAnimation} 2s ease-in-out infinite;
`;
