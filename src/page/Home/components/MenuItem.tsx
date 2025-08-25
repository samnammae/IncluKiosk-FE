import styled from "styled-components";
import { MenuItemType, useMenuStore } from "../../../stores/menuStore";
interface MenuItemProps {
  item: MenuItemType;
}
const MenuItem = ({ item }: MenuItemProps) => {
  const { setIsDetailModalOpen, selectMenu } = useMenuStore();
  const onItemClick = () => {
    if (item.isSoldOut) return;
    setIsDetailModalOpen(true);
    selectMenu(item);
  };
  return (
    <BaseContainer onClick={onItemClick}>
      {item.isSoldOut && (
        <SoldOutOverlay>
          <SoldOutText>품절</SoldOutText>
        </SoldOutOverlay>
      )}
      <ItemImgWrapper>
        <ItemImg src={item.imageUrl} />
      </ItemImgWrapper>
      <ItemName>{item.name}</ItemName>
      <ItemPrice>
        <ItemPrice>{item.price.toLocaleString()}원</ItemPrice>
      </ItemPrice>
    </BaseContainer>
  );
};

export default MenuItem;

const BaseContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 12px;
  position: relative;
`;
const SoldOutOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
  pointer-events: auto;
`;

const SoldOutText = styled.div`
  color: #ffffff;
  font-size: ${({ theme }) => theme.fonts.sizes.md};
  font-weight: ${({ theme }) => theme.fonts.weights.bold};
  padding: 10px 24px;
  border: 2px solid #ffffff;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: transparent;
`;
const ItemImgWrapper = styled.div`
  width: 250px;
  height: 250px;
  overflow: hidden;
  border-radius: ${({ theme }) => theme.borderRadius.md};
`;

const ItemImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
const ItemName = styled.div`
  font-size: ${({ theme }) => theme.fonts.sizes.md};
  font-weight: ${({ theme }) => theme.fonts.weights.bold};
`;
const ItemPrice = styled.div`
  font-size: ${({ theme }) => theme.fonts.sizes.md};
`;
