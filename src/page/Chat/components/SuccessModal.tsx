import styled from "styled-components";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";

const SuccessModal = ({ isOpen, text }: { isOpen: boolean; text: string }) => {
  if (!isOpen) return null;
  const successText = text.split(". ");
  return (
    <Overlay>
      <BaseContainer>
        <IconWrapper>
          <IconCircle>
            <CheckCircleRoundedIcon
              sx={{ color: "#2e7d32", fontSize: "80px" }}
            />
          </IconCircle>
        </IconWrapper>

        <TextWrapper>
          <SuccessText>
            {successText[0]}
            <br />
            {successText[1]}
          </SuccessText>
          <SubText>잠시 후 초기화면으로 이동합니다.</SubText>
        </TextWrapper>
      </BaseContainer>
    </Overlay>
  );
};

export default SuccessModal;

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
  background: linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  animation: scaleIn 0.5s ease-out;

  @keyframes scaleIn {
    0% {
      transform: scale(0);
    }
    50% {
      transform: scale(1.1);
    }
    100% {
      transform: scale(1);
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

const SuccessText = styled.div`
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
`;
