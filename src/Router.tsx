import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LockPage from './page/LockScreen/LockPage';
import StartPage from './page/StartScreen/StartPage';
import Home from './page/Home/Home';
import AuthPage from './page/AuthScreen/AuthPage';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/lock" element={<LockPage />} />
        <Route path="/start" element={<StartPage />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
