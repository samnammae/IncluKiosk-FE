import styled from "styled-components";
import { BaseContainer, Title } from "../Styles";
import CreditCardGif from "../../../assets/imgs/credit-card.webp";
import { useEffect, useState } from "react";
import { useOrderStore } from "../../../stores/orderStore";
import { useSocketStore } from "../../../stores/socketStore";

const PaymentProcessing = () => {
  const { moveToNextStep } = useOrderStore();
  const { sendMessage } = useSocketStore();
  useEffect(() => {
    sendMessage({ type: "ALL_RESET" }); //CASE 6
    const timer = setTimeout(() => {
      moveToNextStep();
    }, 5000);

    return () => clearInterval(timer);
  }, []);
  const [imageLoaded, setImageLoaded] = useState(false);
  return (
    <BaseContainer>
      <Title>결제 진행 중</Title>
      <ImgWrapper>
        {!imageLoaded && (
          <SkeletonWrapper>
            <SkeletonCard />
          </SkeletonWrapper>
        )}
        <ImgContainer
          src={CreditCardGif}
          alt="결제 처리 중"
          onLoad={() => setImageLoaded(true)}
        />
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
  margin-bottom: 1rem;
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
// 스켈레톤 스타일
const SkeletonWrapper = styled.div`
  width: 450px;
  height: 450px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f5f5f5;
  border-radius: 16px;
`;

const SkeletonCard = styled.div`
  width: 280px;
  height: 180px;
  background: linear-gradient(90deg, #f0f0f0 0%, #e0e0e0 50%, #f0f0f0 100%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  border-radius: 12px;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    top: 20px;
    left: 20px;
    width: 50px;
    height: 35px;
    background: #d0d0d0;
    border-radius: 4px;
  }

  @keyframes shimmer {
    0% {
      background-position: -200% 0;
    }
    100% {
      background-position: 200% 0;
    }
  }
`;
