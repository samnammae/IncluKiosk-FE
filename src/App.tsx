import './styles/font.css';
import { ThemeProvider } from 'styled-components';
import styled from 'styled-components';
import { theme } from './styles/theme';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import GlobalStyle from './styles/globalStyle';
import Router from './Router';

import { useEffect } from 'react';
import { useBrandStore } from '../stores/brandStore';
import { OptionCategoryType, useMenuStore } from '../stores/menuStore';
import { menu } from '../data/menu';
import { brandtheme } from '../data/theme';

const App = () => {
  const queryClient = new QueryClient();
  const isDevelopment = 'development';
  // const isDevelopment = '';
  const {
    setMenuCategories,
    setMenusByCategory,
    setOptionCategories,
    selectMenuCategory,
  } = useMenuStore();
  const { setName, setImg } = useBrandStore();

  const brandName = 'ediya';
  //   const brandName = 'starbucks';
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
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <GlobalStyle />
        {isDevelopment ? (
          <KioskWrapper>
            <Router />
          </KioskWrapper>
        ) : (
          <Wrapper>
            <Router />
          </Wrapper>
        )}
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default App;
const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
`;
// 개발용 키오스크 래퍼 컴포넌트
const KioskWrapper = styled.div`
  width: 1080px;
  height: 1920px;
  margin: 0 auto;
  border: 1px solid #ccc;
  position: relative;
  overflow: auto;
  background: white;

  /* 개발 중에는 스케일 조정 - 화면이 작을 때 50% 크기로 표시 */
  @media (max-height: 1920px) {
    transform: scale(0.5);
    transform-origin: top center;
    margin-top: 50px;
  }
`;
