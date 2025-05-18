import styled from 'styled-components';
import { useOrderStore } from '../../../stores/OrderStore';

const OrderTypeSelection = () => {
  const { setOrderType, moveToNextStep } = useOrderStore();
  return (
    <BaseContainer>
      <Container>
        <Button
          onClick={(e) => {
            e.stopPropagation();
            setOrderType('STORE');
            moveToNextStep();
          }}
        >
          <Icon>🍽️</Icon>
          <Text>매장</Text>
        </Button>

        <Button
          onClick={(e) => {
            e.stopPropagation();
            setOrderType('TAKEOUT');
            moveToNextStep();
          }}
        >
          <Icon>🧃</Icon>
          <Text>포장</Text>
        </Button>
      </Container>
    </BaseContainer>
  );
};

export default OrderTypeSelection;
const BaseContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Container = styled.div`
  display: flex;
  justify-content: center;
  justify-content: space-around;
  width: 100%;
  max-width: 900px;
  z-index: 1;
`;

const Button = styled.div`
  background-color: white;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  width: 100%;
  max-width: 350px;
  height: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  box-shadow: ${({ theme }) => theme.shadows.md};

  &:hover {
    transform: scale(1.1);
    box-shadow: ${({ theme }) => theme.shadows.lg};
  }
`;

const Icon = styled.div`
  font-size: ${({ theme }) => theme.fonts.sizes.xl};
  margin-bottom: 1rem;
`;

const Text = styled.div`
  font-size: ${({ theme }) => theme.fonts.sizes.xl};
  font-weight: ${({ theme }) => theme.fonts.weights.bold};
  color: ${({ theme }) => theme.colors.main};
`;
