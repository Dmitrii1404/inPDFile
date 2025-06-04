import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {UserProvider} from "../context/UserContext.tsx";

import styles from './App.module.css';
import 'nprogress/nprogress.css';

import ToastContainerCustom from "../components/UI/toast/ToastContainer.tsx";
import Header from '../pages/Header/Header.tsx';
import Home from '../pages/home/home.tsx';
import Profile from "../pages/profile/profile.tsx";
import AuthPage from "../pages/authPage/authPage.tsx";
import DeleteAccount from "../pages/deleteAccount/deleteAccount.tsx";
import ConfirmCode from "../pages/confirmCode/confirmCode.tsx";
import History from "../pages/history/history.tsx";
import Footer from "../pages/Footer/Footer.tsx";
import ResultPage from "../pages/ResultPage/ResultPage.tsx";

function App() {

  return (
    <UserProvider>
      <Router>
        <div className={styles.app}>
          <Header />
          <div className={styles.main}>
              <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/authPage" element={<AuthPage />} />
                  <Route path="/deleteAccount" element={<DeleteAccount />} />
                  <Route path="/confirmCode" element={<ConfirmCode />} />
                  <Route path="/history" element={<History />} />
                  <Route path="/result" element={<ResultPage />} />
              </Routes>
          </div>
          <ToastContainerCustom />
        </div>
        <Footer />
      </Router>
    </UserProvider>
  )
}

export default App
