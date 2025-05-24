import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {UserProvider} from "../context/UserContext.tsx";

import styles from './App.module.css';
import 'nprogress/nprogress.css';

import ToastContainerCustom from "../components/toast/ToastContainer.tsx";
import Header from '../components/Header/Header.tsx';
import Home from '../pages/Home/Home.tsx';

function App() {

  return (
    <UserProvider>
      <Router>
        <div className={styles.app}>
          <Header />
          <div className={styles.main}>
              <Routes>
                  <Route path="/" element={<Home />} />
              </Routes>
          </div>
          <ToastContainerCustom />
        </div>
      </Router>
    </UserProvider>
  )
}

export default App
