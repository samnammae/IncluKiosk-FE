import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Header from "../Home/components/Header";
import { chatAPI } from "../../apis/chat";
import { useSocketStore, SocketMessage } from "../../stores/socketStore";
import VoiceStatus from "./components/VoiceStatusProps";
import { generateSessionId } from "./components/getId";
import ChatTestButton from "./components/ChatTestButton";
import ErrorModal from "./components/ErrorModal";
import { useNavigate } from "react-router-dom";
import SuccessModal from "./components/SuccessModal";
import { useLockStore } from "../../stores/lockStore";

// 메시지 타입 정의
export interface ChatMessage {
  message: string;
  isBot: boolean;
}

const Chat = () => {
  //소켓 관련 스토어
  const { connect, sendMessage, addOnMessage, removeOnMessage, isConnected } =
    useSocketStore();
  const { setLocked } = useLockStore();
  const { resetTimer } = useLockStore();

  //매장 정보
  const shopId = localStorage.getItem("shopId") || "";
  const shopName = localStorage.getItem("shopName") || "";

  // 대화 세션 ID (대화 시작할 때 1회 생성)
  const [sessionId] = useState(generateSessionId(shopId));

  const [chatLogs, setChatLogs] = useState<ChatMessage[]>([
    {
      message:
        "안녕하세요 음성으로 주문을 도와드릴게요.\n무엇을 드시고 싶으신가요?",
      isBot: true,
    },
  ]);
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isEnd, setIsEnd] = useState<"성공" | "실패" | false>(false); //성공 상태
  const isEndRef = useRef(isEnd);
  useEffect(() => {
    isEndRef.current = isEnd;
  }, [isEnd]);

  // 채팅 animation 기능
  const [visibleTexts, setVisibleTexts] = useState<Record<number, string>>({});
  useEffect(() => {
    if (chatLogs.length === 0) return;

    const lastIndex = chatLogs.length - 1;
    const lastChat = chatLogs[lastIndex];
    const words = lastChat.message.split(" ");
    let i = 0;

    // 말풍선 초기화
    setVisibleTexts((prev) => ({ ...prev, [lastIndex]: words[0] }));

    const interval = setInterval(() => {
      if (i < words.length - 1) {
        setVisibleTexts((prev) => ({
          ...prev,
          [lastIndex]: prev[lastIndex]
            ? prev[lastIndex] + " " + words[i]
            : words[i],
        }));
        i++;
      } else {
        clearInterval(interval);
      }
    }, 60);

    return () => clearInterval(interval);
  }, [chatLogs]);

  //채팅 쌓였을 시 맨 하단부로 스크롤 기능 구현
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [chatLogs, visibleTexts]);

  //주문 성공 모달
  const [isSucOpen, setIsSucOpen] = useState(false);
  const [sucText, setSucText] = useState("");
  //에러 모달
  const [isErrOpen, setIsErrOpen] = useState(false);

  //네비게이션
  const nav = useNavigate();
  // 소켓 연결
  useEffect(() => {
    connect();
  }, [connect]);

  //챗봇 화면에서 잠금 방지 로직
  useEffect(() => {
    if (chatLogs.length > 0) {
      resetTimer(); // 채팅이 추가될 때마다 타이머 리셋
      console.log("채팅 발생으로 인해 잠금 타이머 리셋");
    }
  }, [chatLogs]);

  //소켓 핸들러 구현
  useEffect(() => {
    if (!isConnected) return;

    const handle = async (msg: SocketMessage) => {
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
              //  챗봇 API 호출
              const res = await chatAPI.sendChat(shopId, {
                sessionId,
                message: msg.message,
                storeId: Number(shopId),
                storeName: shopName,
              });

              // API 응답(챗봇 답변)
              const answer =
                res?.aiMessage || "죄송합니다, 답변을 불러오지 못했습니다.";

              //주문 완료/실패 처리
              if (answer.includes("주문이")) {
                if (answer.includes("완료")) {
                  console.log("isEnd변경->성공", isEnd);
                  setIsEnd("성공");
                  //CASE 6
                  setSucText(answer); //성공모달에 메세지 넘겨주기
                  setIsSucOpen(true); //성공 열기
                } else if (answer.includes("실패")) {
                  console.log("isEnd변경->실패", isEnd);
                  setIsEnd("실패");
                  setIsErrOpen(true); //에러 모달 열기
                }
              }

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
          const endState = isEndRef.current; //  항상 최신값
          // 최신 상태 유지용 ref
          if (endState === "성공") {
            console.log("🎉 주문 성공 - 리셋 프로세스 시작");
            (async () => {
              try {
                // 잠깐 대기 후 (TTS가 완전히 끝난 다음)
                await new Promise((r) => setTimeout(r, 1500));

                // 모달 닫기 → 락 전환 → 리셋 순으로
                setIsSucOpen(false);
                setLocked(true);

                await new Promise((r) => setTimeout(r, 300)); // UI 반영 대기
                sendMessage({ type: "ALL_RESET" });
                console.log("✅ 리셋 신호 보냄");

                setIsEnd(false);
              } catch (err) {
                console.error("TTS_OFF 처리 중 에러:", err);
              }
            })();
          } else if (endState === "실패") {
            console.log("❌ 주문 실패 - 홈으로 복귀");
            setTimeout(() => {
              setIsErrOpen(false);
              nav("/start");
              setIsEnd(false);
            }, 1500);
          } else {
            sendMessage({ type: "STT_ON" });
            setIsListening(true);
            setIsProcessing(false);
          }
          break;

        // CASE 7-6: STT오류의 경우 -> 다시 말해주세요!출력 후 대기
        case "STT_ERR":
          console.log("STT 라즈베리파이에서 에러 발생");
          setChatLogs((prev) => [
            ...prev,
            {
              message:
                "죄송합니다, 말씀을 정확히 인식하지 못했습니다. 다시 한번 말씀해 주시겠어요?",
              isBot: true,
            },
          ]);
          setIsListening(false);
          setIsProcessing(true);
          break;

        // CASE 7-7: STT오류안내음성 끝난 후-> 프론트에게 끝낫다 말함. -> 프론트 다시 음성인식한다고 말함
        case "ERR_END":
          console.log("라즈베리파이 ERR 안내음성 출력 끝");
          sendMessage({ type: "STT_ON" });
          setIsListening(true);
          setIsProcessing(false);
          break;

        // CASE 7-8: 2번 째 오류 발생 과정 -> 라즈베리에서 음성이 나오고 프론트는 모달 띄우기
        case "ORDER_CANCEL":
          setIsErrOpen(true); //에러 모달 열기
          break;

        // CASE 7-9: 에러 음성이 끝난 뒤 채팅화면 탈출
        case "CANCEL_END":
          setIsErrOpen(false); //에러 모달 닫기
          nav("/start");
          break;

        default:
          console.log("처리되지 않은 메시지:", msg);
      }
    };
    addOnMessage(handle);
    return () => removeOnMessage(handle);
  }, [
    isConnected,
    sendMessage,
    shopId,
    sessionId,
    addOnMessage,
    removeOnMessage,
  ]);

  return (
    <>
      <ErrorModal isOpen={isErrOpen} />
      <SuccessModal isOpen={isSucOpen} text={sucText} />
      <BaseContainer>
        <Header />
        <Background>
          <ChatTestButton setChatLogs={setChatLogs} />
          <ChatContainer ref={containerRef}>
            {/* <WelcomeMessage>
              안녕하세요 음성으로 주문을 도와드릴게요.
              <br />
              무엇을 드시고 싶으신가요?
            </WelcomeMessage> */}

            {/* 음성 입력/처리 상태 */}
            <VoiceStatus
              isListening={isListening}
              isProcessing={isProcessing}
            />

            {/* 챗봇 로그 */}
            {chatLogs.map((chat, idx) => {
              const animatedText = visibleTexts[idx];
              const isLast = idx === chatLogs.length - 1;

              return (
                <ChatWrapper key={idx} $isBotMessage={chat.isBot}>
                  {chat.isBot ? (
                    <BotChat>
                      {isLast ? animatedText ?? "" : chat.message}
                    </BotChat>
                  ) : (
                    <MyChat>
                      {isLast ? animatedText ?? "" : chat.message}
                    </MyChat>
                  )}
                </ChatWrapper>
              );
            })}
            {/* <div ref={bottomRef} /> */}
          </ChatContainer>
        </Background>
      </BaseContainer>
    </>
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
  flex-direction: column;
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

  //채팅 쌓일 시 하단 채팅으로 이동했을 때 자연스럽게 이동하기 위한 css
  padding-bottom: 80px;
  scroll-padding-bottom: 80px;
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

const ChatWrapper = styled.div<{ $isBotMessage: boolean }>`
  display: flex;
  justify-content: ${({ $isBotMessage }) =>
    $isBotMessage ? "flex-start" : "flex-end"};
  margin-bottom: 15px;
`;
const ChatBox = styled.div`
  padding: 15px 20px;
  font-size: ${({ theme }) => theme.fonts.sizes.lg};
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
