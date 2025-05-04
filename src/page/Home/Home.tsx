import styled from 'styled-components';
import Header from './components/Header';
import Category from './components/Category';
import MenuList from './components/MenuList';
import { OptionCategory, useMenuStore } from './stores/menuStore';
import { menu } from './data/menu';
import { useEffect } from 'react';
import { brandtheme } from './data/theme';
import { useBrandStore } from './stores/brandStore';
const Home = () => {
  const { setMenuCategories, setMenusByCategory, setOptionCategories } =
    useMenuStore();
  const { setName, setImg } = useBrandStore();
  useEffect(() => {
    // 브랜드별 데이터 로드
    const brandData = menu['ediya'];

    if (brandData) {
      // 카테고리 설정
      setMenuCategories(brandData.categories);

      // 카테고리별 메뉴 설정
      Object.entries(brandData.menusByCategory).forEach(([category, menus]) => {
        setMenusByCategory(category, menus);
      });

      // 옵션 카테고리 설정
      setOptionCategories(
        brandData.optionCategories as { [id: string]: OptionCategory }
      );
    }

    //색상 로드
    const brandTheme = brandtheme['ediya'];
    setName('ediya');
    setImg(brandTheme.logoImg);
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
      <Header />
      <Category />
      <MenuList />
    </BaseContainer>
  );
};

export default Home;
const BaseContainer = styled.div``;
