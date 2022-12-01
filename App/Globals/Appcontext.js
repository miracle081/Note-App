import { createContext,useState } from "react";

export const AppContext = createContext();

export function AppProvider ({children}) {
    const [userUID,setUserUID] = useState('');
    const [signedIn,setSignedIn] = useState(false);

    return (
        <AppContext.Provider value={{
            userUID,
            setUserUID,
            signedIn,
            setSignedIn,}}
        >
            {children}
        </AppContext.Provider>
    )
};
