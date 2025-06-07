import { UserContext } from "../../context/UserContext.tsx";
import { useContext, useLayoutEffect } from "react";
import { meAPI } from "../../API";
import styles from './Header.module.css';
import { Link } from "react-router-dom";
import Navigation, { type NavLink } from "../../components/Layouts/Navigation/Navigation.tsx";
// @ts-ignore
import Logo from '../../assets/logo.svg?react';

function Header () {
    const userContext = useContext(UserContext);
    const {login, addLogin} = userContext;

    useLayoutEffect(() => {
        meAPI()
            .then((response) => {
                addLogin(response.data.email);
            }).catch(() => {
                console.log("Токен авторизации не действителен");
            });
    }, []);

    const links: NavLink[] = [
        { link: '/',         pageName: 'Главная' },
        { link: '/history',  pageName: 'История' },
        { link: login ? '/profile' : '/authPage',
            pageName: login ? 'Профиль' : 'Войти' }
    ];

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
        <Navigation links={links} />
    </header>
    )
}

export default Header;