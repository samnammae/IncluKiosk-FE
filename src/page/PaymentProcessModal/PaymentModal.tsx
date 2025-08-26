import OrderTypeSelection from "./components/OrderTypeSelection";
import PaymentMethodSelection from "./components/PaymentMethodSelection";
import PaymentProcessing from "./components/PaymentProcessing";
import PaymentComplete from "./components/PaymentComplete";
import styled, { keyframes } from "styled-components";
import CheckOrder from "./components/CheckOrder";
import { PaymentStep, useOrderStore } from "../../stores/orderStore";

const PaymentModal = () => {
  const { isOpen, onClose, currentStep } = useOrderStore();

  if (!isOpen) return null;
  return (
    <ModalOverlay onClick={onClose}>
      {currentStep === PaymentStep.ORDER_TYPE ? (
        <OrderTypeSelection />
      ) : (
        <ModalContainer onClick={(e) => e.stopPropagation()}>
          {currentStep === PaymentStep.CHECK_ORDER && <CheckOrder />}
          {currentStep === PaymentStep.PAYMENT_METHOD && (
            <PaymentMethodSelection />
          )}
          {currentStep === PaymentStep.PROCESSING && <PaymentProcessing />}
          {currentStep === PaymentStep.COMPLETE && <PaymentComplete />}
        </ModalContainer>
      )}
    </ModalOverlay>
  );
};

export default PaymentModal;
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: ${fadeIn} 0.1s ease-in-out;
  backdrop-filter: blur(5px);
`;

const ModalContainer = styled.div`
  width: 80%;
  height: 80%;
  background-color: ${({ theme }) => theme.colors.white};
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  animation: ${fadeIn} 0.2s ease-out;
`;
