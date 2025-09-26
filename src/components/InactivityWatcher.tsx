import { useEffect } from "react";
import { INACTIVITY_TIMEOUT, useLockStore } from "../stores/lockStore";
import { useNavigate } from "react-router-dom";

const InactivityWatcher = () => {
  const { resetTimer, setLocked } = useLockStore();
  const nav = useNavigate();
  if (!localStorage.getItem("accessToken")) return null;

  useEffect(() => {
    const events = ["mousemove", "keydown", "click", "scroll", "touchstart"];

    const handleActivity = () => {
      setLocked(false); // 활동 → 잠금 해제
      resetTimer(); // 타이머 리셋
    };

    events.forEach((e) => window.addEventListener(e, handleActivity));
    resetTimer(); // 타이머 시작

    return () => {
      events.forEach((e) => window.removeEventListener(e, handleActivity));
    };
  }, [resetTimer, setLocked]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLocked(true);
      nav("/start"); //잠긴 경우 이동
    }, INACTIVITY_TIMEOUT);

    return () => clearTimeout(timeout);
  }, [nav, setLocked]);

  return null;
};
export default InactivityWatcher;
