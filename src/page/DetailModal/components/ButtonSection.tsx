import styled from 'styled-components';
const ButtonSection = () => {
  return (
    <ButtonWrapper>
      <AddCartButton>장바구니 담기</AddCartButton>
    </ButtonWrapper>
  );
};

export default ButtonSection;
const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 24px 48px;
`;

const AddCartButton = styled.button`
  flex: 1;
  padding: 16px 24px;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.fonts.sizes.md};
  font-weight: ${({ theme }) => theme.fonts.weights.medium};
  transition: all 0.2s;
  border: none;
  background-color: ${({ theme }) => theme.colors.main};
  color: ${({ theme }) => theme.colors.white};

  &:active {
    transform: translateY(3px);
  }
`;
