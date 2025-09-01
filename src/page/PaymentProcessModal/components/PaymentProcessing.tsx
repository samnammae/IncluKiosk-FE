import styled from "styled-components";
import { BaseContainer, Title } from "../Styles";
import CreditCardGif from "../../../assets/imgs/credit-card.webp";
import { useEffect } from "react";
import { useOrderStore } from "../../../stores/orderStore";

const PaymentProcessing = () => {
  const { moveToNextStep } = useOrderStore();
  useEffect(() => {
    const timer = setTimeout(() => {
      moveToNextStep();
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <BaseContainer>
      <Title>결제 진행 중</Title>
      <ImgWrapper>
        <ImgContainer src={CreditCardGif} alt="결제 처리 중" />
      </ImgWrapper>
      <ProcessingContainer>
        <ProcessingText>카드를 삽입하거나 터치해 주세요</ProcessingText>
        <StatusText>결제 정보를 처리하고 있습니다...</StatusText>
        <StatusText>카드를 빼지 말아주세요.</StatusText>
      </ProcessingContainer>
    </BaseContainer>
  );
};

export default PaymentProcessing;

const ProcessingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  margin: 3rem 0;
  flex: 1;
`;

const ImgContainer = styled.img`
  width: 450px;
  height: 450px;
  object-fit: contain;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  margin-bottom: 1rem;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1));
`;
const ImgWrapper = styled.div`
  display: flex;
  align-items: center;
  padding-top: 48px;
  flex: 1;
`;
const ProcessingText = styled.div`
  font-size: ${({ theme }) => theme.fonts.sizes.lg};
  font-weight: ${({ theme }) => theme.fonts.weights.bold};
  color: ${({ theme }) => theme.colors.standard};
  text-align: center;
`;

const StatusText = styled.div`
  font-size: ${({ theme }) => theme.fonts.sizes.md};
  color: ${({ theme }) => theme.colors.grey[600]};
  text-align: center;
  animation: pulse 1.5s infinite;

  @keyframes pulse {
    0% {
      opacity: 0.4;
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0.4;
    }
  }
`;
