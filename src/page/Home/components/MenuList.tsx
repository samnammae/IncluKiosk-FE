import styled from 'styled-components';
import MenuItem from './MenuItem';
import { useMenuStore } from '../stores/menuStore';

const MenuList = () => {
  const { menusByCategory, selectedMenuCategory } = useMenuStore();

  return (
    <BaseContainer>
      {selectedMenuCategory !== null
        ? menusByCategory[selectedMenuCategory].map((item) => (
            <MenuItem key={item.id} item={item} />
          ))
        : null}
    </BaseContainer>
  );
};

export default MenuList;

const BaseContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  padding: 20px;
`;
