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
                <h1 className={styles.title}>inPDFile</h1>
                <p className={styles.description}>мгновенное определение типа документа</p>
            </div>
        </div>
        <nav className={styles.navigation}>
            <ul className={styles.nav__list}>
                <li className={styles.nav__item}>
                    <Link to="/" className={styles.link}>Главная</Link>
                </li>
                <li className={styles.nav__item}>
                    <Link to="/history" className={styles.link}>История</Link>
                </li>
                <li className={styles.nav__item}>
                    {login ? (
                        <Link to="/profile" className={styles.link}>{ login }</Link>
                    ) : (
                        <Link to="/authPage" className={styles.link}>Войти</Link>
                    )}
                </li>
            </ul>
        </nav>
    </header>
    )
}

export default Header;