import { useState } from "react";
import Login from "./components/Login";
import Join from "./components/Join";
import IncluKiosk from "../../assets/imgs/IncluKiosk.png";
import { Background, Title } from "./styles";
const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const changeMode = () => {
    setIsLogin(!isLogin);
  };
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
