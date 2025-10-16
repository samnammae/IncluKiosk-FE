import { useEffect, useState } from "react";
import styled from "styled-components";
import { SocketMessage, useSocketStore } from "../../stores/socketStore";
import * as motion from "motion/react-client";
import EyeCalibrationFailModal from "./EyeCalibrationFailModal";

const AdjustEye = ({ nextPage }: { nextPage: () => void }) => {
  const { connect, addOnMessage, removeOnMessage, sendMessage } =
    useSocketStore();
  const [complete, setComplete] = useState(false);
  const [isErrOpen, setIsOpen] = useState(false);
  useEffect(() => {
    connect();
  }, [connect]);

  useEffect(() => {
    sendMessage({ type: "EYE_CALIB_ON" }); //CASE 4-1
  }, []);

  useEffect(() => {
    const handle = (msg: SocketMessage) => {
      //CASE 4-2-1
      if (msg.type === "EYE_CALIB_END") {
        setComplete(true);
        setTimeout(() => {
          nextPage();
        }, 3000);
      }
      //CASE 4-2-2
      if (msg.type === "EYE_CALIB_ERR") {
        setIsOpen(true);
        setTimeout(() => {
          sendMessage({ type: "EYE_CALIB_ON" }); //다시 CASE 4-1 진입
          setIsOpen(false);
        }, 3000);
      }
    };

    addOnMessage(handle);
    return () => removeOnMessage(handle);
  }, [addOnMessage, removeOnMessage, sendMessage, nextPage]);
  return (
    <>
      <EyeCalibrationFailModal isOpen={isErrOpen} />
      <Container>
        <Title>아이트래킹을 위한 시선 초점 맞추는 중</Title>

        <TargetWrapper>
          {/* 외부 링 */}
          <OuterRing
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 2,
              ease: "easeInOut",
              repeat: Infinity,
            }}
          />

          {/* 중간 링 */}
          <MiddleRing
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 2,
              ease: "easeInOut",
              repeat: Infinity,
              delay: 0.2,
            }}
          />

          {/* 중심점 */}
          <CenterDot
            animate={{
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 1.5,
              ease: "easeInOut",
              repeat: Infinity,
            }}
          />
        </TargetWrapper>

        <Instruction $isComplete={complete}>
          {complete
            ? "✓ 조정 완료이 완료되었습니다!"
            : "중앙의 점을 계속 바라봐주세요"}
        </Instruction>
      </Container>
    </>
  );
};

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
  gap: 3rem;
  position: relative;
`;

const Title = styled.h1`
  color: white;
  font-size: 2rem;
  font-weight: 600;
  margin: 0;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
`;

const TargetWrapper = styled.div`
  position: relative;
  width: 350px;
  height: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 60px 0px;
`;

const OuterRing = styled(motion.div)`
  position: absolute;
  width: 350px;
  height: 350px;
  border: 4px solid rgba(255, 255, 255, 0.4);
  border-radius: 50%;
`;

const MiddleRing = styled(motion.div)`
  position: absolute;
  width: 220px;
  height: 220px;
  border: 4px solid rgba(255, 255, 255, 0.6);
  border-radius: 50%;
`;

const CenterDot = styled(motion.div)`
  position: absolute;
  width: 80px;
  height: 80px;
  background: white;
  border-radius: 50%;
  box-shadow: 0 0 30px rgba(255, 255, 255, 0.6),
    0 0 60px rgba(255, 255, 255, 0.4);
`;

const Instruction = styled.div<{ $isComplete: boolean }>`
  color: ${({ $isComplete }) => ($isComplete ? "#4ecdc4" : "#fff")};
  font-size: 1.8rem;
  font-weight: 600;
  text-align: center;
  opacity: 0.9;
`;

export default AdjustEye;
