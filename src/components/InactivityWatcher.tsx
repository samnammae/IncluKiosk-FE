import { useEffect } from "react";
import { INACTIVITY_TIMEOUT, useLockStore } from "../stores/lockStore";
import { useNavigate } from "react-router-dom";
import { useSocketStore } from "../stores/socketStore";

const InactivityWatcher = () => {
  const { resetTimer, setLocked } = useLockStore();
  const nav = useNavigate();
  const { connect, sendMessage, isConnected } = useSocketStore();

  // accessToken 확인
  const hasToken = !!localStorage.getItem("accessToken");

  useEffect(() => {
    if (!hasToken) return;
    connect();
  }, [connect, hasToken]);

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

  useEffect(() => {
    if (!hasToken) return;
    const timeout = setTimeout(() => {
      setLocked(true);
      nav("/adjust");
    }, INACTIVITY_TIMEOUT);

    return () => clearTimeout(timeout);
  }, [nav, setLocked, hasToken]);

  if (!hasToken) return null; //훅 호출 다 하고 마지막에 null 반환
  return null;
};
export default InactivityWatcher;
