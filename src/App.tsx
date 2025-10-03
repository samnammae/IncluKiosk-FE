import "./styles/font.css";
import { ThemeProvider } from "styled-components";
import styled from "styled-components";
import { theme } from "./styles/theme";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import GlobalStyle from "./styles/globalStyle";
import Router from "./Router";
import { useState, useEffect } from "react";
import LockScreen from "./components/LockScreen";
import { useLockStore } from "./stores/lockStore";
import { useNavigate } from "react-router-dom";
declare global {
  interface Window {
    setKioskMode: (mode: string) => void;
    getKioskMode: () => string;
    setLock: () => void;
  }
}
const App = () => {
  const queryClient = new QueryClient();
  const [mode, setMode] = useState(() => {
    return localStorage.getItem("kioskMode") || "";
  });
  const { setLocked } = useLockStore();
  // 개발 모드 여부 판단
  const isDevelopment = mode === "dev";

  useEffect(() => {
    window.setKioskMode = (newMode: string) => {
      console.log(`키오스크 모드 변경: "${newMode}"`);
      setMode(newMode);
      localStorage.setItem("kioskMode", newMode);
    };

    window.getKioskMode = () => {
      const currentMode = localStorage.getItem("kioskMode") || "";
      console.log(`현재 키오스크 모드: "${currentMode}"`);
      return currentMode;
    };

    window.setLock = () => {
      setLocked(true);
      console.log("잠금 모드 활성화 + /adjust 이동");
    };
  }, [mode]);

  return (
    <>
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <GlobalStyle />

          {isDevelopment ? (
            <KioskWrapper>
              <Router />
              <LockScreen />
            </KioskWrapper>
          ) : (
            <Wrapper>
              <Router />
              <LockScreen />
            </Wrapper>
          )}
        </QueryClientProvider>
      </ThemeProvider>
    </>
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
