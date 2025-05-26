import Button from "../../components/UI/Button/Button.tsx";
import {useContext, useEffect} from "react";
import { UserContext } from "../../context/UserContext.tsx";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import {toast} from "react-toastify";
import styles from "./DeleteAccount.module.css";

function DeleteAccount () {
    const navigate = useNavigate();
    const userContext = useContext(UserContext);
    const { login, addLogin } = userContext;

    // useEffect(() => {
    //     if (!login) {
    //         navigate("/authPage");
    //     }
    // });

    const handleDelete = async () => {
        await axios.delete('http://localhost:8000/auth/delete', {
            withCredentials: true
        }).then((response) => {
            toast.warning('Аккаунт удален');
            addLogin(undefined);
            console.log(response);
        }).catch((e) => {
            toast.error('Ошибка');
            console.error(e);
        })
    };


    return (
        <div className={styles.profile_box}>
        <div className={styles.profile}>
            <h1 className={styles.title}>Вы точно хотите удалить аккаунт?</h1>
            <p className={styles.text}>Это действие необратимо!</p>
            <div className={styles.link_box}>
                <Link to="/profile" className={styles.link}>
                    <Button><p className={styles.text}>Назад</p></Button>
                </Link>
                <Link to="/" className={styles.link}>
                    <Button onClick={handleDelete}><p className={styles.text}>Удалить аккаунт</p></Button>
                </Link>
            </div>

        </div>
    </div>)
}

export default DeleteAccount;