import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { useBrandStore } from '../../stores/brandStore';

const StartPage = () => {
  const nav = useNavigate();
  const { img } = useBrandStore();
  return (
    <BaseContainer onClick={() => nav('/home')}>
      <LogoContainer src={img} />
      <TextContainer>주문하시려면 터치하세요</TextContainer>
    </BaseContainer>
  );
};

export default StartPage;
const BaseContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.main};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;
`;
const LogoContainer = styled.img`
  width: 650px;
  height: 260px;
  object-fit: contain;
  margin-top: 160px;
`;
const waveAnimation = keyframes`
  0% { transform: translateY(-5px); }
  50% { transform: translateY(5px); }
  100% { transform: translateY(-5px); }
`;

const TextContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 60px;
  margin-bottom: 100px;
  font-size: 36px;
  font-weight: ${({ theme }) => theme.fonts.weights.bold};
  color: #ffffff;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  animation: ${waveAnimation} 2s infinite ease-in-out;

  &::before,
  &::after {
    content: '>>>';
    margin: 0 15px;
  }
`;
