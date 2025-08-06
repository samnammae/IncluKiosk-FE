import { useState, useRef } from "react";
import styled from "styled-components";

interface StatusBoxProps {
  connected: boolean;
}

interface ButtonProps {
  bgColor?: string;
  textColor?: string;
}

const SocketTestPage = () => {
  // 소켓 관련 상태
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [connected, setConnected] = useState<boolean>(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [receivedMessages, setReceivedMessages] = useState<any[]>([]);
  const socketRef = useRef<WebSocket | null>(null);
  const logRef = useRef<HTMLDivElement>(null);

  // 로그 추가 함수
  const addLog = (
    message: string,
    type: "send" | "receive" | "system" = "system"
  ) => {
    const timestamp = new Date().toLocaleTimeString();
    const logMessage = `[${timestamp}] ${
      type === "send" ? "📤" : type === "receive" ? "📨" : "ℹ️"
    } ${message}`;
    setLogs((prev) => [...prev, logMessage]);

    // 로그 자동 스크롤
    setTimeout(() => {
      if (logRef.current) {
        logRef.current.scrollTop = logRef.current.scrollHeight;
      }
    }, 100);
  };

  // 수신 메시지 처리
  const handleReceivedMessage = (data: any) => {
    setReceivedMessages((prev) => [
      ...prev,
      { ...data, timestamp: new Date().toLocaleTimeString() },
    ]);

    // 메시지 타입별 처리
    switch (data.type) {
      case "PIR_OFF":
        addLog("사용자 접근이 감지되어 다음 화면으로 넘어갑니다", "receive");
        break;
      case "CHAT_ORDER_ON":
        addLog("주먹 포즈가 감지되어 대화주문화면으로 넘어갑니다", "receive");
        break;
      case "EYE_ORDER_ON":
        addLog("하단 3초 응시가 감지되어 마우스커서를 시각화합니다", "receive");
        break;
      default:
        addLog(`받은 메시지: ${data.type} - ${data.message || ""}`, "receive");
    }
  };

  // 소켓 연결
  const connectSocket = () => {
    try {
      const ws = new WebSocket("ws://localhost:8765"); // 실제 라즈베리파이 IP로 변경
      socketRef.current = ws;

      ws.onopen = () => {
        console.log("소켓 연결 성공");
        setConnected(true);
        setSocket(ws);
        addLog("소켓 연결 성공", "system");
      };

      ws.onmessage = (event: MessageEvent) => {
        console.log("받은 메시지:", event.data);
        try {
          const data = JSON.parse(event.data);
          handleReceivedMessage(data);
        } catch (error) {
          addLog(`받은 메시지: ${event.data}`, "receive");
        }
      };

      ws.onclose = () => {
        console.log("소켓 연결 종료");
        setConnected(false);
        addLog("소켓 연결 종료", "system");
      };

      ws.onerror = (error: Event) => {
        console.error("소켓 에러:", error);
        setConnected(false);
        addLog("소켓 연결 에러", "system");
      };
    } catch (error) {
      console.error("연결 실패:", error);
      addLog("소켓 연결 실패", "system");
    }
  };

  // 소켓 연결 해제
  const disconnectSocket = () => {
    if (socketRef.current) {
      socketRef.current.close();
    }
  };

  // 메시지 전송 함수
  const sendMessage = (messageType: string) => {
    if (socket && connected) {
      const message = {
        type: messageType,
        timestamp: new Date().toISOString(),
      };
      socket.send(JSON.stringify(message));
      console.log("전송:", messageType);
      addLog(`전송: ${messageType}`, "send");
    } else {
      console.log("소켓이 연결되지 않았습니다.");
      addLog("소켓이 연결되지 않았습니다", "system");
    }
  };

  // 로그 지우기
  const clearLogs = () => {
    setLogs([]);
    setReceivedMessages([]);
  };

  return (
    <Container>
      <Title>🔌 소켓 통신 테스트</Title>

      {/* 연결 상태 */}
      <StatusBox connected={connected}>
        {connected ? "✅ 연결됨" : "❌ 연결 안됨"}
      </StatusBox>

      {/* 연결 제어 */}
      <ControlSection>
        <Button onClick={connectSocket} disabled={connected} bgColor="#007bff">
          연결하기
        </Button>
        <Button
          onClick={disconnectSocket}
          disabled={!connected}
          bgColor="#dc3545"
        >
          연결 해제
        </Button>
      </ControlSection>

      {/* 잠금화면 */}
      <Section>
        <SectionTitle>🔒 잠금화면</SectionTitle>

        <MessageRow>
          <MessageLabel>
            CASE 1: 잠금화면에 들어온다 → PIR 센서 작동 코드를 실행한다
          </MessageLabel>
          <Button
            onClick={() => sendMessage("PIR_ON")}
            disabled={!connected}
            bgColor="#28a745"
          >
            PIR_ON
          </Button>
        </MessageRow>

        <MessageRow>
          <MessageLabel>
            CASE 2-2: 사용자가 클릭을 통해 직접 다음 화면으로 넘어간다 → PIR
            센서 작동을 정지한다
          </MessageLabel>
          <Button
            onClick={() => sendMessage("PIR_OFF")}
            disabled={!connected}
            bgColor="#ffc107"
            textColor="#212529"
          >
            PIR_OFF
          </Button>
        </MessageRow>
      </Section>

      {/* 모드선택화면 */}
      <Section>
        <SectionTitle>📱 모드선택화면</SectionTitle>

        <MessageRow>
          <MessageLabel>
            CASE 3: 잠금화면에서 모드선택화면으로 넘어온다 → 아이트래킹 및
            주먹감지 코드를 실행한다
          </MessageLabel>
          <Button
            onClick={() => sendMessage("MODE_SELECT_ON")}
            disabled={!connected}
            bgColor="#6f42c1"
          >
            MODE_SELECT_ON
          </Button>
        </MessageRow>

        <MessageRow>
          <MessageLabel>
            CASE 4-2: 사용자가 직접 대화주문을 클릭하여 선택한다 →
            대화주문화면으로 넘어가 아이트래킹 및 주먹감지를 정지하고
            음성인식기능을 시작한다
          </MessageLabel>
          <Button
            onClick={() => sendMessage("CHAT_ORDER_ON")}
            disabled={!connected}
            bgColor="#17a2b8"
          >
            CHAT_ORDER_ON
          </Button>
        </MessageRow>

        <MessageRow>
          <MessageLabel>
            CASE 4-3: 사용자가 직접 일반주문을 클릭하여 선택한다 →
            일반주문화면으로 넘어가 아이트래킹 및 주먹감지를 정지한다
          </MessageLabel>
          <Button
            onClick={() => sendMessage("NORMAL_ORDER_ON")}
            disabled={!connected}
            bgColor="#20c997"
          >
            NORMAL_ORDER_ON
          </Button>
        </MessageRow>
      </Section>

      {/* 주문이 끝났을 때 */}
      <Section>
        <SectionTitle>🔄 주문이 끝났을 때</SectionTitle>

        <MessageRow>
          <MessageLabel>
            CASE 5: 잠금화면으로 돌아가 다시 처음부터 진행된다 → 모든 기능을
            비활성화한다
          </MessageLabel>
          <Button
            onClick={() => sendMessage("ALL_RESET")}
            disabled={!connected}
            bgColor="#dc3545"
          >
            ALL_RESET
          </Button>
        </MessageRow>
      </Section>

      {/* 수신 메시지 섹션 */}
      <Section>
        <SectionTitle>📨 라즈베리파이에서 받은 메시지</SectionTitle>
        <ReceivedMessageBox>
          {receivedMessages.length > 0 ? (
            receivedMessages.map((msg, index) => (
              <ReceivedMessage key={index}>
                <MessageTime>[{msg.timestamp}]</MessageTime>
                <MessageType>{msg.type}</MessageType>
                {msg.message && (
                  <MessageContent>- {msg.message}</MessageContent>
                )}
              </ReceivedMessage>
            ))
          ) : (
            <EmptyMessage>아직 받은 메시지가 없습니다</EmptyMessage>
          )}
        </ReceivedMessageBox>
      </Section>

      {/* 로그 섹션 */}
      <Section>
        <SectionTitle>📋 통신 로그</SectionTitle>
        <LogContainer ref={logRef}>
          {logs.length > 0 ? (
            logs.map((log, index) => <LogMessage key={index}>{log}</LogMessage>)
          ) : (
            <EmptyMessage>로그가 없습니다</EmptyMessage>
          )}
        </LogContainer>
        <Button
          onClick={clearLogs}
          bgColor="#ffc107"
          textColor="#212529"
          style={{ marginTop: "10px" }}
        >
          로그 지우기
        </Button>
      </Section>
    </Container>
  );
};

export default SocketTestPage;

const Container = styled.div`
  padding: 40px;
  font-family: Arial, sans-serif;
  max-width: 1200px;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 30px;
  text-align: center;
`;

const StatusBox = styled.div<StatusBoxProps>`
  padding: 20px;
  margin: 20px 0;
  border-radius: 10px;
  font-weight: bold;
  font-size: 1.5rem;
  text-align: center;
  background-color: ${({ connected }) => (connected ? "#d4edda" : "#f8d7da")};
  color: ${({ connected }) => (connected ? "#155724" : "#721c24")};
  border: 2px solid ${({ connected }) => (connected ? "#c3e6cb" : "#f5c6cb")};
`;

const Section = styled.div`
  margin-bottom: 40px;
  padding: 30px;
  border: 2px solid #dee2e6;
  border-radius: 15px;
  background-color: #f8f9fa;
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 25px;
  color: #333;
`;

const MessageRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  padding: 15px;
  border-radius: 8px;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const MessageLabel = styled.div`
  flex: 1;
  font-size: 1.1rem;
  font-weight: 500;
  color: #495057;
  margin-right: 20px;
`;

const Button = styled.button<ButtonProps>`
  padding: 15px 30px;
  margin: 5px;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  color: ${({ textColor }) => textColor || "white"};
  background-color: ${({ disabled, bgColor }) => {
    if (disabled) return "#6c757d";
    return bgColor || "#007bff";
  }};
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    opacity: 0.9;
    transform: translateY(-1px);
  }
`;

const ControlSection = styled(Section)`
  display: flex;
  justify-content: center;
  gap: 20px;
`;

const ReceivedMessageBox = styled.div`
  background-color: #fff;
  border: 1px solid #dee2e6;
  border-radius: 8px;
  padding: 20px;
  max-height: 300px;
  overflow-y: auto;
`;

const ReceivedMessage = styled.div`
  padding: 10px;
  margin-bottom: 10px;
  border-left: 4px solid #17a2b8;
  background-color: #f8f9fa;
  border-radius: 4px;
`;

const MessageTime = styled.span`
  font-size: 0.9rem;
  color: #6c757d;
  margin-right: 10px;
`;

const MessageType = styled.span`
  font-weight: 600;
  color: #17a2b8;
  margin-right: 10px;
`;

const MessageContent = styled.span`
  color: #495057;
`;

const LogContainer = styled.div`
  background-color: #f8f9fa;
  border: 1px solid #dee2e6;
  border-radius: 8px;
  padding: 20px;
  height: 400px;
  overflow-y: auto;
  font-family: "Courier New", monospace;
`;

const LogMessage = styled.div`
  padding: 5px 0;
  border-bottom: 1px solid #e9ecef;
  font-size: 0.9rem;

  &:last-child {
    border-bottom: none;
  }
`;

const EmptyMessage = styled.div`
  text-align: center;
  color: #6c757d;
  font-style: italic;
  padding: 20px;
`;
