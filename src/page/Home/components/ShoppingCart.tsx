import styled from 'styled-components';
import { useMenuStore } from '../stores/menuStore';
import CloseIcon from '@mui/icons-material/CloseRounded';
import { useState } from 'react';

interface OptionSummaryParams {
  selectedOptions: { [categoryId: string]: string[] };
  isFull?: boolean;
}

const ShoppingCart = () => {
  const { cart, cartSummary, optionCategories, removeCartItem } =
    useMenuStore();
  console.log(cart);

  // 선택된 옵션들을 하나의 문자열로 합치는 함수
  const getOptionSummary = ({
    selectedOptions,
    isFull = false,
  }: OptionSummaryParams): string => {
    const optionNames: string[] = [];

    // 각 카테고리별로 순회
    Object.entries(selectedOptions).forEach(([categoryId, optionIds]) => {
      const category = optionCategories[categoryId];
      if (!category) return;

      optionIds.forEach((optionId) => {
        const option = category.options.find((opt) => opt.id === optionId);
        if (option) {
          if (isFull) optionNames.push(`${category.name}: ${option.name}`);
          else optionNames.push(`${option.name}`);
        }
      });
    });

    return optionNames.join(', ');
  };

  const [expandedItems, setExpandedItems] = useState<{
    [key: string]: boolean;
  }>({});

  // 토글 함수
  const toggleItemExpand = (itemId: string) => {
    setExpandedItems((prev) => ({
      ...prev,
      [itemId]: !prev[itemId],
    }));
  };
  // 아이템 삭제 처리
  const handleRemoveItem = (event: React.MouseEvent, itemId: string) => {
    // 이벤트 버블링 방지
    event.stopPropagation();
    removeCartItem(itemId);
  };

  if (cart.length === 0) return null;
  return (
    <BaseContainer>
      <ListContainer>
        {cart.map((item) => (
          <div key={item.id}>
            <ItemContainer onClick={() => toggleItemExpand(item.id)}>
              <ItemWrapper>
                <Wrapper>
                  <ItemName>{item.MenuItemType.name}</ItemName>
                  {!expandedItems[item.id] && (
                    <OptionTag>
                      {getOptionSummary({
                        selectedOptions: item.selectedOptions,
                      })}
                    </OptionTag>
                  )}
                </Wrapper>
                <Wrapper>
                  <ItemAmount>{item.quantity}개</ItemAmount>
                  <div>
                    <ItemPrice>{item.totalPrice.toLocaleString()}원</ItemPrice>
                    <DeleteButton onClick={(e) => handleRemoveItem(e, item.id)}>
                      <CloseIcon sx={{ fontSize: 24 }} />
                    </DeleteButton>
                  </div>
                </Wrapper>
              </ItemWrapper>
              {expandedItems[item.id] && (
                <ItemOption>
                  {getOptionSummary({
                    selectedOptions: item.selectedOptions,
                    isFull: true,
                  })}
                </ItemOption>
              )}
            </ItemContainer>
          </div>
        ))}
      </ListContainer>
      <BottomContainer>
        <CountContainer>
          <div>
            <label>전체 개수:</label>
            <span>{cartSummary.totalItems}</span>
          </div>
          <div>
            <label>전체 금액:</label>
            <span>{cartSummary.totalAmount.toLocaleString()}원</span>
          </div>
        </CountContainer>
        <ButtonWrapper>
          <CancelButton>전체 취소</CancelButton>
          <BuyButton>구매하기</BuyButton>
        </ButtonWrapper>
      </BottomContainer>
    </BaseContainer>
  );
};

export default ShoppingCart;

const BaseContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 0.4;
  width: 100%;
  padding: 24px;
  background-color: ${({ theme }) => theme.colors.main};
  gap: 24px;
`;
const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  flex: 2;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  overflow-y: auto;
`;
const ItemWrapper = styled.div`
  display: flex;
  font-size: ${({ theme }) => theme.fonts.sizes.sm};
  justify-content: space-between;
`;
const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid ${({ theme }) => theme.colors.grey[300]};
  padding: 16px 36px;
  font-size: ${({ theme }) => theme.fonts.sizes.sm};
  gap: 16px;
`;
const ItemName = styled.div`
  font-size: ${({ theme }) => theme.fonts.sizes.sm};
`;
const ItemPrice = styled.div`
  font-size: ${({ theme }) => theme.fonts.sizes.sm};
  font-weight: ${({ theme }) => theme.fonts.weights.bold};
`;
const ItemAmount = styled.div`
  font-size: ${({ theme }) => theme.fonts.sizes.sm};
  font-weight: ${({ theme }) => theme.fonts.weights.bold};
`;
const Wrapper = styled.div`
  display: flex;
  width: 40%;
  justify-content: space-between;
  div {
    display: flex;
    width: 60%;
    justify-content: space-between;
    align-items: center;
  }
`;
const ItemOption = styled.div`
  font-size: ${({ theme }) => theme.fonts.sizes.xs};
  font-weight: ${({ theme }) => theme.fonts.weights.bold};
`;
const OptionTag = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 50%;
  font-size: ${({ theme }) => theme.fonts.sizes.xs};
  margin-top: 8px;
`;
const BottomContainer = styled.div`
  display: flex;
  width: 100%;
  flex: 1;
  gap: 24px;
`;
const CountContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 3;
  background-color: ${({ theme }) => theme.colors.grey[100]};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: 12px 24px;
  label {
    font-size: ${({ theme }) => theme.fonts.sizes.sm};
  }
  span {
    font-size: ${({ theme }) => theme.fonts.sizes.sm};
    font-weight: ${({ theme }) => theme.fonts.weights.bold};
  }
  div {
    flex: 1;
    display: flex;
    align-items: center;
    gap: 15px;
  }
`;
const ButtonWrapper = styled.div`
  display: flex;
  flex: 4;
  padding: 36px 24px;
  gap: 20px;
`;

const BuyButton = styled.button`
  flex: 2;
  padding: 16px 24px;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.fonts.sizes.md};
  font-weight: ${({ theme }) => theme.fonts.weights.bold};
  transition: all 0.2s;
  border: none;
  background-color: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.main};

  &:active {
    transform: translateY(3px);
  }
`;
const CancelButton = styled.button`
  flex: 1;
  padding: 16px 24px;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.fonts.sizes.md};
  font-weight: ${({ theme }) => theme.fonts.weights.bold};
  transition: all 0.2s;
  border: none;
  background-color: ${({ theme }) => theme.colors.disabled};
  color: ${({ theme }) => theme.colors.white};
  &:active {
    transform: translateY(3px);
  }
`;
const DeleteButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;

  color: ${({ theme }) => theme.colors.grey[600]};
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: ${({ theme }) => theme.colors.grey[700]};
  }
`;
