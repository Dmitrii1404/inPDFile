import styles from './Profile.module.css';
import {useContext, useEffect} from "react";
import { UserContext } from "../../context/UserContext.tsx";
import { useNavigate } from "react-router-dom";
import {toast} from "react-toastify";
import axios from "axios";
import Button from "../../components/UI/Button/Button.tsx";
import {Link} from "react-router-dom";

function Profile () {
    const navigate = useNavigate();
    const userContext = useContext(UserContext);
    const { login, addLogin } = userContext;

    useEffect(() => {
        if (!login) {
            navigate("/authPage");
        }
    });

    const handleLogout = () => {
        axios.post('http://localhost:8000/auth/logout', {}, {
            withCredentials: true
        }).then(() => {
            toast.warning('Вы вышли из аккаунта');
            addLogin(undefined);
        }).catch((e) => {
            console.error(e);
        })
    };

    return (
        <div className={styles.profile_box}>
            <div className={styles.profile}>
                <h1>Личный кабинет</h1>
                <p>Добро пожаловать, {login}</p>
                <div className={styles.link_box}>
                    <Link to="/authPage" className={styles.link}>
                        <Button onClick={handleLogout}>Выйти</Button>
                    </Link>
                    <Link to="/deleteAccount" className={styles.link}>
                        <Button>Удалить аккаунт</Button>
                    </Link>
                </div>

            </div>
        </div>
    )
}

export default Profile;