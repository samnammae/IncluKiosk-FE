import styled from 'styled-components';

export const AuthContainer = styled.div`
  min-height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

export const AuthCard = styled.div`
  background: rgba(255, 255, 255, 0.98);
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.lg};
  padding: 80px;
  width: 100%;
  max-width: 720px;
  backdrop-filter: blur(10px);
  position: relative;
`;
export const FormGroup = styled.div`
  margin-bottom: 40px;
`;

export const LabelWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Label = styled.label`
  display: block;
  color: ${({ theme }) => theme.colors.grey[700]};
  font-size: ${({ theme }) => theme.fonts.sizes.sm};
  font-weight: ${({ theme }) => theme.fonts.weights.medium};
  margin-bottom: 16px;
`;

export const Input = styled.input`
  width: 100%;
  padding: 24px 32px;
  border: 3px solid ${({ theme }) => theme.colors.grey[200]};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.fonts.sizes.md};
  transition: all 0.2s;
  background: ${({ theme }) => theme.colors.white};

  &:focus {
    border-color: ${({ theme }) => theme.colors.standard};
    outline: none;
    box-shadow: 0 0 0 4px rgba(30, 64, 175, 0.1);
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.grey[400]};
  }
`;
export const AuthButton = styled.button`
  width: 100%;
  padding: 28px;
  background: ${({ theme }) => theme.colors.standard};
  color: ${({ theme }) => theme.colors.white};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.fonts.sizes.md};
  font-weight: ${({ theme }) => theme.fonts.weights.bold};
  cursor: pointer;
  transition: all 0.2s;
  margin-top: 48px;

  &:hover {
    background: ${({ theme }) => theme.colors.background};
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;
