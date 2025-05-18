import styled from 'styled-components';

export const BaseContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  padding: 2rem;
`;
export const Title = styled.h1`
  font-size: ${({ theme }) => theme.fonts.sizes.xl};
  color: ${({ theme }) => theme.colors.standardText};
  font-weight: ${({ theme }) => theme.fonts.weights.bold};
`;

export const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: 1rem;
`;

export const Button = styled.button`
  padding: 1rem 2rem;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.fonts.sizes.md};
  font-weight: ${({ theme }) => theme.fonts.weights.bold};
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
`;

export const BackButton = styled(Button)`
  background-color: ${({ theme }) => theme.colors.disabled};
  color: ${({ theme }) => theme.colors.text};
  flex: 1;

  &:active {
    transform: translateY(3px);
  }
`;

export const NextButton = styled(Button)`
  background-color: ${({ theme }) => theme.colors.main};
  color: white;
  flex: 2;
  &:active {
    transform: translateY(3px);
  }
`;
