import React, { useEffect } from "react";
import styled from "styled-components";
import Header from "../Home/components/Header";

const Chat = () => {
  return (
    <BaseContainer>
      <Header />
    </BaseContainer>
  );
};

export default Chat;
const BaseContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;
