import React, { useState, useEffect, useContext } from 'react';
import {apiClient} from './apiClient';

const AuthContext = React.createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

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

    return (
        <AuthContext.Provider value={{isLoggedIn}}>
            {children}
        </AuthContext.Provider>
    );
};
