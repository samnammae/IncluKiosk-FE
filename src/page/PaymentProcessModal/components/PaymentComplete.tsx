import styled, { keyframes } from "styled-components";
import { BaseContainer, Title, ButtonContainer, NextButton } from "../Styles";
import BillGif from "../../../assets/imgs/bill.webp";
import { useEffect, useState } from "react";
import { useOrderStore } from "../../../stores/orderStore";
import { useNavigate } from "react-router-dom";
import { useMenuStore } from "../../../stores/menuStore";

const PaymentComplete = () => {
  const { moveToNextStep, orderType, onClose, orderResponse } = useOrderStore();
  const nav = useNavigate();
  const { clearCart } = useMenuStore();
  useEffect(() => {
    const timer = setTimeout(() => {
      moveToNextStep();
      clearCart();
      nav("/start");
    }, 10000);

    return () => clearTimeout(timer);
  }, [moveToNextStep, clearCart, nav]);

  const orderTypeText = orderType === "STORE" ? "매장" : "포장";
  const handleHomeClick = () => {
    clearCart();
    onClose();
    nav("/start");
  };
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <BaseContainer>
      <Title>결제가 완료되었습니다</Title>
      <ImgWrapper>
        {!imageLoaded && <PaymentCompleteSkeleton />}
        <ImgContainer
          src={BillGif}
          alt="주문 완료"
          onLoad={() => {
            setImageLoaded(true);
          }}
        />
      </ImgWrapper>
      <CompletionContainer>
        <OrderNumber>
          주문번호: <Strong>{orderResponse?.data.orderNumber}</Strong>
        </OrderNumber>
        <CompletionMessage>
          {orderTypeText} 주문이 완료되었습니다
        </CompletionMessage>
        <Instructions>
          {orderType === "STORE"
            ? "주문내역이 준비되면 알림을 드립니다"
            : "포장 준비가 완료되면 알림을 드립니다"}
        </Instructions>
      </CompletionContainer>
      <RedirectMessage>잠시 후 메인 화면으로 이동합니다...</RedirectMessage>
      <ButtonContainer>
        <NextButton onClick={handleHomeClick}>홈으로</NextButton>
      </ButtonContainer>
    </BaseContainer>
  );
};

export default PaymentComplete;

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

const CompletionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  margin: 2rem 0;
  padding: 2rem;
  background-color: ${({ theme }) => `${theme.colors.standard}08`};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  width: 100%;
  max-width: 600px;
`;

const OrderNumber = styled.div`
  font-size: ${({ theme }) => theme.fonts.sizes.md};
  font-weight: ${({ theme }) => theme.fonts.weights.medium};
  color: ${({ theme }) => theme.colors.standardText};
  background-color: ${({ theme }) => theme.colors.grey[200]};
  padding: 0.75rem 1.5rem;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  margin-bottom: 36px;
`;

const Strong = styled.span`
  font-weight: ${({ theme }) => theme.fonts.weights.bold};
  color: ${({ theme }) => theme.colors.standard};
  font-size: ${({ theme }) => theme.fonts.sizes.md};
`;

const CompletionMessage = styled.div`
  font-size: ${({ theme }) => theme.fonts.sizes.lg};
  font-weight: ${({ theme }) => theme.fonts.weights.bold};
  color: ${({ theme }) => theme.colors.standard};
  text-align: center;
`;

const Instructions = styled.div`
  font-size: ${({ theme }) => theme.fonts.sizes.md};
  text-align: center;
  color: ${({ theme }) => theme.colors.standardText};
`;

const RedirectMessage = styled.div`
  font-size: ${({ theme }) => theme.fonts.sizes.sm};
  color: ${({ theme }) => theme.colors.grey[500]};
  text-align: center;
  margin-top: 1rem;
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
const PaymentCompleteSkeleton = () => {
  return (
    <Container>
      <SkeletonTitle />

      <ReceiptSkeleton>
        <ReceiptHeader />
        <ReceiptLines>
          <SkeletonLine width="60%" />
          <SkeletonLine width="40%" />
          <SkeletonLine width="80%" />
        </ReceiptLines>
        <ReceiptFooter />
      </ReceiptSkeleton>

      <SkeletonText />
      <SkeletonButton />
    </Container>
  );
};

// 스켈레톤 애니메이션
const shimmer = keyframes`
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  padding: 40px;
  max-width: 400px;
  margin: 0 auto;
`;

const SkeletonBase = styled.div`
  background: linear-gradient(90deg, #f0f0f0 0%, #e0e0e0 50%, #f0f0f0 100%);
  background-size: 200% 100%;
  animation: ${shimmer} 1.5s infinite;
  border-radius: 4px;
`;

const SkeletonTitle = styled(SkeletonBase)`
  width: 200px;
  height: 24px;
`;

const ReceiptSkeleton = styled.div`
  width: 200px;
  background: white;
  border-radius: 8px;
  padding: 20px 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  position: relative;

  /* 영수증 하단 지그재그 */
  &::after {
    content: "";
    position: absolute;
    bottom: -8px;
    left: 0;
    right: 0;
    height: 16px;
    background: white;
    clip-path: polygon(
      0 0,
      10% 100%,
      20% 0,
      30% 100%,
      40% 0,
      50% 100%,
      60% 0,
      70% 100%,
      80% 0,
      90% 100%,
      100% 0,
      100% 50%,
      90% 50%,
      80% 50%,
      70% 50%,
      60% 50%,
      50% 50%,
      40% 50%,
      30% 50%,
      20% 50%,
      10% 50%,
      0 50%
    );
  }
`;

const ReceiptHeader = styled(SkeletonBase)`
  width: 80%;
  height: 40px;
  margin: 0 auto 16px;
  border-radius: 8px;
`;

const ReceiptLines = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 16px;
`;

const SkeletonLine = styled(SkeletonBase)<{ width: string }>`
  width: ${(props) => props.width};
  height: 12px;
  border-radius: 2px;
`;

const ReceiptFooter = styled(SkeletonBase)`
  width: 100%;
  height: 20px;
  border-radius: 4px;
`;

const SkeletonText = styled(SkeletonBase)`
  width: 160px;
  height: 16px;
`;

const SkeletonButton = styled(SkeletonBase)`
  width: 100%;
  max-width: 300px;
  height: 48px;
  border-radius: 8px;
`;
