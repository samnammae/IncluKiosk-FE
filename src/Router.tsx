import { BrowserRouter, Routes, Route } from "react-router-dom";
import LockPage from "./page/LockScreen/LockPage";
import StartPage from "./page/StartScreen/StartPage";
import Home from "./page/Home/Home";
import AuthPage from "./page/AuthScreen/AuthPage";
import SocketTestPage from "./page/socket/SocketTestPage";

const Router = () => {
  return (
    <BrowserRouter basename="/kiosk">
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/lock" element={<LockPage />} />
        <Route path="/start" element={<StartPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/socket" element={<SocketTestPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
