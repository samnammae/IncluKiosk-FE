import styled from 'styled-components';
import { MenuItemType } from '../stores/menuStore';
interface MenuItemProps {
  item: MenuItemType;
}
const MenuItem = ({ item }: MenuItemProps) => {
  return (
    <BaseContainer>
      <ItemImgWrapper>
        <ItemImg src={item.image} />
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
