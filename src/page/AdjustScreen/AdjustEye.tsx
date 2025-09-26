import { useEffect } from "react";
import styled from "styled-components";

const AdjustEye = ({ nextPage }: { nextPage: () => void }) => {
  //2초 뒤 다음화면으로 넘어가기
  useEffect(() => {
    setTimeout(() => {
      nextPage();
    }, 2000);
  }, []);
  return (
    <Container>
      <h1>눈 초점 맞추기</h1>
    </Container>
  );
};
const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 2rem;
  gap: 3rem;
`;
export default AdjustEye;
