import styled from 'styled-components';
interface TootalScetionProps {
  quantity: number;
  totalPrice: number;
  handleQuantity: (num: number) => void;
}
const TootalScetion = ({
  quantity,
  totalPrice,
  handleQuantity,
}: TootalScetionProps) => {
  return (
    <>
      <Wrapper>
        <QuantitySection>
          <QuantityLabel>수량:</QuantityLabel>
          <QuantityControl>
            <QuantityButton onClick={() => handleQuantity(-1)}>
              -
            </QuantityButton>
            <QuantityDisplay>{quantity}</QuantityDisplay>
            <QuantityButton onClick={() => handleQuantity(1)}>+</QuantityButton>
          </QuantityControl>
        </QuantitySection>

        <TotalSection>
          <TotalLabel>총 금액:</TotalLabel>
          <TotalPrice>{totalPrice.toLocaleString()}원</TotalPrice>
        </TotalSection>
      </Wrapper>
    </>
  );
};

export default TootalScetion;
const QuantitySection = styled.div`
  display: flex;
  align-items: center;
`;

const QuantityLabel = styled.span`
  font-size: ${({ theme }) => theme.fonts.sizes.md};
  color: ${({ theme }) => theme.colors.grey[600]};
  margin-right: 16px;
  width: 80px;
`;

const QuantityControl = styled.div`
  display: flex;
  align-items: center;
  border: 2px solid ${({ theme }) => theme.colors.grey[300]};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  overflow: hidden;
`;

const QuantityButton = styled.button`
  width: 64px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${({ theme }) => theme.fonts.sizes.md};
  background-color: ${({ theme }) => theme.colors.grey[100]};
  border: none;

  transition: background-color 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.grey[200]};
  }
`;

const QuantityDisplay = styled.div`
  width: 80px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${({ theme }) => theme.fonts.sizes.md};
  font-weight: ${({ theme }) => theme.fonts.weights.medium};
  border-left: 2px solid ${({ theme }) => theme.colors.grey[300]};
  border-right: 2px solid ${({ theme }) => theme.colors.grey[300]};
`;

const TotalSection = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
`;

const TotalLabel = styled.span`
  font-size: ${({ theme }) => theme.fonts.sizes.md};
  color: ${({ theme }) => theme.colors.grey[600]};
  margin-right: 16px;
`;

const TotalPrice = styled.span`
  font-size: ${({ theme }) => theme.fonts.sizes.lg};
  font-weight: ${({ theme }) => theme.fonts.weights.bold};
  color: ${({ theme }) => theme.colors.main};
`;

const Wrapper = styled.div`
  padding: 0 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;
