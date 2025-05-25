import styles from './AuthPage.module.css';
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext.tsx";
import AuthForm from "../../components/Widgets/AuthForm/AuthForm.tsx";
import axios from "axios";
import { toast } from "react-toastify";

function AuthPage() {
    const userContext = useContext(UserContext);
    const { addLogin } = userContext;
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState<boolean>(true);

    const handleAuth = async (user: string, password: string) => {
        if (isLogin) {
            await axios
                .post('http://localhost:8000/auth/login', {
                    "email": user,
                    "password": password,
                }, {
                    withCredentials: true
                })
                .then(function (response) {
                    addLogin(user);
                    console.log(response);
                    toast.success('Вы вошли в профиль');
                    navigate('/profile');
                })
                .catch(e => {
                    toast.error('Неверный логин или пароль');
                    console.error(e);
                })
        } else {
            await axios.post('http://localhost:8000/auth/register', {
                "email": user,
                "password": password,
            }, {
                withCredentials: true
            }).then(response => {
                toast.success('Аккаунт создан');
                addLogin(user);
                console.log(response);
                navigate('/confirmCode', { state: { user } });
            }).catch(e => {
                toast.error('Неверный формат данных');
                console.error(e);
            })
        }
    };

    const handleToggleMode = () => {
        setIsLogin(!isLogin);
    };

    return (
        <div className={styles.auth_box}>
            <AuthForm
                isLogin={isLogin}
                onSubmit={handleAuth}
                onToggleMode={handleToggleMode}
            />
        </div>
    );
}

export default AuthPage;