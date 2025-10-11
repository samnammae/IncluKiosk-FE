import { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { SocketMessage, useSocketStore } from "../../stores/socketStore";
import kioskTop from "../../assets/imgs/kioskTop.webp";
import kioskBottom from "../../assets/imgs/kioskBottom.webp";

const AdjustHeight = ({ nextPage }: { nextPage: () => void }) => {
  const { connect, addOnMessage, removeOnMessage, sendMessage } =
    useSocketStore();
  const [currentStep, setCurrentStep] = useState(0);
  const [isAdjusting, setIsAdjusting] = useState(true);

  const steps = [
    "키오스크 높이를 조절하는 중입니다 ...",
    "최적의 높이를 찾고 있습니다 ...",
    "사용자 맞춤 설정을 적용하는 중 ...",
    "높이 조절이 완료되었습니다!",
  ];

  //소켓 연결
  useEffect(() => {
    connect();
  }, [connect]);

  useEffect(() => {
    const handle = (msg: SocketMessage) => {
      //CASE 2-2 동작 과정
      if (msg.type === "PIR_END") {
        sendMessage({ type: "HEIGHT_SET_ON" }); //CASE 3-1
      }
    };

    addOnMessage(handle);
    return () => removeOnMessage(handle);
  }, [addOnMessage, removeOnMessage, nextPage]);

  useEffect(() => {
    //CASE 3-2
    const handle = (msg: SocketMessage) => {
      if (msg.type === "HEIGHT_SET_END") {
        setIsAdjusting(false);
        setCurrentStep(3);
        setTimeout(() => nextPage(), 2000);
      }
    };

    addOnMessage(handle);
    return () => removeOnMessage(handle);
  }, [addOnMessage, removeOnMessage, nextPage]);

  // 문구 수정
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < steps.length - 2) return prev + 1;
        else return 0;
      });
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  return (
    <Container>
      <ContentWrapper>
        <KioskWrapper>
          {/* 하단 고정된 받침대 */}
          <BottomImage src={kioskBottom} alt="kiosk-bottom" />

          {/* 상단 자동으로 움직이는 스크린 */}
          <TopImage src={kioskTop} alt="kiosk-top" $isAdjusting={isAdjusting} />
        </KioskWrapper>
      </ContentWrapper>
      <TextWrapper>
        {!isAdjusting && <CompletedIcon>✓</CompletedIcon>}
        <StatusText $isComplete={!isAdjusting}>{steps[currentStep]}</StatusText>
      </TextWrapper>
    </Container>
  );
};

export default AdjustHeight;

// 애니메이션 정의
const kioskMove = keyframes`
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-60px);
  }
  100% {
    transform: translateY(0);
  }
`;

const pulse = keyframes`
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.1); opacity: 0.8; }
`;

// 스타일 컴포넌트들
const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(
    135deg,
    rgb(59, 130, 246) 0%,
    rgb(37, 99, 235) 100%
  );
  padding: 2rem;
  position: relative;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;
  position: relative;
`;

const StatusText = styled.p<{ $isComplete: boolean }>`
  font-size: 2rem;
  color: ${({ $isComplete }) => ($isComplete ? "#4ecdc4" : "#fff")};
  font-weight: ${({ $isComplete }) => ($isComplete ? "bold" : "normal")};
  animation: ${({ $isComplete }) => ($isComplete ? pulse : "none")} 2s
    ease-in-out infinite;
  text-align: center;
`;

const KioskWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 400px;
  height: 500px;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  transform: scale(2);
`;

const BottomImage = styled.img`
  position: absolute;
  bottom: 0;
  z-index: 10;
  width: 150px;
  height: auto;
  object-fit: contain;
`;

const TopImage = styled.img<{ $isAdjusting: boolean }>`
  position: absolute;
  bottom: 120px;
  margin-left: 2px;
  z-index: 0;
  width: 100px;
  height: auto;
  object-fit: contain;
  animation: ${({ $isAdjusting }) => ($isAdjusting ? kioskMove : "none")} 6s
    ease-in-out infinite;
`;
const TextWrapper = styled.div`
  width: 100%;
  position: absolute;
  bottom: 150px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

const CompletedIcon = styled.div`
  font-size: 4rem;
  color: #4ecdc4;
  animation: ${pulse} 1s ease-in-out infinite;
  text-shadow: 0 0 20px rgba(78, 205, 196, 0.5);
`;
