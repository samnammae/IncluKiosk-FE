import styled from 'styled-components';
import MenuItem from './MenuItem';
import { useMenuStore } from '../../../../stores/menuStore';
import { Grow } from '@mui/material';

const MenuList = () => {
  const { menusByCategory, selectedMenuCategory } = useMenuStore();

  return (
    <BaseContainer>
      {selectedMenuCategory !== null
        ? menusByCategory[selectedMenuCategory].map((item, index) => (
            <Grow
              in={true}
              key={item.id}
              style={{ transformOrigin: '0 0 0' }}
              {...(index > 0 ? { timeout: 300 + index * 200 } : {})}
            >
              <div>
                <MenuItem item={item} />
              </div>
            </Grow>
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
