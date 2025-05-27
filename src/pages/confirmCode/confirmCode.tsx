import styles from './ConfirmCode.module.css';
import {useContext, useEffect } from "react";
import { UserContext } from "../../context/UserContext.tsx";
import { useNavigate} from "react-router-dom";
import axios from "axios";
import {toast} from "react-toastify";
import ConfirmCodeForm from "../../components/Widgets/ConfirmCodeForm/ConfirmCodeForm.tsx";

function ConfirmCode () {
    const navigate = useNavigate();
    const userContext = useContext(UserContext);
    const { login } = userContext;

    useEffect(() => {
        if (!login) {
            navigate("/authPage");
        }
    });

    const handleCode = async (code : string) => {
        await axios.put(`http://localhost:8000/auth/confirm?code=${code}`, {}, {
            withCredentials : true
        }).then(function (response){
            toast.success('Аккаунт подтвержен');
            console.log(response);
            navigate('/');
        }).catch(e => {
            toast.error('Невеный код');
            console.error(e);
        })
    }

    return (
        <div className={styles.profile_box}>
            <div className={styles.profile}>
                <h1 className={styles.title}>Здравствуйте!</h1>
                <p className={styles.text}>Приятно познакомиться<br/><span className={styles.userName}>{login}</span></p>
                <p className={styles.text}>Мы направили вам четырехзначный код на почту</p>
                <ConfirmCodeForm onSubmit={handleCode}></ConfirmCodeForm>
            </div>
        </div>
    )
}

export default ConfirmCode;