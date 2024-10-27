import React, { useEffect, useContext, useReducer, useState } from 'react';
import { apiClient } from './apiClient';

const AuthContext = React.createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return { ...state, isLoggedIn: true };
        case 'LOGOUT':
            return { ...state, isLoggedIn: false, userInfo: null };
        case 'SET_USER_INFO':
            localStorage.setItem('userInfo', JSON.stringify(action.payload));
            return { ...state, userInfo: action.payload };
        case 'LOGIN_AND_SET_USER_INFO':
            localStorage.setItem('userInfo', JSON.stringify(action.payload));
            return { isLoggedIn: true, userInfo: action.payload };
        case 'UPDATE_AND_SET_UPDATED_USER_INFO':
            {
                let updatedUserInfo = {
                    ...state.userInfo,
                    ...action.payload,
                };
                localStorage.setItem('userInfo', JSON.stringify(updatedUserInfo));
                return { isLoggedIn: true, userInfo: updatedUserInfo };
            }
        default:
            return state;
    }
};

export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, { isLoggedIn: false, userInfo: JSON.parse(localStorage.getItem('userInfo')) || null });
    const [isFetching, setIsFetching] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const authToken = localStorage.getItem('authToken');
                if (!authToken) {
                    dispatch({ type: 'LOGOUT' });
                    setIsFetching(false);
                    return;
                }
                const response = await apiClient.get('/users/current-user');
                if (response.status === 200 && response.data.user) {
                    const { id, name, surname, email, role } = response.data.user;
                    const payload = { id, name, surname, email, role };
                    localStorage.setItem('userInfo', JSON.stringify(payload));
                    dispatch({ type: 'LOGIN_AND_SET_USER_INFO', payload });
                } else {
                    dispatch({ type: 'LOGOUT' });
                }
            } catch (error) {
                localStorage.removeItem('authToken');
                localStorage.removeItem('userInfo');
                dispatch({ type: 'LOGOUT' });
            } finally {
                setIsFetching(false);
            }
        };

        fetchUser();
    }, []);

    const loginAuth = (userInfo) => {
        dispatch({ type: 'LOGIN_AND_SET_USER_INFO', payload: userInfo });
    };

    const updateProfile = (userInfo) => {
        dispatch({ type: 'UPDATE_AND_SET_UPDATED_USER_INFO', payload: userInfo });
    }

    const logoutAuth = () => {
        dispatch({ type: 'LOGOUT' });
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn: state.isLoggedIn, loginAuth, logoutAuth, updateProfile, userInfo: state.userInfo, isFetching }}>
            {children}
        </AuthContext.Provider>
    );
};
