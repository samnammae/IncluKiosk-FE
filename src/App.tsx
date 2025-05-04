import './styles/font.css';
import { ThemeProvider } from 'styled-components';
import styled from 'styled-components';
import { theme } from './styles/theme';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import GlobalStyle from './styles/globalStyle';
import Router from './Router';

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

const App = () => {
  const queryClient = new QueryClient();
  const isDevelopment = 'development';

  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <GlobalStyle />
        {isDevelopment ? (
          <KioskWrapper>
            <Router />
          </KioskWrapper>
        ) : (
          <Router />
        )}
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default App;
