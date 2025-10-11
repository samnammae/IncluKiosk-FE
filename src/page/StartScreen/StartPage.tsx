import styled, { keyframes } from "styled-components";
import { useShopStore } from "../../stores/shopStore";
import { useNavigate } from "react-router-dom";

import { useEffect, useRef, useState } from "react";
import { setShopData } from "../../apis/setShopData";
import { SocketMessage, useSocketStore } from "../../stores/socketStore";
interface StyledProps {
  $isHovering?: boolean;
  $progress?: number;
}
const StartPge = () => {
  const { logoimg, name, startBackground } = useShopStore();
  const { connect, sendMessage, addOnMessage, removeOnMessage, isConnected } =
    useSocketStore();
  const nav = useNavigate();
  //소켓 관련

  //소켓 연결
  useEffect(() => {
    connect();
  }, [connect]);

  useEffect(() => {
    if (!isConnected) return;
    sendMessage({ type: "MODE_SELECT_ON" }); //CASE 4

    //CASE 5-1
    const handle = (msg: SocketMessage) => {
      if (msg.type === "FIST_DETECTED") {
        nav("/chat");
        sendMessage({ type: "CHAT_ORDER_ON" }); //CASE 5-2
      }
    };
    addOnMessage(handle);
    return () => removeOnMessage(handle);
  }, [isConnected, nav, sendMessage, addOnMessage, removeOnMessage]);

  //새로고침 하더라도 shopData 유지
  useEffect(() => {
    const selectedShopId = Number(localStorage.getItem("shopId"));
    setShopData(selectedShopId);
  }, []);

  const [isHovering, setIsHovering] = useState(false);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef<number | null>(null);

  const handleMouseEnter = () => {
    setIsHovering(true);
    setProgress(0);

    // 5초(5000ms)에 걸쳐 progress를 100까지 증가
    const duration = 5000;
    const interval = 50; // 50ms마다 업데이트
    const increment = (100 * interval) / duration;

    timerRef.current = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + increment;
        if (newProgress >= 100) {
          if (timerRef.current !== null) {
            clearInterval(timerRef.current);
            timerRef.current = null;
          }
          sendMessage({ type: "EYE_ORDER_ON" }); //CASE 5-4
          nav("/home");
          return 100;
        }
        return newProgress;
      });
    }, interval) as unknown as number;
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    setProgress(0);
    if (timerRef.current !== null) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  return (
    <BaseContainer>
      {startBackground && <Background src={startBackground} />}
      <LogoWrapper>
        {logoimg ? <LogoContainer src={logoimg} /> : <Title>{name}</Title>}
      </LogoWrapper>
      <ModeContaier>
        <OrderOptionsContainer>
          <OrderButton
            onClick={() => {
              nav("/chat");
              sendMessage({ type: "CHAT_ORDER_ON" }); //CASE 5-2
            }}
          >
            <OrderText>음성으로 주문하기</OrderText>
          </OrderButton>

          <OrderButton
            onClick={() => {
              nav("/home");
              sendMessage({ type: "NORMAL_ORDER_ON" }); //CASE 5-3
            }}
          >
            <OrderText>기본 주문하기</OrderText>
          </OrderButton>
        </OrderOptionsContainer>
        <EyeTrackingSection
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          $isHovering={isHovering}
        >
          <ProgressBar $progress={progress} />
          <EyeTrackingText>아이트래킹으로 주문하기</EyeTrackingText>
          <EyeTrackingInstruction>
            터치가 어려우시다면 이 곳을 응시해 주세요
          </EyeTrackingInstruction>
          {isHovering && (
            <ProgressText>
              {Math.round(progress)}% ({Math.ceil((100 - progress) / 20)}초
              남음)
            </ProgressText>
          )}
        </EyeTrackingSection>
      </ModeContaier>
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

const ModeContaier = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 20% 10%;
  padding-top: 10%;
  justify-content: space-around;
  align-items: center;
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

const OrderText = styled.div`
  font-size: ${({ theme }) => theme.fonts.sizes.lg};
  font-weight: ${({ theme }) => theme.fonts.weights.bold};
  color: ${({ theme }) => theme.colors.main};
`;

const EyeTrackingSection = styled.div<StyledProps>`
  position: relative;
  width: 90%;
  background-color: white;
  box-shadow: ${({ theme }) => theme.shadows.md};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  overflow: hidden;
  cursor: ${({ $isHovering }) => ($isHovering ? "wait" : "crosshair")};
  transition: cursor 0.2s ease;
`;

const ProgressBar = styled.div<StyledProps>`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: ${({ $progress }) => $progress}%;
  background-color: ${({ theme }) => theme.colors.main};
  transition: width 0.05s linear;
  opacity: 0.3;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
`;

const EyeTrackingText = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: ${({ theme }) => theme.fonts.sizes.lg};
  font-weight: ${({ theme }) => theme.fonts.weights.bold};
  position: relative;
  z-index: 1;
  color: ${({ theme }) => theme.colors.main};
`;

const EyeTrackingInstruction = styled.div`
  font-size: ${({ theme }) => theme.fonts.sizes.md};

  margin-top: 0.5rem;
  animation: ${waveAnimation} 2s infinite ease-in-out;
  position: relative;
  z-index: 1;
`;

const ProgressText = styled.div`
  font-size: ${({ theme }) => theme.fonts.sizes.sm};
  color: ${({ theme }) => theme.colors.main};
  font-weight: ${({ theme }) => theme.fonts.weights.bold};
  position: relative;
  z-index: 1;
  background-color: white;
  padding: 0.5rem 1rem;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  box-shadow: ${({ theme }) => theme.shadows.sm};
`;
