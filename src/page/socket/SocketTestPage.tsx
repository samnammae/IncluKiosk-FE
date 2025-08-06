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
  const socketRef = useRef<WebSocket | null>(null);

  // 소켓 연결
  const connectSocket = () => {
    try {
      const ws = new WebSocket("ws://localhost:8765"); // 실제 라즈베리파이 IP로 변경
      socketRef.current = ws;

      ws.onopen = () => {
        console.log("소켓 연결 성공");
        setConnected(true);
        setSocket(ws);
      };

      ws.onmessage = (event: MessageEvent) => {
        console.log("받은 메시지:", event.data);
      };

      ws.onclose = () => {
        console.log("소켓 연결 종료");
        setConnected(false);
      };

      ws.onerror = (error: Event) => {
        console.error("소켓 에러:", error);
        setConnected(false);
      };
    } catch (error) {
      console.error("연결 실패:", error);
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
    } else {
      console.log("소켓이 연결되지 않았습니다.");
    }
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
