import { useEffect, useState } from "react";
import Login from "./components/Login";
import Join from "./components/Join";
import IncluKiosk from "../../assets/imgs/IncluKiosk.png";
import { Background, Title } from "./styles";
import { useNavigate } from "react-router-dom";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const nav = useNavigate();
  const changeMode = () => {
    setIsLogin(!isLogin);
  };
  useEffect(() => {
    if (localStorage.getItem("accessToken")) nav("/start");
  }, []);

  return (
    <Background>
      <Title>
        <img src={IncluKiosk} />
      </Title>
      {isLogin ? (
        <Login changeMode={changeMode} />
      ) : (
        <Join changeMode={changeMode} />
      )}
    </Background>
  );
};

export default AuthPage;
