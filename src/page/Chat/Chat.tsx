import { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../Home/components/Header";
import { chatAPI } from "../../apis/chat";
import { useSocketStore, SocketMessage } from "../../stores/socketStore";

const Chat = () => {
  const { connect, sendMessage, setOnMessage, isConnected } = useSocketStore();
  const shopId = localStorage.getItem("shopId") || "";

  const [chatLogs, setChatLogs] = useState<string[]>([]); // 화면에 표시할 대화 기록

  //소켓 연결
  useEffect(() => {
    connect();
  }, [connect]);

  useEffect(() => {
    if (!isConnected) return;

    setOnMessage(async (msg: SocketMessage) => {
      switch (msg.type) {
        // CASE 6-1: 안내 음성 끝 → STT 시작
        case "END_GUIDE":
          console.log("안내음성 종료 → 음성인식 시작");
          sendMessage({ type: "STT_ON" });
          break;

        // CASE 6-3: 음성인식 끝 → 백엔드에 전달
        case "STT_OFF":
          if (msg.message) {
            console.log("사용자 발화:", msg.message);

            // 대화창에 사용자 메시지 추가
            setChatLogs((prev) => [...prev, `${msg.message}`]);
            const answer =
              "답장답장답장답장답장답장답장답장답장답장답장답장답장답장답장답장";
            setChatLogs((prev) => [...prev, answer]);
            sendMessage({ type: "TTS_ON", message: answer });
            // try {
            //   // 백엔드로 전달
            //   const response = await chatAPI.sendChat(shopId, {
            //     sessionId: "some-session", // 필요 시 실제 세션 ID
            //     message: msg.message,
            //   });

            //   // 백엔드 응답 로그 출력
            //   if (response?.aiMessage) {
            //     setChatLogs((prev) => [...prev, `🤖: ${response.aiMessage}`]);

            //     // CASE 6-4: 라즈베리에 TTS 요청
            //     sendMessage({ type: "TTS_ON", message: response.aiMessage });
            //   }
            // } catch (err) {
            //   console.error("chatAPI.sendChat 실패:", err);
            // }
          }
          break;

        // CASE 6-5: 음성 출력 종료 → 다시 STT 시작
        case "TTS_OFF":
          console.log("음성 출력 종료 → 다음 발화 대기");
          sendMessage({ type: "STT_ON" });
          break;

        default:
          console.log("처리되지 않은 메시지:", msg);
      }
    });

    return () => setOnMessage(null); // 페이지 벗어나면 핸들러 해제
  }, [isConnected, sendMessage, setOnMessage, shopId]);

  return (
    <BaseContainer>
      <Header />
      <ChatContainer>
        <WelcomeMessage>
          안녕하세요 음성으로 주문을 도와드릴게요.
          <br />
          무엇을 드시고 싶으신가요?
        </WelcomeMessage>
        {chatLogs.map((line, idx) => (
          <div key={idx}>{line}</div>
        ))}
      </ChatContainer>
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

const ChatContainer = styled.div`
  flex: 1;
  padding: 1rem;
  overflow-y: auto;
  border-top: 1px solid ${({ theme }) => theme.colors.main};
`;
const WelcomeMessage = styled.div`
  font-size: ${({ theme }) => theme.fonts.sizes.sm};
  text-align: center;
  color: #7f8c8d;
  font-style: italic;
  margin: 50px 0;
`;
const ChatBox = styled.div``;
