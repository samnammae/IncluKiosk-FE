import { BrowserRouter, Routes, Route } from "react-router-dom";
import StartPage from "./page/StartScreen/StartPage";
import Home from "./page/Home/Home";
import AuthPage from "./page/AuthScreen/AuthPage";
import SocketTestPage from "./page/socket/SocketTestPage";
import ChooseShopPage from "./page/AuthScreen/ChooseShopPage";
import InactivityWatcher from "./components/InactivityWatcher";
import Chat from "./page/Chat/Chat";

const Router = () => {
  return (
    <BrowserRouter basename="/kiosk">
      <InactivityWatcher />

      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/choose" element={<ChooseShopPage />} />
        <Route path="/start" element={<StartPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/socket" element={<SocketTestPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
