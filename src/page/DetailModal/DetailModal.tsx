import styled, { keyframes, css } from "styled-components";
import { CartItem, useMenuStore } from "../../stores/menuStore";
import CloseIcon from "@mui/icons-material/CloseRounded";
import ButtonSection from "./components/ButtonSection";
import TootalScetion from "./components/TootalScetion";
import Infosection from "./components/Infosection";
import Optionsection from "./components/Optionsection";
import { useState } from "react";

export interface MenuItemType {
  id: string;
  name: string;
  price: number;
  description?: string;
  image?: string;
  isSoldOut?: boolean;
  optionCategories?: string[];
}

const DetailModal = () => {
  const {
    isDetailModalOpen,
    setIsDetailModalOpen,
    selectedMenu,
    setCart,
    selectedOptions,
    cart,
  } = useMenuStore();
  //전체 금액 계산 관련 state
  const [quantity, setQuantity] = useState(1);
  const [optionCost, setOptionCost] = useState(0);

  //옵션 선택 체크
  const [isAllCheck, setIsAllCheck] = useState(false);
  const [isClickBut, setIsClickBut] = useState(false);
  const [submitAttempts, setSubmitAttempts] = useState(0);
  //모달 닫기
  const onClose = (): void => {
    setIsDetailModalOpen(false);
  };

  const totalPrice = selectedMenu
    ? selectedMenu.price * quantity + optionCost
    : 0; //전체 금액

  //수량 핸들러
  const handleQuantity = (num: number): void => {
    if (num < 0) {
      if (quantity > 1) setQuantity((prev) => prev + num);
    } else {
      setQuantity((prev) => prev + num);
    }
  };

  //장바구니 담기
  const onSubmit = () => {
    if (!isAllCheck) {
      setSubmitAttempts((prev) => prev + 1);
      setIsClickBut(true);
    } else {
      // 고유 ID 생성 (현재 시간과 랜덤 문자열 조합)
      const uniqueId = `cart-${Date.now()}-${Math.random()
        .toString(36)
        .substring(2, 9)}`;

      // 새로운 장바구니 아이템 생성
      const newCartItem: CartItem = {
        id: uniqueId,
        MenuItemType: selectedMenu!,
        selectedOptions: selectedOptions,
        quantity: quantity,
        totalPrice: totalPrice,
      };

      const updatedCart = [...cart, newCartItem];

      // 업데이트된 장바구니 설정
      setCart(updatedCart);
      setIsDetailModalOpen(false);
    }
  };

  if (!isDetailModalOpen) return null;
  return (
    <ModalOverlay onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        {!selectedMenu ? null : (
          <>
            <CloseButton onClick={onClose}>
              <CloseIcon />
            </CloseButton>

            <ContentWrapper>
              <Infosection />
              <Divider />
              <Optionsection
                setOptionCost={setOptionCost}
                setIsAllCheck={setIsAllCheck}
              />
              <Divider />
              <TootalScetion
                quantity={quantity}
                totalPrice={totalPrice}
                handleQuantity={handleQuantity}
              />
              {isClickBut && !isAllCheck && (
                <WarningText key={submitAttempts}>
                  필수 옵션을 모두 선택해주세요!
                </WarningText>
              )}
              <ButtonSection onSubmit={onSubmit} />
            </ContentWrapper>
          </>
        )}
      </ModalContainer>
    </ModalOverlay>
  );
};

export default DetailModal;

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

const CloseButton = styled.button`
  position: absolute;
  top: 24px;
  right: 24px;
  background: transparent;
  border: none;

  z-index: 10;
  width: 64px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.grey[100]};
  }

  svg {
    font-size: ${({ theme }) => theme.fonts.sizes.lg};
    color: ${({ theme }) => theme.colors.grey[700]};
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const Divider = styled.div`
  height: 2px;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.grey[300]};
  margin: 24px 0;
`;

const WarningText = styled.div<{ $shake?: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: ${({ theme }) => theme.fonts.sizes.sm};
  font-weight: ${({ theme }) => theme.fonts.weights.bold};
  color: ${({ theme }) => theme.colors.warning};
  animation: ${({ $shake = true }) =>
    $shake
      ? css`
          ${shakeAnimation} 0.6s ease-in-out
        `
      : "none"};
`;
const shakeAnimation = keyframes`
  0% { transform: translateX(0); }
  10% { transform: translateX(-10px); }
  20% { transform: translateX(10px); }
  30% { transform: translateX(-8px); }
  40% { transform: translateX(8px); }
  50% { transform: translateX(-5px); }
  60% { transform: translateX(5px); }
  70% { transform: translateX(-2px); }
  80% { transform: translateX(2px); }
  90% { transform: translateX(-1px); }
  100% { transform: translateX(0); }
`;
