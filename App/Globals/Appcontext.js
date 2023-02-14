import { createContext,useState } from "react";

export const AppContext = createContext();

export function AppProvider ({children}) {
    const [userUID,setUserUID] = useState('');
    const [selectedCoin,setSelectedCoin] = useState('');
    const [userInfo,setUserInfo] = useState([]);
    const [signedIn,setSignedIn] = useState(false);
    const [oldSignIn,setOldSignedIn] = useState('');

    return (
        <AppContext.Provider value={{
            userUID,
            setUserUID,
            signedIn,
            setSignedIn,
            userInfo,
            setUserInfo,
            selectedCoin,
            setSelectedCoin,
            oldSignIn,
            setOldSignedIn
        }}
        >
            {children}
        </AppContext.Provider>
    )
};
