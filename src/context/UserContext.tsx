import {createContext, useState} from 'react';

interface UserContextValue {
    login: string | undefined;
    addLogin: (text: string) => void;
}

const initialValue: UserContextValue = {
    login: undefined,
    addLogin: () => {},
}

export const UserContext = createContext<UserContextValue>(initialValue);

export const UserProvider = ({ children } : { children: React.ReactNode}) => {
    const [login, setLogin] = useState<string | undefined>(undefined);

    const addLogin = (text: string | undefined) => {
        setLogin(text);
    };



    const contextValue: UserContextValue = {
        login,
        addLogin,
    }

    return (
        <UserContext.Provider value={contextValue}>{ children }</UserContext.Provider>
    );
}