import styled, { keyframes } from 'styled-components';
import { useMenuStore } from '../Home/stores/menuStore';
import CloseIcon from '@mui/icons-material/CloseRounded';
import ButtonSection from './components/ButtonSection';
import TootalScetion from './components/TootalScetion';
import Infosection from './components/Infosection';
import Optionsection from './components/Optionsection';

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
  const { isDetailModalOpen, setIsDetailModalOpen, selectedMenu } =
    useMenuStore();

  if (!isDetailModalOpen) return null;

  const onClose = (): void => {
    setIsDetailModalOpen(false);
  };

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
              <Optionsection />
              <Divider />
              <TootalScetion />
              <ButtonSection />
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
