import React, { useEffect, useState } from "react";
import { ChatMessage } from "./Chat";
import styled from "styled-components";
interface ChatTestButtonProps {
  setChatLogs: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
}

const ChatTestButton = ({ setChatLogs }: ChatTestButtonProps) => {
  //채팅 테스트 버튼
  const [viewTestButton, setViewTestButton] = useState(false);

  useEffect(() => {
    window.showButton = (mode: boolean) => {
      setViewTestButton(mode);
    };
  }, [viewTestButton]);
  if (!viewTestButton) return;
  return (
    <BaseContainer>
      <button
        onClick={() => {
          setChatLogs((prev) => [
            ...prev,
            { message: "봇 대화추가 ~", isBot: true },
          ]);
        }}
      >
        봇 대화 추가
      </button>

      <button
        onClick={() => {
          setChatLogs((prev) => [
            ...prev,
            { message: "사용자 대화추가 ~", isBot: false },
          ]);
        }}
      >
        사용자 대화 추가
      </button>
      <button
        onClick={() => {
          // 짧은 간격으로 여러 메시지를 추가해버림
          setChatLogs((prev) => [
            ...prev,
            {
              message:
                "첫 번째 봇 메시지입니다.첫 번째 봇 메시지입니다.첫 번째 봇 메시지입니다.첫 번째 봇 메시지입니다.첫 번째 봇 메시지입니다.첫 번째 봇 메시지입니다.",
              isBot: true,
            },
          ]);
          setTimeout(() => {
            setChatLogs((prev) => [
              ...prev,
              {
                message:
                  "두 번째 봇 메시지입니다.두 번째 봇 메시지입니다.두 번째 봇 메시지입니다.두 번째 봇 메시지입니다.두 번째 봇 메시지입니다.두 번째 봇 메시지입니다.",
                isBot: true,
              },
            ]);
          }, 100);
        }}
      >
        봇 대화 많이 추가
      </button>
      <button
        onClick={() => {
          // 짧은 간격으로 여러 메시지를 추가해버림
          setChatLogs((prev) => [
            ...prev,
            {
              message:
                "첫 번째 봇 메시지입니다.첫 번째 봇 메시지입니다.첫 번째 봇 메시지입니다.첫 번째 봇 메시지입니다.첫 번째 봇 메시지입니다.첫 번째 봇 메시지입니다.",
              isBot: false,
            },
          ]);
          setTimeout(() => {
            setChatLogs((prev) => [
              ...prev,
              {
                message:
                  "두 번째 봇 메시지입니다.두 번째 봇 메시지입니다.두 번째 봇 메시지입니다.두 번째 봇 메시지입니다.두 번째 봇 메시지입니다.두 번째 봇 메시지입니다.",
                isBot: false,
              },
            ]);
          }, 100);
        }}
      >
        사용자 대화 많이 추가
      </button>

      <button
        onClick={() => {
          // 짧은 간격으로 여러 메시지를 추가해버림
          setChatLogs((prev) => [
            ...prev,
            {
              message:
                "첫 번째 봇 메시지입니다.첫 번째 봇 메시지입니다.첫 번째 봇 메시지입니다.첫 번째 봇 메시지입니다.첫 번째 봇 메시지입니다.첫 번째 봇 메시지입니다.",
              isBot: false,
            },
          ]);
          setTimeout(() => {
            setChatLogs((prev) => [
              ...prev,
              {
                message:
                  "두 번째 봇 메시지입니다.두 번째 봇 메시지입니다.두 번째 봇 메시지입니다.두 번째 봇 메시지입니다.두 번째 봇 메시지입니다.두 번째 봇 메시지입니다.",
                isBot: true,
              },
            ]);
          }, 100);
        }}
      >
        주고받기 대화 많이 추가
      </button>
    </BaseContainer>
  );
};

export default ChatTestButton;

const BaseContainer = styled.div`
  width: 100%;
  display: flex;
  gap: 16px;
`;
