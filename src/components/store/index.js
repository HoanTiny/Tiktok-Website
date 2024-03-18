import React, { createContext, useContext } from 'react';
import PropTypes from 'prop-types';
// Khởi tạo một Context mới
const AuthContext = createContext();
export function UserAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const tokenStr = localStorage.getItem('token') ?? '';
    const userAuth = localStorage.getItem('username') ?? '';
    console.log(1111, userAuth);

    const value = {
        tokenStr,
        userAuth,
    };
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
