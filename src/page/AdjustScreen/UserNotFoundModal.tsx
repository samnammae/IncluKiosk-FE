import styled from "styled-components";
import PersonOffRoundedIcon from "@mui/icons-material/PersonOffRounded";

const UserNotFoundModal = ({ isOpen }: { isOpen: boolean }) => {
  if (!isOpen) return null;
  return (
    <Overlay>
      <BaseContainer>
        <IconWrapper>
          <IconCircle>
            <PersonOffRoundedIcon sx={{ color: "#f57c00", fontSize: "80px" }} />
          </IconCircle>
        </IconWrapper>

        <TextWrapper>
          <WarnText>사용자를 찾을 수 없습니다</WarnText>
          <SubText>잠시 후 초기화면으로 이동합니다.</SubText>
        </TextWrapper>
      </BaseContainer>
    </Overlay>
  );
};

export default UserNotFoundModal;

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  z-index: 2000;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: fadeIn 0.2s ease-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const BaseContainer = styled.div`
  width: 560px;
  background-color: white;
  border-radius: 24px;
  padding: 48px 40px 40px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const IconWrapper = styled.div`
  margin-bottom: 32px;
`;

const IconCircle = styled.div`
  width: 140px;
  height: 140px;
  border-radius: 50%;
  background: linear-gradient(135deg, #fff3e0 0%, #ffe0b2 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  animation: pulse 2s ease-in-out infinite;

  @keyframes pulse {
    0%,
    100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.05);
    }
  }
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  margin-bottom: 20px;
  text-align: center;
`;

const WarnText = styled.div`
  font-size: 24px;
  font-weight: 600;
  color: #212121;
  line-height: 1.5;
  letter-spacing: -0.02em;
`;

const SubText = styled.div`
  font-size: 16px;
  color: #757575;
  line-height: 1.6;
  letter-spacing: -0.01em;
  animation: pulseText 2s ease-in-out infinite;

  @keyframes pulseText {
    0%,
    100% {
      opacity: 1;
    }
    50% {
      opacity: 0.3;
    }
  }
`;
