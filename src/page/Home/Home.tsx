import styled from 'styled-components';
import Header from './components/Header';
import Category from './components/Category';
import MenuList from './components/MenuList';
import { OptionCategoryType, useMenuStore } from '../../../stores/menuStore';
import { menu } from '../../../data/menu';
import { useEffect } from 'react';
import { brandtheme } from '../../../data/theme';
import { useBrandStore } from '../../../stores/brandStore';
import DetailModal from '../DetailModal/DetailModal';
import ShoppingCart from './components/ShoppingCart';
const Home = () => {
  const {
    setMenuCategories,
    setMenusByCategory,
    setOptionCategories,
    selectMenuCategory,
  } = useMenuStore();
  const { setName, setImg } = useBrandStore();
  const brandName = 'ediya';
  // const brandName = 'starbucks';
  // const brandName = 'twosomeplace';
  useEffect(() => {
    // 브랜드별 데이터 로드
    const brandData = menu[brandName];

    if (brandData) {
      // 카테고리 설정
      setMenuCategories(brandData.categories);
      selectMenuCategory(brandData.categories[0]);
      // 카테고리별 메뉴 설정
      Object.entries(brandData.menusByCategory).forEach(([category, menus]) => {
        setMenusByCategory(category, menus);
      });

      // 옵션 카테고리 설정
      setOptionCategories(
        brandData.optionCategories as { [id: string]: OptionCategoryType }
      );
    }

    //색상 로드
    const brandTheme = brandtheme[brandName];
    setName(brandName);
    setImg(brandTheme.titleImg);
    if (brandTheme) {
      // CSS 변수 설정
      document.documentElement.style.setProperty(
        '--main-color',
        brandTheme.mainColor
      );
      document.documentElement.style.setProperty(
        '--sub-color',
        brandTheme.subColor
      );
      document.documentElement.style.setProperty(
        '--text-color',
        brandTheme.textColor
      );
      document.documentElement.style.setProperty(
        '--disabled-color',
        brandTheme.disabledColor || '#d1d5db'
      );
    }
  }, [setMenuCategories, setMenusByCategory, setOptionCategories]);

  return (
    <BaseContainer>
      <DetailModal />
      <Header />
      <Category />
      <ScrollWrapper>
        <MenuList />
      </ScrollWrapper>
      <ShoppingCart />
    </BaseContainer>
  );
};

export default Home;
const BaseContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;
const ScrollWrapper = styled.div`
  height: calc(1920px - 300px);
  overflow-y: auto;
  display: block;
  flex: 1;
`;
