import styled, { keyframes } from 'styled-components';
import { useBrandStore } from '../../stores/brandStore';
import { useNavigate } from 'react-router-dom';

const StartPge = () => {
  const { logoimg, name, startBackground } = useBrandStore();
  const nav = useNavigate();
  return (
    <BaseContainer>
      {startBackground && <Background src={startBackground} />}
      <LogoWrapper>
        {logoimg ? <LogoContainer src={logoimg} /> : <Title>{name}</Title>}
      </LogoWrapper>
      <OrderOptionsContainer>
        <OrderButton>
          <OrderIcon>🎤</OrderIcon>
          <OrderText>음성으로 주문하기</OrderText>
        </OrderButton>

        <OrderButton onClick={() => nav('/home')}>
          <OrderIcon>👆</OrderIcon>
          <OrderText>기본 주문하기</OrderText>
        </OrderButton>
      </OrderOptionsContainer>

      <EyeTrackingSection>
        <EyeTrackingText>
          <EyeIcon>👁️</EyeIcon>
          아이트래킹으로 주문하기
        </EyeTrackingText>
        <EyeTrackingInstruction>
          터치가 어려우시다면 이 곳을 응시해 주세요
        </EyeTrackingInstruction>
      </EyeTrackingSection>
    </BaseContainer>
  );
};

export default StartPge;

const waveAnimation = keyframes`
  0% { transform: translateY(-3px); }
  50% { transform: translateY(3px); }
  100% { transform: translateY(-3px); }
`;

const BaseContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.main};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 2rem 0;
  position: relative;
`;
const Background = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  pointer-events: none;
`;
const LogoWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 500px;
  height: 500px;
  z-index: 1;
`;
const LogoContainer = styled.img`
  width: 500px;
  height: 500px;
  object-fit: scale-down;
`;
const Title = styled.div`
  font-size: ${({ theme }) => theme.fonts.sizes.logo};
  color: ${({ theme }) => theme.colors.text};
`;
const OrderOptionsContainer = styled.div`
  display: flex;
  justify-content: center;
  justify-content: space-around;
  width: 100%;
  max-width: 900px;
  z-index: 1;
`;

const OrderButton = styled.div`
  background-color: white;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  width: 100%;
  max-width: 350px;
  height: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  box-shadow: ${({ theme }) => theme.shadows.md};

  &:hover {
    transform: scale(1.1);
    box-shadow: ${({ theme }) => theme.shadows.lg};
  }
`;

const OrderIcon = styled.div`
  font-size: ${({ theme }) => theme.fonts.sizes.xl};
  margin-bottom: 1rem;
`;

const OrderText = styled.div`
  font-size: ${({ theme }) => theme.fonts.sizes.lg};
  font-weight: ${({ theme }) => theme.fonts.weights.bold};
  color: ${({ theme }) => theme.colors.main};
`;

const EyeTrackingSection = styled.div`
  position: relative;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.1);
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
`;

const EyeTrackingText = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  color: white;
  font-size: ${({ theme }) => theme.fonts.sizes.lg};
  font-weight: ${({ theme }) => theme.fonts.weights.bold};
`;

const EyeIcon = styled.span`
  font-size: ${({ theme }) => theme.fonts.sizes.lg};
`;

const EyeTrackingInstruction = styled.div`
  color: white;
  font-size: ${({ theme }) => theme.fonts.sizes.md};
  margin-top: 0.5rem;
  animation: ${waveAnimation} 2s infinite ease-in-out;
`;
