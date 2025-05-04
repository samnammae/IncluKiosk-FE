import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './page/LoginPage';
import Home from './page/Home';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
