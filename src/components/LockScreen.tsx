import styled from "styled-components";
import { useLockStore } from "../stores/lockStore";
import IncluKioskSub from "../assets/imgs/IncluKioskSub.png";
import { useEffect } from "react";
import { useSocketStore } from "../stores/socketStore";

const LockScreen = () => {
  const { isLocked, setLocked, resetTimer } = useLockStore();
  const { sendMessage, setOnMessage } = useSocketStore();

  useEffect(() => {
    if (isLocked) sendMessage({ type: "PIR_ON" }); //CASE 1

    //CASE 2-1
    setOnMessage((msg) => {
      if (msg.type === "PIR_DETECTED") {
        setLocked(false); // 플래그 → 잠금 해제
        resetTimer();
      }
    });

    return () => setOnMessage(null);
  }, [isLocked]);

  return (
    <Overlay visible={isLocked}>
      <Container>
        <ImgContainer src={IncluKioskSub} />
      </Container>
    </Overlay>
  );
};

export default LockScreen;
const Overlay = styled.div<{ visible: boolean }>`
  position: fixed;
  width: 100%;
  height: 100%;
  inset: 0;
  background: ${({ theme }) => theme.colors.main};
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  opacity: ${({ visible }) => (visible ? 1 : 0)};
  transition: opacity 2s ease;
  pointer-events: ${({ visible }) => (visible ? "auto" : "none")};
`;

const Container = styled.div`
  width: 100%;
  height: 80%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 4px;
`;

const ImgContainer = styled.img`
  width: 100%;
  object-fit: fill;
`;
