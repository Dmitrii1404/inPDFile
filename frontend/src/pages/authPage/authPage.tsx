import styles from './AuthPage.module.css';
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext.tsx";
import AuthForm from "../../components/Widgets/AuthForm/AuthForm.tsx";
import { loginAPI, registerAPI } from "../../API";
import { toast } from "react-toastify";

function AuthPage() {
    const userContext = useContext(UserContext);
    const { addLogin } = userContext;
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState<boolean>(true);

    const handleAuth = async (email: string, password: string) => {
        if (isLogin) {
            loginAPI(email, password)
                .then(() => {
                    addLogin(email);
                    toast.success('Вы вошли в профиль');
                    navigate('/profile');
                })
                .catch(e => {
                    toast.error('Неверный логин или пароль');
                    console.error(e);
                })
        } else {
            registerAPI(email, password)
                .then(() => {
                    toast.success('Аккаунт создан');
                    addLogin(email);
                    navigate('/confirmCode', { state: { email } });
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