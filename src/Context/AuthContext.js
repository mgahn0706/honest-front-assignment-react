import {createContext, useContext, useState} from "react";


const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [userInfo, setUserInfo] = useState({
        name: "",
        civilcodeFirst: "",
        civilcodeLast: "",
        mobile: "",
});
    const [token, setToken] = useState("");
    return (
        <AuthContext.Provider
            value={{userInfo, setUserInfo, setToken, token}}
            >
            {children}
        </AuthContext.Provider>
    );
};

export const  useAuthContext = () => useContext(AuthContext);

