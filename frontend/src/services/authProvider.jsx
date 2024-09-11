import React, { useState, useEffect, useContext } from 'react';
import {apiClient} from './apiClient';

const AuthContext = React.createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const authToken = localStorage.getItem('authToken');
                if (!authToken) {
                    setIsLoggedIn(false);
                    return;
                }
                const response = await apiClient.get('/users/current-user');
                if (response.status === 200 && response.data.user) {
                    const userData = response.data.user;
                    const fullName = userData.surname ? userData.name + " " + userData.surname : userData.name;
                    setUserInfo({ fullName, role: userData.role });
                    setIsLoggedIn(true);
                }
                else{
                    setIsLoggedIn(false);
                }
            } catch (error) {
                localStorage.removeItem('authToken');
            }      
        };
        fetchUser();
    }, []);

    const loginAuth = () => {
        setIsLoggedIn(true);
    };

    const logoutAuth = () => {
        setIsLoggedIn(false);
    };

    return (
        <AuthContext.Provider value={{isLoggedIn, loginAuth, logoutAuth, userInfo}}>
            {children}
        </AuthContext.Provider>
    );
};
