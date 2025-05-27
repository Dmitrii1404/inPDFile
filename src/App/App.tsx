import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {UserProvider} from "../context/UserContext.tsx";

import styles from './App.module.css';
import 'nprogress/nprogress.css';

import ToastContainerCustom from "../components/UI/toast/ToastContainer.tsx";
import Header from '../pages/Header/Header.tsx';
import Home from '../pages/Home/Home.tsx';
import Profile from "../pages/Profile/Profile.tsx";
import AuthPage from "../pages/AuthPage/AuthPage.tsx";
import DeleteAccount from "../pages/DeleteAccount/DeleteAccount.tsx";
import ConfirmCode from "../pages/ConfirmCode/ConfirmCode.tsx";
import History from "../pages/History/History.tsx";
import Footer from "../pages/Footer/Footer.tsx";

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
