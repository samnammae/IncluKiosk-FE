import styled, { keyframes } from "styled-components";

interface VoiceStatusProps {
  isListening: boolean;
  isProcessing: boolean;
}

const VoiceStatus: React.FC<VoiceStatusProps> = ({
  isListening,
  isProcessing,
}) => {
  return (
    <>
      {/* 음성 인식 중 */}
      <ListeningStatus $isActive={isListening}>
        <LoadingDots>
          <LoadingDot $delay={-0.32} />
          <LoadingDot $delay={-0.16} />
          <LoadingDot $delay={0} />
        </LoadingDots>
        음성을 인식하고 있어요...
      </ListeningStatus>

      {/* 답변 준비 중 */}
      <ProcessingStatus $isActive={isProcessing}>
        <LoadingDots>
          <LoadingDot $delay={-0.32} />
          <LoadingDot $delay={-0.16} />
          <LoadingDot $delay={0} />
        </LoadingDots>
        답변을 준비하고 있어요...
      </ProcessingStatus>
    </>
  );
};
export default VoiceStatus;
const pulse = keyframes`
  0%, 100% {
    transform: translateX(-50%) scale(1);
    opacity: 1;
  }
  50% {
    transform: translateX(-50%) scale(1.05); 
    opacity: 0.8;
  }
`;

const dotBounce = keyframes`
  0%, 80%, 100% {
    transform: scale(0);
  }
  40% {
    transform: scale(1);
  }
`;

const StatusIndicator = styled.div<{ $isActive: boolean }>`
  display: ${({ $isActive }) => ($isActive ? "flex" : "none")};
  align-items: center;
  justify-content: center;
  gap: 10px;

  border-radius: 15px;
  padding: 15px 20px;
  margin: 10px 0;
  width: 80%;

  text-align: center;
  font-size: ${({ theme }) => theme.fonts.sizes.xs};
  font-weight: ${({ theme }) => theme.fonts.weights.bold};
  color: white;

  position: fixed;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;

  animation: ${pulse} 1.5s ease-in-out infinite;
`;

const ListeningStatus = styled(StatusIndicator)`
  background: linear-gradient(135deg, #ff6b6b, #ee5a52);
`;

// 답변 준비 중 상태
const ProcessingStatus = styled(StatusIndicator)`
  background: linear-gradient(135deg, #4ecdc4, #44a08d);
`;

// 로딩 도트 컨테이너
const LoadingDots = styled.div`
  display: inline-flex;
  gap: 4px;
`;

// 로딩 도트 개별 스타일
const LoadingDot = styled.span<{ $delay: number }>`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: currentColor;
  animation: ${dotBounce} 1.4s ease-in-out infinite both;
  animation-delay: ${({ $delay }) => $delay}s;
`;
