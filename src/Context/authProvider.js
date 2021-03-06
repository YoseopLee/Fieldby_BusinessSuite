import { onAuthStateChanged } from "firebase/auth";
import React, { useContext, useEffect, useState } from "react";
import { authService } from "../fBase";

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({children}) {
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getUserData = onAuthStateChanged(authService, (user) => {
            setLoading(false);
            setCurrentUser(user);
            console.log(user);              
        })
        return getUserData
    }, []);

    const value = {
        currentUser,        
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}