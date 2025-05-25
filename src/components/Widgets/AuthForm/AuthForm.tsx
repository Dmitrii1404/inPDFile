import { useState } from 'react';
import PassIndicator from './PassIndicator.tsx';
import styles from './AuthForm.module.css';

interface AuthFormProps {
    isLogin: boolean;
    onSubmit: (user: string, password: string) => void;
    onToggleMode: () => void;
}

interface ValidationErrors {
    user?: string;
    password?: string;
}

function AuthForm ({ isLogin, onSubmit, onToggleMode } : AuthFormProps) {
    const [user, setUser] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [errors, setErrors] = useState<ValidationErrors>({});

    const validateUser = (value: string): string | undefined => {
        if (!value) {
            return 'Логин обязателен';
        }
        if (value.length < 4 || value.length > 20) {
            return 'Логин должен содержать от 4 до 20 символов';
        }
        if (/[\s\W]/.test(value)) {
            return 'Логин не должен содержать пробелы и специальные символы';
        }
        return undefined;
    };

    const validatePassword = (value: string): string | undefined => {
        if (!value) {
            return 'Пароль обязателен';
        }

        const hasSpecialChar = /[_&#$!@%^&*(),.?":{}|<>]/.test(value);
        const hasDigit = /\d/.test(value);
        const hasUpperCase = /[A-Z]/.test(value);
        const hasLowerCase = /[a-z]/.test(value);

        if (!hasSpecialChar) {
            return 'Пароль должен содержать хотя бы один специальный символ';
        }
        if (!hasDigit) {
            return 'Пароль должен содержать хотя бы одну цифру';
        }
        if (!hasUpperCase) {
            return 'Пароль должен содержать хотя бы одну заглавную букву';
        }
        if (!hasLowerCase) {
            return 'Пароль должен содержать хотя бы одну строчную букву';
        }
        if (value.length < 8 || value.length > 20) {
            return 'Пароль должен содержать от 8 до 20 символов';
        }

        return undefined;
    };

    const calculatePasswordStrength = (value: string): number => {
        let strength = 0;

        if (value.length >= 8) strength++;
        if (/[_&#$!@%^&*(),.?":{}|<>]/.test(value)) strength++;
        if (/\d/.test(value)) strength++;
        if (/[A-Z]/.test(value)) strength++;
        if (/[a-z]/.test(value)) strength++;

        return strength;
    };

    const handleUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setUser(value);

            setErrors(prev => ({
                ...prev,
                user: validateUser(value)
            }));

    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setPassword(value);

        if (!isLogin) {
            setErrors(prev => ({
                ...prev,
                password: validatePassword(value)
            }));
        }
    };

    const handleUserBlur = () => {

        setErrors(prev => ({
            ...prev,
            user: validateUser(user)
        }));
    };

    const handlePasswordBlur = () => {
        if (!isLogin) {

            setErrors(prev => ({
                ...prev,
                password: validatePassword(password)
            }));
        }
    };

    const hasErrors = (): boolean => {
        const userError = validateUser(user);
        const passwordError = !isLogin ? validatePassword(password) : undefined;
        return !!(userError || passwordError);
    };

    const isFormReady = (): boolean => {
        return !(user && password && !hasErrors());
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        const userError = validateUser(user);
        const passwordError = !isLogin ? validatePassword(password) : undefined;

        setErrors({
            user: userError,
            password: passwordError
        });

        if (!userError && !passwordError) {
            onSubmit(user, password);
        }
    };

    const passwordStrength = calculatePasswordStrength(password);

    return (
        <div className={styles.auth}>
            <h1>{isLogin ? 'Вход' : 'Регистрация'}</h1>
            <form className={styles.auth_form} onSubmit={handleSubmit} noValidate>
                <div className={styles.input_box}>
                    <div>
                        <input
                            className={`${styles.input} ${errors.user ? styles.input_error : ''}`}
                            type="text"
                            placeholder="Имя пользователя"
                            id="username"
                            value={user}
                            onChange={handleUserChange}
                            onBlur={handleUserBlur}
                            required
                        />
                        {errors.user && !isLogin && (
                            <span className={styles.error_message}>{errors.user}</span>
                        )}
                    </div>
                    <div>
                        <input
                            className={`${styles.input} ${errors.password ? styles.input_error : ''}`}
                            type="password"
                            placeholder="Пароль"
                            id="password"
                            value={password}
                            onChange={handlePasswordChange}
                            onBlur={handlePasswordBlur}
                            required
                        />
                        {errors.password && !isLogin && (
                            <span className={styles.error_message}>{errors.password}</span>
                        )}

                        {!isLogin && password && (
                            <PassIndicator strength={passwordStrength} />
                        )}
                    </div>
                </div>
                <button type="submit" className={styles.submitButton} disabled={isFormReady()}>
                    {isLogin ? 'Войти' : 'Зарегистрироваться'}
                </button>
            </form>

            <button onClick={onToggleMode} className={styles.buttonAccount}>
                {isLogin
                    ? 'Нет аккаунта? Зарегистрируйтесь'
                    : 'Уже есть аккаунт? Войдите'}
            </button>
        </div>
    );
};

export default AuthForm;