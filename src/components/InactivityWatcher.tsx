import { useEffect } from "react";
import { INACTIVITY_TIMEOUT, useLockStore } from "../stores/lockStore";
import { useNavigate } from "react-router-dom";
import { useSocketStore } from "../stores/socketStore";

const InactivityWatcher = () => {
  const { isLocked, resetTimer, setLocked } = useLockStore();
  const nav = useNavigate();
  const { connect, sendMessage, isConnected } = useSocketStore();

  // accessToken 확인
  const hasToken = !!localStorage.getItem("accessToken");

  //소켓 재연결
  useEffect(() => {
    if (!hasToken) return;
    connect();
  }, [connect, hasToken]);

  //window함수작동으로 인한 추가
  useEffect(() => {
    if (isLocked) nav("/adjust");
  }, [isLocked, nav]);

  // false가 된 순간에만 1번 실행
  useEffect(() => {
    if (!isLocked) {
      sendMessage({ type: "PIR_OFF" }); //CASE 2-2
      console.log("잠금해제/라즈베리파이에게 PIR_OFF 전송 ");
    }
  }, [isLocked, sendMessage]);

  //활동 시 잠금해제 기능
  useEffect(() => {
    if (!hasToken) return;
    const events = ["mousemove", "keydown", "click", "scroll", "touchstart"];

    const handleActivity = () => {
      setLocked(false); // 활동 → 잠금 해제
      resetTimer(); // 타이머 리셋
    };

    events.forEach((e) => window.addEventListener(e, handleActivity));
    resetTimer();

    return () => {
      events.forEach((e) => window.removeEventListener(e, handleActivity));
    };
  }, [resetTimer, setLocked, sendMessage, isConnected, hasToken]);

  //잠금화면이 처음 동작할 때 기능
  useEffect(() => {
    if (!hasToken) return;
    const timeout = setTimeout(() => {
      setLocked(true);
      nav("/adjust"); //백그라운드 페이지 변경
    }, INACTIVITY_TIMEOUT); //INACTIVITY_TIMEOUT초 동안 반응이 없는 경우 잠금 실행

    return () => clearTimeout(timeout);
  }, [nav, setLocked, hasToken]);

  if (!hasToken) return null; //훅 호출 다 하고 마지막에 null 반환
  return null;
};
export default InactivityWatcher;
