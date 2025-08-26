import styled from "styled-components";
import {
  BaseContainer,
  Title,
  ButtonContainer,
  BackButton,
  Button,
} from "../Styles";

import { useState } from "react";
import { useOrderStore } from "../../../stores/orderStore";

type PaymentMethodType = "CARD" | "CASH" | "MOBILE" | null;

const PaymentMethodSelection = () => {
  const { moveToNextStep, moveToPreviousStep, setPaymentMethod } =
    useOrderStore();
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethodType>(null);

  const handleSelectMethod = (method: PaymentMethodType) => {
    setSelectedMethod(method);
    setPaymentMethod(method);
  };

  const handleNext = () => {
    if (selectedMethod) {
      moveToNextStep();
    }
  };

  return (
    <BaseContainer>
      <Title>결제수단 선택</Title>

      <PaymentOptionsContainer>
        <PaymentOption
          $isSelected={selectedMethod === "CARD"}
          onClick={() => handleSelectMethod("CARD")}
        >
          <PaymentIcon>💳</PaymentIcon>
          <PaymentLabel>카드 결제</PaymentLabel>
          <PaymentDescription>신용카드 / 체크카드</PaymentDescription>
        </PaymentOption>

        <PaymentOption
          $isSelected={selectedMethod === "CASH"}
          onClick={() => handleSelectMethod("CASH")}
        >
          <PaymentIcon>💵</PaymentIcon>
          <PaymentLabel>현금 결제</PaymentLabel>
          <PaymentDescription>현금 영수증 발행 가능</PaymentDescription>
        </PaymentOption>

        <PaymentOption
          $isSelected={selectedMethod === "MOBILE"}
          onClick={() => handleSelectMethod("MOBILE")}
        >
          <PaymentIcon>📱</PaymentIcon>
          <PaymentLabel>모바일 결제</PaymentLabel>
          <PaymentDescription>
            카카오페이 / 네이버페이 / 토스
          </PaymentDescription>
        </PaymentOption>
      </PaymentOptionsContainer>

      <ButtonContainer>
        <BackButton onClick={moveToPreviousStep}>이전</BackButton>
        <NextButton
          onClick={handleNext}
          disabled={!selectedMethod}
          $isActive={!!selectedMethod}
        >
          결제하기
        </NextButton>
      </ButtonContainer>
    </BaseContainer>
  );
};

export default PaymentMethodSelection;

const PaymentOptionsContainer = styled.div`
  display: grid;
  width: 100%;
  max-width: 600px;
  gap: 32px;
  margin: 48px 0;
  flex: 1;
`;

const PaymentOption = styled.div<{ $isSelected: boolean }>`
  padding: 32px;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  background-color: ${({ $isSelected, theme }) =>
    $isSelected ? `${theme.colors.standard}10` : theme.colors.white};
  border: 2px solid
    ${({ $isSelected, theme }) =>
      $isSelected ? theme.colors.standard : theme.colors.grey[300]};
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 16px;

  &:hover {
    border-color: ${({ theme }) => theme.colors.standard};
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.md};
  }
`;

const PaymentIcon = styled.div`
  font-size: ${({ theme }) => theme.fonts.sizes.xl};
  margin-bottom: 8px;
`;

const PaymentLabel = styled.div`
  font-size: ${({ theme }) => theme.fonts.sizes.lg};
  font-weight: ${({ theme }) => theme.fonts.weights.bold};
  color: ${({ theme }) => theme.colors.standard};
`;

const PaymentDescription = styled.div`
  font-size: ${({ theme }) => theme.fonts.sizes.sm};
  color: ${({ theme }) => theme.colors.grey[600]};
`;
export const NextButton = styled(Button)<{ $isActive: boolean }>`
  background-color: ${({ theme, $isActive }) =>
    $isActive ? theme.colors.main : theme.colors.disabled};
  color: white;
  flex: 2;
  &:active {
    transform: translateY(3px);
  }
`;
