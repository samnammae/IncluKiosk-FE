import styled from 'styled-components';
import { BaseContainer, Title, ButtonContainer, NextButton } from '../Styles';
import BillGif from '../../../assets/imgs/bill.gif';
import { useEffect } from 'react';
import { useOrderStore } from '../../../stores/OrderStore';
import { useNavigate } from 'react-router-dom';
import { useMenuStore } from '../../../stores/menuStore';

const PaymentComplete = () => {
  const { moveToNextStep, orderType, onClose } = useOrderStore();
  const nav = useNavigate();
  const { clearCart } = useMenuStore();
  useEffect(() => {
    const timer = setTimeout(() => {
      moveToNextStep();
      clearCart();
      nav('/start');
    }, 10000);

    return () => clearTimeout(timer);
  }, [moveToNextStep, clearCart, nav]);

  const orderTypeText = orderType === 'STORE' ? '매장' : '포장';
  const handleHomeClick = () => {
    clearCart();
    onClose();
    nav('/start');
  };
  return (
    <BaseContainer>
      <Title>결제가 완료되었습니다</Title>
      <ImgWrapper>
        <ImgContainer src={BillGif} alt="주문 완료" />
      </ImgWrapper>
      <CompletionContainer>
        <OrderNumber>
          주문번호: <Strong>A-143</Strong>
        </OrderNumber>
        <CompletionMessage>
          {orderTypeText} 주문이 완료되었습니다
        </CompletionMessage>
        <Instructions>
          {orderType === 'STORE'
            ? '주문내역이 준비되면 알림을 드립니다'
            : '포장 준비가 완료되면 알림을 드립니다'}
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
  font-size: ${({ theme }) => theme.fonts.sizes.lg};
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
