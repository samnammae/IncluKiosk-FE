import styled from "styled-components";

const NoOptionsComponent = () => {
  return (
    <NoOptionsContainer>
      <IconWrapper>
        <CheckIcon>✓</CheckIcon>
      </IconWrapper>
      <NoOptionsText>추가 옵션이 없습니다</NoOptionsText>
      <SubText>기본 구성으로 주문이 진행됩니다</SubText>
    </NoOptionsContainer>
  );
};
export default NoOptionsComponent;
const NoOptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  text-align: center;
  flex: 1;
`;

const IconWrapper = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: #e8f5e8;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 28px;
`;

const CheckIcon = styled.span`
  font-size: ${({ theme }) => theme.fonts.sizes.md};
  color: #4caf50;
  font-weight: bold;
`;

const NoOptionsText = styled.div`
  font-size: ${({ theme }) => theme.fonts.sizes.sm};
  font-weight: ${({ theme }) => theme.fonts.weights.bold};
  color: #333;
  margin-bottom: 8px;
`;

const SubText = styled.div`
  font-size: ${({ theme }) => theme.fonts.sizes.xs};
  color: #666;
  line-height: 1.4;
`;
