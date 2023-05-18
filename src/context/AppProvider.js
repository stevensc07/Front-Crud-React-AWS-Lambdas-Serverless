import React, { useEffect, useState } from 'react';
import AppContext from "./AppContext";

const AppProvider = ({ children }) => {
    const [islogged, setIsLogged] = useState();
    const [role, setRole] = useState();


    useEffect(() => {
        const isToken = localStorage.getItem("token") ? true : false
        setIsLogged(isToken);
        setRole(localStorage.getItem("profile"));

    }, [])

    return (
        <AppContext.Provider
            value={{
                role,
                setRole,
                islogged,
                setIsLogged
            }}>
            {children}
        </AppContext.Provider>
    )
}

export default AppProvider;