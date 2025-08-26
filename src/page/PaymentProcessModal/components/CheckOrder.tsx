import styled from "styled-components";
import { useMenuStore } from "../../../stores/menuStore";
import { useOrderStore } from "../../../stores/orderStore";
import { ButtonContainer, BackButton, NextButton } from "../Styles";

interface OptionTag {
  categoryName: string;
  optionName: string;
  categoryId: string;
  optionId: string;
}
const CheckOrder = () => {
  const { moveToNextStep, moveToPreviousStep, orderType, buildOrderRequest } =
    useOrderStore();
  const { cart, cartSummary, optionCategories } = useMenuStore();

  // 주문 타입 레이블
  const orderTypeLabel = orderType === "STORE" ? "매장" : "포장";
  const getOptionTags = (selectedOptions: {
    [categoryId: number]: number[];
  }): OptionTag[] => {
    const optionTags: OptionTag[] = [];

    Object.entries(selectedOptions).forEach(([categoryId, optionIds]) => {
      const category = optionCategories.find(
        (cat) => cat.id === Number(categoryId)
      );
      if (!category) return;

      optionIds.forEach((optionId) => {
        const option = category.options.find((opt) => opt.id === optionId);
        if (option) {
          optionTags.push({
            categoryName: category.name,
            optionName: option.name,
            categoryId,
            optionId: String(optionId),
          });
        }
      });
    });

    return optionTags;
  };
  const handleNextStep = () => {
    buildOrderRequest(cart, cartSummary);
    moveToNextStep();
  };
  return (
    <Container>
      <Header>
        <Title>주문 내역 확인</Title>
        <OrderTypeTag>{orderTypeLabel}</OrderTypeTag>
      </Header>

      <CartHeader>
        <ProductColumn>제품</ProductColumn>
        <QuantityPriceColumn>
          <QuantityLabel>수량</QuantityLabel>
          <PriceLabel>가격</PriceLabel>
        </QuantityPriceColumn>
      </CartHeader>

      <CartItemsContainer>
        {cart.map((item) => (
          <CartItem key={item.id}>
            <ItemCore>
              <ItemName>{item.MenuItemType.name}</ItemName>
              {getOptionTags(item.selectedOptions).length > 0 && (
                <ItemDetails>
                  <OptionTagContainer>
                    {getOptionTags(item.selectedOptions).map((tag) => (
                      <OptionTag key={`${tag.categoryId}-${tag.optionId}`}>
                        {tag.categoryName}: {tag.optionName}
                      </OptionTag>
                    ))}
                  </OptionTagContainer>
                </ItemDetails>
              )}
            </ItemCore>
            <PriceRow>
              <Quantity>{item.quantity}개</Quantity>
              <ItemPrice>{item.totalPrice.toLocaleString()}원</ItemPrice>
            </PriceRow>
          </CartItem>
        ))}
      </CartItemsContainer>
      <Divider />
      <OrderSummary>
        <TotalItems>
          총 <span>{cartSummary?.totalItems || 0}개</span> 항목
        </TotalItems>
        <TotalPrice>
          합계 <span>{cartSummary?.totalAmount.toLocaleString() || 0}</span>원
        </TotalPrice>
      </OrderSummary>
      <ButtonContainer>
        <BackButton onClick={moveToPreviousStep}>이전</BackButton>
        <NextButton onClick={handleNextStep}>결제하기</NextButton>
      </ButtonContainer>
    </Container>
  );
};

export default CheckOrder;

const Container = styled.div`
  padding: 2rem;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 2rem;
  margin-bottom: 2rem;
`;
const Title = styled.h1`
  font-size: ${({ theme }) => theme.fonts.sizes.xl};
  color: ${({ theme }) => theme.colors.standardText};
  font-weight: ${({ theme }) => theme.fonts.weights.bold};
`;
const OrderTypeTag = styled.div`
  background-color: ${({ theme }) => theme.colors.main};
  color: white;
  padding: 0.5rem 1rem;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.fonts.sizes.md};
  font-weight: ${({ theme }) => theme.fonts.weights.bold};
`;

const CartHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  font-size: ${({ theme }) => theme.fonts.sizes.md};
  border-bottom: 2px solid ${({ theme }) => theme.colors.grey[400]};
  margin: 0.5rem 0 1rem 0;
  color: ${({ theme }) => theme.colors.grey[700]};
  font-weight: ${({ theme }) => theme.fonts.weights.medium};
  background-color: ${({ theme }) => theme.colors.grey[100]};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
`;

const ProductColumn = styled.span`
  padding-left: 0.5rem;
`;

const QuantityPriceColumn = styled.div`
  display: flex;
  width: 35%;
  justify-content: space-between;
  align-items: center;
  padding-right: 1rem;
`;

const QuantityLabel = styled.span`
  margin-left: 0.5rem;
`;

const PriceLabel = styled.span`
  margin-right: 0.5rem;
`;

const CartItemsContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  margin-bottom: 2rem;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  border: 1px solid ${({ theme }) => theme.colors.grey[300]};
`;

const CartItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.grey[300]};
  transition: background-color 0.15s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.grey[100]};
  }

  &:last-child {
    border-bottom: none;
  }
`;

const ItemCore = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 65%;
`;

const ItemDetails = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const ItemName = styled.div`
  font-size: ${({ theme }) => theme.fonts.sizes.md};
  font-weight: ${({ theme }) => theme.fonts.weights.medium};
`;

const PriceRow = styled.div`
  width: 35%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Quantity = styled.span`
  font-size: ${({ theme }) => theme.fonts.sizes.md};
  background-color: ${({ theme }) => theme.colors.grey[200]};
  padding: 0.3rem 0.8rem;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  text-align: center;
`;

const ItemPrice = styled.span`
  font-size: ${({ theme }) => theme.fonts.sizes.lg};
  font-weight: ${({ theme }) => theme.fonts.weights.bold};
  color: ${({ theme }) => theme.colors.main};
`;
const Divider = styled.div`
  width: 100%;
  border-bottom: 2px solid ${({ theme }) => theme.colors.grey[300]};
`;
const OrderSummary = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  padding: 1.5rem;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TotalItems = styled.div`
  font-size: ${({ theme }) => theme.fonts.sizes.md};
  font-weight: ${({ theme }) => theme.fonts.weights.medium};

  span {
    font-weight: ${({ theme }) => theme.fonts.weights.bold};
  }
`;

const TotalPrice = styled.div`
  font-size: ${({ theme }) => theme.fonts.sizes.md};
  span {
    font-size: ${({ theme }) => theme.fonts.sizes.lg};
    font-weight: ${({ theme }) => theme.fonts.weights.bold};
  }
`;

const OptionTagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 8px;
`;

const OptionTag = styled.span`
  background-color: ${({ theme }) => theme.colors.main};
  color: ${({ theme }) => theme.colors.white};
  padding: 4px 12px;
  border-radius: 16px;
  font-size: ${({ theme }) => theme.fonts.sizes.xs};
  font-weight: ${({ theme }) => theme.fonts.weights.medium};
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;
