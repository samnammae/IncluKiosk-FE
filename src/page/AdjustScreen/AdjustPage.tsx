import { useState } from "react";
import styled from "styled-components";
import AdjustEye from "./AdjustEye";
import AdjustHeight from "./AdjustHeight";
import { useNavigate } from "react-router-dom";

const AdjustPage = () => {
  const nav = useNavigate();
  const [step, setStep] = useState(1);
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
