import { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../Home/components/Header";
import { chatAPI } from "../../apis/chat";
import { useSocketStore, SocketMessage } from "../../stores/socketStore";
import VoiceStatus from "./VoiceStatusProps";
import { generateSessionId } from "./getId";

// 메시지 타입 정의
interface ChatMessage {
  message: string;
  isBot: boolean;
}

const Chat = () => {
  const { connect, sendMessage, setOnMessage, isConnected } = useSocketStore();
  const shopId = localStorage.getItem("shopId") || "";

  // 대화 세션 ID (대화 시작할 때 1회 생성)
  const [sessionId] = useState(generateSessionId(shopId));

  const [chatLogs, setChatLogs] = useState<ChatMessage[]>([]);
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // 소켓 연결
  useEffect(() => {
    connect();
  }, [connect]);

  useEffect(() => {
    if (!isConnected) return;

    setOnMessage(async (msg: SocketMessage) => {
      switch (msg.type) {
        // CASE 7-1: 안내 음성 끝 → STT 시작
        case "END_GUIDE":
          console.log("안내음성 종료 → 음성인식 시작");
          sendMessage({ type: "STT_ON" }); // CASE 7-2
          setIsListening(true);
          setIsProcessing(false);
          break;

        // CASE 7-3: 음성인식 끝 → 백엔드에 전달
        case "STT_OFF":
          if (msg.message) {
            console.log("사용자 발화:", msg.message);
            setIsListening(false);
            setIsProcessing(true);

            // 대화창에 사용자 메시지 추가
            setChatLogs((prev) => [
              ...prev,
              { message: msg.message ?? "", isBot: false },
            ]);

            try {
              // 👉 챗봇 API 호출
              const res = await chatAPI.sendChat(shopId, {
                sessionId,
                message: msg.message,
              });

              // API 응답(챗봇 답변)
              const answer =
                res?.aiMessage || "죄송합니다, 답변을 불러오지 못했습니다.";

              // 대화창에 챗봇 답변 추가
              setChatLogs((prev) => [
                ...prev,
                { message: answer, isBot: true },
              ]);

              // 음성 출력 시작 요청
              sendMessage({ type: "TTS_ON", message: answer });
            } catch (error) {
              console.error("Chat API Error:", error);
            }
          }
          break;

        // CASE 7-5: 음성 출력 종료 → 다시 STT 시작
        case "TTS_OFF":
          console.log("음성 출력 종료 → 다음 발화 대기");
          sendMessage({ type: "STT_ON" });
          setIsListening(true);
          setIsProcessing(false);
          break;

        default:
          console.log("처리되지 않은 메시지:", msg);
      }
    });

    return () => setOnMessage(null); // 페이지 벗어나면 핸들러 해제
  }, [isConnected, sendMessage, setOnMessage, shopId, sessionId]);

  return (
    <BaseContainer>
      <Header />
      <Background>
        <ChatContainer>
          <WelcomeMessage>
            안녕하세요 음성으로 주문을 도와드릴게요.
            <br />
            무엇을 드시고 싶으신가요?
          </WelcomeMessage>

          {/* 음성 입력/처리 상태 */}
          <VoiceStatus isListening={isListening} isProcessing={isProcessing} />

          {/* 실제 챗봇 로그 */}
          {chatLogs.map((chat, idx) => (
            <ChatWrapper key={idx} $isBotMessage={chat.isBot}>
              {chat.isBot ? (
                <BotChat>{chat.message}</BotChat>
              ) : (
                <MyChat>{chat.message}</MyChat>
              )}
            </ChatWrapper>
          ))}
        </ChatContainer>
      </Background>
    </BaseContainer>
  );
};

export default Chat;

// styled-components (기존 코드 동일)
const BaseContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;
const Background = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  flex: 1;
  display: flex;
  overflow: hidden;
`;
const ChatContainer = styled.div`
  position: relative;
  flex: 1;
  padding: 1rem;
  height: 100%;
  overflow-y: auto;
  background: rgba(255, 255, 255, 0.95);
  margin: 1rem;
  border-radius: 20px;
  box-shadow: 0 5px 30px rgba(0, 0, 0, 0.1);
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 3px;
  }
  &::-webkit-scrollbar-thumb {
    background: linear-gradient(135deg, #667eea, #764ba2);
    border-radius: 3px;
  }
`;
const WelcomeMessage = styled.div`
  font-size: ${({ theme }) => theme.fonts.sizes.sm};
  text-align: center;
  color: #7f8c8d;
  font-style: italic;
  margin-bottom: 50px;
  margin-top: 30px;
`;
const ChatWrapper = styled.div<{ $isBotMessage: boolean }>`
  display: flex;
  justify-content: ${({ $isBotMessage }) =>
    $isBotMessage ? "flex-start" : "flex-end"};
  margin-bottom: 15px;
`;
const ChatBox = styled.div`
  padding: 15px 20px;
  font-size: ${({ theme }) => theme.fonts.sizes.xs};
  line-height: 1.4;
  max-width: 65%;
  animation: fadeInUp 0.3s ease;
  word-wrap: break-word;
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
const MyChat = styled(ChatBox)`
  border-radius: 20px 20px 5px 20px;
  background: #f8f9fa;
  color: #2c3e50;
  border: 1px solid #e9ecef;
`;
const BotChat = styled(ChatBox)`
  border-radius: 20px 20px 20px 5px;
  color: #fff;
  background: ${({ theme }) =>
    theme.colors.main || "linear-gradient(135deg, #667eea, #764ba2)"};
`;
