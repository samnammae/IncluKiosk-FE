import styled from "styled-components";
import { useLockStore } from "../stores/lockStore";
import { useSocketStore } from "../stores/socketStore";

const LockButton = () => {
  const { setLocked } = useLockStore();
  const { sendMessage } = useSocketStore();
  return (
    <Container
      onClick={(e) => {
        e.stopPropagation();
        sendMessage({ type: "ALL_RESET" });
        setLocked(true); //잠금화면으로 돌아가기
      }}
    >
      잠금화면으로 돌아가기
    </Container>
  );
};

export default LockButton;

const Container = styled.button`
  position: absolute;
  top: 4rem;
  left: 2rem;
  z-index: 10;

  padding: 0.8rem 1.2rem;
  border-radius: ${({ theme }) => theme.borderRadius.lg};

  /* 투명한 글래스모피즘 스타일 */
  background: rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(6px);

  border: 1px solid rgba(255, 255, 255, 0.4);

  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fonts.sizes.xs};
  font-weight: ${({ theme }) => theme.fonts.weights.medium};

  cursor: pointer;
  transition: 0.25s ease;

  /* 기본 box-shadow */
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 14px rgba(255, 255, 255, 0.25),
      0 6px 18px rgba(0, 0, 0, 0.3);
    background: rgba(255, 255, 255, 0.18);
    border-color: rgba(255, 255, 255, 0.55);
  }

  &:active {
    transform: translateY(-1px);
    box-shadow: 0 2px 10px rgba(255, 255, 255, 0.2),
      0 4px 12px rgba(0, 0, 0, 0.25);
  }
`;
