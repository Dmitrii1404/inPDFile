import {UserContext} from "../../context/UserContext.tsx";
import {useContext, useLayoutEffect} from "react";
import axios from "axios";
import styles from './Header.module.css';
import {Link} from "react-router-dom";
// @ts-ignore
import Logo from '../../assets/logo.svg?react';

function Header () {
    const userContext = useContext(UserContext);
    const {login, addLogin} = userContext;

    useLayoutEffect(() => {
        axios.get('http://localhost:8000/auth/me', {
            withCredentials: true
        }).then((response) => {
            addLogin(response.data.email);
        }).catch(() => {
            console.log("Токен авторизации не действителен");
        });
    }, []);

    return (
    <header className={styles.header}>
        <div className={styles.logoContainer}>
            <Link to="/" >
                <Logo className={styles.logo} />
            </Link>
            <div className={styles.naiming}>
                <h1>inPDFile</h1>
                <p>мгновенное определение типа документа</p>
            </div>
        </div>
        <nav className={styles.navigation}>
            <ul className={styles.nav__list}>
                <li>
                    <Link to="/" className={styles.nav__item}>Главная</Link>
                </li>
                <li>
                    <Link to="/history" className={styles.nav__item}>История загрузок</Link>
                </li>
                <li>
                    {login ? (
                        <Link to="/profile" className={styles.nav__item}>{ login }</Link>
                    ) : (
                        <Link to="/authPage" className={styles.nav__item}>Войти</Link>
                    )}
                </li>
            </ul>
        </nav>
    </header>
    )
}

export default Header;