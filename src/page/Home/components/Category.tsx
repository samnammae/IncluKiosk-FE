import { useState } from 'react';
import styled from 'styled-components';
import { useMenuStore } from '../../../../stores/menuStore';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';

const Category = () => {
  const { menuCategories, selectMenuCategory } = useMenuStore();
  const [chooseItem, setChooseItem] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 5;
  const currentPage = Math.floor(currentIndex / itemsPerPage);

  const handleChange = (direction: number) => {
    const newIndex = currentIndex + direction;
    if (newIndex >= 0 && newIndex < menuCategories.length) {
      setCurrentIndex(newIndex);
    }
  };

  const visibleStartIndex = currentPage * itemsPerPage;

  return (
    <BaseContainer>
      {currentIndex > 0 && (
        <LeftPageButton onClick={() => handleChange(-1)}>
          <ArrowForwardIosRoundedIcon
            style={{ transform: 'rotate(180deg)' }}
            sx={{ fontSize: 40 }}
          />
        </LeftPageButton>
      )}
      <ListWrapper>
        <List $translateX={-(currentIndex - visibleStartIndex) * 20}>
          {menuCategories.map((item, index) => (
            <Item
              key={index}
              onClick={() => {
                selectMenuCategory(item);
                setChooseItem(index);
              }}
            >
              <ItemText $isChoose={index === chooseItem}>{item}</ItemText>
            </Item>
          ))}
        </List>
        <GageBackground />
        <ChooseGage $position={chooseItem} $currentIndex={currentIndex} />
      </ListWrapper>
      {currentIndex < menuCategories.length - itemsPerPage && (
        <RightPageButton onClick={() => handleChange(1)}>
          <ArrowForwardIosRoundedIcon sx={{ fontSize: 40 }} />
        </RightPageButton>
      )}
    </BaseContainer>
  );
};

export default Category;

const BaseContainer = styled.div`
  width: 100%;
  height: 80px;
  display: flex;
  align-items: center;
  position: relative;
`;

const ListWrapper = styled.div`
  flex: 1;
  overflow: hidden;
  position: relative;
`;

const List = styled.div<{ $translateX: number }>`
  display: flex;
  transform: translateX(${({ $translateX }) => $translateX}%);
  transition: transform 0.3s ease-in-out;
`;

const Item = styled.div`
  display: flex;
  flex-direction: column;
  flex: 0 0 20%;
  padding-bottom: 15px;
`;

const ItemText = styled.div<{ $isChoose: boolean }>`
  padding: 16px 40px;
  font-size: ${({ theme }) => theme.fonts.sizes.md};
  color: ${({ $isChoose, theme }) =>
    $isChoose ? theme.colors.main : theme.colors.standardText};
  font-weight: ${({ theme }) => theme.fonts.weights.bold};
  text-align: center;
  transition: color 0.3s ease;
`;

const GageBackground = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 15px;
  background-color: ${({ theme }) => theme.colors.grey[100]};
`;

const ChooseGage = styled.div<{ $position: number; $currentIndex: number }>`
  position: absolute;
  bottom: 0;
  left: ${({ $position, $currentIndex }) => {
    const relativePosition = $position - $currentIndex;
    return `${relativePosition * 20}%`;
  }};
  width: 20%;
  height: 15px;
  background-color: ${({ theme }) => theme.colors.main};
  transition: left 0.3s ease;
  display: ${({ $position, $currentIndex }) => {
    const relativePosition = $position - $currentIndex;
    return relativePosition >= 0 && relativePosition < 5 ? 'block' : 'none';
  }};
`;

const PageButton = styled.div`
  width: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LeftPageButton = styled(PageButton)`
  position: absolute;
  z-index: 10;
  left: 0;
  height: 100px;
  background: linear-gradient(
    to right,
    rgba(255, 255, 255, 0.8),
    rgba(255, 255, 255, 0)
  );
`;
const RightPageButton = styled(PageButton)`
  position: absolute;
  z-index: 10;
  right: 0;
  height: 100px;

  background: linear-gradient(
    to left,
    rgba(255, 255, 255, 0.8),
    rgba(255, 255, 255, 0)
  );
`;
