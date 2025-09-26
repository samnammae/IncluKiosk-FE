import { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { useSocketStore } from "../../stores/socketStore";

const AdjustHeight = ({ nextPage }: { nextPage: () => void }) => {
  const { connect, setOnMessage } = useSocketStore();
  const [currentStep, setCurrentStep] = useState(0);
  const [isAdjusting, setIsAdjusting] = useState(true);

  const steps = [
    "키오스크 높이를 조절하는 중입니다...",
    "최적의 높이를 찾고 있습니다...",
    "사용자 맞춤 설정을 적용하는 중...",
    "높이 조절이 완료되었습니다!",
  ];

  //소켓 연결
  useEffect(() => {
    connect();
  }, [connect]);

  useEffect(() => {
    setOnMessage((msg) => {
      if ((msg.type = "EYE_CALIB_ON")) {
        setIsAdjusting(false); //높이 조정 완료 표시
        setCurrentStep(3); //높이 조정 완료 문구 표시
        setTimeout(() => nextPage(), 2000); // 2초 정도 기다린 후 눈 인식 화면으로 변경
      }
    });
  }, []);

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
      <KioskContainer>
        <Kiosk $isAdjusting={isAdjusting}>
          <Screen>
            <ScreenContent>
              <Logo>INCLU KIOSK</Logo>
              <StatusText $isComplete={!isAdjusting}>
                {steps[currentStep]}
              </StatusText>

              {!isAdjusting && <CompletedIcon>✓</CompletedIcon>}
            </ScreenContent>
          </Screen>

          {/* 키오스크 베이스 */}
          <Base />
        </Kiosk>
      </KioskContainer>
    </Container>
  );
};

export default AdjustHeight;

// 애니메이션 정의
const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
`;

const adjustUp = keyframes`
  0%, 100% { transform: translateY(0px) scaleY(1); }
  50% { transform: translateY(-5px) scaleY(1.02); }
`;

const pulse = keyframes`
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.1); opacity: 0.8; }
`;

// 스타일 컴포넌트들
const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 2rem;
  gap: 3rem;
`;

const KioskContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Kiosk = styled.div<{ $isAdjusting: boolean }>`
  position: relative;
  animation: ${({ $isAdjusting }) => ($isAdjusting ? adjustUp : "none")} 3s
    ease-in-out infinite;
`;

const Screen = styled.div`
  width: 300px;
  height: 400px;
  background: #1a1a1a;
  border-radius: 20px 20px 10px 10px;
  border: 8px solid #333;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      45deg,
      transparent 49%,
      rgba(255, 255, 255, 0.1) 50%,
      transparent 51%
    );
    animation: ${float} 4s ease-in-out infinite;
  }
`;

const ScreenContent = styled.div`
  text-align: center;
  color: white;
  z-index: 1;
`;

const Logo = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  color: #4ecdc4;
  margin-bottom: 3rem;
  text-shadow: 0 0 10px rgba(78, 205, 196, 0.3);
`;

const StatusText = styled.p<{ $isComplete: boolean }>`
  font-size: 1rem;
  margin-bottom: 2rem;
  color: ${({ $isComplete }) => ($isComplete ? "#4ecdc4" : "#fff")};
  font-weight: ${({ $isComplete }) => ($isComplete ? "bold" : "normal")};
  animation: ${({ $isComplete }) => ($isComplete ? pulse : "none")} 2s
    ease-in-out infinite;
`;

const Base = styled.div`
  width: 320px;
  height: 80px;
  background: linear-gradient(135deg, #555, #333);
  border-radius: 10px;
  margin-top: -5px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
`;

const CompletedIcon = styled.div`
  font-size: 4rem;
  color: #4ecdc4;
  animation: ${pulse} 1s ease-in-out infinite;
  text-shadow: 0 0 20px rgba(78, 205, 196, 0.5);
`;
