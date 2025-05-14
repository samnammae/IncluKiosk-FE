import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './page/LoginPage';
import StartPage from './page/StartScreen/StartPage';
import Home from './page/Home/Home';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/start" element={<StartPage />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
