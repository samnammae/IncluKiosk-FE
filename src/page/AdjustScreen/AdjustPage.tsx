import { useEffect, useState } from "react";
import styled from "styled-components";
import AdjustEye from "./AdjustEye";
import AdjustHeight from "./AdjustHeight";
import { useNavigate } from "react-router-dom";
import { useLockStore } from "../../stores/lockStore";

const AdjustPage = () => {
  const nav = useNavigate();
  const { isLocked } = useLockStore();
  const [step, setStep] = useState(1);

  //잠금화면 진입시 1페이지로 초기화
  useEffect(() => {
    if (isLocked) {
      setStep(1);
    }
  }, [isLocked]);

  const nextPage = () => {
    if (step === 2) {
      setStep(1);
      nav("/start");
    } else setStep(2);
  };
  return (
    <Base>
      {step === 1 ? (
        <AdjustHeight nextPage={nextPage} />
      ) : (
        <AdjustEye nextPage={nextPage} />
      )}
    </Base>
  );
};
const Base = styled.div`
  width: 100%;
  height: 100%;
`;
export default AdjustPage;
